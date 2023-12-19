import Dockerode = require('dockerode');

import {
  ContainerProperties,
  DataBaseConnectionConfig,
} from '../constants/docker.config';

const docker = new Dockerode();

const dockerConfig: Dockerode.ContainerCreateOptions = {
  Image: ContainerProperties.image,
  name: ContainerProperties.name,
  ExposedPorts: { [`${ContainerProperties.port}/tcp`]: {} },
  Env: [
    `POSTGRES_PASSWORD=${ContainerProperties.password}`,
    `POSTGRES_DB=${DataBaseConnectionConfig.database}`,
    `POSTGRES_USER=${DataBaseConnectionConfig.username}`,
  ],
  HostConfig: {
    PortBindings: {
      [`${ContainerProperties.port}/tcp`]: [
        { HostPort: ContainerProperties.port },
      ],
    },
  },
};

export class DockerService {
  private isCreatingContainer = false; // Flag to prevent concurrent container creation

  async startPostgresContainer() {
    try {
      // Check if the container already exists
      const existingContainer = docker.getContainer(ContainerProperties.name);
      const containerInfo = await existingContainer.inspect();

      // If the container exists and is running, log a message and return
      if (containerInfo.State.Running) {
        console.log(
          `PostgreSQL container is already running on port ${ContainerProperties.port}`,
        );
        return;
      }

      // If the container exists but is not running, start it
      console.log(
        `Container ${ContainerProperties.name} does already exist. Starting...`,
      );

      // Check if another process is already creating the container
      if (!this.isCreatingContainer) {
        this.isCreatingContainer = true;

        // Start the container if it's not already running
        await existingContainer.start();
        console.log(
          `PostgreSQL container started on port ${ContainerProperties.port}`,
        );

        this.isCreatingContainer = false; // Release the lock after starting the container
      }
    } catch (dockerError) {
      // If the container doesn't exist, create and start a new one
      if (dockerError.statusCode === 404) {
        try {
          await (await docker.createContainer(dockerConfig)).start();
          console.log(
            `PostgreSQL container started on port ${ContainerProperties.port}`,
          );
        } catch (startError) {
          console.error('Error starting the PostgreSQL container:', startError);
        }
      } else {
        console.error(
          'Error checking the status of the PostgreSQL container:',
          dockerError,
        );
      }
    }
  }

  async stopPostgresContainer() {
    try {
      const container = docker.getContainer(ContainerProperties.name);
      await container.stop();
      console.log('PostgreSQL container stopped');
    } catch (dockerError) {
      console.error('Error stopping the PostgreSQL container:', dockerError);
    }
  }

  async isPostgresContainerRunning() {
    try {
      const containers = await docker.listContainers({ all: true });
      const isRunning = containers.some((container) =>
        container.Names.includes(`/${ContainerProperties.name}`),
      );

      return isRunning;
    } catch (dockerError) {
      console.error(
        'Error checking the status of the PostgreSQL container:',
        dockerError,
      );
      return false;
    }
  }
}

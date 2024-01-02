import Dockerode = require('dockerode');
import { Logger } from '@nestjs/common';
import {
  ContainerProperties,
  DataBaseConnectionConfig,
} from '../constants/docker.config';

const docker = new Dockerode();
const logger = new Logger('DockerService');

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
      logger.log('Checking docker container state...');
      // Check if the container already exists
      const existingContainer = docker.getContainer(ContainerProperties.name);
      const containerInfo = await existingContainer.inspect();

      // If the container exists and is running, log a message and return
      if (containerInfo.State.Running) {
        logger.log(
          `PostgreSQL container is already running on port ${ContainerProperties.port}`,
        );
        return;
      }

      // If the container exists but is not running, start it
      logger.log(
        `Container ${ContainerProperties.name} does already exist. Starting...`,
      );

      // Check if another process is already creating the container
      if (!this.isCreatingContainer) {
        this.isCreatingContainer = true;

        // Start the container if it's not already running
        await existingContainer.start();
        logger.log(
          `PostgreSQL container started on port ${ContainerProperties.port}`,
        );

        this.isCreatingContainer = false; // Release the lock after starting the container
      }
    } catch (dockerError) {
      // If the container doesn't exist, create and start a new one
      if (dockerError.statusCode === 404) {
        logger.log('Creating container');
        try {
          await (await docker.createContainer(dockerConfig)).start();
          logger.log(
            `PostgreSQL container started on port ${ContainerProperties.port}`,
          );
        } catch (startError) {
          logger.error('Error starting the PostgreSQL container:', startError);
        }
      } else {
        logger.error(
          'Error checking the status of the PostgreSQL container: ',
          dockerError,
        );
      }
    }
  }

  async restartPostgresContainer() {
    try {
      const container = docker.getContainer(ContainerProperties.name);
      const containerInfo = await container.inspect();

      if (!containerInfo.State.Running) {
        // Re-Launch and check container status
        await container.start();
        logger.verbose('Container restarted. ');
        const isRunning = await this.isPostgresContainerRunning();
        return isRunning;
      }
      return true;
    } catch (dockerError) {
      logger.error('Error restarting the PostgreSQL container: ', dockerError);
      return false;
    }
  }

  async stopPostgresContainer() {
    try {
      const container = docker.getContainer(ContainerProperties.name);
      await container.stop();
      logger.log(`PostgreSQL container stopped`);
    } catch (dockerError) {
      logger.error('Error stopping the PostgreSQL container:', dockerError);
    }
  }

  async isPostgresContainerRunning() {
    try {
      const containers = await docker.listContainers();
      const isRunning = containers.some(
        (container) =>
          container.Names.includes(`/${ContainerProperties.name}`) &&
          container.State === 'running',
      );
      return isRunning;
    } catch (dockerError) {
      logger.error(
        'Error checking the status of the PostgreSQL container:',
        dockerError,
      );
      return false;
    }
  }

  async doesPostgresContainerExist() {
    try {
      const container = docker.getContainer(ContainerProperties.name);
      await container.inspect();
      return true;
    } catch (dockerError) {
      if (dockerError.statusCode === 404) {
        return false;
      }
      logger.error(
        'Error checking the status of the PostgreSQL container:',
        dockerError,
      );
      return false;
    }
  }
}

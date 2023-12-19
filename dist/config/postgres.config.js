"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DockerService", {
    enumerable: true,
    get: function() {
        return DockerService;
    }
});
const _dockerode = /*#__PURE__*/ _interop_require_default(require("dockerode"));
const _dockerconfig = require("../constants/docker.config");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const docker = new _dockerode.default();
const dockerConfig = {
    Image: _dockerconfig.ContainerProperties.image,
    name: _dockerconfig.ContainerProperties.name,
    ExposedPorts: {
        [`${_dockerconfig.ContainerProperties.port}/tcp`]: {}
    },
    Env: [
        `POSTGRES_PASSWORD=${_dockerconfig.ContainerProperties.password}`,
        `POSTGRES_DB=${_dockerconfig.DataBaseConnectionConfig.database}`,
        `POSTGRES_USER=${_dockerconfig.DataBaseConnectionConfig.username}`
    ],
    HostConfig: {
        PortBindings: {
            [`${_dockerconfig.ContainerProperties.port}/tcp`]: [
                {
                    HostPort: _dockerconfig.ContainerProperties.port
                }
            ]
        }
    }
};
let DockerService = class DockerService {
    async startPostgresContainer() {
        try {
            // Check if the container already exists
            const existingContainer = docker.getContainer(_dockerconfig.ContainerProperties.name);
            const containerInfo = await existingContainer.inspect();
            // If the container exists and is running, log a message and return
            if (containerInfo.State.Running) {
                console.log(`PostgreSQL container is already running on port ${_dockerconfig.ContainerProperties.port}`);
                return;
            }
            // If the container exists but is not running, start it
            console.log(`Container ${_dockerconfig.ContainerProperties.name} does already exist. Starting...`);
            // Check if another process is already creating the container
            if (!this.isCreatingContainer) {
                this.isCreatingContainer = true;
                // Start the container if it's not already running
                await existingContainer.start();
                console.log(`PostgreSQL container started on port ${_dockerconfig.ContainerProperties.port}`);
                this.isCreatingContainer = false; // Release the lock after starting the container
            }
        } catch (dockerError) {
            // If the container doesn't exist, create and start a new one
            if (dockerError.statusCode === 404) {
                try {
                    await (await docker.createContainer(dockerConfig)).start();
                    console.log(`PostgreSQL container started on port ${_dockerconfig.ContainerProperties.port}`);
                } catch (startError) {
                    console.error('Error starting the PostgreSQL container:', startError);
                }
            } else {
                console.error('Error checking the status of the PostgreSQL container:', dockerError);
            }
        }
    }
    async stopPostgresContainer() {
        try {
            const container = docker.getContainer(_dockerconfig.ContainerProperties.name);
            await container.stop();
            console.log('PostgreSQL container stopped');
        } catch (dockerError) {
            console.error('Error stopping the PostgreSQL container:', dockerError);
        }
    }
    async isPostgresContainerRunning() {
        try {
            const containers = await docker.listContainers({
                all: true
            });
            const isRunning = containers.some((container)=>container.Names.includes(`/${_dockerconfig.ContainerProperties.name}`));
            return isRunning;
        } catch (dockerError) {
            console.error('Error checking the status of the PostgreSQL container:', dockerError);
            return false;
        }
    }
    constructor(){
        this.isCreatingContainer = false // Flag to prevent concurrent container creation
        ;
    }
};

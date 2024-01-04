import { Injectable, Logger } from '@nestjs/common';
import { DockerService } from './postgres.config';
// import axios from 'axios';

@Injectable()
export class StatusCheckService {
  private readonly logger = new Logger(StatusCheckService.name);

  constructor(private readonly dockerService: DockerService) {}

  async checkStatus() {
    // const isBackendActive = await this.isBackendHealthy();
    const isDockerContainerRunning =
      await this.dockerService.isPostgresContainerRunning();

    if (!isDockerContainerRunning) {
      this.logger.error('Docker container is not active, restarting.');
      const dockerRestartSuccess =
        await this.dockerService.restartPostgresContainer();

      if (!dockerRestartSuccess) {
        process.exit(1);
      }
    }
  }

  // private async isBackendHealthy(): Promise<boolean> {
  //   try {
  //     const response = await axios.get(
  //       'http://localhost:3000/bus-manager/api/status',
  //     );
  //     return response.status === 200;
  //   } catch (error) {
  //     return false;
  //   }
  // }
}

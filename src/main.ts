import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DockerService } from './config/postgres.config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { CONSTANTS } from './constants/constants.config';
import { Logger } from '@nestjs/common';

const generateSecretKey = () => crypto.randomBytes(32).toString('hex');

if (
  !fs.existsSync(CONSTANTS.envFilePath) ||
  !fs.readFileSync(CONSTANTS.envFilePath, 'utf-8').includes('JWT_SECRET')
) {
  const secretKey = generateSecretKey();
  fs.writeFileSync(CONSTANTS.envFilePath, `JWT_SECRET=${secretKey}\n`);
  console.log('Secret key generated and saved in the .env file.');
}

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const dockerService = new DockerService();

  // const statusCheckService = new StatusCheckService(dockerService);
  dockerService.startPostgresContainer();

  // Handle the SIGINT signal to stop the Docker container before exiting
  process.on('SIGINT', async () => {
    logger.verbose('Received SIGINT. Stopping Docker container and exiting...');

    // Stop the Docker container before exiting
    await dockerService.stopPostgresContainer();

    // Exit the Node.js process
    process.exit();
  });

  try {
    logger.warn(
      `Waiting for ${
        CONSTANTS.waitForResponseDockerTimeout / 1000
      } seconds before connecting to the database...`,
    );

    // setInterval(async () => {
    //   await statusCheckService.checkStatus();
    // }, CONSTANTS.statusCheckServiceIntervalTimeInterval);

    await new Promise((resolve) =>
      setTimeout(resolve, CONSTANTS.waitForResponseDockerTimeout),
    );

    const app = await NestFactory.create(AppModule, {
      cors: true,
    });
    app.setGlobalPrefix('bus-manager/api');

    await app.listen(3000);
    logger.log('Nest application successfully started.');
  } catch (error) {
    logger.error('Error starting the application:', error);
    await dockerService.stopPostgresContainer();
    process.exit(1);
  }
}

// Call the bootstrap function to start the application
bootstrap();

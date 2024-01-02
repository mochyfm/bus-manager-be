import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DockerService } from './config/postgres.config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { CONSTANTS } from './constants/constants.config';

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

// Function to bootstrap the NestJS application
async function bootstrap() {
  // Create an instance of the DockerService
  const dockerService = new DockerService();

  // Handle the SIGINT signal to stop the Docker container before exiting
  process.on('SIGINT', async () => {
    console.log('Received SIGINT. Stopping Docker container and exiting...');

    // Stop the Docker container before exiting
    await dockerService.stopPostgresContainer();

    // Exit the Node.js process
    process.exit();
  });

  try {
    // Start the PostgreSQL container if it is not already running
    await dockerService.startPostgresContainer();
    // Create an instance of the Nest application
    const app = await NestFactory.create(AppModule, { cors: true });
    app.setGlobalPrefix('bus-manager/api');

    // Listen on port 3000
    await app.listen(3000);
  } catch (error) {
    console.error('Error starting the application:', error);

    // Stop the Docker container before exiting if an error occurs
    await dockerService.stopPostgresContainer();

    // Exit the Node.js process
    process.exit(1); // Use exit code 1 to indicate an error
  }
}

// Call the bootstrap function to start the application
bootstrap();

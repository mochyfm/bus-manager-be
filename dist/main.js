"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app/app.module");
const _postgresconfig = require("./config/postgres.config");
async function bootstrap() {
    // Create an instance of the DockerService
    const dockerService = new _postgresconfig.DockerService();
    try {
        // Start the PostgreSQL container if it is not already running
        await dockerService.startPostgresContainer();
        // Create an instance of the Nest application
        const app = await _core.NestFactory.create(_appmodule.AppModule);
        // Listen on port 3000
        await app.listen(3000);
    } catch (error) {
        console.error('Error starting the Nest application:', error);
    }
}
// Call the bootstrap function to start the application
bootstrap();

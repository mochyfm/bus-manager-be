<h1 align="center">Bus Manager BE</h1>

<p align="center">
  <img src="./docs/img/git_pic.png" alt="Bus Logo" width="200"/>
</p>

<p align="center">
  <a href="./docs/README-es.md">
    <img src="https://img.shields.io/badge/proyecto-Español-yellow.svg" alt="Proyecto: Español">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/version-development-orange.svg" alt="Version">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/framework-Nest.js-red.svg" alt="Framework: Nest.js">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/package%20manager-pnpm-lightblue.svg" alt="Package Manager: pnpm">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/language-TypeScript-blue.svg" alt="Language: TypeScript">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/documentation-English-blue.svg" alt="Documentation: English">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/compiler-SWC-green.svg" alt="Compiler: SWC">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/docker-✔-blue.svg" alt="Docker">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/SQL-postgreSQL-purple.svg" alt="PostgreSQL">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Build: Passing">
  </a>
</p>


<br/>

Para acceder a la documentación en español, pulsa <a href='./docs/README-es.md'>aquí</a>.

<hr/>


# Description

This section focuses on the backend aspect of the vehicle management project (that currently doesn't have a name yet), particularly tailored for buses—both school and non-school varieties.

#### Technology Stack

- **Docker**: The backend utilizes Docker for containerization.
- **PostgreSQL**: A PostgreSQL database is integrated into the Docker setup.

#### Prerequisites

To get started, ensure the following prerequisites are met:

- Docker is installed on your system.
- A PostgreSQL image is available for development purposes.

*Note: Production-specific requirements are yet to be specified.*

#### Docker Handling

Upon application startup:

1. The backend dynamically creates a Docker container if none exists.
2. If a container is already present, the backend launches it directly.

#### Data Management

- **ORM (TypeORM)**: Object-Relational Mapping is facilitated through TypeORM for seamless data handling.

#### Security Measures

- **JWT (JSON Web Tokens)**: Authentication is implemented using JWT.
- **Encryption**: Appropriate encryption measures are in place to ensure data security.

## Development Setup

Follow these steps for setting up the development environment:

1. **Install Docker and have a PostgreSQL image available.**
   - Ensure Docker is installed on your system.
   - Have a PostgreSQL image ready for use.

2. **Node.js Version Requirement**
   - Ensure you have Node.js version 18 or higher installed.

3. **Clone the Project and Install Dependencies**
   - Clone the project repository.
   - Navigate to the project directory and run the following command:

     ```bash
     pnpm install
     ```

4. **Start the Project in Development Mode**
   - To run the project in development mode, use the following command:

     ```bash
     pnpm run start:dev
     ```

5. **Build the Project**
   - To build the project, execute the following command:

     ```bash
     pnpm run build
     ```

These steps will set up your development environment and allow you to run the project in development mode or build it as needed.


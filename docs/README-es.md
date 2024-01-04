<h1 align="center">Bus Manager BE</h1>

<p align="center">
  <img src="./img/git_pic.png" alt="Bus Logo" width="200"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/proyecto-Español-yellow.svg" alt="Proyecto: Español">
  <img src="https://img.shields.io/badge/version-development-orange.svg" alt="Version">
  <img src="https://img.shields.io/badge/framework-Nest.js-red.svg" alt="Framework: Nest.js">
  <img src="https://img.shields.io/badge/package%20manager-pnpm-lightblue.svg" alt="Package Manager: pnpm">
  <img src="https://img.shields.io/badge/language-TypeScript-blue.svg" alt="Language: TypeScript">
  <img src="https://img.shields.io/badge/documentation-English-blue.svg" alt="Documentation: English">
  <img src="https://img.shields.io/badge/compiler-SWC-green.svg" alt="Compiler: SWC">
  <img src="https://img.shields.io/badge/docker-✔-blue.svg" alt="Docker">
  <img src="https://img.shields.io/badge/SQL-postgreSQL-purple.svg" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT">
  <img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Build: Passing">
</p>

<br/>

To access the documentation in English, click <a href='/README.md'>here</a>.

<hr/>

# Descripción

Esta sección se centra en el aspecto del backend del proyecto de gestión de vehículos (actualmente sin un nombre específico), diseñado especialmente para autobuses, tanto escolares como no escolares.

## Pila Tecnológica

- **Docker**: El backend utiliza Docker para la contenerización.
- **PostgreSQL**: Una base de datos PostgreSQL está integrada en la configuración de Docker.

## Requisitos Previos

Para comenzar, asegúrate de cumplir con los siguientes requisitos previos:

- Docker está instalado en tu sistema.
- Hay disponible una imagen de PostgreSQL para propósitos de desarrollo.

*Nota: Aún no se han especificado los requisitos específicos para producción.*

## Manejo de Docker

Al iniciar la aplicación:

1. El backend crea dinámicamente un contenedor de Docker si no existe ninguno.
2. Si ya existe un contenedor, el backend lo inicia directamente.

## Gestión de Datos

- **ORM (TypeORM)**: Se utiliza TypeORM para el mapeo objeto-relacional, facilitando el manejo de datos de manera fluida.

## Medidas de Seguridad

- **JWT (JSON Web Tokens)**: La autenticación se implementa mediante JWT. Este crea un archivo .env con una clave generada aleatoriamente para cada backend de manera que no sea la misma y que se pueda acceder con un token de otra aplicación a este servicio.
- **Cifrado**: Se han establecido medidas de cifrado adecuadas para garantizar la seguridad de los datos.

## Configuración para Desarrollo

Sigue estos pasos para configurar el entorno de desarrollo:

1. **Instalar Docker y tener una imagen de PostgreSQL disponible.**
   - Asegúrate de tener Docker instalado en tu sistema.
   - Ten una imagen de PostgreSQL lista para su uso.

2. **Requisitos de Versión de Node.js**
   - Asegúrate de tener instalada la versión 18 o superior de Node.js.

3. **Clonar el Proyecto e Instalar Dependencias**
   - Clona el repositorio del proyecto.
   - Navega al directorio del proyecto y ejecuta el siguiente comando:

     ```bash
     pnpm install
     ```

4. **Iniciar el Proyecto en Modo Desarrollo**
   - Para ejecutar el proyecto en modo desarrollo, utiliza el siguiente comando:

     ```bash
     pnpm run start:dev
     ```

5. **Construir el Proyecto**
   - Para construir el proyecto, ejecuta el siguiente comando:

     ```bash
     pnpm run build
     ```

Estos pasos configurarán tu entorno de desarrollo y te permitirán ejecutar el proyecto en modo desarrollo o construirlo según sea necesario.
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Este proyecto es una **Prueba Técnica de Backend** desarrollada con **Node.js y NestJS** utilizando **MySQL** como base de datos. El objetivo principal es construir un **sistema de gestión de facturas y sus detalles**, exponiendo una **API REST segura** que cumpla con buenas prácticas de desarrollo, autenticación, manejo de errores y consistencia de datos.

El sistema permite:

- Crear, consultar, listar y eliminar facturas junto con sus detalles.
- Agregar ítems individuales a facturas existentes.
- Calcular automáticamente el total de la factura a partir de sus detalles.
- Gestionar autenticación y autorización mediante JWT, asegurando que solo usuarios autenticados puedan acceder a las APIs.
- Validar entradas y manejar errores de forma centralizada, devolviendo respuestas JSON claras con códigos HTTP adecuados.

El proyecto está diseñado con una **arquitectura limpia y modular**, separando controladores, servicios y repositorios, e incluye **migraciones de base de datos** para la creación automática de tablas. Además, toda la documentación de la API se encuentra disponible a través de **Swagger** para facilitar su uso y pruebas.


## Project setup

```bash
# Clonar repositorio
$ git clone <repositorio-url>

# Instalar dependencias
$ pnpm install
```

## Database setup
Nota: Este proyecto está desarrollado y probado con **MySQL** usando **Workbench**.
- Crear la base de datos en MySQL.
- Cambiar las variables de entorno para conectar con la base de datos local.

```bash
# Correr migracion
$ pnpm run migration:run
```

## Run the project
```bash
# Levantar servidor
$ pnpm start
```
```bash
# Modo desarrollo
$ pnpm start:dev
```
## La documentación de la API está disponible en:
http://localhost:3000/api/docs#/



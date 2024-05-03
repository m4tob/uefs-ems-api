# Emergency Management System
![typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
![Node 20.12](https://shields.io/badge/Node-20.12.2-339933?logo=Node.js&logoColor=FFF&style=flat-square)
![nestjs](https://shields.io/badge/NestJS-E0234E?logo=NestJS&logoColor=FFF&style=flat-square)
![mysql](https://shields.io/badge/MySQL-4479A1?logo=MySQL&logoColor=FFF&style=flat-square)
![docker](https://shields.io/badge/Docker-2496ED?logo=Docker&logoColor=FFF&style=flat-square)
![swagger](https://shields.io/badge/Swagger-85EA2D?logo=Swagger&logoColor=FFF&style=flat-square)
![make](https://shields.io/badge/Make-00CC00?logo=Make&logoColor=FFF&style=flat-square)
![typeorm](https://shields.io/badge/TypeORM-F37626?logo=TypeORM&logoColor=FFF&style=flat-square)

This project involves the development of an API for an Emergency Management System, proposed as a product for the discipline Computing Systems in Postgraduate Program in Computer Science at the State University of Feira de Santana - UEFS.

For this project, we utilized the [TypeScript](https://www.typescriptlang.org/) programming language with [Node.js](https://nodejs.org/) and the [Nest.js](https://nestjs.com/) framework. The database management [MySQL 5.7](https://www.mysql.com/) to handle our registers and settings.

To build the API documentation, we've used [Swagger](https://swagger.io/) tool integrated with Nest.js, accessible through the endpoint: {ems_host}/docs

## Getting Started
To make all containers comunicate with each other, put this content inside your `/etc/hosts`:

```bash
127.0.0.1 ems-api
```

### Workspace Dependencies
- [Node 20.10](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started/)
- Make
  - [Windows](https://gnuwin32.sourceforge.net/packages/make.htm)
  - Linux
  ```bash
  sudo apt update
  sudo apt install make
  ```

### Installation
We are using Node `20.12.2` for this project

```bash
# install dependencies
$ npm install
```

### Running the app

```bash
# first run
$ make setup

# other run
$ make up
```

## Working with migrations

```bash
# generate migrations
$ make migration.generate name=MinhaNovaMigration

# run migrations
$ make migration.run

# revert migrations
$ make migration.revert
```

## Working with seeds

```bash
# generate seed
$ make seed.generate name=MinhaNovaSeed

# run seed
$ make seed.run

# revert seed
$ make seed.revert
```

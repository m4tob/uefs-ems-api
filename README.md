## Getting Started

To make all containers comunicate with each other, put this content inside your `/etc/hosts`:

```bash
127.0.0.1 ems-api
```

## Installation
We are using Node `20.12.2` for this project

```bash
# install dependencies
$ npm install
```

## Running the app

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

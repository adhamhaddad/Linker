# Social-Network

## Description

This is a Social-Network platform called `Linker` that simulates `Facebook` and `LinkedIn`.

## Dependencies

- Node v14.15.1 (LTS) or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 6.14.8 (LTS) or more recent, Yarn can work but was not tested for this project

- AWS CLI v2, v1 can work but was not tested for this project

- A RDS database running Postgres.

- A S3 bucket for hosting uploaded pictures.

## Installation

1. From the root of the repo, navigate backend folder `cd backend` to install the node_modules `npm install`. After installation is done start the api in dev mode with `npm run dev`.
1. Without closing the terminal in step 1, navigate to the frontend `cd frontend` to intall the node_modules `npm install`. After installation is done start the api in dev mode with `npm run start`.

## Unit Tests:

Unit tests are using the Jasmine Framework.

## Built With

- [React](https://reactjs.org/) - Single Page Application Library
- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework
- [PostgreSQL](https://www.postgresql.org/) - Open Source Relational Database

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS Authentication & Bookmark API REST API – Authentication, Prisma, and E2E Testing
### 🔐 User Authentication
- Users can **sign up** and **log in** securely using **JWT-based authentication**.
- Passwords are hashed using **argon2** for strong security.
- Authenticated users receive an access token to interact with protected endpoints.

### 🔖 Bookmark Management
- Authenticated users can:
  - **Create** bookmarks by providing a title, description, and URL.
  - **Retrieve** all bookmarks or a single bookmark by ID.
  - **Update** existing bookmarks.
  - **Delete** bookmarks.
- Each bookmark is associated with a specific user, ensuring data privacy and access control.


This project is a robust RESTful API built with [NestJS](https://nestjs.com/) and [TypeScript](https://www.typescriptlang.org/), demonstrating modern backend practices including modular architecture, authentication, PostgreSQL integration, and automated testing.

It covers the full development workflow—from setting up the project and creating modules to integrating a database with Prisma and securing endpoints using JWT and Passport.js. Passwords are hashed with Argon2, and validation is handled using NestJS pipes and DTOs.

The API features user authentication and bookmark management. PostgreSQL runs in Docker for easy development and isolation, while Prisma handles schema definitions, migrations, and querying. Environment variables are managed via the NestJS ConfigModule, ensuring clean separation of secrets and config values.

Custom decorators and guards are used to implement secure and reusable logic for extracting user data from JWTs. End-to-end tests are written using [PactumJS](https://pactumjs.github.io/), with isolated test environments and automated database setup/teardown logic.

---

## 🚀 Tech Stack

- **NestJS** – Progressive Node.js framework
- **TypeScript** – Type-safe language for scalable apps
- **PostgreSQL** – Relational database
- **Prisma ORM** – Type-safe database client
- **Passport.js** – Authentication middleware
- **JWT** – JSON Web Tokens for secure auth
- **Argon2** – Password hashing
- **Docker** – Containerized PostgreSQL setup
- **PactumJS** – E2E API testing

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Kidus1343/Backend_Projects.git
cd Backend_Projects

# Install dependencies
npm install
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

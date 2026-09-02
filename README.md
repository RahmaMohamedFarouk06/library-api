# Library API

A RESTful Library Management API built with NestJS, PostgreSQL, Prisma, and JWT authentication.

## Features

- Book CRUD operations
- User registration and login
- Password hashing with bcrypt
- JWT authentication
- Protected book creation, update, and delete endpoints
- DTO validation with class-validator
- Swagger API documentation
- Global request validation
- PostgreSQL database with Prisma ORM
- Docker support
- Unit and E2E testing
- Logging
- Environment-based configuration

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker
- JWT
- Passport
- bcrypt
- Swagger
- Vitest
- Supertest

## Project Structure

```text
src/
├── auth/
├── books/
├── users/
├── prisma/
├── app.module.ts
└── main.ts

prisma/
├── migrations/
└── schema.prisma

test/
└── app.e2e-spec.ts
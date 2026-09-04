# Library API

A RESTful Library Management API built with **NestJS, PostgreSQL, Prisma, and JWT authentication**, with **Repository Pattern, Event-Driven Architecture, and real-time WebSocket notifications**.

## Features

* Book CRUD operations
* User registration and login
* Password hashing with bcrypt
* JWT authentication
* Protected book creation, update, and delete endpoints
* DTO validation with class-validator
* Swagger API documentation
* Global request validation
* PostgreSQL database with Prisma ORM
* PostgreSQL running with Docker
* Repository Pattern for database access
* Event-Driven Architecture using EventEmitter
* Book lifecycle events:

  * `book.created`
  * `book.updated`
  * `book.deleted`
* Event listeners for book events
* Real-time notifications using WebSockets
* Socket.IO broadcasting
* Browser receives real-time book events
* Unit and E2E testing with Vitest and Supertest
* Logging
* Environment-based configuration

## Tech Stack

* **NestJS**
* **TypeScript**
* **PostgreSQL**
* **Prisma ORM**
* **Docker**
* **JWT**
* **Passport**
* **bcrypt**
* **Swagger**
* **EventEmitter**
* **WebSockets**
* **Socket.IO**
* **Vitest**
* **Supertest**

## Architecture

The application follows a layered architecture with the **Repository Pattern** separating business logic from database access.

```text
                    HTTP

                     │

                     ▼

              BooksController

                     │

                     ▼

               BooksService

                     │

                     ▼

              BookRepository
                 (interface)

                     │

                     ▼

          PrismaBookRepository

                     │

                     ▼

               PrismaService

                     │

                     ▼

                PostgreSQL
```

### Repository Pattern

`BookRepository` defines the contract for book data access, while `PrismaBookRepository` provides the Prisma-based implementation.

This keeps the service layer independent from the database implementation and makes the application easier to test and extend.

## Event-Driven Architecture

Book operations publish domain events after successful database operations.

For example:

```text
PATCH /books/11

      ↓

BooksService

      ↓

Database updated

      ↓

book.updated event

      ↓

├── BookUpdatedListener
│
└── NotificationsGateway

          ↓

      Socket.IO

          ↓

      Browser
```

The same architecture is used for:

* `book.created`
* `book.updated`
* `book.deleted`

### Real-Time Notifications

The application uses **EventEmitter** to publish book events.

Dedicated listeners handle these events and forward notifications to the WebSocket gateway.

The `NotificationsGateway` uses **Socket.IO** to broadcast the events to connected clients.

Therefore, when a book is created, updated, or deleted, connected browsers can receive the event in real time without making another HTTP request.

### Event Flow

```text
Book CRUD Operation
        │
        ▼
   BooksService
        │
        ▼
   EventEmitter
        │
        ├── book.created
        ├── book.updated
        └── book.deleted
        │
        ▼
     Listener
        │
        ▼
NotificationsGateway
        │
        ▼
     Socket.IO
        │
        ▼
    Connected Browser
```

## Authentication

The API uses **JWT-based authentication**.

### Authentication Flow

```text
Register
   ↓
Password hashed with bcrypt
   ↓
User stored in PostgreSQL

Login
   ↓
Credentials validated
   ↓
JWT issued
   ↓
JWT used to access protected endpoints
```

Book creation, update, and delete operations require authentication.

## API Endpoints

### Authentication

| Method | Endpoint         | Description           | Auth |
| ------ | ---------------- | --------------------- | ---- |
| POST   | `/auth/register` | Register a new user   | No   |
| POST   | `/auth/login`    | Login and receive JWT | No   |

### Books

| Method | Endpoint     | Description      | Auth |
| ------ | ------------ | ---------------- | ---- |
| GET    | `/books`     | Get all books    | No   |
| GET    | `/books/:id` | Get a book by ID | No   |
| POST   | `/books`     | Create a book    | JWT  |
| PATCH  | `/books/:id` | Update a book    | JWT  |
| DELETE | `/books/:id` | Delete a book    | JWT  |

## WebSockets

The application provides real-time book notifications through **Socket.IO**.

Connected clients can receive events when books are:

```text
book.created
book.updated
book.deleted
```

The WebSocket layer is responsible only for broadcasting notifications, while the business logic remains inside the service and event-listener layers.

## Database

The project uses **PostgreSQL** as the database and **Prisma ORM** for database access.

PostgreSQL can be started using Docker Compose:

```bash
docker compose up -d
```

After starting the database, Prisma can be used for database operations and migrations.

## Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret"
```

Do not commit your `.env` file to Git.

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start PostgreSQL:

```bash
docker compose up -d
```

Run the application:

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

## Swagger Documentation

Swagger API documentation is available while the application is running.

```text
http://localhost:3000/api
```

Swagger can be used to explore and test the REST API endpoints.

## Testing

The project includes unit tests and end-to-end tests.

Run all unit/integration tests:

```bash
npm test
```

Run E2E tests:

```bash
npm run test:e2e
```

Run linting:

```bash
npm run lint
```

Build the project:

```bash
npm run build
```

### Current Test Results

The current implementation passes:

* **36/36 tests** with `npm test`
* **22/22 E2E tests** with `npm run test:e2e`
* **0 lint errors**
* Successful production build

## Project Structure

```text
library-api/
│
├── src/
│   │
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── ...
│   │
│   ├── books/
│   │   ├── events/
│   │   │   ├── book-created.event.ts
│   │   │   ├── book-created.listener.ts
│   │   │   ├── book-updated.event.ts
│   │   │   ├── book-updated.listener.ts
│   │   │   ├── book-deleted.event.ts
│   │   │   └── book-deleted.listener.ts
│   │   │
│   │   ├── repositories/
│   │   │   ├── book.repository.ts
│   │   │   └── prisma-book.repository.ts
│   │   │
│   │   ├── books.controller.ts
│   │   ├── books.service.ts
│   │   ├── books.module.ts
│   │   └── ...
│   │
│   ├── notifications/
│   │   ├── notifications.gateway.ts
│   │   └── notifications.module.ts
│   │
│   ├── users/
│   │
│   ├── prisma/
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── test/
│   └── app.e2e-spec.ts
│
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

## Architecture Summary

The project combines several backend concepts:

```text
                    REST API
                       │
                       ▼
                 Controllers
                       │
                       ▼
                    Services
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
        Repository           EventEmitter
             │                   │
             ▼                   ▼
          Prisma             Listeners
             │                   │
             ▼                   ▼
        PostgreSQL       NotificationsGateway
                                 │
                                 ▼
                              Socket.IO
                                 │
                                 ▼
                              Browser
```

This architecture keeps the application modular and separates:

* HTTP handling
* Business logic
* Database access
* Domain events
* Event listeners
* Real-time communication
* Authentication
* Testing

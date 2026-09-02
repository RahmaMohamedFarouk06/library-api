import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
} from 'vitest';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('Library API (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let createdBookId: number;
  let testEmail: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a user', async () => {
    testEmail = `test-${Date.now()}@example.com`;

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: testEmail,
        password: 'password123',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(testEmail);
    expect(response.body).not.toHaveProperty('password');
  });

  it('should login successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testEmail,
        password: 'password123',
      })
      .expect(200);

    expect(response.body).toHaveProperty('access_token');

    accessToken = response.body.access_token;
  });

  it('should reject duplicate email registration', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: testEmail,
        password: 'password123',
      })
      .expect(409);
  });

  it('should reject login with wrong password', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testEmail,
        password: 'wrong-password',
      })
      .expect(401);
  });

  it('should reject login with non-existing email', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'does-not-exist@example.com',
        password: 'password123',
      })
      .expect(401);
  });

  it('should reject registration with invalid email', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'invalid-email',
        password: 'password123',
      })
      .expect(400);
  });

  it('should reject registration with short password', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: `short-${Date.now()}@example.com`,
        password: '123',
      })
      .expect(400);
  });

  it('should reject creating a book without authentication', async () => {
    await request(app.getHttpServer())
      .post('/books')
      .send({
        title: 'Unauthorized Book',
        author: 'Test Author',
      })
      .expect(401);
  });

  it('should reject creating a book with an invalid JWT', async () => {
    await request(app.getHttpServer())
      .post('/books')
      .set('Authorization', 'Bearer invalid-token')
      .send({
        title: 'Invalid Token Book',
        author: 'Test Author',
      })
      .expect(401);
  });

  it('should reject creating a book without title', async () => {
    await request(app.getHttpServer())
      .post('/books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        author: 'Test Author',
      })
      .expect(400);
  });

  it('should reject creating a book with an empty title', async () => {
    await request(app.getHttpServer())
      .post('/books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: '',
        author: 'Test Author',
      })
      .expect(400);
  });

  it('should reject creating a book without author', async () => {
    await request(app.getHttpServer())
      .post('/books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Book Without Author',
      })
      .expect(400);
  });

  it('should reject creating a book with invalid publishedAt', async () => {
    await request(app.getHttpServer())
      .post('/books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Invalid Date Book',
        author: 'Test Author',
        publishedAt: 'not-a-date',
      })
      .expect(400);
  });

  it('should create a book with authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'E2E Test Book',
        author: 'Test Author',
        description: 'Created by E2E test',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('E2E Test Book');

    createdBookId = response.body.id;
  });

  it('should get the created book', async () => {
    const response = await request(app.getHttpServer())
      .get(`/books/${createdBookId}`)
      .expect(200);

    expect(response.body.id).toBe(createdBookId);
    expect(response.body.title).toBe('E2E Test Book');
  });

  it('should reject an invalid book ID', async () => {
    await request(app.getHttpServer())
      .get('/books/abc')
      .expect(400);
  });

  it('should return 404 for a non-existing book', async () => {
    await request(app.getHttpServer())
      .get('/books/999999')
      .expect(404);
  });

  it('should update the created book with authentication', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/books/${createdBookId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'E2E Updated Book',
      })
      .expect(200);

    expect(response.body.title).toBe('E2E Updated Book');
  });

  it('should reject updating a book without authentication', async () => {
    await request(app.getHttpServer())
      .patch(`/books/${createdBookId}`)
      .send({
        title: 'Unauthorized Update',
      })
      .expect(401);
  });

  it('should reject updating a book with invalid data', async () => {
    await request(app.getHttpServer())
      .patch(`/books/${createdBookId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: '',
      })
      .expect(400);
  });

  it('should delete the created book with authentication', async () => {
    await request(app.getHttpServer())
      .delete(`/books/${createdBookId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(204);
  });

  it('should return 404 when deleting a non-existing book', async () => {
    await request(app.getHttpServer())
      .delete('/books/999999')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);
  });
});
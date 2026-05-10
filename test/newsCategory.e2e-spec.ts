import 'dotenv/config';
import {INestApplication} from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import {createTestApp} from './utils/test-app';
// @ts-ignore
import {teardownTestApp} from './utils/teardown';
import {DataSource} from 'typeorm';
// import * as argon2 from 'argon2';

describe('NewsCategoryController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    ({app, dataSource} = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  it(
    'POST /admin/news-category -> should respond with 201',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/news-category')
        .send({title: 'Category 3'})
        .expect(201);
    },
  );
  it(
    `POST/admin/news-category -> should return 401`,
    async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/news-category')
        .send({title: 'Category 5'})
        .expect(401)
    },
  );
});

describe('NewsCategory Update (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async ()=> {
    ({app, dataSource} = await createTestApp());
  });

  it(
    `PATCH /admin/news-category/:id -> should return 401`, async ()=> {
      return request(app.getHttpServer())
        .patch('/admin/news-category/1')
        .send({title: 'Yangilangan title'})
        .expect(401)
    }
  );

  it(
    `PATCH /admin/news-category/:id -> should return 404`, async () => {
      let id = 10;
      return request(app.getHttpServer())
        .patch(`admin/news-category/${id}`)
        .send({title: 'Title'})
        .expect(404)
    }
  );

  it(
    `PATCH /admin/news-category/:id -> should return 201`, async () => {
      const category = await dataSource.getRepository('Category').save({
        title: 'Yangi Uzb'
      });

      return request(app.getHttpServer())
        .patch(`/admin/news-category${category.id}`)
        .send({title: 'News Category title'})
        .expect(200)
    }
  );
})


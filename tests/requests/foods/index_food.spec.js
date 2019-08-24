var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');
var Food = require('../../../models').Food;

describe('GET /api/v1/foods path', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  })

  test('should return a 200 status', async () => {
    const response = await request(app).get('/api/v1/foods');
    expect(response.statusCode).toBe(200);
  });

  test('should return an array of food objects', async () => {
    const response = await request(app).get('/api/v1/foods');
    expect(response.body.length).toBe(3);
    expect(Object.keys(response.body[0])).toContain('name');
    expect(Object.keys(response.body[0])).toContain('calories');
    expect(Object.keys(response.body[2])).toContain('name');
    expect(Object.keys(response.body[2])).toContain('calories');
  });

  test('should return a 404 status if database is empty', async (done) => {
    Food.destroy({ where: { } }) // Empties food database

    const response = await request(app).get('/api/v1/foods');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Database Is Empty');
    done();
  });
});

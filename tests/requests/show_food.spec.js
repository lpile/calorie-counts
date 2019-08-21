var shell = require('shelljs');
var request = require('supertest');
var app = require('../../app');

describe('GET /api/v1/foods/:id path', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  test('should return a 200 status', () => {
    return request(app).get('/api/v1/foods/1').then(response => {
      expect(response.status).toBe(200)
    });
  });

  test('should return a single food', () => {
    return request(app).get('/api/v1/foods/1').then(response => {
      expect(Object.values(response.body)).toContain(1)
      expect(Object.values(response.body)).toContain('Banana')
      expect(Object.values(response.body)).toContain(150)
    })
  });

  test('should return a 404 status if food is not in database', () => {
    return request(app).get('/api/v1/foods/100').then(response => {
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Food Not Found')
    });
  });
});

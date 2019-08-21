var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');
var Food = require('../../../models').Food;

describe('GET /api/v1/foods path', () => {
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
    return request(app).get('/api/v1/foods').then(response => {
      expect(response.status).toBe(200)
    });
  });

  test('should return an array of food objects', () => {
    return request(app).get('/api/v1/foods').then(response => {
      expect(response.body.length).toEqual(3),
      expect(Object.keys(response.body[0])).toContain('name')
      expect(Object.keys(response.body[0])).toContain('calories')
    })
  });

  test('should return a 404 status if database is empty', () => {
    Food.destroy({ where: { } })

    return request(app).get('/api/v1/foods').then(response => {
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Database Is Empty')
    });
  });
});

var shell = require('shelljs');
var request = require('supertest');
var app = require('../../app');
var Food = require('../../models').Food;

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

  test('should return a 201 status', () => {
    return request(app).put('/api/v1/foods/1').send({
      name: 'Banana',
      calories: 140
    })
    .then(response => {
      expect(response.status).toBe(202)
    });
  });

  test('should update a single food', () => {
    return request(app).put('/api/v1/foods/1').send({
      name: 'Banana',
      calories: 140
    })
    .then(response => {
      expect(Object.values(response.body)).toContain(1)
      expect(Object.values(response.body)).toContain('Banana')
      expect(Object.values(response.body)).toContain(140)
    })
  });
});

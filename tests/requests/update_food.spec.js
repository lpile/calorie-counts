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

  test('should return a 202 status', () => {
    return request(app).put('/api/v1/foods/1').send({
      name: 'Banana',
      calories: 140
    })
    .then(response => {
      expect(response.status).toBe(202)
    });
  });

  test('should return a 400 status if no information is in request', () => {
    return request(app).put('/api/v1/foods/1').then(response => {
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Need Food Name And Calories')
    });
  });

  test('should return a 400 status if food name is not in request', () => {
    return request(app).put('/api/v1/foods/1').send({
      calories: 140
    })
    .then(response => {
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Need Food Name')
    });
  });

  test('should return a 400 status if food calories is not in request', () => {
    return request(app).put('/api/v1/foods/1').send({
      name: 'Banana'
    })
    .then(response => {
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Need Food Calories')
    });
  });

  test('should return a 404 status if food id is not in database', () => {
    return request(app).put('/api/v1/foods/100').send({
      name: 'Mint',
      calories: 100
    })
    .then(response => {
      expect(response.status).toBe(404)
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

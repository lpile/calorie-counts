var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');

describe('POST /api/v1/foods path', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  })

  test('should return a 201 status', async() => {
    const food = { 'food': { 'name': 'Mint', 'calories': '14' } };
    const response = await request(app).post('/api/v1/foods').send(food);
    expect(response.status).toBe(201);
  });

  test('should return create food', async() => {
    const food = { 'food': { 'name': 'Mint', 'calories': '14' } };
    const response = await request(app).post('/api/v1/foods').send(food);
    expect(response.body.name).toEqual('Mint');
    expect(response.body.calories).toEqual(14);
  });

  test('should return a 404 status if food parameters are not include in request', async() => {
    const food = 'food';
    const response = await request(app).post('/api/v1/foods').send(food);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Food Needs Name/Calories');
  });

  test('should return a 404 status if food calories parameter are not include in request', async() => {
    const food = { 'food': { 'name': 'Mint' } };
    const response = await request(app).post('/api/v1/foods').send(food);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Food Needs Name/Calories');
  });

  test('should return a 404 status if food name parameter are not include in request', async() => {
    const food = { 'food': { 'calories': '14' } };
    const response = await request(app).post('/api/v1/foods').send(food);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Food Needs Name/Calories');
  });
});

var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');

describe('PATCH /api/v1/foods/:id path', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  })

  test('should return a 202 status', async () => {
    const food = { 'food': { 'name': 'Mint', 'calories': '14'} };
    const response = await request(app).patch('/api/v1/foods/1').send(food);
    expect(response.statusCode).toBe(202);
  });

  test('should update a single food', async () => {
    const food = { 'food': { 'name':'Banana', 'calories':'140'} };
    const response = await request(app).patch('/api/v1/foods/1').send(food);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Banana');
    expect(response.body.calories).toBe(140);
  });

  test('should return a 404 status if food id is not in database', async () => {
    const food = { 'food': { 'name': 'Mint', 'calories': '14'} };
    const response = await request(app).patch('/api/v1/foods/100').send(food);
    expect(response.statusCode).toBe(404);
  });

  test('should return a 400 status if food parameters are not include in request', async () => {
    const food = 'food';
    const response = await request(app).patch('/api/v1/foods/1').send(food);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Food Needs Name/Calories');
  });

  test('should return a 400 status if food calories parameter are not include in request', async () => {
    const food = { 'food': { 'name': 'Banana' } };
    const response = await request(app).patch('/api/v1/foods/1').send(food);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Food Needs Name/Calories');
  });

  test('should return a 400 status if food name parameter are not include in request', async (done) => {
    const food = { 'food': { 'calories': '140' } };
    const response = await request(app).patch('/api/v1/foods/1').send(food);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Food Needs Name/Calories');
    done();
  });
});

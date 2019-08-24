var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');

describe('GET /api/v1/meals/:meal_id/foods path', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  })

  test('should return a 200 status', async () => {
    const response = await request(app).get('/api/v1/meals/1/foods');
    expect(response.statusCode).toBe(200);
  });

  test('should return a single meal with associated foods', async () => {
    const response = await request(app).get('/api/v1/meals/1/foods');
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Breakfast');
    expect(response.body.foods.length).toBe(3);
    expect(response.body.foods[0].name).toBe('Banana');
    expect(response.body.foods[1].name).toBe('Yogurt');
    expect(response.body.foods[2].name).toBe('Apple');
  });

  test('should return a 404 status if meal is not in database', async () => {
    const response = await request(app).get('/api/v1/meals/100/foods');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Meal Not Found');
  });
});

var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');
var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;

describe('DELETE /api/v1/meals/:meal_id/foods/:id path', () => {
	beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  })

	test('should return a 204 status', async () => {
    const response = await request(app).delete('/api/v1/meals/1/foods/1');
    expect(response.statusCode).toBe(204);
  });

	test('should delete a food from meal', async () => {
    const response = await request(app).delete('/api/v1/meals/1/foods/1');
		let meal = await Meal.findOne({where: {name: 'Breakfast'}, include: [{model: Food, as: 'foods'}]});
		expect(meal.foods).not.toContain('Banana');
  });

	test('should return a 404 status if meal is not in database', async () => {
    const response = await request(app).delete('/api/v1/meals/100/foods/1');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Meal Not Found');
  });

	test('should return a 404 status if food is not in database', async (done) => {
    const response = await request(app).delete('/api/v1/meals/1/foods/100');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Food Not Found');
		done();
  });
});

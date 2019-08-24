var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');
var Food = require('../../../models').Food;

describe('DELETE /api/v1/foods/:id path', () => {
	beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  })

	test('should return a 204 status', async () => {
    const response = await request(app).delete('/api/v1/foods/1');
    expect(response.statusCode).toBe(204);
  });

	test('should delete a food', async () => {
    const response = await request(app).delete('/api/v1/foods/1');
		let foods = await Food.findAll();
		expect(foods.length).toBe(2);
    expect(foods[0].name).not.toBe('Banana');
    expect(foods[1].name).not.toBe('Banana');
  });

	test('should return a 404 status if food is not in database', async (done) => {
    const response = await request(app).delete('/api/v1/foods/100');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Food Not Found')
		done();
  });
});

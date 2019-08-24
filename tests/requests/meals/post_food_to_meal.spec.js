var shell = require('shelljs');
var request = require("supertest");
var app = require('../../../app');
var Meal = require('../../../models').Meal;

describe('post /api/v1/meals/:meal_id/foods/:id path', () => {
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

	
  test('should return a 201 status for valid food add', async () => {
	const response = await request(app).post('/api/v1/meals/2/foods/2');
	expect(response.status).toBe(201);
	expect(response.body.message).toBe('Successfully added Yogurt to Snack');
  });

  test('should return a 406 status for duplicate food add', async () => {
	const response = await request(app).post('/api/v1/meals/2/foods/1');
	expect(response.status).toBe(406);
	expect(response.body.error).toBe('Food already belongs to this meal');
  });

  test('should return a 404 status for invalid meal', async () => {
	const response = await request(app).post('/api/v1/meals/22/foods/1');
	expect(response.status).toBe(404);
	expect(response.body.error).toBe('Valid food and meal required');
  });

  test('should return a 404 status for invalid food', async () => {
	const response = await request(app).post('/api/v1/meals/2/foods/11');
	expect(response.status).toBe(404);
	expect(response.body.error).toBe('Valid food and meal required');
  });
});



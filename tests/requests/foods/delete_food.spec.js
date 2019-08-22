var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');

describe('DELETE /api/v1/foods/:id path', () => {
	beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  })

	test('should return a 204 status', async() => {
    const response = await request(app).delete('/api/v1/foods/1');
    expect(response.statusCode).toBe(204);
  });

	test('should return a 404 status if food is not in database', async () => {
    const response = await request(app).delete('/api/v1/foods/100');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Food Not Found')
  });
});

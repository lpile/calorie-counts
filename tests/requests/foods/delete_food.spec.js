var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');

describe('Test DELETE /api/v1/foods/:id path', () => {
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

  test('should return a 204 status', () => {
    return request(app).delete('/api/v1/foods/12').then(response => {
      expect(response.status).toBe(204)
    });
  });

  test('should return a 404 for food not in the DB', () => {
    return request(app).delete('/api/v1/foods/99').then(response => {
			expect(response.status).toBe(404)
			expect(response.body.error).toBe('Not Found')
    })
  });
});

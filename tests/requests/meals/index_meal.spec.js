var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');
var Meal = require('../../../models').Meal;

describe('/api/v1/meals path', () => {
	beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  })

  test('should return a 200 status', () => {
    return request(app).get('/api/v1/meals').then(response => {
      expect(response.status).toBe(200)
    });
  });

  test('should return an array of meal objects', async (done) => {
		const response = await request(app).get('/api/v1/meals');
    expect(response.body.length).toBe(2);
		expect(Object.keys(response.body[0])).toContain('id');
		expect(Object.keys(response.body[0])).toContain('name');
		expect(Object.keys(response.body[0].foods[0])).toContain('id');
		expect(Object.keys(response.body[0].foods[0])).toContain('name');
		expect(Object.values(response.body[1])).toContain(2);
		expect(Object.values(response.body[1])).toContain('Snack');
		expect(Object.values(response.body[1].foods[0])).toContain(1);
		expect(Object.values(response.body[1].foods[0])).toContain('Banana');
		done();
  });
});

var shell = require('shelljs');
var request = require("supertest");
var app = require('../../../app');
var Meal = require('../../../models').Meal;

describe('/api/v1/meals path', () => {
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

  test('should return a 200 status', () => {
    return request(app).get("/api/v1/meals").then(response => {
      expect(response.status).toBe(200)
    });
  });

  //test('should return an array of meal objects', () => {
  //  return request(app).get("/api/v1/meals").then(response => {
  //    expect(response.body.length).toEqual(4),
  //    expect(Object.keys(response.body[0])).toContain('title')
  //    expect(Object.keys(response.body[0])).toContain('price'),
  //    expect(Object.keys(response.body[0])).toContain('releaseYear'),
  //    expect(Object.keys(response.body[0])).toContain('active')
  //  })
  //});
});


var shell = require('shelljs');
var request = require('supertest');
var app = require('./app');

describe('api', () => {
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

  describe('Test the root path', () => {
    test('should return a 200', () => {
      return request(app).get('/').then(response => {
        expect(response.statusCode).toBe(200)
      })
    });
  });

  describe('Test GET /api/v1/foods path', () => {
    test('should return a 200 status', () => {
      return request(app).get('/api/v1/foods').then(response => {
        expect(response.status).toBe(200)
      });
    });
    
    test('should return an array of food objects', () => {
      return request(app).get('/api/v1/foods').then(response => {
        expect(response.body.length).toEqual(3),
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('calories')
      })
    });
  });
	
  describe('Test DELETE /api/v1/foods/:id path', () => {
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
});

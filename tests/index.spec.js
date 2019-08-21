var request = require('supertest');
var app = require('../app');

describe('Test the root path', () => {
  test('should return a 200', () => {
    return request(app).get('/').then(response => {
      expect(response.statusCode).toBe(200)
    })
  });
});

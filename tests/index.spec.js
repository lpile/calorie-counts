var request = require('supertest');
var app = require('../app');

describe('Test the root path', () => {
  test('should return a 200 status', async (done) => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    done();
  });
})

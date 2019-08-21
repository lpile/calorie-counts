var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');

describe('POST /api/v1/foods path', () => {
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

test('Create a valid food', async() => {
    const food = { 
			food: {
        name: "flamin hot cheetos",
        calories: 350
			}
    };
    try {
        //const count = await Service.count();
        await request(app).post('/api/v1/foods').send(food)
      	expect(response.status).toBe(201)
        //const newCount = await Service.count()
        //expect(newCount).toBe(count + 1);
        console.log("you in it")
    } catch (err) {
        // write test for failure here
       console.log(`Error ${err}`)
    }
});
  //test('should return a 201 status', () => {
  //  return request(app).post('/api/v1/foods').send({
  //   	food: { 
	//			name: 'Cheeto Puffs',
  //    	calories: 140
	//		}
  //  })
  //  .then(response => {
  //    expect(response.status).toBe(201)
  //  });
  //});
});

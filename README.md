## Calorie Counts API

### Overview
Calorie Counts is a 2 week paired project for Module 4 at Turing School of Software and Design, made by [Rob Stringer](https://github.com/mycobee) and [Logan Pile](https://github.com/lpile).  The project implements the Express framework with Node.js to build a RESTful API returning meal and food information.  A Postgres database with many to many schema holds meal and food information to track calorie consumption.  Also implemented is a single page front end with JQuery and ajax calls to the API.

### Setup

**Git Setup**
```
$ git clone https://github.com/lpile/calorie-counts
$ cd calorie_counts
$ npm install
```
**Database & Models**  
```
$ npx sequelize db:create  
$ npx sequelize db:migrate  
$ npx sequelize db:seed:all
```
**Testing**
```
$ npm install babel-jest supertest shelljs -D  
$ npm install jest-cli   
$ npm test
```
### Production Links
###### [Backend API](https://calorie-counts.herokuapp.com)
###### [Frontend Interface](https://mycobee.github.io/calorie-counts-fe/)

### Versions

`node 10.16.0`  
`npm 6.9.0`  

### Testing
Jest was used to test all endpoints.  Edge cases were also covered, as well as many status codes for different scenarios.  TravisCI was also used for integrating tests and deployment.  

### Schema
![schema](schema.png)

### Tech Stack
* Node.js
* Express
* TravisCI
* Jest
* JQuery
* HTML5/CSS3/SCSS

### Project Boards
###### [Week 1 Project Board](https://github.com/lpile/calorie-counts/projects/2)
###### [Week 2 Project Board](https://github.com/lpile/calorie-counts/projects/3)

### Endpoints  

#### Returns all foods

Request:
```
GET /api/v1/foods
Content-Type: application/json
Accept: application/json
```
Response:
```
status: 200
body:
{
    foods: [
      {
        "id": 1,
        "name": "Banana",
        "calories": 150
      },
      {
        "id": 2,
        "name": "Apple",
        "calories": 10
      }
    ]
}
```

#### Returns a single food

Request:
```
GET /api/v1/foods/:id
Content-Type: application/json
Accept: application/json
```
Response:
```
status: 200
body:
{
    "id": 1,
    "name": "Banana",
    "calories": 150
}
```

#### Creates a single food
Request:
```
POST /api/v1/foods
Content-Type: application/json
Accept: application/json

body:
{
  "food":
    {
      "name": "Name of food here",
      "calories": "Calories here"
    }
}
```
Response:
```
status: 201
body:
{
  "message": "FOODNAME has been added"
}
```

#### Updates a single food

Request:
```
PATCH /api/v1/foods/:id
Content-Type: application/json
Accept: application/json

body:
{
  "food":
    {
      "name": "Mint",
      "calories": "14"
    }
}
```
Response:
```
status: 202
body:
{
  "id": 1,
  "name": "Mint",
  "calories": 14
}
```

#### Deletes a single food
Request:
```
DELETE /api/v1/foods/:id
Content-Type: application/json
Accept: application/json
```
Response:
```
status: 204
```

#### Returns all meals
Request:
```
GET /api/v1/meals
Content-Type: application/json
Accept: application/json
```
Response:
```
[
  {
    "id": 1,
    "name": "Breakfast",
    "foods": [
        {
          "id": 1,
          "name": "Banana",
          "calories": 150
      },
      {
        "id": 6,
        "name": "Yogurt",
        "calories": 550
      },
      {
        "id": 12,
        "name": "Apple",
        "calories": 220
      }
    ]
  },
  {
    "id": 2,
    "name": "Snack",
    "foods": [
      {
        "id": 1,
        "name": "Banana",
        "calories": 150
      },
      {
        "id": 9,
        "name": "Gum",
        "calories": 50
      },
      {
        "id": 10,
        "name": "Cheese",
        "calories": 400
      }
    ]
  }
]
```


#### Returns a single meal and all its foods
Request:
```
GET /api/v1/meals/:meal_id/foods
Content-Type: application/json
Accept: application/json
```
Response:
```
status: 200
body:
{
  "id": 1,
  "name": "Breakfast",
  "foods": [
    {
      "id": 1,
      "name": "Banana",
      "calories": 150
    },
    {
      "id": 6,
      "name": "Yogurt",
      "calories": 550
    },
    {
      "id": 12,
      "name": "Apple",
      "calories": 220
    }
  ]
}
```

#### Adds an existing food to an existing meal
Request:
```
POST /api/v1/meals/:meal_id/foods/:id
Content-Type: application/json
Accept: application/json
```
Response:
```
status: 201
body:
{
  "message": "successfully added FOODNAME to MEALNAME"
}
```

#### Removes a food from a meal, by deleting the joins table association
Request:
```
DELETE /api/v1/meals/:meal_id/foods/:id
Content-Type: application/json
Accept: application/json
```
Response:
```
status: 204
```

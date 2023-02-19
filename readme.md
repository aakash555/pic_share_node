
## Requirements
- [Node v16+](https://nodejs.org/)

# To setup the repository
- `npm install`

# To start the dev server
- `npm run dev`  🚀


Visit [localhost:4000](http://localhost:4000/)

# To run Mocha Test Cases
- `npm run test`
  Test cases are present only in login directory with login.test.ts.
  TODO: More test cases need to be written

# Framework
    TypeORM, Express, Mocha

# Configuration
    To Make the App work, please connect PostgreSQL DB. Checkout the config in .env

# Folder Structure
## src
Main Source code directory

  ### Controllers
  Defines the API views. All Core API logic is here. I have also created a test case using Mocha for login. please check src/controllers/auth/login.test.ts

  ### Middleware
  We have defined base Validations structure currently. This can be expanded for Auth related updates to request object and more validations.

  ### ORM
  ORM configuration & Entities are defined here. We have kept the DB in sync for now. This can be changed to migration driven updates

  ### Routes
  All the Main API routes with their controler and Middleware are defined in Routes

  ### types
  This folder is for defining global types and interfaces

## Todo In Progress. Needs more clear documentation
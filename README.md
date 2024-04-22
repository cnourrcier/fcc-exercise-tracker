# Exercise Tracker

This project is a RESTful API built with Node.js, Express.js, and Mongoose for tracking users' exercises. It allows users to create accounts, log exercises, and view exercise logs with optional filtering.

## Table of Contents

- [Installation and Usage](#installation-and-usage)
- [API Endpoints](#api-endpoints)
- [Credits](#credits)
- [License](#license)

## Installation and Usage

1. Clone or download the project files from the repository.
2. Install dependencies using npm: `npm install`
3. Start the server: `node server.js` or `npm start`
4. Access the API endpoints using a tool like Postman, Thunder Client, or Hoppscotch.io, or through your browser.

## API Endpoints

|   Endpoint    |  Description  |
| ------------- | ------------- |
| GET /api/users | View list of all users (ID and username)|
| GET /api/users/:_id/logs?[from][&to][&limit] | View user data with log of exercises. [] = optional, from, to = dates (yyyy-mm-dd); limit = number query    |
| POST /api/users | Create a new user |
| POST /api/users/:_id/exercises | Create a new logged exercise |

## Credits

This project was created as part of the freeCodeCamp Back End Development and APIs Certification curriculum. Special thanks to the freeCodeCamp community for providing resources and support.


### License:

This project is open-source and available under the [BSD 3-Clause License](LICENSE). Feel free to use, modify, and distribute it according to the terms of the BSD 3-Clause License.



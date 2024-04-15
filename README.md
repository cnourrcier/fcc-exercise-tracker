# Exercise Tracker

This is my Exercise Tracker Project for freecodecamp.org. I used the provided [boilerplate](https://github.com/freeCodeCamp/boilerplate-project-exercisetracker/) to complete this challenge. The test requirements can be found [here](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/exercise-tracker).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/cnourrcier/fcc-exercise-tracker.git
```

2. Install dependencies:

```bash
cd fcc-exercise-tracker
npm install
```

## Usage

1. Start the server:

```bash
npm run start
```

## API Endpoints

|   Endpoint    |  Description  |
| ------------- | ------------- |
| GET /api/users | View list of all users (ID and username)|
| GET /api/users/:_id/logs?[from][&to][&limit] | View user data with log of exercises. [] = optional, from, to = dates (yyyy-mm-dd); limit = number query    |
| POST /api/users | Create a new user |
| POST /api/users/:_id/exercises | Create a new logged exercise |

## License

This project is licensed under the MIT License - see the [MIT License](LICENSE) file for details. 


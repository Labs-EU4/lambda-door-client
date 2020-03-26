[![Build Status](https://travis-ci.com/Labs-EU4/lambda-door-client.svg?branch=develop)](https://travis-ci.com/Labs-EU4/lambda-door-client)
[![Netlify Status](https://api.netlify.com/api/v1/badges/1568ef4b-934b-4ce2-a4e1-0a00a72f719b/deploy-status)](https://app.netlify.com/sites/lambdadooreu4/deploys)
[![Coverage Status](https://coveralls.io/repos/github/Labs-EU4/lambda-door-client/badge.svg?branch=develop)](https://coveralls.io/github/Labs-EU4/lambda-door-client?branch=develop)

# Lambda Door v2.0

### The frontend is deployed here: [Lambda Door v2.0](https://lambdadooreu4.netlify.com/)

## Relevant Documents

[PVD](https://www.notion.so/EU4-Lambda-Door-11340785bab24a1c8ec3e5fcaec72e8f) - Product Vision Document containing project planning and release canvas documents

[Trello Board](https://trello.com/b/EQoZOK3D/lambda-door-eu4) - Product and Task vision board

[Whimsical](https://whimsical.com/P9iMr3hcptGnJ8T7MEA85b) - Wireframes for product design

## Project Summary

## Team

|                                               **[Colin Toft](http://colintoft.dev/)**                                                |                                     **[Olamide Oredola](https://github.com/ola-dola)**                                      |                                          **[Evans Ibok](http://evansibok.com)**                                          |                                    **[Rodrigo Gracia](http://portfolio.rodrigograca.com/)**                                    |
| :----------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
|                                                          Frontend Architect                                                          |                                                     Frontend Architect                                                      |                                                    Frontend Architect                                                    |                                                       Frontend Architect                                                       |
|       [<img src="https://ca.slack-edge.com/T4JUEB3ME-UNM9CA6NS-ae583a3c9f79-512" width="200" />](https://github.com/cappers86)       |   [<img src="https://ca.slack-edge.com/T4JUEB3ME-UM3NF5BTQ-f7cf3f2c495e-512" width="200" />](https://github.com/ola-dola)   | [<img src="https://ca.slack-edge.com/T4JUEB3ME-ULW170LKF-b68116040dbd-512" width="200" />](https://github.com/evansibok) | [<img src="https://ca.slack-edge.com/T4JUEB3ME-UNM9C9G4W-gb34f66f0b1d-512" width="200" />](https://github.com/rodrigograca31)  |
|                        [<img src="https://github.com/favicon.ico" width="20"> ](https://github.com/cappers86)                        |                    [<img src="https://github.com/favicon.ico" width="20"> ](https://github.com/ola-dola)                    |                  [<img src="https://github.com/favicon.ico" width="20"> ](https://github.com/evansibok)                  |                  [<img src="https://github.com/favicon.ico" width="20"> ](https://github.com/rodrigograca31)                   |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://www.linkedin.com/in/colin-toft-41975518a) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://www.linkedin.com/in/ola-oredola) |  [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://linkedin.com/in/evansibok)   | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://www.linkedin.com/in/rodrigograca31) |

|                                      **[Alexander Oguejiofor](https://github.com/kip-guile)**                                       |
| :---------------------------------------------------------------------------------------------------------------------------------: |
|                                                              Team Lead                                                              |
|      [ <img src="https://ca.slack-edge.com/T4JUEB3ME-UM150T4TZ-d6a8275db0f5-512" width="200"> ](https://github.com/kip-guile)       |
|                       [<img src="https://github.com/favicon.ico" width="20"> ](https://github.com/kip-guile)                        |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://www.linkedin.com/in/alexanderoguejiofor) |

## Table of Content

1. [Tech used](#tech-used)
2. [Starting the app](#starting-the-app)
3. [Environment Variables](#environment-variables)
4. [Running the test](#running-the-test)
5. [How to contribute](#how-to-contribute)
6. [How to create an Issue/Bug Request](#how-to-create-an-issue/bug-request)
7. [Attribution](#attribution)
8. [Acknowledgement](#acknowledgement)
9. [Backend](#backend)
   - [Documentation](#documentation)
   - [Hosted on](#hosted-on)
10. [App Demonstration](#app-demonstration)
11. [LICENSE](#license)

## Tech Used

`HTML5`, `CSS3`, `ANT DESIGN`, `FORMIK`, `STYLED COMPONENTS`, `JAVASCRIPT`, `REACT`, `REDUX`, `JSONWEBTOKEN`, `FIREBASE`, `NODEMAILER`, `COVERALLS`, `SENTRY`, `TRAVIS CI`, `HEROKU`, `CRON SCHEDULER`.

================================================================================

## Starting the app

You need a basic knowledge of the following to be able to start up this project:

1. Clone this project from your terminal

```
git clone https://github.com/Labs-EU4/lambda-door-client.git
```

2. Move into the root folder and install dependencies

```
npm install [or] yarn install
```

3. Start the app locally

```
npm start [or] yarn start
```

## Environment Variables

Environment variables were used for the development and deployment, thus users must set up their own environment variables in an .env file.

Note: `This file is ignored by git`

```
REACT_APP_UPLOAD_PRESET=
REACT_APP_API_KEY=
REACT_APP_CLIENT_ID=
REACT_APP_CLIENT_SECRET=
REACT_APP_JWT_SECRET=
REACT_APP_REDIRECT_URI=
REACT_APP_BACKEND_URL=
REACT_APP_GOOGLE_API_KEY=
```

## Running the test

Run this command in your terminal to startup tests:

```
npm test [or] yarn test
```

## How to contribute

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## How to create an Issue/Bug Request

<blockquote>If you are having an issue with the existing project code, please submit a bug report under the following guidelines:</blockquote>

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

<!-- # LambdaDoor

Many atimes Job seekers find it difficult getting information specific to their search with respect to companies' interview processes, cultures and salary information that are less generalized, hence they spend alot of time searching and filtering what's needed from the sea of available information.

LambdaDoor is here to make that search simpler by providing stream lined information that are specific to companies and regions, even providing connections to previous job seekers that have intervied or work(ed) with these firms.

===============================================================================

## Repo structure

Sometimes it's helpful to know what all these different files are for…

```
/
├─ src/
│  ├─ assets/        # Assets
│  │
│  ├─ components/    # Components
|  |  ├─ AddReview/  # …that manages all components under the Add Review Page
│  │  ├─ Company/    # …that manages all component referring to a single company including reviews
│  │  ├─ MyReviews/    # …that manages all component referring to the user's reviews
│  │  ├─ Layouts/    # …that governs all site layouts including layout-specific components
│  │  ├─ Router/     # …that handles all files that pertain to app routing
│  │  ├─ UserDashboard/ # …that handles all the components that display on the user's dashboard
│  │  ├─ AppinfoContainer # …contains brief information about what the App offers
│  │  ├─ LocationSearch # …retrives users location using google map
|  |
|  ├─ pages/         # Pages
│  │  ├─ AddReview/  # …that renders Add-Review page content
│  │  ├─ Company/    # …that renders Company page content
│  │  ├─ Home/       # …that renders Home page content
│  │  ├─ MyReviews/  # …that renders user's reviews for management
│  │  ├─ UserDashboard/ # …that renders User-Dashboard page content
│  │  ├─ NotFound    # …serves as a fallback path when a request link is not available
│  |
|  |─ state/         # State
│  │  ├─ actions/    # …that handles redux actions
│  │  ├─ reducers/   # …that handles app reducer functions
│  │  ├─ types/      # …that handles all action types
│  │  ├─ store       # …contains redux store and devtools extension information
|  |
|  |─ styles/        # Styles
|  |
|  |─ utils/         # Components
│  │  ├─ hooks/      # …that handles reusable custom logic
|
├─ .env/              # Contains environment variables(ignored by Git)
├─ www/              # Public build (ignored by Git)
│
├─ .editorconfig     # Code style definitions
├─ .gitignore        # List of files and folders not tracked by Git
├─ .prettierrc       # Code Formatting preferences for JavasScript
├─ .eslintrc         # Linting preferences for JavasScript
├─ travis.yml        # Configuration for Travis CI
├─ commit_template   # Contains instruction for commit
├─ LICENSE           # License information for this project
├─ package.json      # Project manifest
└─ README.md         # This file
```

===============================================================================


## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

===============================================================================

## Requests

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.
Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

===============================================================================

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

### Frontend is deployed on https://Lambdadoor.com

===============================================================================

## Backend

### Backend Documentation

See [Lambda_Door](https://github.com/Labs-EU4/lambda-door-server/blob/develop/README.md) for details on the backend of our project.

### Backend is hosted on Heroku https://lambdadoor.herokuapp.com/

===============================================================================

## Giphy Demonstrations for the App

### Sign-In

![Sign In clip](https://media.giphy.com/media/dVo7if5pt3iwDrIaqu/giphy.gif)

Demonstrates the Log-in process showing user information in slack that the App will be having access to.

### Dashboard display

![Dashboard display](https://media.giphy.com/media/gdqwvVzH4pOoAI6QMG/giphy.gif)

Shows the Dashboard display with TOP Rated Companies and a list of reviewed Job roles by Percentages

### Companies near user

![Companies near user](https://media.giphy.com/media/eJMPVNFc6AaYmu71Sw/giphy.gif)

Displays companies within a set distance of the user location if they exist in the DB, with a graph that shows an average pay for different roles

### Company reviews

![Companies reviews](https://media.giphy.com/media/YOpOAQXeyPNFFAtyOi/giphy.gif)

Shows information about selected company, its location and more, along with tabs for salary and interview review, each tab having cickable cards for more information on the presented search.

### Leave a review

![Leave a review](https://media.giphy.com/media/SWWTv4Qoj7epVOHGfI/giphy.gif)

shows the Manage review page that contains reviews the user made as well as the leave review page with tabs for salary, company and interview reviews.

### Search Bar

![Search Bar](https://media.giphy.com/media/jQ8uoOo6m4lhN2OC5u/giphy.gif)

Shows a clip of the search bar being used for search company, Salary and interview information either by location,company name or job title. -->

# Midterm Project - Quizzy Application - V1.0

Quizzy is a fun, interactive application that allows users to create their own quizzes.  They are also able to take quizzes, view their results and send out links of their quizzes and their results to their friends.


## Project Functionality Overview
  -  users can create quizzes
  -  users can make their quiz unlisted (make them private and not available on the home page, but if someone knows the quiz URL they can visit and take the quiz)
  -  users can share a link to a single quiz
  -  users can see a list of public quizzes
  -  users can see a list of public quizzes on the home page
  -  users can attempt a quiz
  -  users can see the results of their recent attempt
  -  users can share a link to the result of their attempt


## Suggested Features for V2.0
  -  Ability to review questions (right/wrong) after taking a quiz
  -  Functionality to list all of a unique users attempts at quizzes along with their results for each
  -  Implementation of a leaderboard
  -  Addition of additional analytics for the quiz creators to see
  -  Functionality to edit the content of existing quizzes


## Final Product - Screenshots of Quizzy Application

### 1. Main Index
!["Main Index Page"](https://github.com/manwelja/midterm-project-quiz-app/blob/master/docs/index.png)

### 2. Take a Quiz
!["Form to take a quiz"](https://github.com/manwelja/midterm-project-quiz-app/blob/master/docs/takeQuiz.png)

### 3. Create a Quiz
!["Form to create your own Quiz"](https://github.com/manwelja/midterm-project-quiz-app/blob/master/docs/createQuiz.png)

### 4. View Quiz Results
!["View to see results of the attempts for individual quizzes"](https://github.com/manwelja/midterm-project-quiz-app/blob/master/docs/quizResults.png)

### 5. My Quizzes
!["View to show an owner quizzes that they created"](https://github.com/manwelja/midterm-project-quiz-app/blob/master/docs/myQuizzes.png)

## Authors
  -  Emma Grannis (https://github.com/egrannis)
  -  Mo Tariq (https://github.com/momotrq94)
  -  Jennifer Manwell (https://github.com/manwelja)


## Project Setup Instructions

  1. Create a new repository using this repository as a template.
  2. Clone your repository onto your local device.
  3. Install dependencies using the npm install command.
  4.  Seed database using npm run db:reset command
  5. Start the web server using the npm run local command. The app will be served at http://localhost:8080/.
  6. Go to http://localhost:8080/ in your browser.


## Dependencies
  -  Express
  -  Node 5.10.x or above
  -  Chalk 2.4.2 or above
  -  Cookie-parser 1.4.6 or above
  -  Dotenv 2.0.0 or above
  -  Ejs 2.6.2 or above
  -  Morgan 1.9.1 or above
  -  Pg 8.5.0 or above
  -  Sass 1.35.1 or above

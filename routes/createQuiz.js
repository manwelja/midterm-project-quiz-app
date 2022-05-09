const express = require('express');
const router  = express.Router();

const saveQuizToDb = function(quizInfo, db) {
  //STEP 1 - Save quiz META info to quizzes table
  const queryString = `
     INSERT INTO quizzes (owner_id, title, description, image_url, is_private)
       VALUES ($1, $2, $3, $4, $5) RETURNING id;
  `;
  const values = [quizInfo["quiz-owner"], quizInfo["quiz-name"], quizInfo["quiz-description"], quizInfo["img-url-text"], quizInfo["privacy-setting"]];

  return db.query(queryString, values)
    .then((result) => {
      const quizId = result.rows[0].id;
      //if there are multiple questions, loop through them all and insert each individually
      if (Array.isArray(quizInfo["question-text"])) {
        const numQuestions = quizInfo["question-text"].length;
        for (let i = 0; i < numQuestions; i++) {
          //STEP 2 - Save quiz questions to questions table
          //note: if privacy-setting is FALSE, quiz is public
          const queryStringQuestions = `
            INSERT INTO questions (quiz_id, question_number, question_text, correct_answer, question_option_a, question_option_b, question_option_c, question_option_d)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
            `;

          const valuesQuestions = [quizId, i + 1, quizInfo["question-text"][i], quizInfo["correct-answer"][i], quizInfo["question-a-text"][i], quizInfo["question-b-text"][i], quizInfo["question-c-text"][i], quizInfo["question-d-text"][i]];

          //Run SQL query for each question
          db.query(queryStringQuestions, valuesQuestions)
            .then(()=> {
              console.log("Saving question...");
            }) .catch((err) => {
              console.log(err.message);
            });
        }
      } else {
        //If there is only one questios, insert it into the database
        const queryStringQuestions = `
        INSERT INTO questions (quiz_id, question_number, question_text, correct_answer, question_option_a, question_option_b, question_option_c, question_option_d)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
        `;

        const valuesQuestions = [quizId, 1, quizInfo["question-text"], quizInfo["correct-answer"], quizInfo["question-a-text"], quizInfo["question-b-text"], quizInfo["question-c-text"], quizInfo["question-d-text"]];

        //Run SQL query for each question
        db.query(queryStringQuestions, valuesQuestions)
          .then(()=> {
            console.log("Saving question...");
          }) .catch((err) => {
            console.log(err.message);
          });
      }
    }) .catch((err2) => {
      console.log(err2.message);
    });
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    //get the user ID using the email address logged in the cookie to pass into the createQuiz form
    const queryString = `
    SELECT * FROM users WHERE email = $1;
    `;
    db.query(queryString, [req.cookies.email])
      .then((result) => {
      //If no errors were encountered add the new user to the database
        const templateVars = {"ownerId": result.rows[0].id};
        return res.render("createQuiz", templateVars);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  router.post("/", (req, res) => {
    //call function for error checking here

    saveQuizToDb(req.body, db);
    res.redirect("index");

  });
  return router;
};

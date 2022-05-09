const express = require('express');
const router  = express.Router();

const saveQuizToDb = function(quizInfo, db) {
  console.log("quizINfo", quizInfo);
  //STEP 1 - Save quiz META info to quizzes table
  const queryString = `
     INSERT INTO quizzes (owner_id, title, description, image_url, is_private)
       VALUES ($1, $2, $3, $4, $5) RETURNING id;
  `;
  const values = [quizInfo["quiz-owner"], quizInfo["quiz-name"], quizInfo["quiz-description"], quizInfo["img-url-text"], quizInfo["privacy-setting"]];

  return db.query(queryString, values)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.message);
    });

  //if privacy-setting is FALSE, quiz is public


  //STEP 2 - Save quiz questions to questions table

  //if privacy-setting is FALSE, quiz is public


  //STEP 2 - Save quiz questions to questions table
};


const launchCreateQuiz = function(userEmail, db, res) {

  const queryString = `
     SELECT * FROM users WHERE email = $1;
  `;
  console.log("in getUserID")
  db.query(queryString, [userEmail])
    .then((result) => {
    //If no errors were encountered add the new user to the database
      const templateVars = {"ownerId": result.rows[0].id};
      console.log(templateVars);
      return res.render("createQuiz", templateVars);
    //  return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
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
    console.log("AFTER saveQuizToDB")
    //res.redirect("index");

  });
  return router;
};

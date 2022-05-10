const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Route to display quiz results to a user immediately after they take a quiz
  router.get("/:quizId", (req, res) => {
    // res.render("results");

    //get the user ID using the email address logged in the cookie to pass into the createQuiz form
    const queryString = `
        SELECT * FROM users WHERE email = $1;
        `;
    db.query(queryString, [req.cookies.email])
      .then((result) => {
        //If no errors were encountered add the new user to the database
        const queryStringResult = `SELECT * FROM attempts WHERE quiz_id = $1 AND user_id = $2 ORDER BY date_taken DESC`;

        //Get the users historic results for the current quiz and pass them into the results page
        db.query(queryStringResult, [req.params.quizId, result.rows[0].id])
          .then((results2) => {
            const templateVars = {
              all: results2.rows,
              score: results2.rows[0].score,
              ownerId: req.cookies.email,
              userId: req.cookies.email,
            };
            return res.render("results", templateVars);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  //route to display quiz results for a specified user/quiz (not necessarily the person accessing the results)
  //this route will get launched when an individual follows a url sent to them as a result of a "share results" action
  router.get("/:quizId/:id", (req, res) => {
    //Get the specified users historic results for the current quiz and pass them into the results page
    const queryString = `SELECT * FROM attempts WHERE quiz_id = $1 AND user_id = $2 ORDER BY date_taken DESC`;
    db.query(queryString, [req.params.quizId, req.params.id])
      .then((results) => {
        if (results.rows.length > 0) {
          const templateVars = {
            all: results.rows,
            score: results.rows[0].score,
            ownerId: req.params.id,
            userId: req.cookies.email,
          };
          return res.render("results", templateVars);
        } else {
          //if no test information exists for the specified user/quiz, launch the error page
          //and get the quiz name for the specified ID to display on the page
          const queryString = `SELECT title FROM quizzes WHERE id = $1`;
          db.query(queryString, [req.params.id])
            .then((results) => {
              const templateVars = { "userId": req.cookies.email, "errorMessage": `The specified user has never taken the quiz: "${results.rows[0].title}"` };
              res.render("error", templateVars);
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  return router;
};


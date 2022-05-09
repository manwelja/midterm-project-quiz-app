const express = require("express");
const router = express.Router();

module.exports = (db) => {
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

        db.query(queryStringResult, [req.params.quizId, result.rows[0].id])
          .then((results2) => {
            console.log(results2);
            const templateVars = {
              all: results2.rows,
              score: results2.rows[0].score,
              ownerId: req.cookies.email,
            };
            console.log(templateVars);
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

  return router;
};

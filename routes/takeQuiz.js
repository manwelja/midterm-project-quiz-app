const express = require("express");
const { Pool } = require("pg/lib");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    db.query(
      `SELECT questions.*, quizzes.* FROM questions JOIN quizzes on quizzes.id = quiz_id WHERE quiz_id = $1 ORDER BY question_number`,
      [req.params.id]
    )
      .then((data) => {
        const questions = data.rows;
        res.render("takeQuiz", { questions: questions }); //res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:id", (req, res) => {
    db.query(`SELECT * FROM questions WHERE quiz_id = $1`, [
      req.params.id,
    ]).then((data) => {
      let quizId = req.params.id;
      let count = 0;
      let numCorrect = 0;
      let score = 0;
      //Put result into the attempt table
      for (let answer in req.body) {
        if (data.rows[count].correct_answer === req.body[answer]) {
          numCorrect += 1;
        }
        count += 1;
      }
      score = Math.ceil((numCorrect / count) * 100);

      const queryString = `
        SELECT * FROM users WHERE email = $1;
        `;
      db.query(queryString, [req.cookies.email])
        .then((result) => {
          //If no errors were encountered add the new user to the database

          const queryString = `
             INSERT INTO attempts (quiz_id, user_id, score)
             VALUES ($1, $2, $3) RETURNING *;
             `;
          const values = [quizId, result.rows[0].id, score];

          db.query(queryString, values)
            .then((data) => {
              console.log("Writing to attempt table...  Mhahaha");
              //redirect to results page results/userid/
              res.redirect(`../results/${quizId}`);
            })
            .catch((err) => {
              res.status(500).json({ error: err.message });
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  });
  return router;
};

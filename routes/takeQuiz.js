const express = require('express');
const { Pool } = require('pg/lib');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    db.query(`SELECT questions.*, quizzes.* FROM questions JOIN quizzes on quizzes.id = quiz_id WHERE quiz_id = $1 ORDER BY question_number`, [req.params.id])
      .then(data => {
        const questions = data.rows;
        console.log(questions);
        res.render("takeQuiz", {questions: questions}); //res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    })
  return router;
  };

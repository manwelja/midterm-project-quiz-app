/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT quizzes.*, users.name, count(questions.*) as num_questions FROM quizzes JOIN users ON (quizzes.owner_id = users.id) JOIN questions ON (quizzes.id = questions.quiz_id) WHERE is_private=false GROUP BY quizzes.id, users.id ORDER BY quizzes.id ;`)

      .then(data => {
        const quizzes = data.rows;

        db.query(`SELECT quiz_id, ROUND(AVG(score)) AS average, COUNT(*) AS attempts FROM attempts GROUP BY quiz_id;`)
          .then(stats => {
            console.log("stats", stats.rows)
            const templateVars = {"userId": req.cookies.email, "quizzes": quizzes, "stats": stats.rows};
            res.render("index", templateVars);
          })
          .catch((err) => {
            console.log(err);
          });
        // const templateVars = {"userId": req.cookies.email, "quizzes": quizzes};
        // res.render("index", templateVars); //res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

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

    db.query(`SELECT quizzes.*, users.name, count(questions.*) as num_questions FROM quizzes JOIN users ON (quizzes.owner_id = users.id) JOIN questions ON (quizzes.id = questions.quiz_id)  WHERE users.email = $1  GROUP BY quizzes.id, users.id ORDER BY quizzes.id ;`, [req.cookies.email])

      .then(data => {
        let quizzes = [];
        if (data.rows.length === 0) {
          res.redirect("index");
        } else
        {
          quizzes = data.rows;
        }



        db.query(`SELECT quiz_id, ROUND(AVG(score)) AS average, COUNT(*) AS attempts FROM attempts GROUP BY quiz_id;`)
          .then(stats => {
            let quizzesNstats = quizzes.map((item) => {
              for (let stat of stats.rows) {
                if (item.id === stat.quiz_id) {
                  return Object.assign({}, item, stat);
                }
              }
              return Object.assign({}, item, {"quiz_id": item.id, average: "0", attempts: "0"});
            });

            const templateVars = {
              "userId": req.cookies.email,
              "quizzes": quizzesNstats
            }
            res.render("myQuizzes", templateVars);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

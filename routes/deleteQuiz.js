/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
//Route to handle when an owner opts to delete one of their quizzes
module.exports = (db) => {
  router.post("/:id/:userId", (req, res) => {

    //check to make sure the current user owns the selected quiz by checking the email cookie
    db.query(`SELECT * FROM users WHERE email = $1`, [req.cookies.email])
      .then((user) => {
        db.query(`DELETE FROM quizzes WHERE id = $1 AND owner_id = $2`, [req.params.id, user.rows[0].id])
          .then(() => {
            res.redirect("../../myQuizzes");
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      });
  });

  //If user tries to get access this route through the url, send them to index page
  router.get("/:id/:userId", (req, res) => {
    res.redirect("../../index");
  });
  return router;
};

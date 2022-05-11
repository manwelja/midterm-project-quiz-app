/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//Route to handle when an owner opts to toggle the visibilty of their quiz
module.exports = (db) => {
  router.post("/:id/:isPrivate", (req, res) => {
    let dbQuery = "";
    if (req.params.isPrivate === 'true') {
      dbQuery = "UPDATE quizzes SET is_private = false WHERE id = $1;";
    } else {
      dbQuery = "UPDATE quizzes SET is_private = true WHERE id = $1;";
    }
    db.query(dbQuery, [req.params.id])
      .then(() => {
        res.redirect("../../myQuizzes");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //If user tries to get access this route through the url, send them to index page
  router.get("/", (req, res) => {
    res.redirect("../../index");
  });

  return router;
};

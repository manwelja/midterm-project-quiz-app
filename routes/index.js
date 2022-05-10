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
    db.query(`SELECT quizzes.*, users.name FROM quizzes JOIN users ON (quizzes.owner_id = users.id);`)
      .then(data => {
        const quizzes = data.rows;
        //pass in the quiz info from the database and the user id (required in nav bar display logic)
        const templateVars = {"userId": req.cookies.email, "quizzes": quizzes};
        res.render("index", templateVars); //res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });







  return router;
};

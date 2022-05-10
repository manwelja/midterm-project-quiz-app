const express = require('express');
const router  = express.Router();

//logout route handler - simply clears teh user cookie and redirects to the login page
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.clearCookie('email');
    const templateVars = {"userId": ""};
    res.render("login", templateVars);
  });

  return router;
};

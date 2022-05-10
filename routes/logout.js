const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log('here')
    res.clearCookie('email');
    const templateVars = {"userId": ""};
    res.render("login", templateVars);
  });

  return router;
};

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.clearCookie('email');
    const templateVars = {"userId": req.cookies.email};
    res.render("login", templateVars);
  });

  return router;
};

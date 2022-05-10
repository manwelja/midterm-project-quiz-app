const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = { "userId": req.cookies.email};
    res.render("login", templateVars);
  });
  //handle when a user clicks login in the login form
  router.post("/", (req, res) => {
    db.query(`SELECT * from users WHERE email=$1`, [req.body.email])
      .then(data => {
        //if the user exists, set a cookie and load the index page
        if (data.rows.length > 0) {
          console.log(req.body)
          res.cookie("email", data.rows[0].email);
          res.redirect("index");
        } else {
          //if the user doesn't exist, send them to the error page
          const templateVars = { "userId": req.cookies.email, "errorMessage": "Invalid username" };
          res.render("error", templateVars);
        }

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};

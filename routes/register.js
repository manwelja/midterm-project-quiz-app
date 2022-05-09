const express = require('express');
const router  = express.Router();

const createUser = function(userInfo, db) {
  const queryString = `
     INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3);
  `;
  const values = [userInfo.name, userInfo.email, userInfo.password];
  return db.query(queryString, values)
    .then((result) => {
    //If no errors were encountered add the new user to the database
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });
  //handle when a user clicks register button in the registration form
  router.post("/", (req, res) => {
    let templateVars = {};
    db.query(`SELECT * from users WHERE email=$1`, [req.body.email])
      .then(data => {
        //check to ensure that all fields are filled out
        if (req.body.name === '' || req.body.email === '' || req.body.password === '') {
          templateVars = { "errorMessage": "All fields on the registration page must be filled out." };
          res.render("error", templateVars);
        } else {
          //if the user email doesn't already exists, set a cookie to log them in, add them to the database and load the index page
          if (data.rows.length === 0) {
            res.cookie("email", req.body.email);
            createUser(req.body, db);
            res.redirect("index");
          } else {
            //if the user already exists, send them to the error page
            templateVars = { "errorMessage": "Invalid username" };
            res.render("error", templateVars);
          }
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

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id/:user", (req, res) => {
    console.log('Req:', req);
    console.log('Req.params:', req.params);
    // console.log('Testing req params.id:', req.params.id);
    res.render("takeQuiz");
    })
  return router;
  };

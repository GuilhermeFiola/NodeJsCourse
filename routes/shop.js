const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log("Second middleware!");
  res.send("<h1>Hello Express!</h1>");
});

module.exports = router;
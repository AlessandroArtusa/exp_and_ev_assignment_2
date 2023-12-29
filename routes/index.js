const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* GET form page. */
router.get('/form', (req, res) => {
  res.render('form');
});

/* GET sentence page. */
router.get('/sentence', (req, res) => {
  res.render('sentence');
});

router.get('/identifier', (req, res) => {
  res.render('identifier');
});

/* POST form data. */
router.post('/submit-form', (req, res) => {
  console.log("req.body: ", req.body);

  res.redirect('/sentence');
});

module.exports = router;
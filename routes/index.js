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

/* GET test page. */
router.get('/test', (req, res) => {
  res.render('test');
});

/* POST form data. */
router.post('/submit-form', (req, res) => {
  console.log(req.body);

  res.redirect('/test');
});

module.exports = router;
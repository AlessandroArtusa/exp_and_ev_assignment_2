const express = require('express');
const router = express.Router();
const fs = require('fs');
const { parseAsync } = require('json2csv');


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
/* GET result page. */
router.get('/result', (req, res) => {
  res.render('result');
});

/* POST form data. */
router.post('/submit-form', (req, res) => {
  console.log("req.body: ", req.body);

  res.redirect('/sentence');
});

router.post('/save-data', async (req, res) => {
  const data = req.body;

  try {
    const csvString = await parseAsync(JSON.stringify(data));

    // Get current date and time
    const date = new Date();

    // Format date and time as a string
    const timestamp = date.toISOString().replace(/:/g, '-');

    // Use timestamp in filename
    const filename = `data-${timestamp}.csv`;

    // Write CSV string to a CSV file
    fs.writeFileSync(filename, csvString, 'utf-8');

    res.status(200).send('CSV file saved successfully.');
  } catch (error) {
    console.error('Error converting JSON to CSV:', error);
    res.status(500).send('Error saving data.');
  }
});


module.exports = router;
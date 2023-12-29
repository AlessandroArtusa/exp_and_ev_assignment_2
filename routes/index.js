const express = require('express');
const router = express.Router();
const fs = require('fs');
const { parseAsync } = require('json2csv');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-1' 
});

const s3 = new AWS.S3();

function uploadCSVToS3(csvContent, bucketName, fileName) {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: csvContent
  };

  return s3.upload(params).promise();
}


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

    const bucketName = 'exp-and-ev';

    // Get current date and time
    const date = new Date();

    // Format date and time as a string
    const timestamp = date.toISOString().replace(/:/g, '-');

    // Use timestamp in filename
    const filename = `data-${timestamp}.csv`;

    await uploadCSVToS3(csvString, bucketName, filename);

    res.status(200).send('CSV file uploaded to S3 successfully.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing data.');
  }
});


module.exports = router;
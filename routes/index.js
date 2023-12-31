const express = require('express');
const router = express.Router();
const { parseAsync } = require('json2csv');

process.env.AWS_ACCESS_KEY_ID = process.env.BUCKETEER_AWS_ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY;
process.env.AWS_REGION = 'eu-west-1';


const AWS = require('aws-sdk');
const s3 = new AWS.S3();

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

    // await uploadCSVToS3(csvString, filename);

    var params = {
      Bucket: process.env.BUCKETEER_BUCKET_NAME,
      Key: filename,
      Body: csvString
    };

    s3.putObject(params, function put(err, data) {
      if (err) {
        console.log(err, err.stack);
        return;
      } else {
        console.log(data);
      }

      delete params.Body;
      s3.getObject(params, function put(err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);

        console.log(data.Body.toString());
      });
    });

    res.status(200).send('CSV file uploaded to S3 successfully.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing data.');
  }
});


module.exports = router;
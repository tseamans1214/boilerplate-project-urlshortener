require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

var urlArray = [];
app.post('/api/shorturl', function(req, res) {
  urlArray.push(req.body.url_input);
  res.json({"original_url": req.body.url,
            "short_url": urlArray.length });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

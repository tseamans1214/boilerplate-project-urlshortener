require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const dns = require('dns');
const options = {
  all:true,
};

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
  let url = new URL(req.body.url);
  dns.lookup(url.hostname, options, (err, address) => {
    //console.log('address: %j family: IPv%s', address, family);
    if (err) {
      res.json({"error": "invalid url" });
    } else {
      urlArray.push(req.body.url);
      res.json({"original_url": req.body.url,
              "short_url": urlArray.length });
    }
  });
  
});

app.get('/api/shorturl/:url?', function(req, res) {
  //res.redirect("google.com");
  res.redirect("" + urlArray[req.params.url-1]);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

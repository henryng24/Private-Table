var express = require('express');
var bodyParser = require('body-parser');
var helper = require('./models/helpers.js');
var port = process.env.PORT || 9000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../app'));


//path for when users are created
app.get('/api/searchResults?', function(req, res){
  helper.getSearchResults(req.query, res);
});

app.listen(port);

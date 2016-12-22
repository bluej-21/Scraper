var cheerio = require('cheerio');
var displayer = require('express').Router();
var fs = require('fs');

displayer.get('/display', function(req, res) {

  if(fs.existsSync('data.json')) {
      const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
      res.send(data.courses);
  }
  else {
    res.send('Data does not exist, scrape first');      
  }

});

module.exports = displayer;
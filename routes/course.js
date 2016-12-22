var cheerio = require('cheerio');
var course = require('express').Router();
var fs = require('fs');

course.get('/:courseId', function(req, res) {

  if(fs.existsSync('data.json')) {
      const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
      const courseId = req.params.courseId;
      const course = data.courses.find(c => c.courseid === courseId);
      res.send(course);
  }
  else {
    res.send('Data does not exist, scrape first');      
  }

});

module.exports = course;

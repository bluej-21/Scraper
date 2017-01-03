const cheerio = require('cheerio');
const course = require('express').Router();
const fs = require('fs');

course.get('/:courseId', function(req, res) {

  if(fs.existsSync('./app/data.json')) {
      const data = JSON.parse(fs.readFileSync('./app/data.json', 'utf-8'));
      const courseId = req.params.courseId;
      const course = data.courses.find(c => c.courseid === courseId);
      res.send(course);
  }
  else {
    res.send('Data does not exist, scrape first');      
  }

});

module.exports = course;

const app = require('express')();
const scraper = require('./routes/scraper');
const displayer = require('./routes/displayer');
const course = require('./routes/course');

app.get('/', function(req, res) {
    res.send("Course DAG");
})
app.get('/scrape', scraper);
app.get('/display', displayer);
app.get('/:courseId', course);

app.listen('8081');
console.log('App started listening on 8081');

exports = module.exports = app;
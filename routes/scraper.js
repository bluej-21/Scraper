var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var scraper = require('express').Router();

scraper.get('/scrape', function(req, res) {
    url = 'http://www.ucsd.edu/catalog/courses/CSE.html';

    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            var courseid;
            var name;
            var prereq;

            var json = {courses: []};
            var length = $('#content').children('.course-name').length;
            for(i = 0; i < length; i++) {
                json.courses.push({courseid: '', name: '', prereq: ''});
            }   

            $('.course-name').each(function(i, elem) {
                name = $(this).text().replace(/\n|\t/g, '').replace(/\s\s+/g, ' ');
                var matches = name.split('.');
                if(matches != null && matches[0] != undefined) {
                    json.courses[i].courseid = matches[0].replace(/\s*/g, '');
                }
                json.courses[i].name = name;
            });
        
            var offset = 0;
            $('.course-descriptions').each(function(i, elem) {
                prereq = $(this).text();
                if(!prereq.trim()) {
                    offset++;
                }
                else {
                    var matches = prereq.split('Prerequisites:');
                    if(matches != null && matches[1] != undefined) {
                        prereq = matches[1].trim().replace(/\n|\t|/g, '').replace(/\s\s+/g, ' ');
                    }
                    json.courses[i-offset].prereq = prereq;
                }
            });
        }

        fs.writeFile('data.json', JSON.stringify(json, null, 4), function(err) {
            console.log('File successfully written!');
        })
        
        res.send('File successfully written');
    })
});

module.exports = scraper;
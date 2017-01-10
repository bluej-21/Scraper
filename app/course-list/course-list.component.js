angular.
    module('courseList').
    component('courseList', {
        templateUrl: 'course-list/course-list.template.html',
        controller: function CourseListController($http) {
            var self = this;
            self.flag = 0;

            self.setFlag = function(flag) {
                if(self.flag === flag) {
                    self.flag = 0;
                }
                else {
                    self.flag = flag;
                }
            }

            self.filterLevel = function(course) {
                if(course !== undefined) {
                    var val = parseInt(course.courseid.substring(3));
                    if(self.flag === 0) {
                        return true;
                    }
                    else if(self.flag === 1) {
                        return val < 100;
                    }
                    else if(self.flag === 2) {
                        return val < 200 && val >= 100;
                    }
                    else if(self.flag === 3) {
                        return val >= 200;
                    }
                }
            }

            $http.get('data.json').then(function (response) {
                self.courses = response.data.courses;
            });
        }
    });
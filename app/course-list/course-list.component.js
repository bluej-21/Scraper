angular.
    module('courseList').
    component('courseList', {
        templateUrl: 'course-list/course-list.template.html',
        controller: function CourseListController($http) {
            var self = this;
            self.orderProp = 'courseid';

            $http.get('data.json').then(function (response) {
                self.courses = response.data.courses;
            });
        }
    });
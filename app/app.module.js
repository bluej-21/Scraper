var scraperApp = angular.module('scraperApp', ['ui.router', 'courseList']);

scraperApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('home', {
            url: '/',
            template: '<course-list></course-list>'
        })
        
        .state('scrape', {
            url: '/scrape',
            controller: function($scope, $http) {
                $http.get('http://localhost:8081/scrape')
                    .then(function(response){
                        $scope.message = response.data;
                });
            },
            template: '<span>{{message}}</span>'
        })

        .state('courseId', {
            url: '/:courseId',
            controller: function($scope, $http) {
                $http.get('http://localhost:8081/:courseId')
                     .then(function(response) {
                         $scope.message = response.data;
                     })
            },
            template: '<span>{{message}}</span>'
        })
    
    $locationProvider.html5Mode(true);
});
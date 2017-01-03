var scraperApp = angular.module('scraperApp', ['ui.router', 'courseList']);

scraperApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            template: '<course-list></course-list>'
        })
        
        .state('scrape', {
            url: '/scrape',
            controller: function($scope, $http) {
                $http.get('http://localhost:8081/scrape')
                    .then(function(data){
                        $scope.message = data.data;
                });
            },
            template: '<span>{{message}}</span>'
        })

        .state('courseId', {
            url: '/:courseId'
        })
    
    $locationProvider.html5Mode(true);
});
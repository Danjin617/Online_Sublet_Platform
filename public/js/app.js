var app = angular.module('sampleApp', [ 'ngRoute' ]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', { templateUrl: 'views/home.html'})
    .when('/student/:id', {templateUrl: 'views/student.html'})
    .when('/students', { templateUrl: 'views/student.html'})
    .when('/new', { templateUrl: 'views/newstudent.html'})
    .when('/register', { templateUrl: 'views/register.html'})
    .when('/login', { templateUrl: 'views/login.html'})
    .otherwise({ redirectTo: '/' });
});


app.config(['$locationProvider',function($locationProvider){
	 $locationProvider.hashPrefix('');
}])

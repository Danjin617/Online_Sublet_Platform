var app = angular.module('sampleApp', [ 'ngRoute' ]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', { templateUrl: 'views/home.html'})
    .when('/editlisting/:id', {templateUrl: 'views/editlisting.html'})
    .when('/viewlisting/:id', {templateUrl: 'views/viewlisting.html'})
    //.when('/listings', { templateUrl: 'views/listing.html'})
    .when('/new', { templateUrl: 'views/newlisting.html'})
    .when('/register', { templateUrl: 'views/register.html'})
    .when('/login', { templateUrl: 'views/login.html'})
    .when('/dashboard', { templateUrl: 'views/dashboard.html'})
    .when('/confirmation/:id', { templateUrl: 'views/confirmation.html'})
    .when('/geocodeCall', { templateUrl: 'views/geocodeCall.html'})
    .otherwise({ redirectTo: '/' });
});


app.config(['$locationProvider',function($locationProvider){
	 $locationProvider.hashPrefix('');
}])

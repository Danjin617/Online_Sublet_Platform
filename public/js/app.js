var app = angular.module('sampleApp', [ 'ngRoute' ]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', { templateUrl: 'views/home.html'})
    .when('/listing/:id', {templateUrl: 'views/listing.html'})
    .when('/listings', { templateUrl: 'views/listing.html'})
    .when('/new', { templateUrl: 'views/newlisting.html'})
    .when('/register', { templateUrl: 'views/register.html'})
    .when('/login', { templateUrl: 'views/login.html'})
    .otherwise({ redirectTo: '/' });
});


app.config(['$locationProvider',function($locationProvider){
	 $locationProvider.hashPrefix('');
}])

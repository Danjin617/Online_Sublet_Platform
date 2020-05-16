app.controller('MainController',
 ['$scope','$http','Student',function($scope, $http, Student) {

   $scope.tagline = 'Welcome to tutorials point angular app!';

   $scope.formData = {};
   $scope.loading = true;


   $scope.init = function(){
       //alert('init'); 
       $http.get('/api/students').
       then(function(response) {
         $scope.students = response.data;
       });
     };
     $scope.orderByMe = function(x) {
      $scope.myOrderBy = x;
    }

    
  }]);
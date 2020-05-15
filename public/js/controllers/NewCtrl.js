app.controller('NewController',
  ['$scope','$http','Student',function($scope, $http, Student) {	
   $scope.tagline = 'Welcome to Student section!';

   $scope.init = function(){
    $scope.student = new Student();
   };

  $scope.doSave = function(){
    $http.post('/api/students/send',$scope.student).
    then(function(response) {
      alert(response.message);
    });

  };



  }]);

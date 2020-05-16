app.controller('LoginController',
    ['$scope','$http',function($scope, $http) {	
   $scope.tagline = 'Welcome to Student section!';


    $scope.init = function(){
       $scope.user = new User();
    };

    $scope.login = function() {
      $http.post('/users/login',$scope.user).
        then(function(response){
          alert("done");
          alert(response);
        })
    }

    // CREATE 
   // when submitting the add form, send the text to the node API
   $scope.createStudent = function() {
      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
    
      $http.post('/api/students/add',$scope.student).
        then(function(response) {
          
          window.location.href = "/";
      });
   };

   $scope.clear = function() {
       $scope.user = new User();
   }




}]);

app.controller('LoginController',
    ['$scope','$http', '$rootScope',function($scope, $http, $rootScope) {	
   $scope.tagline = 'Welcome to Student section!';


    $scope.init = function(){
       $scope.user = new User();
    };

    $scope.login = function() {
      $http.post('/users/login',$scope.user).
        then(function(response){
          if(response.data.message != null) {
            alert(response.data.message);
          } 
          $rootScope.user = response.data;
          //alert(JSON.stringify(response));
          //alert(response.data.username);
          alert($scope.user.username);
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

}]);


app.controller('RegisterController',
    ['$scope','$http',function($scope, $http) { 
   $scope.tagline = 'Welcome to Listing section!';

    $scope.init = function(){
      //alert('register');
      $scope.user = new User();
    };

    $scope.register = function() {
      alert('here');

      if ($scope.user.password != $scope.confirmPassword) {
        alert("password"+$scope.confirmPassword+$scope.user.password);
        alert("Passwords do not match, please try again");
        return;
      }

      $http.post('/users',$scope.user).
        then(function(response){
          if(response.data.message != null) {
            alert(response.data.message);
            return;
          } 
          $scope.user = response.data;
          sessionStorage.setItem("session_username", $scope.user.username);

          alert("session"+sessionStorage.getItem("session_username"));
          //$rootScope.user = response.data;
          window.location.href = "/";

        })
    };

    // CREATE 
   // when submitting the add form, send the text to the node API
   /*
   $scope.createStudent = function() {
      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
    
      $http.post('/api/students/add',$scope.student).
        then(function(response) {
          
          window.location.href = "/";
      });
   };

*/

}]);
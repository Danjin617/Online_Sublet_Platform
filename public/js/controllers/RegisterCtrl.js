
app.controller('RegisterController',
    ['$scope','$http',function($scope, $http) { 
   $scope.tagline = 'Welcome to Listing section!';

    $scope.init = function(){
      //alert('register');
      $scope.user = new User();
    };

    $scope.confirmRegistration = function() {
      if (confirm("Confirm your registration?")) {

      }
    }

    $scope.register = function() {
      //alert('here');

      if ($scope.user.password != $scope.confirmPassword) {
        //alert("password"+$scope.confirmPassword+$scope.user.password);
        alert("Passwords do not match, please try again");
        return;
      }

      //if (!confirm("Confirm registration?")) {return;}

      $http.post('/users',$scope.user).
        then(function(response){
          if(response.data.message != null) {
            alert(response.data.message);
            return;
          } 
          $scope.user = response.data;
          //send an email to confirm
          alert("Check email to confirm account");
          //sessionStorage.setItem("session_username", $scope.user.username);

          //alert("Welcome, "+sessionStorage.getItem("session_username"));
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
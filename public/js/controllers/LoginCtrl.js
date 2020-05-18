app.controller('LoginController',
    ['$scope','$http','$rootScope',function($scope, $http, $rootScope) {	
   $scope.tagline = 'Welcome to Listing section!';


    $scope.init = function(){
       $scope.user = new User();
    };

    $scope.login = function() {
      $http.post('/users/login',$scope.user).
        then(function(response){
          if(response.data.message != null) {
            alert(response.data.message);
            return;
          } 
          //alert(JSON.stringify(response));
          //alert(response.data.username);

          if (!$scope.user.confirmed) {
            //send an email to confirm
            alert("Check email to confirm account");
            window.location.href = "/";
            return;
          }
          sessionStorage.setItem("session_username", $scope.user.username);
          window.location.href = "/";
          alert("Login complete! Welcome, "+sessionStorage.getItem("session_username"));
          //alert($scope.user.username);
        })
    }

    // CREATE 
   // when submitting the add form, send the text to the node API
   $scope.createListing = function() {
      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
    
      $http.post('/api/listings/add',$scope.listing).
        then(function(response) {
          
          window.location.href = "/";
      });
   };

}]);

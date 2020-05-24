app.controller('NewController',
  ['$scope','$http',function($scope, $http) {	
   $scope.tagline = 'Welcome to Listing section!';

   $scope.init = function(){
    
    $scope.listing = new Listing();
    //check
    //alert("hi");
    alert(sessionStorage.getItem("session_username"));
    $scope.listing.lister = sessionStorage.getItem("session_username");
   };

  $scope.doSave = function(){
    $scope.listing.lister = sessionStorage.getItem("session_username");
    $http.post('/api/listings/send',$scope.listing).
    then(function(response) {
      if(response.data.message != null) {
        //return id
        alert(response.data.message);
        
        
        //add listing id to user
        $scope.req = {
          username: sessionStorage.getItem("session_username"),
          listing: response.data.message
        }
        //$scope.req.body.username = sessionStorage.getItem("session_username");
        //$scope.req.body.listing = response.data.message;
        $http.post('/users/sendlisting', $scope.req).
        then(function(response) {
          alert("sent listing");
        });
window.location.href = "/";
      }
    });
  };


  }]);

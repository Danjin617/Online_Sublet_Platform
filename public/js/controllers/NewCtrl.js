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
        alert(response.data.message);
        window.location.href = "/";
      }
    });

  };



  }]);

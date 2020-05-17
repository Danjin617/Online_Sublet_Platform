app.controller('NewController',
  ['$scope','$http',function($scope, $http) {	
   $scope.tagline = 'Welcome to Listing section!';

   $scope.init = function(){
    $scope.listing = new Listing();
   };

  $scope.doSave = function(){
    $http.post('/api/listings/send',$scope.listing).
    then(function(response) {
      //alert(response.message);
    });

  };



  }]);

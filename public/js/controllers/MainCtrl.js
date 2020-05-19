app.controller('MainController',
 ['$scope','$http',function($scope, $http) {

   $scope.tagline = 'Welcome to tutorials point angular app!';

   $scope.formData = {};
   $scope.loading = true;


   $scope.init = function(){
      //alert($rootScope.user.username);
       //alert('init'); 
       $http.get('/api/listings').
       then(function(response) {
         $scope.listings = response.data;
       });
     };
     $scope.orderByMe = function(x) {
      $scope.myOrderBy = x;
    }

    $scope.toDate = function(x) {
      var date = new Date(x);
      var options = {year: 'numeric', month : 'long', day: 'numeric'};
      return date.toLocaleDateString("en-US", options);
    };

    
  }]);
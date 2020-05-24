app.controller('EditListingController',
  ['$scope','$http','$routeParams',function($scope, $http, $routeParams) {	
   $scope.tagline = 'Welcome to Listing section!';

   $scope.init = function(){
       alert('init');	

       alert($routeParams.id);
       $http.get('/api/listings/' + $routeParams.id).
       then(function(response) {
       // alert("mwahahaha");
       alert(response.data.lister);
         $scope.listing = response.data;
       });
     };


    $scope.update = function(){
      $http.put('/api/listings/' + $scope.listing._id, $scope.listing).
      then(function(response) {
       // alert(response);
      window.location.href = '/#/viewlisting/'+$routeParams.id;

      });

    }

    $scope.toDate = function(x) {
      var date = new Date(x);
      var options = {year: 'numeric', month : 'long', day: 'numeric'};
      return date.toLocaleDateString("en-US", options);
    };
    
   // delete a todo after checking it
   $scope.deleteListing = function() {
    $scope.loading = true;
    $http.delete('/api/listings/' + $scope.listing._id, $scope.listing)
      // if successful delete, call our get function to get all the new Student
      .then(function(response) {
       $scope.loading = false;
      window.location.href = '/';
     });
    };

  }]);

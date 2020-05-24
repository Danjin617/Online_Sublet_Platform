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

     $scope.toggle = function myFunction() {
      var result = !document.getElementById("name").readOnly;
      document.getElementById("name").readOnly = result;
      document.getElementById("place").readOnly = result;
      document.getElementById("country").readOnly = result;
    }

    $scope.doSave = function(){
      $http.post('/api/listings/send',$scope.listing).
      then(function(response) {
       // alert(response);
      });

    }

    $scope.update = function(){
      $http.put('/api/listings/' + $scope.listing._id, $scope.listing).
      then(function(response) {
       // alert(response);
      });

    }


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

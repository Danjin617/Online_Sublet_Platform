app.controller('MainController',
 ['$scope','$http',function($scope, $http) {

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

    $scope.predicate = function() {
      return function(item) {
        if ($scope.price === undefined || $scope.price == 0) {return true;}

        return (item.price <= $scope.price);
      }
    }

    $scope.startDate = function() {
      return function(item) {
        if ($scope.start_date === undefined) {return true;}

        return Date.parse(item.timeframe.start_date) <= Date.parse($scope.start_date);

      }
    }

    $scope.endDate = function() {
      return function(item) {
        if ($scope.end_date === undefined) {return true;}

        return Date.parse(item.timeframe.end_date) >= Date.parse($scope.end_date);

      }
    }

    $scope.typeFilter = function() {
      return function(item) {
        if ($scope.type === undefined || $scope.type == "any") {return true;}

        return item.type == $scope.type;

      }
    }

    $scope.clearFilters = function() {
      $scope.search = undefined;
      $scope.price = undefined;
      $scope.end_date = undefined;
      $scope.start_date = undefined;
      
    }

    $scope.findLocation = function(){
      var frame = document.getElementById("map");
      frame.contentWindow.postMessage({call:'sendValue', value: $scope.address}, '*');

    }

    
  }]);

/*
$scope.predicate = function() {
      return function(item) {
        if ($scope.price === undefined || $scope.price == 0) {return true;}

        return (item.price <= $scope.price) &&
        (item.features.utilties === $scope.utilities.checked) &&
        (item.features.furnished === $scope.furnished.checked) &&
        (item.features.en_suite === $scope.en_suite.checked) &&
        (item.features.pets === $scope.pets.checked)&&
        (item.features.public_transportation === $scope.public_transportation.checked);
      }
    }
    */
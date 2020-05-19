app.controller('ConfirmationController',
 ['$scope','$http','$routeParams',function($scope, $http, $routeParams) {

   $scope.confirmation_status = '';

   $scope.init = function(){
    //alert($routeParams.id);
    var to = $routeParams.id;
    var req = {token: to};


        $http.post('/users/confirm/'+$routeParams.id).
        then(function(response) {
            if(response.data.message != null) {
                $scope.confirmation_status = response.data.message;
                //alert("oops");
                return;
            }

            $scope.user = response.data;
            sessionStorage.setItem("session_username", $scope.user.username);
            
            window.location.href = "/";
            alert("Confirmation successful! Welcome, "+$scope.user.username);
            //alert($scope.user.confirmed);
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
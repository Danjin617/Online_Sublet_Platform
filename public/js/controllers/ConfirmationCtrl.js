app.controller('ConfirmationController',
 ['$scope','$http','$rootScope',function($scope, $http, $rootScope) {

   $scope.confirmation_status = '';

   $scope.init = function(){
       var req = {token: $rootScope.id};
       $http.get('/users/confirm', req).
       then(function(response) {
           if(response.data.message != null) {
               $scope.confirmation_status = response.data.message;
               return;
           }
           $scope.confirmation_status = "registration complete";
            $scope.user = response.data;
            $scope.user.confirmed = true;
            
        });
        
        alert($scope.user.username);
      //alert($rootScope.user.username);
       //alert('init'); 
       /*
       $http.get('/users/'+sessionStorage.getItem("session_username")).
       then(function(response) {
         $scope.user = response.data;
       });
       //fetch all bookmarks
       for (id in $scope.user.bookmarks){
           $http.get('/api/listings/'+id).
           then(function(reponse) {
               if (response.data.message == null){
                    $scope.bookmarks.push(reponse.data);
               } else {
                   console.log("unable to fetch info for " + id);
               }
           });
       }
       */
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
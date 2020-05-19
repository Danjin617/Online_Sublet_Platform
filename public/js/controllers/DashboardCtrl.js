app.controller('DashboardController',
 ['$scope','$http',function($scope, $http) {

   $scope.tagline = 'My listing';

   $scope.formData = {};
    $scope.loading = true;
    $scope.mylistings = [];
    $scope.bookmarks = [];

   $scope.init = function(){
      //alert($rootScope.user.username);
       //alert('init'); 
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
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
       console.log("init");
       getUser();
       initBookmarks();
       initListings();
       
    };

    $scope.getUser = function() {
      $http.get('/users/'+sessionStorage.getItem("session_username")).
       then(function(response) {
         $scope.user = response.data;
       });
    };
    $scope.initBookmarks = function(){
      
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

    $scope.initListings = function() {
      //username
       //fetch all listings


       for (id in $scope.user.listings){
           $http.get('/api/listings/'+id).
           then(function(reponse) {
               if (response.data.message == null){
                    $scope.listings.push(reponse.data);
               } else {
                   console.log("unable to fetch info for " + id);
               }
           });
       }
    };
     $scope.orderByMe = function(x) {
      $scope.myOrderBy = x;
    };

    $scope.toDate = function(x) {
      var date = new Date(x);
      var options = {year: 'numeric', month : 'long', day: 'numeric'};
      return date.toLocaleDateString("en-US", options);
    };

    
  }]);
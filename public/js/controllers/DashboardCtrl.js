app.controller('DashboardController',
 ['$scope','$http',function($scope, $http) {

    $scope.tagline = 'My listing';

    $scope.formData = {};
    $scope.loading = true;
    $scope.listings = [];
    $scope.bookmarks = [];

    $scope.init = function(){
      //alert($rootScope.user.username);
       //alert('init'); 
      //$scope.getUser();
     // $scope.user = new User();
          $scope.req = {
          username: sessionStorage.getItem("session_username"),
       
        }
      $http.post('/users/username', $scope.req).
       then(function(response) {
         $scope.user = response.data;
         alert(sessionStorage.getItem("session_username"));
         alert(JSON.stringify(response.data));
         alert($scope.user.lists);
         console.log("getting bookmarks");
         $scope.initBookmarks();
         console.log("getting listings");
          $scope.initListings();
       });

      
       
    };

      //alert($rootScope.user.username);
       //alert('init'); 
       
    $scope.getUser = function() {
      $http.get('/users/'+sessionStorage.getItem("session_username")).
       then(function(response) {
         $scope.user = response.data;

       });
    };
    

    $scope.initBookmarks = function(){
       //fetch all bookmarks
       for (i = 0; i < $scope.user.bookmarked.length; i++){
          const id = $scope.user.bookmarked[i];
         console.log('ID:' + id);
           $http.get('/api/listings/'+id).
           then(function(response) {
            console.log('GOT LISTINGSSSSSS');
            alert(JSON.stringify(response.data));
               if (response.data.message == null){
                    $scope.bookmarks.push(response.data);
               } else {
                   console.log("unable to fetch info for " + id);
               }
           });
       }
    };

    $scope.initListings = function() {
      //username
       //fetch all listings
       console.log($scope.user.lists[0]);
       console.log($scope.user.lists.length);
       for (i = 0; i < $scope.user.lists.length; i++){
          const id = $scope.user.lists[i];
         console.log('ID:' + id);
           $http.get('/api/listings/'+id).
           then(function(response) {
            console.log('GOT LISTINGSSSSSS');
            alert(JSON.stringify(response.data));
               if (response.data.message == null){
                    $scope.listings.push(response.data);
               } else {
                   console.log("unable to fetch info for " + id);
               }
           });
       }
};

/*
       for (id in $scope.user.lists){
        console.log('ID:' + id);
           $http.get('/api/listings/'+id).
           then(function(reponse) {
            console.log('GOT LISTINGSSSSSS');
            alert(JSON.stringify(response));
               if (response.data.message == null){
                    $scope.listings.push(reponse.data);
               } else {
                   console.log("unable to fetch info for " + id);
               }
           });
       }
       */


    
     $scope.orderByMe = function(x) {
      $scope.myOrderBy = x;
    };

    $scope.toDate = function(x) {
      var date = new Date(x);
      var options = {year: 'numeric', month : 'long', day: 'numeric'};
      return date.toLocaleDateString("en-US", options);
    };

    
  }]);
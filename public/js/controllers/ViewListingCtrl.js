app.controller('ViewListingController',
  ['$scope','$http','$routeParams',function($scope, $http, $routeParams) {	
   $scope.tagline = 'Welcome to Listing section!';
   $scope.bookmarks = [];
   $scope.bookmarkToggle = "Bookmark";

   $scope.init = function(){
     $scope.featuresList = "";
     //alert('init');	

     //alert($routeParams.id);
     $http.get('/api/listings/' + $routeParams.id).
     then(function(response) {
       // alert("mwahahaha");
       //alert(response.data.lister);
       $scope.listing = response.data;

       $scope.readFeatures();
       //$scope.sendLocation();
       //see if it is the lister
       if (sessionStorage.getItem("session_username") == $scope.listing.lister) {
          //is lister
          //alert("is lister");
          //$scope.sendLocation();
          document.getElementById("bookmark").style.visibility = "hidden";
          document.getElementById("edit").style.visibility = "visible";
        } else if (sessionStorage.getItem("session_username")){
          //$scope.sendLocation();

          document.getElementById("bookmark").style.visibility = "visible";
          document.getElementById("edit").style.visibility = "hidden";

        }
       //alert($scope.toggle());
        var myVar = setTimeout($scope.sendLocation, 500);

       //document.getElementById("loadlocation").click();
       //$scope.toggle();


     });

     var result = -1;

     $scope.req = {
        username: sessionStorage.getItem("session_username")
      }
        //$scope.req.body.username = sessionStorage.getItem("session_username");
        //$scope.req.body.listing = response.data.message;
        $http.post('/users/bookmarks', $scope.req).
        then(function(response) {
          //alert(JSON.stringify(response.data));
          $scope.bookmarked = response.data;
          //test if route params is in bookmakrs
          for (i = 0; i < $scope.bookmarked.length; i++) {
            //alert($scope.bookmarked[i] + " " + $routeParams.id);
            if ($scope.bookmarked[i] == $routeParams.id) {
              //alert("index:" + i);
              result = i;
              //return result;

            }
          }
          console.log('INDEX' + result);
          if (result != -1) {
            $scope.bookmarkToggle = "Unbookmark";

          } else {

        $scope.bookmarkToggle = "Bookmark";
          }



   });
 };

  $scope.readFeatures = function () {
    console.log($scope.listing.features);
    var list = ['furnished','utilities','en_suite','public_transport','pets'];

    if($scope.listing.features.furnished) {
      $scope.featuresList += "<li>Furnished</li>";
    }
    if($scope.listing.features.utilities) {
      $scope.featuresList += "<li>Utilities</li>";
    }
    if($scope.listing.features.en_suite) {
      $scope.featuresList += "<li>En Suite</li>";
    }
    if($scope.listing.features.public_transport) {
      $scope.featuresList += "<li>Public Transport</li>";
    }
    if($scope.listing.features.pets) {
      $scope.featuresList += "<li>Pets</li>";
    }
    
    document.getElementById("features").innerHTML = $scope.featuresList;
  }

   $scope.redirectToNewPage = function() {
   // alert("redirect");
    window.location.href = "/#/editlisting/"+$routeParams.id;
  };


  $scope.sendLocation = function(){
      var address = $scope.listing.address.streetname + " " + $scope.listing.address.province + " " + $scope.listing.address.country;

      var frame = document.getElementById("viewAddress");
      console.log(frame);
      frame.contentWindow.postMessage({call:'sendValue', value: address}, '*');
      console.log("sent message from view listing");
    }
/*
     $scope.indexOf =function(){
      var result = -1;
      //add listing id to user
      $scope.req = {
        username: sessionStorage.getItem("session_username")
      }
        //$scope.req.body.username = sessionStorage.getItem("session_username");
        //$scope.req.body.listing = response.data.message;
        $http.post('/users/bookmarks', $scope.req).
        then(function(response) {
          alert(JSON.stringify(response.data));
          $scope.bookmarked = response.data;
          //test if route params is in bookmakrs
          for (i = 0; i < $scope.bookmarked.length; i++) {
            alert($scope.bookmarked[i] + " " + $routeParams.id);
            if ($scope.bookmarked[i] == $routeParams.id) {
              alert("index:" + i);
              result = i;
              //return result;

            }
          }
        });
        return result;
      };
      */
      $scope.toggle = function(){
        //alert($scope.indexOf());
        var result = -1;
      //add listing id to user
      $scope.req = {
        username: sessionStorage.getItem("session_username")
      }
        //$scope.req.body.username = sessionStorage.getItem("session_username");
        //$scope.req.body.listing = response.data.message;
        $http.post('/users/bookmarks', $scope.req).
        then(function(response) {
          //alert(JSON.stringify(response.data));
          $scope.bookmarked = response.data;
          //test if route params is in bookmakrs
          for (i = 0; i < $scope.bookmarked.length; i++) {
            //alert($scope.bookmarked[i] + " " + $routeParams.id);
            if ($scope.bookmarked[i] == $routeParams.id) {
              alert("index:" + i);
              result = i;
              //return result;

            }
          }
          console.log('INDEX' + result);
          if (result != -1) {
       // if ($scope.indexOf() != undefined) {
        console.log('REMOVE')
        $scope.req = {
          username: sessionStorage.getItem("session_username"),
          index: result
        }
        $http.post('/users/removebookmark', $scope.req).
        then(function(response) {
          alert("removed bookmark");
        });
        $scope.bookmarkToggle = "Bookmark";

      } else {
        //add listing id to user
        console.log('ADD')
        $scope.req = {
          username: sessionStorage.getItem("session_username"),
          listing: $routeParams.id
        }
        //$scope.req.body.username = sessionStorage.getItem("session_username");
        //$scope.req.body.listing = response.data.message;
        $http.post('/users/sendbookmark', $scope.req).
        then(function(response) {
          alert("sent bookmark");
        });
        $scope.bookmarkToggle = "Unbookmark";
      }

    });

      };  

    }]);

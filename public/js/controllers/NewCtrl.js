app.controller('NewController', ['$scope', '$http', '$timeout', '$compile', 'Upload',
        function($scope, $http, $timeout, $compile, Upload) {
   $scope.tagline = 'Welcome to Listing section!';

   $scope.init = function(){
    
    $scope.listing = new Listing();
    $scope.imagebase ='';

    //$scope.image = new Image();

    //check
    //alert("hi");
    alert(sessionStorage.getItem("session_username"));
    $scope.listing.lister = sessionStorage.getItem("session_username");
   };

  $scope.doSave = function(){
    $scope.print();
    console.log("saving")
    //creating new listing
    $scope.listing.lister = sessionStorage.getItem("session_username");
    $http.post('/api/listings/send',$scope.listing).
    then(function(response) {
      console.log("obtained listing")
      if(response.data.message != null) {
        //return id
        alert(response.data.message);
        
        var listing_id = response.data.message;
        
        //add listing id to user
         var req = {
          username: sessionStorage.getItem("session_username"),
          listing: listing_id
        }

        //adding listing to user
        $http.post('/users/sendlisting', req).
        then(function(response) {
          alert("sent listing");
        });

        if($scope.imagebase != '') {
          var imageReq = {
            listing_id: listing_id,
            img: $scope.imagebase
          }
          //adding image to 
          $http.post('/api/images', imageReq).
          then(function(response) {
            alert("sent image");
          });
          
        }
        window.location.href = "/";
      }
    });
  };


  $scope.onChange = function (files) {
    //alert('hi');
    if(files[0] == undefined) return;
    $scope.fileExt = files[0].name.split(".").pop();


  }
  
  $scope.isImage = function(ext) {
    if(ext) {
      return ext == "jpg" || ext == "jpeg"|| ext == "gif" || ext=="png"
    }
  }

  $scope.print = function(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("preview");
    ctx.drawImage(img, 10, 10);
    console.log(c.toDataURL());
    $scope.imagebase = c.toDataURL();
  }
  }]);

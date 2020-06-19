app.controller('EditListingController',
  ['$scope','$http','$routeParams',function($scope, $http, $routeParams) {	
  // $scope.tagline = 'Welcome to Listing section!';

  $scope.toDate = function(d){
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
  };
   $scope.init = function(){
       //alert('init');	

       //alert($routeParams.id);
       $http.get('/api/listings/' + $routeParams.id).
       then(function(response) {
       // alert("mwahahaha");
       //alert(response.data.lister);
         $scope.listing = response.data;
       });
     };


    $scope.update = function(){
      $scope.print();
      
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

    var canvas = document.getElementById("myCanvas");
    var img = document.getElementById("preview");
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 200, 150);
    console.log(canvas.toDataURL());
    $scope.imagebase = canvas.toDataURL();

    if($scope.imagebase != '') {
      var imageReq = {
        listing_id: $scope.listing._id,
        img: $scope.imagebase
      }
      //adding image to 
      $http.post('/api/images', imageReq).
      then(function(response) {
        alert("sent image");
      });
      
    }

  }
  
    /*
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("preview");
    ctx.drawImage(img, 10, 10);
    console.log(c.toDataURL());
    $scope.imagebase = c.toDataURL();
*/
    
  
  


  }]);

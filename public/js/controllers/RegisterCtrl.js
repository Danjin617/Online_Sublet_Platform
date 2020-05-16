app.controller('RegisterController',
    ['$scope','$http',function($scope, $http) {	
   $scope.tagline = 'Welcome to Student section!';


    $scope.init = function(){
      alert('register');
       $scope.user = new User();
    };

    $scope.register = function() {
      alert('here');
      $http.post('/users',$scope.user).
        then(function(response){
          alert("done");
          alert(response);
        })
    };
    // CREATE 
   // when submitting the add form, send the text to the node API
   /*
   $scope.createStudent = function() {
      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
    
      $http.post('/api/students/add',$scope.student).
        then(function(response) {
          
          window.location.href = "/";
      });
   };

*/

}]);

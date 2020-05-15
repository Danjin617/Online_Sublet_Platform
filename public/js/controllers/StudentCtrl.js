app.controller('StudentController',
  ['$scope','$http','$routeParams', 'Student',function($scope, $http, $routeParams, Student) {	
   $scope.tagline = 'Welcome to Student section!';

   $scope.init = function(){
       alert('init');	
       document.getElementById("name").readOnly = true;
       document.getElementById("place").readOnly = true;
       document.getElementById("country").readOnly = true;
       alert($routeParams.id);
       $http.get('/api/students/' + $routeParams.id).
       then(function(response) {
        alert("mwahahaha");
        alert(response.data.name);
         $scope.student = response.data;
       });
     };

     $scope.toggle = function myFunction() {
      var result = !document.getElementById("name").readOnly;
      document.getElementById("name").readOnly = result;
      document.getElementById("place").readOnly = result;
      document.getElementById("country").readOnly = result;
    }

    $scope.doSave = function(){
      $http.post('/api/students/send',$scope.student).
      then(function(response) {
        alert(response);
      });

    }

    $scope.update = function(){
      $http.put('/api/students/' + $scope.student._id, $scope.student).
      then(function(response) {
        alert(response);
      });

    }

   /*$scope.update = function() {
    $scope.loading = true;
    Student.update($scope.student._id)
      // if successful delete, call our get function to get all the new Student
      .then(function(response) {
       $scope.loading = false;
       $http.get('/api/students').
       then(function(response) {
        alert(response);
      });
     });
    };
    */
   // DELETE
   // delete a todo after checking it
   $scope.deleteStudent = function() {
    $scope.loading = true;
    Student.delete($scope.student._id)
      // if successful delete, call our get function to get all the new Student
      .then(function(response) {
       $scope.loading = false;
      window.location.href = '/';
     });
    };

  }]);

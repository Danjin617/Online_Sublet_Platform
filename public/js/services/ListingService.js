app.factory('Listing', ['$http',function($http) {
   return {
      get : function() {
         return $http.get('/api/listings');
      },
      create : function(listing) {
         return $http.post('/api/listings/send', listing);
      },
      delete : function(id) {
         return $http.delete('/api/listings/' + id);
      }
     /*update : function(id) {
         return $https.put('/api/students/' + id);
      }*/
   }
}]);

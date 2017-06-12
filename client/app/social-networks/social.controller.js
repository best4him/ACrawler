/**
 * Created by AncientMachine on 10.12.2016.
 */
(function() {
  'use strict';
  angular.module('social')
    .controller('SocialCtrl', SocialCtrl);

  SocialCtrl.$inject = ['$scope', '$http'];

  function SocialCtrl($scope, $http) {
    $scope.credentials = {};

    $scope.startSearch = function() {
      $http.post('/api/crawler/search-social', { credentials: $scope.credentials, query: $scope.query }, function (err, result) {
        $scope.done = true;
      });
    }
  }

})();


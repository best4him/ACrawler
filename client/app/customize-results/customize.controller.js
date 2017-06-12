/**
 * Created by AncientMachine on 02.01.2016.
 */
(function () {
  'use strict';

  angular
    .module('acrawlerApp')
    .controller('CustomizeCtrl', CrawlingCtrl);

  CrawlingCtrl.$inject = ['$scope', '$http', '$interval', 'Auth'];

  /* @ngInject */
  function CrawlingCtrl($scope, $http, $interval,Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.progress = 10;
    $scope.status = "Downloading";
    var i = 0;
    $interval(function() {
      $scope.progress += 10;
      $scope.status = $scope.status+ i++ + '</br>';
    }, 500, 9);
    activate();

    ////////////////

    function activate() {

    }
  }

})();


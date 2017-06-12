/**
 * Created by AncientMachine on 02.01.2016.
 */
'use strict';

angular.module('acrawlerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customize', {
        url: '/customize',
        templateUrl: 'app/customize-results/customize.html',
        controller: 'CustomizeCtrl',
        authenticate: true
      });
  });

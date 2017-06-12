/**
 * Created by AncientMachine on 10.12.2016.
 */
'use strict';

angular.module('social')
  .config(function($stateProvider) {
    $stateProvider
      .state('social', {
        url:'/social',
        templateUrl: 'app/social-networks/social.html',
        controller: 'SocialCtrl'
      })
  });

// angular.module('social')
//   .config(function ($stateProvider) {
//     $stateProvider
//       .state('admin', {
//         url: '/admin',
//         templateUrl: 'app/admin/admin.html',
//         controller: 'AdminCtrl'
//       });
//   });

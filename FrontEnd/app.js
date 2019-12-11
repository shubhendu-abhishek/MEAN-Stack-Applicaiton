'use strict';
angular.module('NewsBlogApp',['ngRoute','controllers'])

.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/login',{
        templateUrl:'views/pages/login.html',
        controller:'LoginController'
    }).when('/posts',{
        templateUrl:'views/pages/newsPost.html',
        controller:'NewsPostController'
    }).when('/newuser',{
        templateUrl:'views/pages/userRegister.html',
        controller:'newUserRegController'
    })
    .otherwise('/login');
}]);
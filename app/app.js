/**
 * Created by clinstid on 2/1/14.
 */

var app = angular.module('energydashApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'readingsController',
            templateUrl: 'app/partials/current.html'
        })
        .when('/last_7_days',
        {
            controller: 'hoursController',
            templateUrl: 'app/partials/last7Days.html'
        })
        .otherwise({ redirectTo: '/' });
});

$(document).ready(function () {
});

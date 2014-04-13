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
        .when('/day_of_the_week',
        {
            controller: 'dowController',
            templateUrl: 'app/partials/hoursByDayOfWeek.html'
        })
        .when('/hour_of_the_day',
        {
            controller: 'hodController',
            templateUrl: 'app/partials/hourOfTheDay.html'

        })
        .otherwise({ redirectTo: '/' });
});

$(document).ready(function () {
});

/**
 * Created by clinstid on 2/1/14.
 */
app.controller('hoursController', function ($scope, energydashService) {

    init();

    function init() {
        // Just in case we need this later.
    }

    /*
     The last hour is a single value:

     {"id":1391295600000,"count":549,"averageUsage":769.0,"averageTempF":46.936977}

     */
    $scope.lastHour = undefined;

    // The last 7 days is an array of the same object you get from lastHour
    $scope.last7Days = undefined;

    $scope.getLastHour = function () {
        energydashService.getLastHour().then(function (data) {
            $scope.lastHour = data;
        });
    };

    $scope.getLast7Days = function () {
        energydashService.getLast7Days().then(function (data) {
            $scope.last7Days = data;
        });
    };

    $scope.getLastHour();
    $scope.getLast7Days();
});



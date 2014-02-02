/**
 * Created by clinstid on 2/1/14.
 */

app.controller('readingsController', function ($scope, energydashService) {

    init();

    function init() {
        // Just in case we need this later.
    }

    // The last reading is a single value:
    //
    // {"id":{"new":false,"timeSecond":1391310802,"inc":-560981975,"machine":1927971159,"time":1391310802000},"readingTimestamp":1391310802867,"ch1Watts":0,"ch2Watts":698,"ch3Watts":1027,"totalWatts":1725,"tempF":46.2}
    //
    $scope.lastReading = undefined;

    // The last hour is an array of objects in the same format as the last reading.
    $scope.readingsFromLastHour = undefined;

    $scope.getLastReading = function () {
        energydashService.getLastReading().then(function (data) {
            $scope.lastReading = data;
        });
    };

    $scope.getReadingsFromLastHour = function () {
        energydashService.getReadingsFromLastHour().then(function (data) {
            $scope.readingsFromLastHour = data;
        });
    };

    $scope.getLastReading();
    $scope.getReadingsFromLastHour();
});




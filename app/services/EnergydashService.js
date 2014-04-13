/**
 * Created by clinstid on 2/1/14.
 */
app.service('energydashService', function ($http) {

    this.getLastReading = function () {
        return $http.get('/energydashws/readings/last').then(function (result) {
            return result.data;
        });
    };

    this.getReadingsFromLastHour = function () {
        var end = new Date();
        var start = new Date(end.getTime() - 1000*60*60);
        return $http.get('/energydashws/readings/range/start=' + start.getTime() + '&end=' + end.getTime()).then(function (result) {
            return result.data;
        });

    };
    this.getLastHour = function () {
        return $http.get('/energydashws/hours/last').then(function (result) {
            return result.data;
        });
    };

    this.getHoursFromLast7Days = function () {
        var end = new Date();
        var start = new Date(end.getTime() - 1000*60*60*24*7);
        return $http.get('/energydashws/hours/range/start=' + start.getTime() + '&end=' + end.getTime()).then(function (result) {
            return result.data;
        });

    };
});

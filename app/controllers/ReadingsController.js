/**
 * Created by clinstid on 2/1/14.
 */

app.controller('readingsController', function($scope, energydashService) {

    init();

    function init() {
        // Just in case we need this later.
    }

    // The last reading is a single value:
    //
    // {"id":{"new":false,"timeSecond":1391310802,"inc":-560981975,"machine":1927971159,"time":1391310802000},"readingTimestamp":1391310802867,"ch1Watts":0,"ch2Watts":698,"ch3Watts":1027,"totalWatts":1725,"tempF":46.2}
    //
    $scope.lastReading = {};

    // The last hour is an array of objects in the same format as the last reading.
    $scope.readingsFromLastHour = [];

    // Arrays containing the data to plot on the chart.
    $scope.lastHourTempPlotData = [];
    $scope.lastHourUsagePlotData = [];
    $scope.lastHourStats = {};

    $scope.buildLastHourData = function() {
        $scope.lastHourStats['Reading Count'] = 0;
        var totalUsage = 0;
        $scope.lastHourStats['Minimum Usage'] = Number.MAX_VALUE;
        $scope.lastHourStats['Maximum Usage'] = 0;
        $scope.lastHourStats['Average Usage'] = 0;
        var totalTemp = 0;
        $scope.lastHourStats['Minimum Temperature'] = Number.MAX_VALUE;
        $scope.lastHourStats['Maximum Temperature'] = 0;
        $scope.lastHourStats['Average Temperature'] = 0;

        $.each($scope.readingsFromLastHour, function(index, reading) {
            // Build the arrays we use to plot the chart.
            $scope.lastHourUsagePlotData.push([reading.readingTimestamp, reading.totalWatts]);
            $scope.lastHourTempPlotData.push([reading.readingTimestamp, reading.tempF]);

            $scope.lastHourStats['Reading Count']++;

            totalUsage += reading.totalWatts;
            $scope.lastHourStats['Minimum Usage'] = Math.min(reading.totalWatts, $scope.lastHourStats['Minimum Usage']);
            $scope.lastHourStats['Maximum Usage'] = Math.max(reading.totalWatts, $scope.lastHourStats['Maximum Usage']);

            totalTemp += reading.tempF;
            $scope.lastHourStats['Minimum Temperature'] = Math.min(reading.tempF, $scope.lastHourStats['Minimum Temperature']);
            $scope.lastHourStats['Maximum Temperature'] = Math.max(reading.tempF, $scope.lastHourStats['Maximum Temperature']);
        });

        // Compute averages using the stats we stored.
        $scope.lastHourStats['Average Usage'] = totalUsage / $scope.lastHourStats['Reading Count'];
        $scope.lastHourStats['Average Temperature'] = totalTemp / $scope.lastHourStats['Reading Count'];

        var plotOptions = {
            title: 'Last Hour',
            legend: {
                show: true
            },
            series: [{
                    label: 'Usage',
                    markerOptions: {
                        show: false
                    }
                }, {
                    label: 'Temperature',
                    markerOptions: {
                        show: false
                    },
                    xaxis: 'xaxis',
                    yaxis: 'y2axis'
                }

            ],
            axes: {
                xaxis: {
                    renderer: $.jqplot.DateAxisRenderer,
                },
            },
            highlighter: {
                show: true,
                sizeAdjust: 10,
                tooltipLocation: 'n',
                formatString: '%s<br>%d'
            }
        };
        $scope.currentChart = $.jqplot('current_chart', [$scope.lastHourUsagePlotData, $scope.lastHourTempPlotData],
            plotOptions);
    };

    $scope.getLastReading = function() {
        energydashService.getLastReading().then(function(data) {
            $scope.lastReading = data;
        });
    };

    $scope.getReadingsFromLastHour = function() {
        energydashService.getReadingsFromLastHour().then(function(data) {
            $scope.readingsFromLastHour = data;
            $scope.buildLastHourData();
        });
    };

    $scope.getLastReading();
    $scope.getReadingsFromLastHour();
});

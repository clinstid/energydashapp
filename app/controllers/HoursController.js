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
    $scope.lastHour = {};

    // The last 7 days is an array of the same object you get from lastHour
    $scope.hoursFromLast7Days = [];

    // Arrays containing the data to plot on the chart.
    $scope.last7DaysTempPlotData = [];
    $scope.last7DaysUsagePlotData = [];
    $scope.last7DaysStats = {};

    $scope.buildLast7DaysData = function() {
        $scope.last7DaysStats['Reading Count'] = 0;
        var totalUsage = 0;
        $scope.last7DaysStats['Minimum Usage'] = Number.MAX_VALUE;
        $scope.last7DaysStats['Maximum Usage'] = 0;
        $scope.last7DaysStats['Average Usage'] = 0;
        var totalTemp = 0;
        $scope.last7DaysStats['Minimum Temperature'] = Number.MAX_VALUE;
        $scope.last7DaysStats['Maximum Temperature'] = 0;
        $scope.last7DaysStats['Average Temperature'] = 0;

        $.each($scope.hoursFromLast7Days, function(index, hour) {
            // Build the arrays we use to plot the chart.
            $scope.last7DaysUsagePlotData.push([hour.id, hour.averageUsage]);
            $scope.last7DaysTempPlotData.push([hour.id, hour.averageTempF]);

            $scope.last7DaysStats['Reading Count']++;

            totalUsage += hour.averageUsage;
            $scope.last7DaysStats['Minimum Usage'] = Math.min(hour.averageUsage, $scope.last7DaysStats['Minimum Usage']);
            $scope.last7DaysStats['Maximum Usage'] = Math.max(hour.averageUsage, $scope.last7DaysStats['Maximum Usage']);

            totalTemp += hour.averageTempF;
            $scope.last7DaysStats['Minimum Temperature'] = Math.min(hour.averageTempF, $scope.last7DaysStats['Minimum Temperature']);
            $scope.last7DaysStats['Maximum Temperature'] = Math.max(hour.averageTempF, $scope.last7DaysStats['Maximum Temperature']);
        });

        // Compute averages using the stats we stored.
        $scope.last7DaysStats['Average Usage'] = totalUsage / $scope.last7DaysStats['Reading Count'];
        $scope.last7DaysStats['Average Temperature'] = totalTemp / $scope.last7DaysStats['Reading Count'];

        var plotOptions = {
            title: 'Last 7 Days',
            legend: {
                show: true
            },
            series: [{
                label: 'Usage (W)',
                markerOptions: {
                    show: false
                }
            }, {
                label: 'Temperature (&deg;F)',
                markerOptions: {
                    show: false
                },
                xaxis: 'xaxis',
                yaxis: 'y2axis'
            }

            ],
            axes: {
                xaxis: {
                    renderer: $.jqplot.DateAxisRenderer
                }
            },
            highlighter: {
                show: true,
                sizeAdjust: 10,
                tooltipLocation: 'n',
                formatString: '%s<br>%d'
            }
        };
        $scope.currentChart = $.jqplot('last_7_days_chart', [$scope.last7DaysUsagePlotData, $scope.last7DaysTempPlotData],
            plotOptions);
    };

    $scope.getLastHour = function () {
        energydashService.getLastHour().then(function (data) {
            $scope.lastHour = data;
        });
    };

    $scope.getHoursFromLast7Days = function () {
        energydashService.getHoursFromLast7Days().then(function (data) {
            $scope.hoursFromLast7Days = data;
            $scope.buildLast7DaysData();
        });
    };

    $scope.getLastHour();
    $scope.getHoursFromLast7Days();
});



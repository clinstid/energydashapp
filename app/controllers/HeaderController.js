/**
 * Created by clinstid on 2/2/14.
 */

app.controller('headerController', function ($scope) {
    $scope.activeView = 'current';

    $scope.isActive = function (viewName) {
        return viewName === $scope.activeView;
    };

    $scope.setActive = function (viewName) {
        $scope.activeView = viewName;
    };
});




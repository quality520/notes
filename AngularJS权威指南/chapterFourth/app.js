/*

angular.module('myApp',[])


.controller('firstController',function($scope,$timeout){
        var updateClock = function(){
            $scope.clock = new Date();
            $timeout(function(){
                updateClock();
            },1000);

        }
        updateClock();
    })
*/
function MyController($scope) {
    $scope.clock = new Date();
    var updateClock = function() {
        $scope.clock = new Date();
    };
    setInterval(function() {
        $scope.$apply(updateClock);
    }, 1000);
    updateClock();
};

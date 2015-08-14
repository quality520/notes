
angular.module('IDphoto',['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/',{templateUrl:'/index.html'})
            .when('/one',{templateUrl:'/one.html'})
            .otherwise({redirectTo:'/'});
    })
    .controller('IDphotoController',function($scope){
        $scope.getTextCode = '获取验证码';
        $scope.getCode = function(){
            timeStart = 10;
            var play = setInterval(function(){
                $scope.$apply(function(){
                    if(timeStart > 1 ){
                        $scope.getTextCode = --timeStart + ' 秒后获取';
                    }else{
                        clearInterval(play);
                        $scope.getTextCode = '获取验证码';
                    }
                })
            },1000);
        }
    })


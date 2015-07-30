

//创建模块，返回当前模块的对象
var myApp = angular.module('myApp',[]);
//定义myApp下的控制器
myApp.controller("firstController",function($scope){
	$scope.name="李四";
})


//定义控制器,全局控制器
/*function firstController($scope){
	$scope.name = "张三";
}*/
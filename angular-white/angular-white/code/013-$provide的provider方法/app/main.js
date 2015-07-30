

//创建模块，返回当前模块的对象
var myApp = angular.module('myApp',[],function($provide){
	
	//自定义服务
	$provide.provider("CustomService",function(){
		this.$get = function(){
			return {
				message : "CustomService"
			}
		}
	})
});
//定义myApp下的控制器
//将自定义的服务注入到控制器中
myApp.controller("firstController",function($scope,CustomService){
	$scope.name="李四";
	console.log(CustomService);
})


//定义控制器,全局控制器
/*function firstController($scope){
	$scope.name = "张三";
}*/
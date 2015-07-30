

//创建模块，返回当前模块的对象
var myApp = angular.module('myApp',[],function($provide){
	
	//自定义服务
	$provide.provider("CustomService",function(){
		this.$get = function(){
			return {
				message : "CustomService"
			}
		}
	});
	//自定义工厂
	$provide.factory('CustomFactory',function(){
		//factory可以返回任何值
		return [1,2,3,4,5];
	});
	//自定义服务
	$provide.service('customService2',function(){
		//service只能返回对象
		return ['上海','北京'];	
	})
});
//定义myApp下的控制器
//将自定义的服务注入到控制器中
myApp.controller("firstController",function($scope,CustomService,CustomFactory,customService2){
	$scope.name="李四";
	console.log(CustomService);
	console.log(CustomFactory);
	console.log(customService2);
})


//定义控制器,全局控制器
/*function firstController($scope){
	$scope.name = "张三";
}*/
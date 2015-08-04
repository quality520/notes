

angular.module('myApp',[])

.controller('firstController',function($scope){
	$scope.status = false;

	$scope.changeStatus = function(event){
		console.log(event.target);
		$scope.status = !$scope.status;
		//通过element转换为jQuery对象
		angular.element(event.target).html('状态切换' + !$scope.status);
	};

	//定义scope变量
	$scope.defaultStyle = {
		color:'red',
		'margin':'50px'
	};

	$scope.src='http://www.duba.com/static/images/public/20150731/4afff6e40d4f3502842225fe4ef249b8.jpg';
})
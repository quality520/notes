

angular.module('myApp',[])

.controller('firstController',function($scope){
	$scope.status = false;

	$scope.changeStatus = function(event){
		console.log(event.target);
		$scope.status = !$scope.status;
		//通过element转换为jQuery对象
		angular.element(event.target).html('状态切换' + !$scope.status);
	}
})



//链式书写
angular.module("myApp",[])

.factory("Data",function(){
	return {
		message : "共享的数据"
	}
})



.controller("firstController",function($scope,Data){
	$scope.data = {
		name : "white"
	}
	console.log($scope);
	$scope.Data = Data;
})


.controller("secondController",function($scope,Data){
	$scope.data = $scope.$$prevSibling.data;
	$scope.Data = Data;
})
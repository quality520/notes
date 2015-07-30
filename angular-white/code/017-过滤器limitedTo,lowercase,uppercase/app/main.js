


//链式书写
angular.module("myApp",[]).controller("firstController",function($scope,$filter){
	$scope.info = {
		name:'white',
		age:26,
		sex:'F',
		address:'china'
	}
	$scope.name = [
		{
			name:'Jordan',
			team:'bull'
		},
		{
			name:'Jeman',
			team:'cls'
		},
		{
			name:'Kobe',
			team:'lak'
		}
	]

	//过滤器
	var number = $filter('number')(3000);
	var jsonString = $filter('json')($scope.name);
	console.log(jsonString);
	console.log($scope.name);
	$scope.checkName = function(obj){
		if(obj.name.indexOf('J') == -1)
			return false;
		else return true;

	}
})

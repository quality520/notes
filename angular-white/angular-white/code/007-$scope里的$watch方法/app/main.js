

var firstController = function($scope){
	$scope.name = 'white';
	$scope.date = {
		name : 'quality',
		count : 20
	}

	$scope.count = 0;

	$scope.$watch('name',function(newValue,oldValue){
		//console.log(newValue,oldValue);
		++$scope.count;
		if($scope.count>30)
			$scope.name = '已经大于30次了！';
	});

	$scope.$watch('data',function(){

	},true)
}

/**/
angular.module('mainApp',[])
	.controller('mainCtrl',function($scope){
		$scope.submitForm = function(){
			console.log('提交啦!');
		};
	})

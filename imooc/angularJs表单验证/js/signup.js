/**/
angular.module('mainApp',[])
	.controller('signupController',function($scope){
		$scope.userdata = {};
		
		$scope.submitForm = function(){
			console.log($scope.userdata);
			if($scope.signupForm.$invalid){
				console.log('请检查您输入的信息！');
			}else{
				console.log('注册成功！');
			}
		};
	})

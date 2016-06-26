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
	
	.directive('compare',function(){
		var o = {};
		o.strict = 'AE';
		o.scope = {
			orgText : '=compare'
		};
		o.require = 'ngModel';
		o.link = function(sco, ele, att, con){
			con.$validators.compare = function(v){
				return v == sco.orgText;
			}
			sco.$watch('orgText',function(){
				con.$validate();
			});
		}
		return o;
	})

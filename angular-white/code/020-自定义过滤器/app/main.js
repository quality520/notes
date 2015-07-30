

angular.module('myApp',[],function($filterProvider,$provide,$controllerProvider){
	//定义一个服务
	$provide.service('Data',function(){
		return [
			{
				name : 'Jordan',
				age : 60,
				team : 'Bull'
			},
			{
				name : 'Kobe',
				age : 38,
				team : 'Laker'
			}
		]
	});

	//注册一个自定义过滤器
	$filterProvider.register('filterAge',function(){
		//在filerprovider.register中返回一个函数
		return function(obj){
			//console.log(obj);
			var ageObj = [];
			//angular.forEach()是angular中的遍历方法
			angular.forEach(obj,function(o){
				/*if(o.age > 40){
					ageObj.push(o);//将o驾到ageObj数组中
				}*/
				ageObj.push(o);
			});
			return ageObj;
		}
	});

	//定义一个控制器
	$controllerProvider.register('firstController',function($scope,Data){
		$scope.data = Data;
	})

})

//另外一种方式自定义过滤器，更简便,module.filter
.filter('filterTeam',function(){
	return function(obj){
		var ageObj = [];
		angular.forEach(obj,function(o){
			if(o.team == 'Bull'){
				ageObj.push(o);
			}
		});
		return ageObj;
	}
})
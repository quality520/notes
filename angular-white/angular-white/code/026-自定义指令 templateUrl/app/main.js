//有两种方式定义指令，一种如下
/*var myApp = angular.module('myApp',[],['$compileProvider',function($scopileProvider){
	$scopileProvider.directive('customTags',function(){
		//返回一个对象
		return {
			//restrict中的ECMA代表E：元素，C：类,M：注释，A：属性
			restrict : 'ECAM',
			template : '<div>custom-tags-html</div>',
			compile : function(){
				console.log(1);
			}
			replace : true
		}
	})
}])*/
//第二种
var myApp = angular.module('myApp',[])

.directive('customTags',function(){
	return {
		restrict : 'ECAM',
		templateUrl : 'tem/other.html',
		replace : true
	}
})
.directive('customTags2',function(){
	return {
		restrict : 'ECAM',
		templateUrl : 'customTags2',
		replace : true
	}
})

.controller('firstController',['$scope',function($scope){
	$scope.name = '张三';
}])

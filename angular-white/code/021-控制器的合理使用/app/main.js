
//
angular.module('myApp',[],function(){

})

.factory('CustomService',function($window){
	console.log($window);
})
//上述代码等价于下述代码
/*.factory('CustomService',['$window',function(a){
	console.log(a);
}])*/

//隐式的依赖注入第二个参数为一个function，参数必须是$scope
.controller('firstController',function($scope,CustomService){
	console.log(CustomService);
})


//显示的依赖注入
.controller('secondController',['$scope','$filter',function(a,b){
	console.log(b('json')([1,2,3,4,5,6]));
}])
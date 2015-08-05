/*
var myApp = angular.module('myApp',[],['$compileProvider',function($scopileProvider){
	$scopileProvider.directive('customTags',function(){
		//返回一个对象
		return {
			//restrict中的ECMA代表E：元素，C：类,M：注释，A：属性
			restrict : 'ECAM',
			template : '<div>custom-tags-html <span ng-transclude></span></div>',
			replace : true,
			//当transclude为true时，会将tempate的原始数据放入到ng-transclude里面
			transclude : true
		}
	})
}])
*/
var myApp = angular.module('myApp',[])

.directive('customTags',function(){
	//返回一个对象
	return {
		restrict : 'ECAM',
		template : '<div> custom-tags-html <span ng-transclude></span></div>',
		replace : true,
		transclude : true
	}
})

.directive('customTags2',function(){
	//返回一个对象
	return {
		restrict : 'ECAM',
		template : '<div>2</div>',
		replace : true,
		//定义优先级，默认为0
		priority : -1
	}
})
.directive('customTags3',function(){
	//返回一个对象
	return {
		restrict : 'ECAM',
		template : '<div>3</div>',
		replace : true,
		priority : 0 ,
		//定义terminal为true，只要priotity小于0的都不会执行
		terminal : true
	}
})





















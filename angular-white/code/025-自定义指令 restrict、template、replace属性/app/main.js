
var myApp = angular.module('myApp',[],['$compileProvider',function($scopileProvider){
	$scopileProvider.directive('customTags',function(){
		//返回一个对象
		return {
			//restrict中的ECMA代表E：元素，C：类,M：注释，A：属性
			restrict : 'ECAM',
			template : '<div>custom-tags-html</div>',
			/*compile : function(){
				console.log(1);
			}*/
			replace : true
		}
	})
}])

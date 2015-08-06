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
		template : '<div>{{user.name}}</div>',
		replace : true,
		//compile函数中三个参数
		compile:function(tElements,tAttrs,transclude){
			//compile可以改变DOM结构
			tElements.append(angular.element('<div>aaaa</div>'));
		/*
			console.log(tElements);
			console.log(tArrs);
			console.log(transclude);*/
			//编译阶段....
			console.log('customTags compile 编译阶段...');
			return {
				//表示编译之后，指令连接到子元素之前运行
				pre:function preLink(scope,iElements,iAttrs,controller){
					console.log(scope);
					console.log(iElements);
					console.log(iAttrs);
					console.log(controller);
					console.log('customTags compile preLink 阶段...');
				},
				//表示在所有子元素都连接指令之后运行
				post:function posiLink(scope,iElements,iAttrs,controller){
					iElements.on('click',function(){
						alert(scope.user.name);
						//进行脏检查
						scope.$apply(function(){
							scope.user.name = 'click me!';
						})
					})
					console.log('customTags all child directive link ....');
				}
			}
		},
		//此link就是compile中的postLink
		link:function(){
			//在compile中指定了postLink，这里不起作用
		}
	}
})
.directive('customTags3',function(){
	//返回一个对象
	return {
		restrict : 'ECAM',
		replace : true,
		priority : 0 ,
		//定义terminal为true，只要priotity小于0的都不会执行
		terminal : true,
		compile:function(tElements,tAttrs,transclude){
		/*
			console.log(tElements);
			console.log(tArrs);
			console.log(transclude);*/
			//编译阶段....
			console.log('customTags2 compile 编译阶段...');
			return {
				//表示编译之后，指令连接到子元素之前运行
				pre:function preLink(){
					console.log('customTags2 compile preLink 阶段...');
				},
				//表示在所有子元素都连接指令之后运行
				post:function posiLink(){
					console.log('customTags2 all child directive link ....');
				}
			}
		},
		link:function(){

		}
	}
})

.controller('firstController',function($scope){
	$scope.users = [
		{
			id : '10',
			name : 'white'
		},
		{
			id : '11',
			name : 'quality'
		}
	]
})




















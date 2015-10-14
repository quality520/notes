/**
 * Created by Root on 2015/10/14 0014.
 */
angular.module("myApp",[])
.directive("myDirective",function(){
        return {
            restrict: "E",//指令中可以指定以元素(E)、属性(A)、类(C)或注释(M)的格式来调用指令
            replace: true,//将自定义标签从DOM中移除
            template:"<a href='http://www.baidu.com'>Click me to go to Baidu</a>"
        }
    })
.directive("myDirective2",function(){
        return {
            restrict: "EACM",
            replace: true,
            scope:{
               myUrl: "@",//绑定策略
               myLinkText: "@" //绑定策略
            },
            template: "<a href='{{myUrl}}'>{{myLinkText}}</a>"
        }
    })
.directive("myDirective3",function(){
    return {
        restrict: "EACM",
        replace: true,
        scope: {
            myUrl: "@",
            myLinkText: "@"
        },
        template: "<div><input type='text'ng-model='myUrl' /><a href='{{myUrl}}'>{{myLinkText}}</a></div>"
    }
})
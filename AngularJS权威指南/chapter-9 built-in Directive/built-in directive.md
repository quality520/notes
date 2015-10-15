#chapter 9 build-in directive
####AngularJS提供了很多内置的指令
####9.1 基础内置指令
    首先来看看和原生HTML标签名称相似的一组内置指令，仅仅在原生标签前加上了"ng"前缀
      ng-href
      ng-src
      ng-disabled
      ng-checked
      ng-readonly
      ng-selected
      ng-class
      ng-style
    1,布尔属性
      当在AngularJS中使用动态数据绑定时，不能简单地将这个属性设置为true或false，因此根据标准定义只有当这个属性不出现时，它的值才为false
      因此AngularJS提供了一组带有ng-前缀邦本的布尔属性，通过运算表达式的值来决定在目标元素上是插入还是移除对应的属性。
       1，ng-disabled
        使用ng-disabled可以把disabled属性绑定到以下表单输入字段上：
         <input>(text、checkbox、radio、number、url、email、submit);
         <textarea>
         <select>
         <button>
        当写普通的HTML输入字段时，如果元素标签上出现了disabled属性就会禁用这个输入字段。
        通过ng-disabled可以对是否出现属性进行绑定。
        请看下面的例子，按钮会一直禁用，知道用户在文本字段中输入内容。
          <input type="text" ng-model="someProperty" placeholder="TypetoEnable">
          <<button ng-model="button" ng-disable="!someProperty">Abutton</button>
        在下面例子中，文本字段会被禁用5秒，知道在$timeout中将isDisabled属性设置为false
          <textarea ng-disabled="isDisabled" cols="30" rows="10">Wait five seconds</textarea>

          angular.module("myApp",[])
          .controller("disController",function($rootScope,$timeout){
            $rootScope.isDisabled = true;
            $timeout(function(){
              $rootScope.isDisabled = false;
            },5000);
          })
         2,ng-readonly











































# chapter 8 directive
###8.1指令：自定义HTML元素和属性
    
    自定义指令
    <my-better-video my-href="/goofy-video.mp4">Caneventaketext</my-better-video>
    <video my-href="/goofy-video.mp4">Can still take children nodes</video>
    指令和其他其他指令或属性结合在一起使用，这种组合方式就做合成。
####1,HTML引导
    在HTML中要内置指令ng-app标记出应用的根节点。这个指令需要以属性的形式来使用，因此可以将它写到内容位置，但是写到<html>的开始标签上是最常规的做法：
    tips:内部指令是打包在AngularJS内部的指令。所有内置指令的命名空间都使用ng作为前缀。为了防止命名空间冲突，不要在自定义指令前加ng前缀。
        <html ng-app="myApp">
          <!-- 应用的$rootScope -->
        </html>
    在HTML元素中可以使用所有内置或自定义指令。同时，基于javascript原型继承机制，任何在这个根元素内部的指令，只要能够访问这个作用域，就可以访问
    $rootScope。这里的能够访问作用域指的是同DOM进行了链接，这个操作会在指令稍后的生命周期中进行。
####2,我们的第一个指令
    <my-directive></my-directive>
    myDirective指令的定义：
        angular.module("myApp",[])
        .directive("myDirective",function(){
          return {
            restrict: "E",
            template: "<a href='http://google.com'>Click me to go to Google</a>"
          };
        });
    通过AngularJS模块API中的.directive()方法，我们可以通过传入一个字符串和一个函数来注册一个新的指令。
      其中字符串是这个指令的名字，指令名应该遵循驼峰命名风格的，函数应该返回一个对象。
        tips：驼峰命名风格用来将一个短语写在一个单词中，除了第一个单词外其他单词首字母大写，中间不加空格。
              在上述例子中，在HTML里使用my-directive声明指令，因此指令定义不许以myDirective为名字。
    默认情况下，AngularJS将模板生成的HTML代码嵌套在自定义标签<my-directive>内部
    通过查看chrome，可以看到HTML结构
        <my-directive><a href="http://www.google.com">Click me to go to google</a></my-directive>
    我们可以将自定义标签从生成的DOM中移除掉，并且只留下由模板生成的链接。将replace设置为true就可以实现这个效果了。
        angular.module("myApp",[])
            .directive("myDirective",function(){
               return {
                  restrict: "E",
                  replace: true，
                  template: "<a href='http://google.com'>Click me to go to Google</a>"
               };
            });
        chrome浏览器中HTML结构
            <a href="http://www.google.com">Click me to go to google</a>
        replace方法会用自定义元素取代指令声明，而不是嵌套在其内部
        
        我们吧创建的这些自定义元素称作指令(用.directive()方法创建)，因为事实上声明指令并不需要创建一个新的自定义元素。
          tips:声明指令本质上是在HTML中通过元素、属性、类或注释来添加功能。
        下面都是用来声明前面创建指令的合法格式:
          <my-directive></my-directive>  //需要将restrict设置为E;
          <div my-directive></div>      //需要将restrict设置为A
          <div class="my-directive"></div>      //需要将restrict设置为C
          <!-- directive:my-directive -->       //需要将restrict设置为M
          
        为了让AngularJS能够调用我们的指令，需要修改指令定义中的restrict设置。
        这个设置告诉AngularJS在编译HTML时用那种声明格式来匹配指令定义。
          指令中可以指定以元素(E)、属性(A)、类(C)或注释(M)的格式来调用指令
          E:element A:attribute C:class 
        tips：好的经验法则就是使用用属性(A)来声明指令，这样会给以后带来方便
####3,表达式
    <h1 ng-init="greeting='HelloWorld'">
        The greeting is: {{ greeting }}
    </h1>
    //=>The greeting is:HelloWorld
    当前作用域
        由DOM通过内置指令ng-controller提供的作用域，这个指令的作用是在DOM中创建一个新的子作用域：
            <p>We can access: {{ rootProperty }}</p>
              <div id="parentCtrl" ng-controller="ParentCtrl">
                <p>We can access: {{ rootProperty }} and {{ parentProperty }}</p>
                <div id="childCtrl" ng-controller="ChildCtrl">
                  <p>
                    We can access:
                    {{ rootProperty }} and
                    {{ parentProperty }} and
                    {{ childProperty }}
                  </p>
                  <p>{{ fullSentenceFromChild }}</p>
                </div>
              </div>
            
              <script>
                angular.module('myApp', [])
                .run(function($rootScope) {
                  // use .run to access $rootScope
                  $rootScope.rootProperty = 'root scope';
                })
                .controller('ParentCtrl', function($scope) {
                  // use .controller to access properties inside `ng-controller`
                  // in the DOM omit $scope, it is inferred based on the current controller
                  $scope.parentProperty = 'parent scope';
                })
                .controller('ChildCtrl', function($scope) {
                  $scope.childProperty = 'child scope';
                  // just like in the DOM, we can access any of the properties in the
                  // prototype chain directly from the current $scope
                  $scope.fullSentenceFromChild = 'Same $scope: We can access: ' +
                                                 $scope.rootProperty + ' and ' +
                                                 $scope.parentProperty + ' and ' +
                                                 $scope.childProperty
                });
              </script>
        其他内置指令(比如ng-include和ng-view)也会创建新的子作用域，这以为着他们在被调用时行为和ng-controller类似
        我们在构造子弟你指令时也可以创建新的子作用域。
###8.2 向指令中传递数据
    .directive("myDirective",function(){
            return {
                restrict: "E",//指令中可以指定以元素(E)、属性(A)、类(C)或注释(M)的格式来调用指令
                replace: true,//将自定义标签从DOM中移除
                template:"<a href='http://www.baidu.com'>Click me to go to Baidu</a>"
            }
    })
    注意我们在模板中硬编码了URL和链接文本：
        template:"<a href='http://www.baidu.com'>Click me to go to Baidu</a>"
    AngularJS并没有限制在指令的模板中硬编码字符串
    如果不将URL和链接文本混在指令内部，可以为其他使用我们指令的人提供更好的体验
    我们的目标是关注指令的公共接口，就像其他编程语言一样，实际上，应该将上面的模板转换成可以接受两个变量的形式
        一个变量是URL，另一个是链接文本：
            template:"<a href='{{myUrl}}'>{{myLinkText}}</a>"
        在主HTML文档中，可以给指令添加myUrl和myLinkText两个属性，这两个参数会变成内部作用域的属性：
            <div my-directive my-url="http://www.baidu.com" my-link-text="Click mt to go to baidu"></div>
        得到的结果：链接href属性是空的，并且尖括号内也没有文本。
        
    内置指令ng-model在它自身内部的隔离作用域和DOM的作用域(由控制器提供)之间创建改了一个双向数据绑定。    
        
    <label>Their URL field:</label>
      <input type="text" ng-model="theirUrl">
      <div my-directive
           some-attr="theirUrl"
           my-link-text="Click me to go to Google"></div>
    
      <script>
        angular.module('myApp', [])
        .directive('myDirective', function() {
          return {
            restrict: 'A',
            replace: true,
            scope: {
              myUrl: '=someAttr',
              myLinkText: '@'
            },
            template: '\
              <div>\
                <label>My Url Field:</label>\
                <input type="text" ng-model="myUrl" />\
                <a href="{{myUrl}}">{{myLinkText}}</a>\
              </div>\
            '
          }
        })
      </script>
    
    
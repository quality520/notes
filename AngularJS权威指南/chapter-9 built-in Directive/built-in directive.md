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
         同其他布尔属性一样，HTML定义只会检查readonly属性是否出现，而不是它的实际值
         通过ng-readonly可以将某个返回真或假的表达式同是否出现readonly属性进行绑定:
          Type here to make sibling readonly:
          <input type="text" ng-model="someProperty">
          <br/>
          <input type="text" ng-readonly="someProperty" value="Some text here">
         3,ng-checked
         标准的checked属性是一个布尔值，不需要进行赋值。通过ng-checked将某个表达式同是否出现checked属性进行绑定
           通过ng-init指令将someProperty的值设置为true。将someProperty同ng-checked绑定在一起，AngularJS会输出标准的HTML checked属性
             <label>someProperty = {{someProperty}}</label>
             <input type="checkbox" ng-checked="someProperty" ng-init="someProperty = true" ng-model="someProperty">

             <label>someProperty = {{anotherProperty}}</label>
             <input type="checkbox" ng-checked="anotherProperty" ng-init="anotherProperty = false" ng-model="anotherProperty">
         3,ng-selected
             ng-selected可以对是否出现option标签的selected属性进行绑定
    2,类布尔属性
      ng-href、ng-src等属性虽然不是标准的HTML布尔属性，但是由于行为相似，所以AngularJS源码内部适合布尔属性同等对待的。
      ng-href和ng-src都能有效帮助重构和避免错误，因此在改进代码时强烈建议用他们来替代原来的href和src
        1,ng-href
          当使用当前作用域中的属性动态创建URL时，应该用ng-href代替href。
            <a ng-href="{{myUrl}}">le's go !!!</a>
            <br>
            <a ng-href="{{myUrl2}}">wait 2 second</a>
            <script src="../library/scripts/angular.js"></script>
            <script>
              angular.module("myApp",[])
              .controller("hrefController",function($rootScope,$timeout){
                $rootScope.myUrl = "http://www.baidu.com";
                $timeout(function(){
                  $rootScope.myUrl2 = "http://www.google.com";
                },2000);
              })
            </script>
        2,ng-src
          AngularJS会告诉浏览器在ng-src对应的表达式生效之前不要加载图像：
            <label>First images:</label><br>
            <img src="{{imgSrc}}" />
            <br>
            <label>Second images:</label><br>
            <img ng-src="{{imgSrc}}" />

            <script src="../library/scripts/angular.js"></script>
            <script>
              angular.module("myApp",[])
              .controller("srcController",function($rootScope,$timeout){
                $timeout(function(){
                  $rootScope.imgSrc = "http://g.hiphotos.baidu.com/image/pic/item/2934349b033b5bb5e72933f034d3d539b700bcc5.jpg"
                },2000);
              })
####9.2 在指令中使用子作用域
    下面将要介绍的指令会以父级作用域为圆形生成子作用域。这种继承的机制可以创建一个隔离层，用来将需要协同工作的方法和数据模型对象放置在一起。
      ng-app和ng-controller是特殊指令，因为他们会修改嵌套在他们内部的指令的作用域
      ng-app为AngularJS应用创建$rootScope，ng-controller则会以$rootScope或另外一个ng-controller的作用域为圆形创建新的子作用域。
      1,ng-app
        任何具有ng-app属性的DOM元素将被标记为$rootScope的起始点。
        $rootScope是作用域链的起始点，任何嵌套在ng-app内的指令都会继承它。
          <label>{{someProperty}}</label>
          <button ng-click="someAction()">Click me !</button>


          <script src="../library/scripts/angular.js"></script>
          <script>
            angular.module("myApp",[])
            .controller("mainCtrl",function($rootScope){
              $rootScope.someProperty = "hello world!";
              $rootScope.someAction = function(){
                $rootScope.someProperty = "hello computer";
              }
            })
          </script>
        在这里为了演示方便，使用全局作用域一样使用$rootScope,实际上不建议这样做。
        整个文档中只能使用一次ng-app。如果需要在一个页面中放置多个AngularJS应用，需要手动导入应用
      2,ng-controller
        内置指令ng-controller的作用是为嵌套在其中的指令创建一个子作用域，避免将所有操作和模型都定义在$rootScope上，用这个指令可以在一个DOM元素上放置控制器。
          ng-controller接受一个参数expression，这个参数是必须的。
          expression参数是AngularJS表达式。
          子$scope只是一个javascript对象，其中含有从父级$scope中通过原型继承得到的方法和属性，包括应用的$rootScope。
          嵌套在ng-controller中的指令有访问新子$scope的权限，但是要牢记每个指令都应该遵守的和作用域相关的规则。
        tips:$scope对象的职责是承载DOM中指令所共享的操作和模型。
          操作：指的是$scope上的标准javascript方法
          模型：指的是$scope上保存的包含瞬时状态数据的javascript对象。持久化状态的数据应该保存在服务中，服务的作用是处理模型的持久化。
            <div ng-controller="SomeCtrl">
                {{ someBareValue }}
                <button ng-click="someAction()">Communicate to child</button>
                <div ng-controller="ChildCtrl">
                  {{ someBareValue }}
                  <button ng-click="childAction()">Communicate to parent</button>
                </div>
              </div>

              <script>
                angular.module('myApp', [])
                .controller('SomeCtrl', function($scope) {
                  // anti-pattern, bare value
                  $scope.someBareValue = 'hello computer';
                  // set actions on $scope itself, this is okay
                  $scope.someAction = function() {
                    $scope.someBareValue = 'hello human, from parent';
                  };
                })
                .controller('ChildCtrl', function($scope) {
                  $scope.childAction = function() {
                    $scope.someBareValue = 'hello human, from child';
                  };
                });
              </script>
            由于原型继承的关系，修改父级对象中的someBarValue会同时修改子对象中的值，反之则不行
            这个例子充分说明了子控制器是复制而非引用someBarValue
              tips:javascript对象要么是值复制，要么是引用复制。字符串、数字和布尔型变量是值复制。数组、对象和函数则是引用复制。
            如果将模型对象的某个属性设置为字符串，他会通过引用进行共享，因此在子$scope中修改属性也会修改父$scope中的这个属性。
            <div ng-controller="SomeCtrl">
                {{ someModel.someValue }}
                <button ng-click="someAction()">Communicate to child</button>
                <div ng-controller="ChildCtrl">
                  {{ someModel.someValue }}
                  <button ng-click="childAction()">Communicate to parent</button>
                </div>
              </div>

              <script>
                angular.module('myApp', [])
                .controller('SomeCtrl', function($scope) {
                  // best practice, always use a model
                  $scope.someModel = {
                    someValue: 'hello computer'
                  }
                  $scope.someAction = function() {
                    $scope.someModel.someValue = 'hello human, from parent';
                  };
                })
                .controller('ChildCtrl', function($scope) {
                  $scope.childAction = function() {
                    $scope.someModel.someValue = 'hello human, from child';
                  };
                });
              </script>
            无论点击那个按钮，值都会进行同步修改
            warning:虽然这个特性是使用ng-controller时最重要的特性之一，但在使用任何会创建子作用域的指令事，如果将指令中的scope设置为true，这个特性将带来负面影响。
            下面的内置指令都有同样的特性：
                ng-include
                ng-switch
                ng-repeat
                ng-view
                ng-controller
                ng-if
      3,ng-include
        使用ng-include可以加载、编译并包含外部HTML片段到当前的应用中。模板的URL被限制在与应用文档相同的域he写一下，可以通过白名单或包装成被新人的值来突破限制。更进一步，需要考虑跨域资源共享(Cross-Origin Resouce Sharing,CORS)和同源规则(Same Origin Policy)来确保模板可以在任何浏览器中正常加载。例如所有浏览器都不能进行跨域的请求，部分浏览器也不能访问file://协议的资源
          tips：在开发中，可以通过命令行命令chrome --allow-file-access-from-files来禁止CORS错误。
        在同一个元素上添加onload属性可以在模板加载完成后执行一个表达式
        要记住，在使用ng-include时AngularJS会自动闯将一个子作用域。如果你想要使用某个特定的作用域，例如ControllerA的作用域，必须在同一个DOM元素上添加ng-controller="ControllerA"指令，这样当模板加载完成之后，不会像往常一样从外部作用域继承并创建一个新的作用域。例如
          div ng-include="/myTemplateName.html" ng-controller="MyController" ng-init="name=world">hello {{name}}</div>
      4,ng-switch
        这个指令和ng-switch-when和on="propertyName"一起使用，可以在propertyName发生变化时渲染不同指令到视图中。
          下面例子中，当person.name时Ari时，文本下面的div会显示出来。
            <input type="text" ng-model="persion.name" />
            <div ng-switch on="persion.name">
              <p ng-switch-default>And the winner is</p>
              <h1 ng-switch-when="Ari">{{persion.name}}</h1>
            </div>  
      5,ng-view
        ng-view指令用来设置将路由管理和放置HTML中的视图的位置
          <div ng-view></div>
      6,ng-if
        ng-if指令可以完全根据表达式的值在DOM中生成或移除一个元素，如果赋值给ng-if的值为false，那么对应的元素将会从DOM中移除，否则对应元的一个克隆将被重新插入到DOM中
          ng-if同ng-show/ng-hide指令的最本质的区别是：它不是通过CSS显示或隐藏DOM节点，二十真正生成或移除节点。
          当一个元素被ng-if从DOM中移除，同它关联的作用域也会被销毁。而且当它重新加入DOM中时，会通过原型继承从它的父作用域生成一个新的作用域。
          tips：一个重要的细节需要知道，ng-if重新创建元素用的使他们编译后的状态。如果ng-if内部代码加载之后被jQuery修改过(.addClass)，那么当ng-if的表达式值为false时，这个DOM元素会被移除，表达式再次为true时这个元素内部的子元素会被重新插入到DOM中，此时这个元素的状态时他们的原始状态，而不是他们上次被移除时的状态，也就是说无论用jQuery的.addClass添加了任何类都不会存在
            <div ng-if="2+2===5">won't see this DOM code,not even in the source code</div>
            <div ng-if="2+2===4">Hi,i do exist</div>
      7,ng-repeat
        ng-repeat用来遍历一个集合或为一个集合中的每个元素生成一个模板实例。集合中的每个元素都会被赋予自己的模板和作用域。同时每个模板实例的作用域中都会暴露一些特殊的属性。
          □$index:遍历的进度(0 ... length-1)
          □$first:当元素时遍历第一个值时为true
          □$middle:当元素处于第一和最后元素之间时值为true
          □$last:当元素时遍历最后一个时值为true
          □even:当$index值时偶数时值为true
          □odd:当$index值为奇数时值为true
            <ul ng-controller="peopleController">
              <li ng-repeat="person in people" ng-class="{even:!$even,odd:!$odd}">
                {{person.name}} lives in {{person.city}}
              </li>
            </ul>
            
            <script>
              angular.module("myApp",[])
              .controller("peopleController",function($scope){
                $scope.people = [
                  {name:"Ari",city:"San Francisco"},
                  {name:"Erik",city:"Seattle"}
                ];
              })
            </script>
      8,ng-init
        ng-init指令用来在指令被调用时设置内部作用域的初始化状态
        ng-init最常见的使用场景时：在类似本节的例子中那样，需要创建小的示例代码的时候
        对于任何需要健壮结构的场景，请在控制器中用数据模型对象来设置状态。
          <div ng-init="greeting='hello';person='world'">
            {{greeting}} {{person}}
          </div>
      9,{{}}
        <div>{{name}}</div>
        {{}}语法是AngularJS内置的模板语法，它会在内部的$scope和视图之间创建绑定。基于这个绑定，只要$scope发生变化，视图就会随之自动更新。
        {{}}是ng-bind的简略形式，用这种形式不需要创建新的元素，因此它常被用在行内文本中
        tips:在屏幕可视的区域使用{{}}会导致页面加载时未渲染的元素发生闪烁，用ng-bind可以避免这个问题。
          <div ng-init="greeting='hello World'">
            {{greeting}}
          </div>
      10,ng-bind
        尽管可以在视图中使用{{}}模板语法(AngularJS内置的方式)，我们也可以通过ng-bind指令实现同样的行为。
          <div ng-init="greeting='helloWorld'">
            <p ng-bind="greeting"></p>
          </div>
          HTML加载含有{{}}语法的元素后并不会立刻渲染他们，导致为渲染内容闪烁(Flash of Unrendered Content,FOUC)。我们可以用ng-bind将内容同元素绑定在一起避免FOUC。内容会被当作子文本节点渲染到含有ng-bind指令的元素内。
      11,ng-cloak
        除了使用ng-bind来避免未渲染元素闪烁，还可以在含有{{}}的元素上使用ng-cloak指令：
          <div ng-init="gteeting='hello world'">
            <p ng-cloak>{{greet}}</p>
          </div>
          ng-cloak指令会将内部元素隐藏，知道路由调用对应的页面才显示出来。
      12,ng-bind-template
        同ng-bind指令类似，ng-bind-template用来在视图中绑定多个表达式
          <div ng-bind-template="{{message}}{{name}}">
          </div>
      13,ng-model
        ng-model指令用来将input、select、textarea或自定义表单控件同包含它们的作用域中的属性进行绑定。它可以提供并处理表单验证功能，在元素上设置相关的CSS类(ng-valid/ng-invalid等)，并负责在父表单中注册控件。
        它将当前作用域中运算表达式的值同给定的元素进行绑定。如果属性不存在，它会隐式创建并将其添加到当前作用域中。
        我们应该始终用ngModel来绑定$scope上一个数据模型内的属性，而不是$scope上的属性，这样可以避免在作用域或后代作用域中发生属性覆盖。
        <input type="text" ng-model="modeName.someProperty" />
      14,ng-show/ng-hide
        ng-show和ng-hide根据所给表达式的值来显示或隐藏HTML元素。当赋值为ng-show指令的值为false时元素会被隐藏，类似的，当赋值ng-
        元素的显示和隐藏时通过移除或添加ng-hide这个CSS类来说实现的。.ng-hide类被预先定义在了AngularJS的css文件中，并且它的display属性的值为none(用了!important标记)
          <div ng-show="2+2 ==5"> 
            2 + 2 isn't 5,don't show!
          </div>
          <div ng-show="2+2 ==4">
            2 + 2 is 4,do show!
          </div>
          <div ng-hide="2+2 ==5"> 
            2 + 2 isn't 5,don't hide!
          </div>
          <div ng-hide="2+2 ==4">
            2 + 2 is 4,do hide
          </div>
      15,ng-change
        这个指令会在表单输入发生变化时计算给定表达式的值。因为要处理表单输入。这个指令要和ngModel联合起来使用。
          <div ng-controller="EquationController">
            <input type="text" ng-model="equation.x" ng-change="change()"/>
            <code>{{equation.output}}</code>
          </div>

          angular.module("myApp",[])
          .controller("EquationController",function($scope){
            $scope.equation = {};
            $scope.change = function(){
              $scope.equation.output = 
                parseInt($scope.equation.x) + 2;
            }
          })
        上面的例子，只要文本输入字段中的内容发生了变化就会改变equation.x的值，进而运行change()函数

      16,ng-form
        ng-form用来在一个表单内部嵌套另一个表单.普通的HTML<form>标签不允许嵌套，但ng-form可以
        这意味着内部所有的子表单都合法时，外部的表单才会合法。这对于用ng-rapeat动态创建表单时非常有用的。
        由于不能通过字符插值来输入元素动态地生成name属性，所以需要将ng-form指令内每组重复的输入字段都包含一个外部表单元素内
          下面的css类会根据表单的验证状态自动设置：
            1,表单合法时设置ng-valid
            2,表单不合法时设置ng-invalid
            3,表单为进行修改时设置ng-pristion
            4,表单进行修改时设置ng-dirty
        AngularJS不会将表单提交到服务器,除非它指定了action属性.要指定提交表单时调用那个javascript方法,使用下面两个指令中的一个.
          1,ng-submit:在表单元素上使用
          2,ng-click:在第一个按钮或submit类型(input[type=submit])的输入字段上使用.


          <form name="signup_form" ng-controller="FormController" ng-submit="submitForm()" novalidate>
            <div ng-repeat="field in fields" ng-form="signup_form_input">
                <input type="text" name="dynamic_input" ng-required="field.isRequired" ng-model="field.name" placeholder="{{field.placeholder}}" />
              <div ng-show="signup_form.signup_form_input.dynamic_input.$dirty && signup_form.signup_form_input.$invalid">
                <span ng-show="signup_form.signup_form_input.$error.required">
                  the field is required.
                </span>
              </div>
            </div>
            <button type="btton" ng-disabled="signup_form.$invalid">
              submit all
            </button>
          </form>
          <script src="../library/scripts/angular.js"></script>
          <script>
            angular.module('myApp',[])
            .controller('FormController',function($scope) {
              $scope.fields = [
                {placeholder: 'Username', isRequired: true},
                {placeholder: 'Password', isRequired: true},
                {placeholder: 'Email (optional)', isRequired: false}
              ];
              $scope.submitForm = function() {
                alert("it works!");
              };
            });
          </script>
          s上述例子展示了如何通过服务器返回的JSON数据动态生成一个表单。我们用ng-repeat来遍历从服务器取回的所有数据。由于不能动态生成name属性，而我们又需要这个属性作验证，所有在循环的过程中为每一个字段都生成一个新表单。
          由于AngularJS中用来取代<form>的ng-form指令可以嵌套，并且外部表单在所有子表单都合法之前一直处于不合法状态，因此我们可以在动态生成表单的同时使用表单验证功能
      17,ng-click
        ng-click用来指定一个元素被点击时调用的方法或表达式。
          <div ng-controller="sumController">
            <button ng-click="count=count + 1" ng-init="count=0">Increment</button>
            count:{{count}}
            <br/>
            <button ng-click="decrement()">Decrement</button>
          </div>
          <script src="../library/scripts/angular.js"></script>
          <script>
            angular.module("myApp",[])
            .controller("sumController",function($scope){
              $scope.decrement = function(){
                $scope.count = $scope.count + 1;
              }
            })
          </script>
      18,ng-select
        ng-select用来将数据同HTML的<select>元素进行绑定。这个指令可以和ng-model以及ng-options指令一同使用，构建惊喜且表现优良的动态表单。
        ng-options的值可以时一个内涵表达式(comprehension expression),它接受一个数组或对象，并对他们进行循环，将内部的内容提供给select标签内部的选项，它可以时下面两种形式：
          1,数组作为数据源：
            用数组中的值做标签；
            用数组中的值作为选中的标签；
            用数组中的值做标签组；
            用数组中的值作为选中的标签组。
          2,对象作为数据源：
            用对象的键值（key-value）做标签；
            用对象的键值作为选中的标签；
            用对象的键值作为标签组；
            用对象的键值作为选中的标签组。
          <div ng-controller="seleController">
            <select ng-model="city" ng-options="city.name for city in cities">
              <option value="">select city</option>
            </select>
            select:{{city.name}}
          </div>
          <script src="../library/scripts/angular.js"></script>
          <script>
            angular.module("myApp",[])
            .controller("seleController",function($scope){
              $scope.cities = [
                {name: 'Seattle'},
                {name: 'San Francisco'},
                {name: 'Chicago'},
                {name: 'New York'},
                {name: 'Boston'}
              ]
            })
          </script>
      19,ng-submit
        ng-submit用来将表达式同onsubmit事件进行绑定。这个指令同时会阻止默认行为(发送请求并重新加载页面)，除非表单不包含有action属性。
          <form ng-controller="subController" ng-submit="submit()"> 
            Enter text and hit enter:
            <input type="text" ng-model="person.name" name="person.name">
            <input type="submit" name="person.name" value="submit"/>
            <code>people={{people}}</code>
            <ul ng-repeat="(index,object) in people">
              <li>{{object.name}}</li>
            </ul>
          </form>
          <script src="../library/scripts/angular.js"></script>
          <script>
            angular.module("myApp",[])
            .controller("subController",function($scope){
              $scope.person = {name:null};
              $scope.people = [];
              $scope.submit = function(){
                if($scope.person.name){
                  $scope.people.push({name:$scope.person.name});
                  $scope.person.name = "";
                }
              }
            })
          </script>
      20,ng-class
        使用ng-class动态设置元素的类，方法时绑定一个代表所有需要添加的类的表达式。重复的类不会添加。当表达式发生变化，先前添加的类会被移除，新类会被添加。
          下面的例子会用ng-class在一个随机数大于5时将.red类添加到一个div上:
            <style>
              .red{background:#f00;}
            </style>

            <div ng-controller="clsController">
              <div ng-class="{red:x>5}" ng-if="x > 5">
                you Won!!
              </div>
              <button ng-click="x=generateNumber()" ng-init="x=0">
              Draw Number</button>
              <p>Number is:{{x}}</p>
            </div>

            <script src="../library/scripts/angular.js"></script>
            <script>
              angular.module("myApp",[])
              .controller("clsController",function($scope){
                $scope.generateNumber = function(){
                  return Math.floor((Math.random()*10)+1);
                }
              })
            </script>
      21,ng-attr-(suffix)
        当AngularJS编译DOM时会查找花括号{{some expression}}内的表达式。这些表达式会被自动注册到$watch服务中并更新到$digest循环中，成为它的一部分：
          <!-- updated when 'someExpression' on the $scope is updated -->
          <h1>{{ someExpression }}</h1>
        有时候浏览器会对属性进行很苛刻的限制。SVG就是一个例子：
          <svg>
            <circle cx="{ cx }"></circle>  
          </svg>
        运行上述代码会抛出一个错误，指出我们有一个非法属性。可以用ng-attr-cx来解决这个问题。
          tips:cx位于这个名称的尾部，在这个属性中，通过{{}}来写表达式，达到前面提到的目的。
            <svg>
              <circle ng-attr-cx="{{ cx }}"></circle>
            </svg>
















































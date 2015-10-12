<<<<<<< HEAD
#chapter 7 过滤器
    字符串转换成大写 {{name | uppercase}}
####在javascript代码中可以通过$filter来调用过滤器
    app.controller("DemoController",["$scope","$filter",function($scope,$filter){
      $scope.name = $filter("lowercase")("Ari");
    }]);
####以HTML的形式使用过滤器时，如果需要传递参数给过滤器，只要在过滤器名字后面加冒号即可。如果有多个参数，可以在每个参数后面都加冒号。
#####例如： 数值顾虑器可以限制小数点后的位数，在过滤器后写上:2可以将2作为参数传给过滤器：
    <!-- 显示：123.46 -->
    {{ 123.456789 | number:2 }}
#####AngularJS提供的内置过滤器
    1,currency
    currency过滤器可以将一个数值格式化为货比格式。用{{123 | currency}}来将123转化成货比格式。currency过滤器允许我们自己设置货币符号
    2，date
    date过滤器可以将日期格式化成需要的格式。AngularJS中内置了几种日期格式，如果没有指定使用任何格式，默认采用mediumDate格式
    {{ today | date:'medium' }} <!-- Aug 09, 2013 12:09:02 PM -->
    {{ today | date:'short' }} <!-- 8/9/1312:09PM -->
    {{ today | date:'fullDate' }} <!-- Thursday, August 09, 2013 -->
    {{ today | date:'longDate' }} <!-- August 09, 2013 -->
    {{ today | date:'mediumDate' }}<!-- Aug 09, 2013 -->
    {{ today | date:'shortDate' }} <!-- 8/9/13 -->
    {{ today | date:'mediumTime' }}<!-- 12:09:02 PM -->
    {{ today | date:'shortTime' }} <!-- 12:09 PM -->
      年份格式化
    四位年份：{{ today | date:'yyyy' }} <!-- 2013 -->
    两位年份：{{ today | date:'yy' }} <!-- 13 -->
    一位年份：{{ today | date:'y' }} <!-- 2013 -->
      月份格式化
    英文月份：{{ today | date:'MMMM' }} <!-- August -->
    英文月份简写：{{ today | date:'MMM' }} <!-- Aug -->
    数字月份：{{ today |date:'MM' }} <!-- 08 -->
    一年中的第几个月份：{{ today |date:'M' }} <!-- 8 -->
      日期格式化
    数字日期：{{ today|date:'dd' }} <!-- 09 -->
    一个月中的第几天：{{ today | date:'d' }} <!-- 9 -->
    英文星期：{{ today | date:'EEEE' }} <!-- Thursday -->
    英文星期简写：{{ today | date:'EEE' }} <!-- Thu -->
      小时格式化
    24小时制数字小时：{{today|date:'HH'}} <!--00-->
    一天中的第几个小时：{{today|date:'H'}} <!--0-->
    12小时制数字小时：{{today|date:'hh'}} <!--12-->
    上午或下午的第几个小时：{{today|date:'h'}} <!--12-->
      分钟格式化
    数字分钟数：{{ today | date:'mm' }} <!-- 09 -->
    一个小时中的第几分钟：{{ today | date:'m' }} <!-- 9 -->
      秒数格式化
    数字秒数：{{ today | date:'ss' }} <!-- 02 -->
    一分钟内的第几秒：{{ today | date:'s' }} <!-- 2 -->
    毫秒数：{{ today | date:'.sss' }} <!-- .995 -->
      字符格式化
    上下午标识：{{ today | date:'a' }} <!-- AM -->
    四位时区标识：{{ today | date:'Z' }} <!--- 0700 -->
    下面是一些自定义日期格式的示例：
    {{ today | date:'MMMd, y' }} <!-- Aug9, 2013 -->
    {{ today | date:'EEEE, d, M' }} <!-- Thursday, 9, 8-->
    {{ today | date:'hh:mm:ss.sss' }} <!-- 12:09:02.995 -->
    3，filter
    filter过滤器可以从给定数组中选择一个子集，并将其生成一个新的数组。这个过滤器通常用来过滤需要进行展示的元素
    例如：在做客户端搜索时，可以从一个数组中立刻过滤出所需要的结果。
    这个过滤器中第一个参数可以是字符串、对象或是一个用来从数组中选择元素的函数
      字符串
    返回所有包含这个字符串的元素。如果我们想返回不包含该字符串的元素，在参数前加！符号。
      对象
    AngularJS会将待过滤对象的属性同这个对象中的同名属性进行比较，如果属性值是字符串就会判断是否包含该字符串。如果我们希望对全部属性都进行对比，可以将$当做键名。
      函数
    对每个元素都执行这个函数，返回非假值的元素会出现在新的数组中并返回
    例如，用下面的过滤器可以选择所有包含字母"e"的单词：
    {{ ['Ari','Lerner','Likes','To','Eat','Pizza'] | filter:"e" }}
    <!-- ["Lerner","Likes","Eat"] -->
    如果要过滤对象，可以使用上面提到的对象过滤器，例如，如果有一个由people对象组成的数组，每个对象都含有他们最喜欢吃的食物的列表，那么可以用下面的形式进行过滤
    {{
      [{
      'name': 'Ari',
      'City': 'San Francisco',
      'favorite food': 'Pizza'
      },{
      'name': 'Nate',
      'City': 'San Francisco',
      'favorite food': 'indian food'
      }] | filter:{"favorite food" : "Pizza"}
    }}
    <!-- [{"name":"Ari","City":"SanFrancisco","favoritefood":"Pizza"}] -->
    也可以用自定义函数进行过滤(在这个例子中函数定义在$scope上)：
    {{ ['Ari','likes','to','travel'] | filter:isCapitalized }}
    <!-- ["Ari"] -->
    isCaptitalized函数的功能是根据首字母是否为大写返回true或false，具体如下：
    $scope.isCapitalized = function(str){
      return str[0] == str[0].toUpperCase();
    };
    我们也可以给filter过滤器传入第二个参数，用来指定预期值与实际值进行比较的方式。
    第二个参数可以是下面三种形式
      true
    用angular.equals(expected,actual)对两个值进行严格比较
      false
    进行区别大小写的子字符串比较
      函数
    运行这个函数，如果返回真值就接受这个元素
    4，json
    json过滤器可以将一个JSON或javascript对象转换成字符串。
    {{ {'name': 'Ari', 'City': 'SanFrancisco'} | json}}
    <!--
    {{
      "name":"Ari",
      "City":"SanFrancisco"
    }}
    -->
    5,limitTo
    limitTo过滤器会根据传入的参数生成一个新的字符串或数组，新的字符串或数组的长度取决于传入的参数，通过传入参数的正负值来控制从前面还是从后面开始截取
    tips:如果传入的参数的长度值大于数组或字符串的长度，那么整个数组或字符串都是被返回。
    例如：
    截取前面三个字符：
    {{ SanFrancisco is very cloudy | limiTo:3}}; //=>San
    截取后面6个字符：
    {{ SanFrancisco is very cloudy | limiTo:-6}}; //=>cloudy
    {{ ["a","b","c","d","e","f","g"] | limitTo:1}}; //=>["a"]
    6.  lowercase
    lowercase 过滤器将字符串转为小写。
    {{ "San Francisco is very cloudy" | lowercase }}
    <!-- san francisco is very cloudy -->
    7.  number
    number 过滤器将数字格式化成文本。 它的第二个参数是可选的， 用来控制小数点后截取的位数。
    如果传入了一个非数字字符，会返会空字符串。
    {{ 123456789 | number }}
    <!-- 1,234,567,890 -->
    {{ 1.234567 | number:2 }}
    <!-- 1.23 -->
    8.orderBy
    orderBy过滤器可以用表达式对指定的数组进行排序
    orderBy可以接受两个参数，第一个是必需的，第二个是可选的。
    第一个参数是用来确定数组排序方向的谓词，可以有以下几种类型
      函数 当第一个参数是函数时，该函数会被当做待排序对象的getter方法
      字符串 对这个字符串进行解析的结果将决定数组元素的排序方向。我们可以传入"+"或"-"来强制进行升序或者降序排序
      数组 在排序表达式中用数组元素作为谓词。对于与表达式结果并不严格相等的每个元素，则使用第一个谓词
    第二个参数用来控制排序的方向（是否逆向）
    例如：
    {{
      [{
      'name': 'Ari',
      'status': 'awake'
      },{
      'name': 'Q',
      'status': 'sleeping'
      },{
      'name': 'Nate',
      'status': 'awake'
      }] | orderBy:"name"
    }}
    <!--
    [
    {"name":"Ari","status":"awake"},
    {"name":"Nate","status":"awake"},
    {"name":"Q","status":"sleeping"}
    ]
    -->
    也可以对排序结果进行反转，通过将第二个参数设置为true可以将排序结果进行反转
    {{
          [{
          'name': 'Ari',
          'status': 'awake'
          },{
          'name': 'Q',
          'status': 'sleeping'
          },{
          'name': 'Nate',
          'status': 'awake'
          }] | orderBy:"name":true
        }}
        <!--
        [
        {"name":"Q","status":"sleeping"},
        {"name":"Nate","status":"awake"},
        {"name":"Ari","status":"awake"}
        ]
        -->
    9.  uppercase
    uppercase 过滤器可以将字符串转换为大写形式：
    {{ "San Francisco is very cloudy" | uppercase }}
    <!-- SAN FRANCISCO IS VERY CLOUDY -->
####7.1 自定义过滤器
    将字符串第一个字母转换为大写
    首先，创建一个模块用以在应用中进行引用：
    
    angular.module("myApp.filter",[])
    .filter("capitalize",function(){
      return function(input){};
    });
    过滤器本质上是一个会把我们输入的内容当做参数传入进出的函数。上面的例子中，我们在调用过滤器时简单的把input当做字符串来处理。
    可以在这个函数中做一些错误检查：
    angular.module("myApp.filter",[])
        .filter("capitalize",function(){
          return function(input){
            //input是我们传入的字符串
            if(input){
              return input[0].toUpperCase() + input.slice(1);
            }
          };
        });
    如果想将一个句子的首字母转换为大写形式，可以用过滤器先将整个句子都转换为小写，再把首字母转换为大写：
    {{ "ginger loves dog treats" | lowercase | capitalize }}
    <!-- Ginger loves dog treats -->
####7.2 表单验证

    AngularJS能够将HTML5表单验证功能同它自己的验证指令结合起来，并且非常方便。 AngularJS提供过了很多表单验证指令，

        <form name="form" novalidate>
          <label name="email">Your email</label>
          <input type="email" name="email" ng-model="email" placeholder="Email Address" />
        </form>
    
    借助AngularJS，我们不需要花太多额外的精力就可以轻松实现客户端表单验证功能。 要使用表单验证，首先要确保表单像上面的例子一样有一个name属性。 所有输入字段都可以进行基本的验证，比如最大、最小长度等，这些功能是由新的HTML5表单属性提供的。 如果想要屏蔽浏览器对表单的默认验证行为，可以在表单元素上添加novalidate标记。
    input元素上使用的表单验证选项。 
    1，必填项 验证某个表单输入是否已经填写，只要在输入字段元素上添加HTML5标记required即可：
      <input type="text" required />
    2,最小长度 验证表单输入的文本长度是否大于某个最小值，在输入字段上使用AngularJS指令ng-minleng="{number}";
      <input type="text" ng-minleng="6" />
    3,最大长度 验证表单输入的文本长度是否小于某个最大值，在输入字段上使用AngularJS指令ng-maxleng="{number}";
      <input type="text" ng-maxleng="16" />
    4，匹配模式 使用ng-pattern="/PATTERN/"来确保输入能够匹配指定的正则表达式：
      <input type="text" ng-pattern="[a-zA-Z]"/>
    5,电子邮件 验证输入内容是否是电子邮件，只需要像下面这样将input的类型设置为email即可：
      <input type="email" name="email" ng-model="user.email"/>
    6,数字 验证输入的是否是数字，将input的类型设置为number 
      <input type="number" name="age" ng-model="user.age" />
    7,URL 验证输入内容是否是URl，将input的类型设置为url： 
      <input type="url" name="homepage" ng-model="user.homepage" />
    8,自定义验证
    9,在表单中控制变量
    表单的属性可以在其属的$scope对象中访问到，而我们又可以访问$scope对象，因此javascript可以间接的访问DOM中的表单属性。
    我们可以对表单做出实时(和AngularJS中的其他东西一样)响应。
    属性如下：
    格式：formName.inputFileldName.property
     1,未修改的表单
     这个一个布尔属性，用来判断用户是否修改了表单。如果未修改，值为true，
     如果修改过值未false。
      格式：formName.inputFieldName.$pristine
     2,修改过的表单
     只要用户修改过表单，无论输入是否通过验证，该值都返回true:
      格式：formName.inputFieldName.$dirty
     3,合法的表单
     这个布尔型的属性用来判断表单的内容是否合法。如果当前表单内容是合法的，下面的属性就是true：
      格式：formName.inputFieldName.$valid
     4,不合法的表单
     这个布尔型的属性用来判断表单的内容是否合法。如果当前表单内容是不合法的，下面的属性就是true：
      格式：formName.inputFieldName.$invalid
     5,错误
     这是AngularJS听的另外一个非常有用的属性:$error对象。它包含当前表单的所有验证内容，已经他们是否合法的信息
      格式：formName.inputFieldName.$error
     如果验证失败，这个属性的值为true;如果值为false，说明输入字段的值通过了验证。
    10,一些有用的CSS样式
      AngularJS处理表但时，会根据表单当前状态添加一些CSS类。
      他们包括：
        .ng-pristine{}
        .ng-dirty{}
        .ng-valid{}
        .ng-invalid{}
       当某个字段中的输入非法时，.ng-invalid类会被添加到这个字段上，当前例子的站点将对应的CSS设置为：
        input.ng-invalid{
           border:1px solid red;
        }
        input.ng-valid{
          border:1px solid green;
        }
    11,组合实例
      
      
      <!doctype html>
      <html ng-app="myApp">
      <head>
        <link rel="stylesheet" href="http://cdn.jsdelivr.net/foundation/4.3.2/css/foundation.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular.js"></script>
      </head>
      <body>
        
      <form name="signup_form" novalidate ng-submit="signupForm()">
        <fieldset>
          <legend>Signup</legend>
          
          <div class="row">
            <div class="large-12 columns">
              <label>Your name</label>
              <input type="text" placeholder="Name" name="name" ng-model="signup.name" 
                  ng-minlength=3 
                  ng-maxlength=20 required />
             <div class="error" 
                  ng-show="signup_form.name.$dirty && signup_form.name.$invalid">
              <small class="error" 
                  ng-show="signup_form.name.$error.required">
                  Your name is required.
              </small>
              <small class="error" 
                      ng-show="signup_form.name.$error.minlength">
                      Your name is required to be at least 3 characters
              </small>
              <small class="error" 
                      ng-show="signup_form.name.$error.maxlength">
                      Your name cannot be longer than 20 characters
              </small>
            </div>
            </div>
          </div>
            
          <div class="row">          
            <div class="large-12 columns">
              <label>Your email</label>
              <input type="email" 
                placeholder="Email" 
                name="email" 
                ng-model="signup.email" 
                ng-minlength=3 ng-maxlength=20 required />
              <div class="error" 
                   ng-show="signup_form.email.$dirty && signup_form.email.$invalid">
                <small class="error" 
                       ng-show="signup_form.email.$error.required">
                       Your email is required.
                </small>
                <small class="error" 
                       ng-show="signup_form.email.$error.minlength">
                        Your email is required to be at least 3 characters
                </small>
                <small class="error" 
                       ng-show="signup_form.email.$error.email">
                       That is not a valid email. Please input a valid email.
                </small>
                <small class="error" 
                       ng-show="signup_form.email.$error.maxlength">
                        Your email cannot be longer than 20 characters
                </small>
              </div>
            </div>
          </div>
            
          <div class="large-12 columns">
            <label>Username</label>
              <input  type="text" 
                      placeholder="Desired username" 
                      name="username" 
                      ng-model="signup.username" 
                      ng-minlength=3 
                      ng-maxlength=20 
                      ensure-unique="username" required />
            <div class="error" ng-show="signup_form.username.$dirty && signup_form.username.$invalid">
              <small class="error" ng-show="signup_form.username.$error.required">Please input a username</small>
              <small class="error" ng-show="signup_form.username.$error.minlength">Your username is required to be at least 3 characters</small>
              <small class="error" ng-show="signup_form.username.$error.maxlength">Your username cannot be longer than 20 characters</small>
              <small class="error" ng-show="signup_form.username.$error.unique">That username is taken, please try another</small>
            </div>
          </div>  
          <button type="submit" ng-disabled="signup_form.$invalid" class="button radius">Submit</button>
        </fieldset>
      </form>
      </body>
      </html>
      
    在提交后显示验证信息
    当用户试图提交表单时，你可以在作用于中捕获一个submitted值，然后对表单内容进行验证并显示错误信息。
      <form name="signup_form"
      novalidate
      ng-submit="signupForm()"
      ng-controller="signupController">
          <fieldset>
              <legend>Signup</legend>
                <div class="row">
                    <div class="large-12 columns">
                        <label>Your name</label>
                        <input type="text" placeholder="Name" name="name" ng-model="signup.name" ng-minlength="3"  ng-maxlength="20" required />
                        <div class="error" ng-show="signup_form.name.$dirty && signup_form.name.$invalid && signup_form.submitted">
                            <small class="error" ng-show="signup_form.name.$error.required">
                                Your name is required.
                            </small>
                            <small class="error" ng-show="signup_form.name.$error.minlength">
                                Your name is required to be at least 3 characters
                            </small>
                            <small class="error"  ng-show="signup_form.name.$error.maxlength">
                                Your name cannot be longer than 20 characters
                            </small>
                        </div>
                    </div>
                </div>
                <button type="submit" >Submit</button>
          </fieldset>
      </form>
      
      js部分
      var app = angular.module("myApp",[])
      app.controller('signupController', function($scope) {
          $scope.submitted = false;
          $scope.signupForm = function() {
          if ($scope.signup_form.$valid) {
          // 正常提交
          } else {
            $scope.signup_form.submitted = true;
          }
          }
      });
      
      ngMessages(1.3+)
      安装AngularJS中的ngMessages指令
      bower install --save angular-messages
      引入到HTML中
      <script type="text/javascript" src="angular-messages.js"></script>
      并且在AngularJS中将ngMessages作为引用程序的依赖模块引入:
      angular.module("myApp",["ngMessages"]);
      
      <form name="signup_form" novalidate ng-submit="signupForm()"
      ng-controller="signupController">
        <label>Your name</label>
        <input type="text" placeholder="Name" name="name" ng-model="signup.name" ng-minlength=
        3 ng-maxlength=20 required />
        <div class="error" ng-messages="signup_form.name.$error">
        <div ng-message="required">Make sure you enter your name</div>
        <div ng-message="minlength">Your name must be at least 3 characters</div>
        <div ng-message="maxlength">Your name cannot be longer than 20 characters</div>
        </div>
        <button type="submit">Submit</button>
      </form>
     借助ngMessage，表本身比前面的实现更清洁，并且更好理解。
     如果想要更新这个实现同时显示所有的错误信息，只需要在ng-message指令旁边使用ng-message-multiple属性即可
     <div class="error" ng-message="signup_form.name.$error" ng-message-multiple>
       <div ng-message="require">Sure you enter your name </div>
       <div ng-message="minlength">Your name must be at least 3characters</div>
       <div ng-message="maxlength">Your name cannot be longer than 20 characters</div>
     </div>
     

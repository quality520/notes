
























































































####7.2 表单验证
   AngularJS能够将HTML5表单验证功能同它自己的验证指令结合起来，并且非常方便。
   AngularJS提供过了很多表单验证指令，

   <form name="form" novalidate>
     <label name="email">Your email</label>
     <input type="email" ng-model="email" placeholder="Email Address" />
   </form>

   借助AngularJS，我们不需要花太多额外的精力就可以轻松实现客户端表单验证功能。
   要使用表单验证，首先要确保表单像上面的例子一样有一个name属性。
   所有输入字段都可以进行基本的验证，比如最大、最小长度等，这些功能是由新的HTML5表单属性提供的。
   如果想要屏蔽浏览器对表单的默认验证行为，可以在表单元素上添加novalidate标记。

   input元素上使用的表单验证选项。
     1，必填项  验证某个表单输入是否已经填写，只要在输入字段元素上添加HTML5标记required即可：
       <input type="text" required>
     2,最小长度 验证表单输入的文本长度是否大于某个最小值，在输入字段上使用AngularJS指令ng-minleng="{number}";
       <input type="text" ng-minleng="5">
     3,最大长度 验证表单输入的文本长度是否小于某个最大值，在输入字段上使用AngularJS指令ng-maxleng="{number}";
       <input type="text" ng-maxleng="15">
     4，匹配模式 使用ng-pattern="/PATTERN/"来确保输入能够匹配指定的正则表达式：
       <input type="text" ng-pattern="/[a-zA-Z]/">
     5,电子邮件 验证输入内容是否是电子邮件，只需要像下面这样将input的类型设置为email即可：
       <input type="email" name="email" ng-model="user.email" />
     6,数字 验证输入的是否是数字，将input的类型设置为number
       <input type="number" name="age" ng-model="user.age"/>
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
        
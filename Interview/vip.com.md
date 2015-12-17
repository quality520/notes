#vip.com.md
####原型链
#####前言
    javascript不包含传统的类继承模型，而是使用prototype原型模型
    虽然这经常被当做javascript的缺点被提及，其实基于原型的继承模型比传统的类继承还要强大。
    实现传统的类继承模型是很简单，但是实现javascript中的原型继承则要困难的多
    javascript是唯一一个被广泛使用的基于原型继承的语言。
#####原型
    1、、 如下方式来写代码
    ```
      var decimalDigits = 2,
          tax = 5;
      function add(x,y){
        return x + y;
      }
      function subtract(x,y){
        return x - y;
      }
      console.log(add(1,3));
    ```
    通过执行各个function来得到结果，学习了原型之后，我们可以使用如下方式来美化一下代码
    2、 、原型使用方式1：
    在使用原型之前，我们需要先将代码做一下小修改：
    ```
      var Calculator = function(decimalDigits,tax){
        this.decimalDigits = decimalDigits;
        this.tax = tax;
      }
    ```
    然后，通过给Calculator对象的prototype属性赋值对象字面量来设定Calculator对象的原型
    ```
      Calculator.prototype = {
        add:function(x,y){
          return x + y;
        },
        subtract:function(x,y){
          return x - y;
        }
      };
      console.log((new Calculator()).add(1,3));
    ```
    这样，我们就可以new Calculator对象以后，就可以调用add方法来计算结果了。
    3、、原型使用方式2：
    第二种方式是：在赋值原型prototype的时候使用function立即执行的表达式来赋值，即如下格式：
    `Calculator.prototype = function(){}();`
    它的好处就是可以封装私有的function，通过return的形式暴露处简单的使用名称，以达到
    public/private的效果，修改后的代码如下：
    ```
      Calculator.prototype = function () {
            add = function (x, y) {
                return x + y;
            },

            subtract = function (x, y) {
                return x - y;
            }
            return {
                add: add,
                subtract: subtract
            }
        } ();

        //console.log((new Calculator()).add(11, 3));
    ```
    同样的方式，我们可以new Calculator对象以后调用add方法来计算结果了。
####作用域链
####原型继承 原理
####this,call,apply
####应用类型与基本类型在内存中存放的方式
####javascript继承方式
####HTML5兼容各个手机浏览器
#####媒体查询
#####rem字体
#####rem字体的比例计算(62.5%)
####多图片并发处理
####懒加载
####页面样式兼容(各个手机浏览器)
####匿名函数递归调用
####angularJS的特点
    AngularJS中四大核心特性
#####一、MVC
#####二、模块化和依赖注入
#####三、双向数据绑定
#####四、指令
######解析最简单的指令hello:匹配模式restrict
######解析最简单的指令hello:template、templateUrl、$templateCache
######解析最简单的指令hello:replace与transclude
######comile与link(操作元素、添加CSS样式、绑定事件)
######指令与控制器之间的交互
######指令间的交互
######scope的类型与独立scope
######scope的绑定策略
######AngularJS内置的指令
######实例解析Expander
######实例解析Accordion
######指令的运行原理:compile和link
######总结：ERP类型的系统必备的UI组件
######总结：互联网/电商型系统必备的UI组件
######第三方指令库angular-ui
######Directive思想的奇缘和原理概述
####angularJS开发android与IOS
####骇客兼容
####事件代理
####ajax的原理
#####状态码的含义
####居中布局
####position的作用
#####static
#####fixed
#####relative
#####absolute
####display的理解
####grunt
#####插件配置

#chapter13 依赖注入
    一个对象通常有三种方式可以获得对其依赖的控制权:
    	1,在内部创建依赖;
    	2,通过全局变量进行引用;
    	3,在需要的地方通过参数进行传递。
    依赖注入时通过第三种方式实现的，其余两种方式会带来各种问题，例如污染全局作用域，使隔离变得异常困难等。依赖注入时一种设计模式，它可以去除对依赖关系的硬编码，从而可以在运行时改变甚至移除依赖关系。
    在编写依赖与其他对象或库的组件时，我们需要描述组件之间的依赖关系。在运行期，注入器会创建依赖的实例，并负责将它传递给依赖的消费者
    	//
    	function someClass(greeter){
    		this.greeter = greeter;
    	}
    	someClass.prototype.greetName = function(name){
    		this.greeter.greet(name);
    	}
    someClass能够在运行时访问到内部的greeter，但并不关心如何获得对greeter的引用。为了获得对greeter实例的引用，someClass的创建者会负责构造其依赖关系并传递进去。
    AngularJS使用$injetor(注入器服务)来管理依赖关系的查询和实例化。$injetor负责实例化AngularJS中所有的组件，包括应用的模块、指令和控制器等。
    在运行时，任何模块启动时$injetor都会负责实例化，并将其需要的所有依赖传递进去
    	eg:
    	angular.module('myApp',[])
    	  .factory('greeter',function(){
    	  		return {
    	  			greet:function(msg){alert(msg);}
    	  		}
    	  	})
    		.controller('myController',function($scope,greeter){
    			$scope.sayHello = function(){
    				greeter.greet('Hello');
    			};
    		});

    	<input type="button" ng-click="sayHello()" value="click me!">
    而在内部，AngularJS的处理过程时下面这样的:
    	//使用注入器加载应用
    	var injector = angular.injector(['ng','myApp']);
    	//通过注入器加载$controller服务:var $controller = injector.get('$controller');
    	var scope = injector.get('$rootScope').$new();
    	//加载控制器并传入一个作用域，同AngularJS在运行时做的一样
    	var myController = $controller('myController',{$scope:scope});
####13.1 推断式注入声明
    如果没有明确的声明，AngularJS会假定参数名称及时依赖的名称。因此，它会在内部调用函数对象的toString()方法，分析并提取出函数参数列表，然后通过$injector将这些参数注入进对象实例。注入的过程如下:
    	injector.invoke(function($http,greeter){

    	});
    tips:请注意，这个过程只适用于未经过压缩和混淆的代码，因此AngularJS需要原始未经压缩的参数列表来进行解析。
    	JavaScript的压缩器通常会将参数名改写成简单的字符，以减小源文件体积（同
    	时也会删除空格、空行和注释等） 。如果我们不明确地描述依赖关系，AngularJS
    	将无法根据参数名称推断出实际的依赖关系，也就无法进行依赖注入。
####13.2 显示注入声明
    AngularJS提供了显示的方法来明确定义一个函数在被调用时需要用到的依赖关系。通过这个方法声明依赖，即使在源代码被压缩、参数名称发生改变的情况下依然能够正常工作。
    可以通过$inject属性来实现显示注入声明的功能。函数对象的$inject属性时一个数组，数组元素的类型时字符串，他们的值就是需要被注入的服务的名称。
    	下面是示例代码：
    	var aControllerFactory =
    	function aController($scope, greeter) {
    	console.log("LOADED controller", greeter);
    	// ……控制器
    	};
    	aControllerFactory.$inject = ['$scope', 'greeter']; // Greeter服务
    	console.log("greeter service");
    	}
    	// 我们应用的控制器
    	angular.module('myApp', [])
    	.controller('MyController', aControllerFactory)
    	.factory('greeter', greeterService);
    	// 获取注入器并创建一个新的作用域
    	var injector = angular.injector(['ng', 'myApp']),
    	controller = injector.get('$controller'),
    	rootScope = injector.get('$rootScope'),
    	newScope = rootScope.$new();
    	// 调用控制器
    	controller('MyController', {$scope: newScope});
    对于这种声明方式来讲，参数顺序是非常重要的，因为 $inject 数组元素的顺序必须和注入
    参数的顺序一一对应。
####13.3 行内注入声明
    在定义一个AngularJS的对象式，行内声明的方式允许我们直接传入一个参数组而不是一个函数。数组的元素时字符串，他们代表的是可以被注入到对象中的依赖的名字，最后一个参数就是依赖注入的目标函数对象本身
    eg:
    	angular.module('myApp')
    	  .controller('myController',['$scope','greeter',function($scope,greeter){
    	  	//
    	  }])
    由于需要处理的是一个字符串组成的列表，行内注入声明也可以在压缩后的代码中正常运
    行。通常通过括号和声明数组的 [] 符号来使用它。
####13.4 $injector API
    在实际工作中，我们很少直接同$injector打交道，大师了解一个$injector有哪些API，可以帮助我们更好的理解它时如何运作的。
    13.4.1 annotate()
    	annotate()方法的返回值时一个由服务名称组成的数组，这些服务会在实例化时被注入到目标函数中。annotate()方法可以帮助$injector判断哪些服务会在函数被调用时注入进去。
    	annotate()方法可以接受一个参数:
    	  fn(函数或数组) 
    	  参数fn可以是一个函数，也可以时一个数组，annotate()方法返回一个数组，数组元素的值时在调用时被注入到目标函数中的服务的名称。
    	  	var i = angular.injector(['ng','myApp'])
    	  	i.annotate(function($q,greeter){})
    	  	//=>["$q", "greeter"]
    13.4.2 get()
    	get()方法返回一个服务的实例，可以接受一个参数:
    	name(字符串) 参数name时想要获取的实例的名称
    	get()根据名称返回服务的一个实例
    13.4.3 has()
    	has()方法返回一个布尔值，在$injector能够从自己的注册列表中找到对应的服务时反水true,否则返回false，它能接受一个参数:
    	name(字符串)
    	参数name时我们想在注入器的注册列表中查询的服务名称。
    13.4.4 instantiate()
    	instantiate()方法可以创建某个javascript类型的实例。它会通过new操作符调用构造函数，并将所有参数都传递给构造函数。它接受两个参数
    		type(函数) 构造函数
    		locals(对象，可选) 可选参数，提供了另一种传递参数的方式
    	instantiate()方法返回type的一个新实例
    13.4.5 invoke()
    	invoke()方法会调用方法并从$injector中添加方法参数
    	接受三个参数
    		fn(function)这个函数就是要调用的函数，这个函数的参数由函数声明设置。
    		self(object-可选) self参数允许我们设置调用方法的this参数
    		locals(object-可选)这个可选参数提供另一种方式在函数被调用时传递参数名给该函数。
    		invoke()方法返回fn函数返回的值。
####13.5 ngMin
    上面介绍了三种声明依赖注入的方式，可以在定义函数时选择任意一种合适的方式。但在实
    际生产过程中， 当代码体积变得非常庞大时， 写代码还要关心参数顺序将是一个耗费心力的工作。
    通过使用ngMin这个工具，能够减少我们定义依赖关系所需需的工作量。ngMin时一个为AngularJS应用设计的预压缩工具，它会遍历整个AngularJS应用并帮助我们设置号依赖注入。
    例如，它会将如下代码：
    	angular.module('myApp', [])
	    	.directive('myDirective', function($http) { })
	    	.controller('IndexController', function($scope, $q) {
    	});
    	转换成下面的形式:
    	angular.module('myApp', [])
    		.directive('myDirective', ['$http', function ($http) { }])
    		.controller('IndexController', [ '$scope', '$q',function ($scope, $q) {} ]);
    	ngMin 可以显著减少代码输入的工作量，并保持源文件的整洁。
    13.5.1 ngMin安装
    	可以通过npm包管理工具来安装ngMin
    		npm install -g ngmin
    			如果正在使用Grunt，我们可以安装 grunt-ngmin 插件。如果正在使用Rails，也
    			可以通过Ruby的包管理工具 gem 来安装 ngmin-rails 
    13.5.2 使用ngMin
    	我们可以在命令行界面单独使用ngMin，可以通过标准输出设备或标准输出流传入input.js和output.js两个参数，例如:
    		ngmin input.js output.js
    		或
    		ngmin <input.js> output.js
    		input.js是源文件，而output.js则是转换过注入声明后的输入文件
    13.5.3 工作原理
    	在其内部， ngMin 使用抽象语法树（Abstract Syntax Tree，AST）来遍历JavaScript源代码。借
    	助名为 astral 的AST工具框架的帮助，它可以将必要的声明代码添加进源文件，并用 escodegen
    	将转换后的源文件输出。
    	ngMin 希望我们的AngularJS源代码只由逻辑定义组成。如果我们书写代码的语法和这本书里
    	的一样，那么 ngMin 就可以对其进行解析和预压缩。

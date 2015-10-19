#chapter 10 explain in detail directive
####10.1 指令定义
    对于指令，可以把它简单的理解成在特定DOM元素上运行的函数，指令可以扩展这个元素的功能。
    AngularJS应用的模块中又很多方法可以使用，其中directive()这个方法时用来定义指令的：
    	angular.module("myApp",[])
    	.directive("myDirective",function($timeout,UserDefinedService){
    		//指令定义放在这里
    	});
    	directive()方法接收两个参数：
    		1,name(字符串)
    			指令的名字，用来在视图中引用特定的指令
    		2,factory_function(函数)
    			这个函数返回一个对象，其中定义了指令的全部行为。$compile服务利用这个方法返回的对象，在DOM调用指令时来构造指令的行为。
    				angular.application("myApp",[])
    				.directive("myDirective",function(){
    					//一个指令定义对象
    					return {
    						//通过设置项来定义指令，在这里进行覆写
    					}
    				})
    			我们也可以返回一个函数代替对象来定义指令，但时像杭冕的例子一样，通过对象来定义时最佳的方式。当返回一个函数时，这个函数通常被称作链接传递(postLink)函数，利用它我们可以定义指令的链接(link)功能。由于返回函数而不是对象会限制定义指令时的自由度，因此，值在构造简单的指令时才比较有用。
    			当AngularJS启动引用时，它会把第一个参数当做一个字符串，并以此字符串为名来注册第二个参数都返回的对象。AngularJS编译器会解析主HTML的DOM中的元素、属性、注释和CSS类名中使用了这个名字的地方，并在这些地方应用对应的指令。当它找到某个已知的指令时，就会在页面中插入指令所对应的DOM元素
    				<div my-directive></div>
    			指令的工厂函数知会在编译器第一次匹配到这个指令时调用一次。和controller函数类似，我们通过$injetor.invoke来调用指令的工厂函数。
    			当AngularJS在DOM中遇到具名的指令是，会去匹配已经注册过的指令，并通过名字在注册过的对象中查找。此时，就开始了一个指令的生命周期，指令的生命周期开始于$compile方法并结束与link方法。
    				tips:一个javascript对象由键和值组成。当一个给定键的值被设置为一个字符串、布尔值、数字、数组或对象时，我们把这个键称为属性。当键设置为函数时，我们把它叫做方法。
    			下面，来看看定义一个指令时可以使用的全部设置选项。
    				可能的选项如下所示,每个键的值说明了可以将这个属性设置为何种类型或者说明样的函数:
    					angular.module("myApp",[])
    						.directive("myDirective",function() {
    							return {
    								restrict:String,
    								priority:Number,
    								terminal:Boolean,
    								template:String or Template Function:
    											function(tElement,tAttrs){...},
    								templateUrl:String,
    								replace:Boolean or String,
    								scope:Boolean or Object,
    								transclude:boolean,
    								controller:String or function(scope,element,attrs,transclude,otherInjectables){...},
    								controllerAs:String,
    								require:String,
    								link:function(scope,iElement,iAttrs){...},
    								compile://返回一个对象或连接函数，如下所示:
    									function(tElement,tAttrs,transclude){
    										return {
    											pre:function(scope,iElement,iAttrs,controller){...},
    											post:function(scope,iElement,iAttrs,controller){...}
    										}
    										//或者
    										return function posLink(...){...}
    									}
    							};
    						});
    	10.1.1 restrict(字符串)
    		restrict是一个可选参数，它告诉AngularJS这个指令在DOM中可以何种形式被声明。默认AngularJS认为restrict的值时A，即以属性的形式进行声明。
    			E(元素：element)
    				<my-directive></my-directive>
    			A(属性：Attribute)
    				<div my-directive="expression"></div>
    			C(类名：class)
    				<div class="my-directive:expression"></div>
    			M(注释)
    				<!-- directive:my-directive expression -->
    		这些选项可以单独使用，也可以混合在一起使用：
    			angular.module("myApp",[])
    				.directive("myDirective",function(){
							return {
								restrict:"EACM",//可以用元素、属性、类名、注释的形式在DOM中声明
							}
    				})
    				上面的配置可以同时用属性或注释的方式来声明指令：
	    				<-- 作为一个属性 -->
	    				<div my-directive></div>
	    				<-- 或者作为一个元素 -->
	    				<my-directive></my-directive>
	    				<-- 或者作为类名 -->
	    				<div class="my-directive"></div>	
	    				<-- 或者作为一个注释 -->
	    				<!-- directive:my-directive -->
	    		属性时用来声明指令最常用的方式，因为它能在包括老版本的IE浏览器在内的所有浏览器中正常工作，并且不需要在文档头部注册新的标签。
	    					尽量避免用注释方式来声明属性。这种方式最初被用来声明由多个标签组成的
	    					指令。这种方法在某些情况下特别有用，比如在 <table> 元素内使用 ng-repeat
	    					指 令 ， 但 在 AngularJS 1.2 中 ng-repeat 可 以 通 过 ng-repeat-start 和
	    					ng-repeat-end 来更优雅地满足这个需求，注释模式就没有什么用武之地了。
	    					如果你对此很好奇，可以通过Chrome开发者工具的 element 标签观察一下使用
	    					ng-repeat 时被隐式添加的注释
	    		如何进行选择，通常取决于定义的指令时包含某个组件的核心行为，或者用额外的行为。状态或其他内容对某个核心组件进行修饰或扩展。
	    		使用何种指令声明格式的知道原则时能够准确表达每一段代码的意图，创造易于理解和分享的清晰代码。
	    		另外一个重要的标准是根据指令是否创建、继承或将自己所属的环境中隔离出去进行判断。指令的父子关系对其组成和重用性起着至关重要的作用，会有额外的内容来更加升入地讨论指令的作用域。
	    10.1.2优先级(数值型)
	    	优先级参数可以被设置为一个数值。大多数指令会忽略这个参数，使用默认值0，但也有些场景设置高优先级时非常重要的。例如，ngRepeat将这个参数设置为1000，这样就可以保证在同一元素上，它总是在其他指令之前被调用。
	    	如果一个元素上具有两个优先级相同的指令，声明在前面的那个会被优先调用。如果其中一个的优先级更高，则不管声明的顺序如何都会被优先调用：具有更高优先级的指令总是优先运行。
	    		ngRepeat 是所有内置指令中优先级最高的，它总是在其他指令之前运行。这样
	    		设置主要考虑的是性能。在讨论编译参数时会更详细介绍性能相关的内容。
	    10.1.3 terminal(布尔型)
	    	terminal时一个布尔型参数，可以被设置为true或false
	    	这个参数用来告诉AngularJS停止运行当前元素上比本指令优先级低的指令。但同当前指令优先级相同的指令还是会被执行。
	    	如果元素上某个指令设置了terminal参数并具有较高的优先级，就不要再用其他低优先级的指令对其进行修饰了，因为不会被调用。但是具有相同优先级的指令还是会被继续调用。
	    	使用terminal参数的例子时ngView和ngIf。ngIf的优先级略高与ngView，如果ngIf的表达式值为true，ngView就可以正常执行，但如果ngIf表达式的值为false，由于ngView的优先级较低就不会被执行。
	    10.1.4 template (字符串或函数)
	    	template参数时可选的，必须被设置为以下两种形式之一：
	    		一段HTML文本；
	    		一个可以接受两个参数的函数，参数为tElement和tAttrs,并返回一个代表模板的字符串。tElement和tAttrs中的t代表template，时相对于instance的。[链接和表一设置，模板元素或属性与实例元素或属性之间的区别]
	    	AngularJS会同处理HTML一样处理模板字符串。模板中可以通过大括号标记来访问作用域，例如{{expression}}
	    	如果模板字符串中包含多个DOM元素，或者只由一个单独的文本节点构成，那它必须被包含在一个父元素内。换句话说，必须存在一个根DOM元素：
	    		template: '\
		    		<div> <-- single root element -->\
			    		<a href="http://google.com">Click me</a>\
			    		<h1>When using two elements, wrap them in a parent element</h1>\
	    			</div>\
	    	另外，注意每一行末尾的反斜线，这样ANgularJS才能正确解析多行字符串。在实际生产中，更好的选择使用templateUrl参数引用外部模板，因为多行文本阅读和维护起来都是一场噩梦。
	    	模板字符串和 templateURL 中最需要了解的重要功能，是它们如何同作用域链接起来。
	    10.1.5 templateUrl(字符串或函数)
	    	templateUrl时可选的参数，可以时以下类型：
	    		一个代表外部HTML文件路径的字符串;
	    		一个可以接受两个参数的函数，蚕食为tElement和tAttrs，并返回一个外部HTML文件路径的字符串
	    	无论那种方式，模板的URL都将通过AngularJS内置的安全层，特别时$getTrustedResourceUrl,这样可以保护模板不会被不信任的源加载。
	    	默认情况下，调用指令会在后台通过Ajax来请求HTML模板文件。又两件事情需要知道。
					在本地开发时，需要在后台运行一个本地服务器，用以从文件系统加载HTML模板，否则会导致Cross Origin Request Script(CORS)错误。
					模板加载时异步的，一位着编译和链接要暂停，等待模板加载完成
				通过Ajax异步加载大量的模板将严重拖慢一个客户端应用的速度。为了避免延迟，可以在部署应用之前对HTML模板进行缓存。在大多数场景下缓存都是一个非常好的选择，因为ANgularJS通过减少请求数量提升了性能。
				模板加载后，AngularJS会将它默认缓存到$templateCache服务中。在实际生产中，可以提前将模板缓存到一个定义模板的JavaScript文件中，这样就不需要通过XHR来加载模板了。
			10.1.6 (布尔型)
				replace时一个可选参数，如果设置了这个参数，值必须为true，因为默认值为false。默认值意味着模板会被当做子元素插入到调用此指令的元素内部：
					<div some-directive></div>
					.directive("someDirective",function(){
						return {
							template:"<div>some stuff here</div>"
						}
					})
				调用指令之后的结果如下
					<div some-directive>
						<div>some stuff here</div>
					</div>
				如果replace被设置为true：
					<div some-directive></div>
					.directive("someDirective",function(){
						return {
							replace:true,//
							template:"<div>some stuff here</div>"
						}
					})
				调用指令之后的结果：
					<div>some stuff here</div>
		10.2 指令作用域
			指令作用域时如何工作的。
				$rootScope 这个特殊的对象会在DOM中声明 ng-app 时被创建：
				<div ng-app="myApp"
				ng-init="someProperty = 'some data'"></div>
				<div ng-init="siblingProperty = 'more data'">
				Inside Div Two
				<div ng-init="aThirdProperty"></div>
				</div>
			DOM中每个指令调用时都可能会：
				直接调用相同的作用域对象,
				从当前作用域对象继承一个新的作用域对象,
				创建一个同当前作用域相隔离的作用域对象。
			上面的列子展示的是第一种情况。 前两个 div 是兄弟元素， 可以通过 get 和 set 访问 $rootScope 。
			第二个 div 内部的 div 同样可以通过 get 和 set 访问相同的根作用域
			指令嵌套并不一定意味着需要改变它的作用域。默认情况下，子指令会被付予访问父DOM元素对应的作用域能力，这样做的原因可以通过介绍指令的scope参数来理解，scope参数默认时false。
			10.2.1 scope参数(布尔型或对象)
				scope参数时可选的，可以被设置为true或一个对象。默认值时false
				当scope设置为true时，会从父作用域继承并创建一个新的作用域对象。
				如果一个元素上有多个指令使用了隔离作用域，其中只由一个可以生效。只由指令模板中的根元素可以获得一个新的作用域。因此，对于这些对象来说scope默认被设置为true。
				内置指令ng-controller的作用，就是从父作用域继承并创建一个新的子作用域。它会创建一个新的从父作用域继承而来的子作用域。
				<div ng-app="myApp" ng-init="someProperty='some data'">
				    <div ng-init="siblingProperty='moredata'">
				        inside Div Two:{{ aThirdProperty}}
				        <div ng-init="aThirdProperty='data for 3rd property'" ng-controller="SomeController">
				            inside Div three;{{aThirdProperty}}
				            <div ng-init="aFourthProperty">
				                Inside Div Four:{{aThirdProperty}}
				            </div>
				        </div>
				    </div>
				</div>
			    如果直接运行这段代码会报错，因为没有在javascript中定义所需要的控制器
			        angular.module("myApp",[])
			         .controller("SomeController",function($scope){
			            //可以留空，但必须被定义
			         })
			    刷新页面，会发现第二个 div 中由于 {{ aTgirdProperty }} 未定义，因此什么都没有输出。
                第三个 div 显示了设置在继承来的作用域中的 data for a 3rd property
                作用域的继承机制是向下而非向上进行的。
                为了进一步证明作用域的继承机制是向下而非向上进行的，下面再看另外一个例子，展示的是{{aThirdProperty}}从负作用域继承而来：
                如要要创建一个能够从外部原型继承作用域的指令，将scope属性设置为true：
                    <div ng-app="myApp"
                           ng-init="someProperty = 'some data'"></div>
                      <div ng-init="siblingProperty = 'more data'">
                        Inside Div : {{ aThirdProperty }}
                        <div ng-init="aThirdProperty = 'data for 3rd property'"
                             ng-controller="SomeCtrl">
                          Inside Div Three: {{ aThirdProperty }}
                          <div ng-controller="SecondCtrl">
                            Inside Div Four: {{ aThirdProperty }}
                            <br>
                            Outside myDirective: {{ myProperty }}
                            <div my-directive ng-init="myProperty = 'wow, this is cool'">
                              Inside myDirective: {{ myProperty }}
                            <div>
                          </div>
                        </div>
                      </div>
                    
                      <script>
                        angular.module('myApp', [])
                        .controller('SomeCtrl', function($scope) {
                          // we can leave it empty, it just needs to be defined
                        })
                        .controller('SecondCtrl', function($scope) {
                          // also can be empty
                        })
                        .directive('myDirective', function() {
                          return {
                            restrict: 'A',
                            scope: true
                          }
                        })
                      </script>
                    结果：
                    Inside Div :
                    Inside Div Three: data for 3rd property
                    Inside Div Four: data for 3rd property 
                    Outside myDirective:
                    Inside myDirective: wow, this is cool
			10.2.2 隔离作用域
				隔离作用域的概念是以面向对象编程为基础的。ANgularJS指令的作用域中可以看到如Small Talk语言和SOLID原则的影子。
				具有隔离作用域的指令最主要的使用场景是创建可复用的组件，组件可以在未知上下文中使用，并且可以避免污染所处的外部作用域或不经意的污染内部作用域。
				创建具有隔离作用域的指令需要将scope属性设置为一个空对象{}.如果这样做了，指令的模板就无法访问外部作用域了。
					<div ng-controller="mainController">
				    Outside myDirective:{{myProperty}}
				    <div my-directive ng-init="myProperty = 'Wow,this is cool!'">
				        Inside myDirective:{{ myProperty }}
				    </div>
				  </div>
					<script src="../library/scripts/angular.js"></script>
					<script>
				    angular.module("myApp",[])
			       .controller("mainController",function($scope){

			       })
			       .directive("myDirective",function(){
			        return {
		            restrict:"A",
		            scope:{},
		            priority:100,
		            template:"<div>Inside myDirective {{myProperty}}</div>"
			        }
			       })
					</script>
				结果：
					Outside myDirective:Wow,this is cool!
					Inside myDirective
				当指令中scope的值为true
					.directive("myDirective",function(){
						return {
							restrict:"A",
							scope:true,
							priority:100,
							template:"<div>Inside myDirective {{myProperty}}</div>"
						}
					})
				结果:
					Outside myDirective:
					Inside myDirective Wow,this is cool!
				tips:这里为myDirective设置了一个高优先级。由于ngInit指令会以非零的优先级运行，这个例子将会优先运行ngInit指令，然后才是我们定义的指令，并且这个myProperty在$scope对象中是有效的。
				理解重要的关于作用域的概念后，就可以将隔离作用域的属性同外部世界进行绑定，使得隔离作用域可以和外部进行交互。
			10.3 绑定策略
				AngularJS提供了几种方法能够将指令内部的隔离作用域，同指令外部的作用域进行数据绑定
				为了让新的指令作用域可以访问当前本地作用域中的变量，需要使用下面三种别名中的一种。
					本地作用域属性:使用"@"符号将本地作用域同DOM属性的值进行绑定。指令内部作用域可以使用外部作用域的变量:
						@ (or @attr)  现在，可以在指令中使用绑定的字符串了。
					双向绑定:通过"="可以将本地作用域上的属性同父级作用域上的属性进行双向的数据绑定。就像普通的数据绑定一样，本地属性会反映出父数据模型中所发生的变化。
						= (or =attr)
					父级作用域绑定:通过"&"符号可以对父级作用域进行绑定，以便在其中运行函数。意味着对这个值进行设置时会生成一个指向父级作用域的包装函数。
					要使调用带有一个参数的父方法，我们需要传递一个对象，这个对象的键时参数的名称，值时要传递给参数的内容。
						& (or &attr)
					例如：假设我们在开发一个电子邮件客户端，并且要创建一个电子邮件的文本输入框:
						<input type="text" ng-model="to" />
						<!-- 调用指令 -->
						<div scope-example ng-model="to" on-send="sendMail(email)" from-name="ari@fullstack.io"></div>
					这里又一个数据模型(ng-model)、一个函数(sendMail())和一个字符串(from-name)
					在这里指令中做如下设置以访问这些内容：
						scope:{
							ngModel:"=",	//将ngModel同指定对象绑定
							onSend:"&",		//将引用传递给这个方法
							fromName:"@"	//存储与fromName相关联字符串
						}
				10.3.1 transclude
					transclude是一个可选的参数。如果设置了，其值必须为true，它的默认值时false。
					嵌入有时被认为时一个高级主题，但某些情况下它与我们刚刚学习过的作用域之间会又非常号的配合。使用嵌入也会很好地扩充我们的工具集，特别是在创建可以在团队、项目、AngularJS社区之间共享的HTML代码片段时。
					嵌入通常用来创建可复用的组件，典型的例子时模态对话框或导航栏。
					我们可以将整个模板，包括其中的指令通过嵌入全部传入一个指令中。这样做可以将任意内容和作用域传递给指令。transclude参数就是用来实现这个目的的，指令的内部可以访问外部指令的作用域，并且模板也可以访问外部的作用域对象。
					为了将作用域传递进去，scope参数的值必须通过{}或true设置成隔离作用域。如果没有设置scope参数，那么指令内部的作用域将设置为传入模板的作用域。
						只由当你希望创建一个可以包含任意内容的指令时，才使用transclude:true
					嵌入允许指令的使用者方便地提供自己的HTML模板，其中可以包含独特的状态和行为，并对指令的各方面进行自定义。
						创建一个可以被自定义的可复用指令。
						下面例子创建一个可以复用的侧边栏。
						<div sideboxtitle="Links">
							<ul>
								<li>First link</li>
								<li>Second link</li>
							</ul>
						</div>
						为这个侧边栏创建一个简单的指令，并将transclude参数设置为true:
						angular.module("myApp",[])
						.directive("sideBox",function(){
							return {
								restrict:"EA",
								scope:{
									title:"@"
								},
								transclude:true,
								template:"<div class='sidebox'>
										<div class='content'>
											<h2 class='header'>{{title}}</h2>
											<span class='content' ng-transclude></span>
										</div>
									</div>"
							};
						});
						这段代码告诉AngularJS编译器，将它从DOM元素中获取的内容放到它发现 ng-transclude
						指令的地方。
						借助transclusion，我们可以将指令复用到第二个元素上，而无须担心样式和布局的一致性问题。
						<div sideboxtitle="Links">
							<ul>
								<li>First link</li>
								<li>Second link</li>
							</ul>
						</div>
						<div sideboxtitle="TagCloud">
							<div class="tagcloud">
								<a href="">Graphics</a>
								<a href="">AngularJS</a>
								<a href="">D3</a>
								<a href="">Front-end</a>
								<a href="">Startup</a>
							</div>
						</div>
						如果指令使用了transclude参数，那么在控制器中就无法正常监听数据模型的变化了，这就是最佳实践总是建议在链接函数里使用$watch服务的原因
				10.3.2 controller(字符串或函数)
					controller参数可以时一个字符串或一个函数。当设置为字符串，会以字符串的值为名字，来查找注册在应用中的控制器的构造函数:
						angular.module("myApp",[])
						.directive("myDirective",function(){
							restrict:"A",	//属性
							controller:"SomeController"
						})
						//应用中其他的地方，可以时同一个文件或index.html包含的另一个文件
						angular.module("myApp",[])
						.controller("SomeController",function($scope,$element,$attrs,$transclude){
							//控制器逻辑放在这里
						});
						可以在指令内部通过匿名构造函数的方式来定义一个内联的控制器:
						angular.module("myApp",[])
						.directive("myDirective",function(){
							restrict:"A",
							controller:function($scope,$element,$attrs,$transclude){
								//控制器逻辑放在这里
							}	
						});
					我们可以将任意可以被注入的AngularJS服务传递给控制器。例如，如果我们想要将$log服务传入控制器，只需要简单地将它注入到控制器中，便可以在指令中使用它了。
						控制器中也又一些特殊的服务可以被注入到指令中，这些服务有：
							1,$scope  与指令元素相关联的当前作用域
							2,$element  当前指令对应的元素
							3,$attrs 由当前元素的属性组成的对象。例如，下面的元素
								<div id="aDiv" class="box"></div>
								具有如下的属性对象：
									{
										id:"aDiv",
										class:"box"
									}
							4,$transclude
								嵌入链接函数会与对应的嵌入作用域进行预绑定。
								transclude链接函数时实际被执行用来克隆元素和操作DOM的函数
									在控制器内部操作DOM时和AngularJS风格相悖的做法，但通过链接函数就可以实现这个需求。仅在compile参数中使用transcludeFn时推荐的做法。
								通过指令来添加一个超链接标签，可以在控制器内的$transclude函数中实现
									angular.module("myApp",[])
									.directive("link",function(){
										return {
											restrict:"A",
											transclude:true,
											controller:function($scope,$element,$transclude,$log){
												$transclude(function(clone){
													var a = angular.element("<a>");
													a.attr("href",clone.text());
													a.text(clone.text());
													$log.info("Created new a tag in link directive");
													$element.append(a);
												})
											}
										}
									})
								指令的控制器和 link 函数可以进行互换。 控制器主要是用来提供可在指令间复用的行为， 但
								链接函数只能在当前内部指令中定义行为，且无法在指令间复用。
									tips:link函数可以将指令互相隔离开来，而controller则定义可复用的行为。
								由于指令可以require其他指令所使用的控制器，因此控制器常被用来防止在多个指令间共享的动作。
								如果我们希望当前指令的API暴露给其他指令使用，可以使用controller参数，否则可以使用link来构造当前指令元素的功能性。如果我们使用了scope.$watch()或者想要与DOM元素做实时交互，使用链接会时更好的选择。
								技术上讲，$scope会在DOM元素被实际渲染之前传入到控制器中。在某些情况下，例如使用了嵌入，控制器中的作用域所反映的作用域可能与我们所期望的不一样，这种情况下，$scope对象无法保证可以被正常更新。
									当想要同当前屏幕上的作用域交互时，可以使用被传入到link函数中的scope参数
				10.3.3 controllerAs(字符串)



































#多重视图和路由
    ng-include指令可以在视图中引用多个模板
    除了用in-include指令在视图中引用多个模板外，更好的做法是将试图分解成布局和模板视图，并且根据用户当前访问的URL来展示对应的视图。
    我们会将这些模板分解到视图中，并在布局模板内进行组装。AngularJS允许我们在$route服务的提供者$routeProvider中通过声明路由来实现这个功能。
    通过$routeProvider，可以发挥出浏览器历史导航的优势，并让用户基于浏览器当前的URL地址创建书签或分享页面
####12.1 安装
    从1.2版本开始，AngularJS将ngRoutes从核心代码中剥离出来成为独立的模块。我们需要安装并引用它，才能够在AngularJS应用中正常地使用路由功能。
    使用bower来安装angular-route.js
        bower install --save angular-route
    在HTML中引用
        <script src="js/vendor/angular.js"></script>
        <script src="js/vendor/angular-route.js"></script>
    最后，要把ngRoute模块在我们的应用中当做依赖加载进来：
        angular.module("myApp",["ngRoute"]);
####12.2 布局模板
    要创建一个布局模块，需要修改HTML以告诉AngularJS把模块渲染到何处。通过将ng-view指令和路由组合到一起，我们可以精确地指定当前路由
    所对应的模板在DOM中的渲染位置。
        <div ng-view="">
            
        </div>
    我们将所需要渲染的内容都放到包好ng-view指令的div中，其他内容在路由改变时不会发生任何变化
    ng-view是由ngRoute模块提供的特殊，它的独特作用是在HTML中给$route对应的视图内容占位。
    它会创建自己的作用域并将模板嵌套在内部。
        mg-view 是一个优先级为1000的终极指令。AngularJS不会运行同一个元素上的
        低优先级指令（例如 <div ng-view></div> 元素上其他指令都是没有意义的） 
    ng-view指令遵循以下规则。
        每次触发$routeChangeSuccess事件，视图都会更新
        如果某个模板同当前的路由相关联:
            创建一个新的作用域，
            移除上一个视图，同时上一个作用域也会被清除，
            将新的作用域同当前模板关联在一起，
            如果路由中有相关的定义，那么就把对应的控制器同当前作用域关联起来，
            触发$viewContentLoaded事件，
            如果提供了onload属性，调用该属性的函数。
####12.3 路由
    AngularJS提供的when和otherwise两个方法来定义应用的路由。
    用config函数在特定的模块或应用中定义路由。
        angular.module("myApp",["ngRoute"])
            .config(["$routeProvider",function($routeProvider){
                //在这里定义路由
            }])
    用when方法来添加一个特定的路由。这个方法可以接受两个参数(when(path,route))
        angular.module("myApp",[])
            .config(["$routeProvider",function($routeProvider){
                $routeProvider
                    .when("/",{
                        templateUrl:"views/home.html",
                        controller:"HomeController"
                    })
            }])
    第一个参数是路由路径，这个路径会与$location.path进行匹配，$location.path也就是当前URL的路径。
    如果路径后面还有其他内容，或使用了双斜线也可以正常匹配。我们可以在URL中存储参数，参数需要以冒号开头(例如:name)，
    用$routeParams读取这些参数
    第二个参数是配置对象，决定了当第一个参数中的路由能够匹配时具体做些什么。配置对象中可以进行设置的属性包括:
    template、controller、templateUrl、resolve、redirectTo和reloadOnSearch
        一个复杂的路由方案会包含多个路由，以及一个可以将所有意外路径进行重定向的捕获器。
            angular.module("myApp",["ngRoute"])
                .config(["$routeProvider",function($routeProvider){
                    $routeProvider
                        .when("/",{
                            templateUrl:"view/home.html",
                            controller:"HomeController"
                        })
                        .when("/login",{
                            templateUrl:"view/login.html",
                            controller:"LoginController"
                        })
                        .when("/dashboard",{
                            templateUrl:"view/dashboard.html",
                            controller:"DashboardController",
                            resolve:{
                                user:function(SessionService){
                                    return SessionService.getCurrentUser();
                                }
                            }
                        })
                        .otherwise({
                            redirectTo:"/"
                        })
        1,controller
            controller:"myController"
            //或者
            controller:function($scope){}
            如果配置对象中设置了 controller 属性，那么这个指定的控制器会与路由所创建的新作用
            域关联在一起。如果参数值是字符型，会在模块中所有注册过的控制器中查找对应的内容，然后
            与路由关联在一起。如果参数值是函数型，这个函数会作为模板中DOM元素的控制器并与模板
            进行关联。
        2,template
            template:"<div>Route</div>"
            AngularJS会将配置对象中的HTML模板渲染到对应的具有ng-view指令的DOM中
        3,templateUrl
            templateUrl:"view/template_name.html"
            应用会根据templateUrl属性所指定的路径通过XHR读取视图(或者从$templateCache中读取)。如果能够找到并读取
            这个模板，AngularJS会将模板的内容渲染到具有ng-view指令的DOM元素中
        4,resolve
            resolve: {
                'data': ['$http', function($http) {
                    return $http.get('/api').then(
                        function success(resp) { return response.data; },
                        function error(reason) { return false; }
                    );
                }];
            }
            如果设置了resolve属性，AngularJS会将列表中的元素都注入到控制器中。如果这些依赖是promise对象，他们在控
            制器加载以及$routeChangeSuccess被触发之前，会被resolve并设置成一个值。
                列表对象可以是:
                    键，键值是会被注入到控制器中的依赖的名字；
                    工厂，即可以是一个服务的名字，也可以是一个返回值，它是会被注入到控制器中的函数或可以被resolve的
                    promise对象
            上述例子中，resolve 会发送一个$http请求，并将data的值为返回结果的值。列表中的键data会被注入到控制器中，
               所以在控制器中可以使用它。
        5,redirectTo
            redirectTo:"/home"
            //或者
            redirectTo:function(route,path,search)
            如果redirectTo属性的值是一个字符串，那么路径会被替换成这个值，并根据这个目标路径触发路由变化
            如果redirectTo属性的值是一个函数，那么路径会被替换成函数的返回值，并根据这个目标路径触发路由变化
                redirectTo属性的值是一个函数，AngularJS会在调用它事传入三个参数：
                    1)从当前路径中提取出的路由参数
                    2)当前路径
                    3)当前URL中的查询串
        6,reloadOnSearch
            如果reloadOnSearch选项被设置为true(default)，当$location.search()发生变化时会重新加载路由。如果设置为false
            那么当URL中的查询串部分发生变化时就不会重新加载路由。这个小窍门对路由嵌套和原地分页等需求非常有用。
                现在介绍用 when 函数来设置路由。
                下面的例子中设置了两个路由：一个首页路由和一个收件箱路由，同时首页路由被设置成默
                认路由。
                angular.module("myApp",[])
                    .config(["$routeProvider",function($routeProvider){
                        $routeProvider
                            .when("/",{
                                templateUrl:"view/home.html",
                                controller:"HomeController"
                            })
                            .when("/inbox/:name",{
                                templateUrl:"view/inbox.html",
                                controller:"InboxController"
                            })
                            .otherwise({
                                redirectTo:"/"
                            })
                    }])
                }])
                如上，我们已经用 when 方法设置了两个路由。 otherwise 方法会在没有任何路由匹配时被调
                用，我们用它设置了一个默认跳转到'/'路径的路由。
                当浏览器加载AngularJS应用时，会将URL设置成默认路由所指向的路径。除非我们在浏览
                器中加载不同的URL，否则默认会使用 / 路由。
    $routeParams
        如果我们在路由参数的前面加上":"，AngularJS就会把它解析出来并传递给$routeParams
            $routeProvider
                .when('/inbox/:name', {
                    controller: 'InboxController',
                    templateUrl: 'views/inbox.html'
            });
        AngularJS会在$routeParams中添加一个名为name的键，它的值会被设置为加载进来的URL中的值。
        如果浏览器加载/inbox/all这个URL，那么$routeParams对象看起来会是下面这样:
            {name:"all"}
        需要注意，如果想要在控制器中访问这些变量，需要把$routeParams注入进控制器:
            app.controller("InboxController",function($scope,$routeParams){
                //在这里访问$routeParams
            })
####12.4 $location服务
    AngularJS提供了一个服务用以解析地址栏中的URL，并让你可以访问应用当前路径所对应的路由。
    它同样提供了修改路径和处理各种形式导航的能力。
        $location服务对javascript中的window.location对象的API进行更优雅的封装，并且和AngularJS
        集成在一起。
    当应用需要在内部进行跳转时使用$location服务的最佳场景，比如当用户注册后、修改或者登录后进行跳转。
    $loaction服务没有刷新整个页面的能力，如果需要刷新整个页面，需要使用$window.location对象(window.location的接口)
        1,path() 用来获取页面当前的路径：
            $location.path();//返回当前路径
            修改当前路径并跳转到应用中的另一个URL：
            $location.path("/");//把路径修改为"/"路由
            path()方法直接和HTML5的历史API进行交互，所以用户可通过点击后退按钮退回到上一个页面
        2,replace()
            如果你希望跳转后用户不能点击后退按钮 （对于登录之后的跳转这种发生在某个跳转之后的
            再次跳转很有用） ，AngularJS提供了 replace() 方法来实现这个功能：
            $location.path("/home");
            $location.replace();
            //或者
            $location.path("/home").replace();
        3,absUrl() 方法用来获取编码后的完整URL
            $location.absUrl()
        4,hash() 方法用来获取URL中的hash片段
            $location.hash();//返回当前的hash片段(url中第一个"#"号后面的URL片段)
        5,host() 方法用来获取URL中的主机
            $location.host()
        6,port() 方法用来获取URL中的端口号
            $location.port()
        7,protocol() 方法用来获取URL中的协议
            $location.protocol(); //返回当前URL的协议
        8,search() 方法用来获取URL中的查询串
            $location.search();
            我们可以向这个方法中传入新的查询参数，来修改URL中的查询串部分:
            //用对象设置查询
            $location.search({name:"Ari",username:"auser"});
            //用字符串设置查询("name=Ari&username=auser");
            search方法接受两个参数:
                search(可选，字符串) 这个参数代表新的查询参数。hash对象的值可以使数组。
                parameValue(可选，字符串) 
                如果search参数的类型是字符串，那么paramValue会作为该参数的值覆盖URL当中的对应值。
                如果paramValue的值是null，对应的参数会被移除。
        9,url() 方法用来获取当前页面的URL
            $location.url();//该URL的字符串
            如果调用 url() 方法时传了参数，会设置并修改当前的URL，这会同时修改URL中的路径、
            查询串和hash，并返回 $location 。
            

    
    
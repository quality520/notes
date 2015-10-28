# XHR practice XHR实践
####16.1 跨域和同源策略
    同源策略:允许页面从同一个站点加载和执行特定的脚本.浏览器通过对比每个资源的协议/主机名/端口号
    来判断资源是否与页面同源.站外其他来源的脚本同页面的交互则被严格限制.
    跨域资源共享:(Cross Origin Resource Sharing,CORS)是一个解决跨域问题的好办法,从而可以使用XHR
    从不同的源加载数据和资源.
    三种方式解决同源策略的问题:
      JSONP
      CORS
      服务器代理
####16.2 JSONP
    JSONP是一种可以绕过浏览器的安全限制,从不同的域请求数据的方法.使用JSONP需要服务器端提供必要的
    支持
    原理:通过<script>标签发起一个GET请求来取代XHR请求.JSONP生成一个<script>标签并插入到DOM中,然后
    浏览器会接管并想src属性所指向的地址发送请求.
    当服务器返回请求时,响应结果会被包装成一个javascript函数,并由该请求所对应的回调函数调用.
    AngularJS在$http服务中提供了一个JSONP辅助函数.通过$http服务的jsonp方法发送请求
      $http.jsonp('https://api/github.com?callback=JSON_CALLBACK).success(function(data){
        //数据
      });
    当请求发送时,AngularJS会在DOM中生成一个如下所示的<script>标签:
      <script src="https://api.github.com?callback=angular.callbacks._0" type="text/javascript">
      </script>
      warning:JSON_CALLBACK被替换成一个特地为此请求生成的自定义函数
    当支持JSONP的服务器返回数据时,数据会被包装在由AngularJS生成的具名函数angular.callbacks._0中
    这个例子中,github服务器会返回含在回调函数中的JSON数据,响应看起来如下所示:
      //简写
      angular.callback._0({
        'meta':{
          'X-RateLimit-Limit':'60',
          'status':200
        },
        'data':{
          'current_user_url':'https://api.github.com/user'
        }
      })
    当AngularJS调用指定的回调函数时会对$http的promise对象进行resolve.
    
    使用JSONP需要意识到潜在的安全风险.首先,服务器会完全开放,允许后端服务调用应用中的任何javascript.
    不受我们控制的外部站点(或者蓄意攻击者)可以随时更改脚本,使我们的整个站点变得脆弱.
    由于请求是由<script>标签发送的,所以只能通过JSONP发送GET请求.并且脚本的异常也很难处理.
    使用JSONP一定要谨慎,同时只能跟信任并可以控制的服务器进行通信.
####16.3 使用CORS
    CORS规范简单地扩展了标准的XHR对象,以允许javascript发送跨域的XHR请求.它会通过预检查(preflight)
    来确认是否有权限向目标服务器发送请求.
    预检查可以让服务器接受或拒绝来自全部服务器、特定服务器或一组服务器的请求。这意味
    着客户端和服务端应用需要协同工作，才能向客户端或服务器发送数据。
    16.3.1 设置
      CORS的设置:
        使用.config()方法应用在模块上设置两个参数:
        首先,告诉AngularJS使用XDomain,并从所有的请求中把X-Request-Width头移除.
          tips:X-Request-With 头默认就是移除掉的，但是再次确认它已经被移除没有坏处。
        angular.module('myApp',[])
          .config(function($httpProvider){
          })
    16.3.2 服务器端CORS支持
      如何确保服务器支持CORS.
        支持CORS的服务器必须在响应中加入几个访问控制相关的头.
          Access-Control-Allow-Origin
            这个头的值可以是与请求头的值相呼应的值,也可以是*,从而允许接受任何来源发来的请求.
          Access-Control-Allow-Credentials(可选)
            默认情况下,CORS请求不会发送cookie.如果服务器返回了这个头,那么就可以通过将withCredentials设置
            为true来将cookie同请求一同发送出去.
            如果将$http发送的请求中的withCredentials设置为true,但服务器没有返回Access-Control-Allow-Credentials,
            请求就会失败,反之亦然.
        后端服务器必须能处理OPTIONS方法的HTTP请求
        CORS请求分为简单和非简单两种类型
    16.3.3 简单请求
      如果请求使用下面一种HTTP方法就是简单请求:
        HEAD;
        GET;
        POST;
      如果请求除了下面列表中的一个或多个HTTP头以外,没有使用其他头:
        Accept;
        Accept-Language;
        Content-Language;
        Last-Event-ID;
        Content-Type:
          application/x-www-form-urlencoded;
          multipart/form-data;
          text/plain;
      简单请求,浏览器不需要使用CORS就能发送这类请求.简单请求不要求浏览器和服务器之间有任何的reshuffle通信.
      eg:
        $http
        .get('http://aip.github.com')
        .success(function(data){
          //数据
        });
    16.3.4 非简单请求
      不符合简单请求标准的请求都被称为非简单请求,如果想要支持PUT或DELETE方法,又或者想给请求设置特殊的内容
      类型,就需要发送非简单请求.
      浏览器实际上会发送两个请求：预请求和请求。浏览器首先会向服务器发送预请求来获得发
      送请求的许可，只有许可通过了，浏览器才会发送真正的请求。
      浏览器处理CORS的过程是透明的.
      同简单请求一样,浏览器给预请求和请求都加上Origin头.
        预请求
          浏览器发送的预请求是OPTIONS类型的,预请求中包含以下头信息:
          Access-Control-Request-Method  这个头是请求所使用的HTTP方法,会始终包含在请求中.
          Access-Control-Request-Headers(可选)
          这个头的值是一个逗号分割的非简单列表，列表中的每个头都会宝航这个请求中。
          服务器必须接受这个请求，然后检查HTTP方法和头的合法性。如果通过了检查，服务器会在响应中添加下面这个头:
          Access-Control-Allow-Origin
          这个头的值必须和请求的来源相同,或者时*符号,以允许接受来自任何来源的请求.
          Access-Control-Allow-Methods
          这是一个可以接受的HTTP方法列表,对在客户端缓存响应结果很有帮助,并且未来发送请求可以不必总是发送预请求.
          Access-Control-Allow-Headers
          如果设置了Access-Control-Request-Headers头,服务器必须在响应中添加同一个头.
          我们希望服务器在可以接受这个请求时返回200状态码。如果服务器返回了200状态码，真正
          的请求才会发出。
            CORS并不是一个安全机制,只是现代浏览器实现的一个标准,在应用中设置安全策略依然时我们的责任.
          AngularJS中的非简单请求和普通请求看起来没声明区别:
            $http
            .delete('http://api.github.com/api/users/1')
            .success(function(data){
              //data
            })
####16.4 服务器端代理
    实现向所有服务器发送请求的最简单方式是使用服务器端代理。 这个服务器和页面处在同一
    个域中（或者不在同一个域中但支持CORS） ，做为所有远程资源的代理。
    可以简单地通过使用本地服务器来代替客户端向外部资源发送请求， 并将响应结果返回给客
    户端。
    通过这种方式，老式浏览器不必使用需要发送额外请求的CORS（只有现代浏览器支持
    CORS）也能发送跨域请求，并且可以在浏览器中采用标准的安全策略。
####16.5 使用JSON
    JSON是JavaScript Object Notation的简写,是一种看起来像JavaScript对象的数据交换格式.事实上,当javascript加载它时,它确实会被当做一个对象来解析.AngularJS也会将所有以JSON格式返回的javascript对象解析为一个与之对应的Angular对象.
      如果服务器返回以下JSON:
      [
        {'msg':'This is the first msg',state:1},
        {'msg':'This is the second msg',state:2},
        {'msg':'This is the third msg',state:3},
        {'msg':'This is the fourth msg',state:4}
      ]
    当AngularJS通过$http服务收到这个数据后,可以像普通javascript对象那样来引用其中的数据:
      $http.get('/v1/message.json')
           .success(function(data,status){
              $scope.first_msg = data[0].msg;
              $scope.first_state = data[0].state;
            });
####16.6 使用XML
    假如服务器返回的是XML而非JSON格式的数据，需要将其转换成JavaScript对象。
    幸好，有不少出色的开源库可以使用，同样，某些浏览器也内置了解析器，可以帮助我们将
    XML格式转换成JavaScript对象。
    在这里我们以X2JS库为例，这是一个非常好用的开源库
      angular.factory('xmlParser', function() {
        var x2js = new X2JS();
        return {
          xml2json: x2js.xml2json,
          json2xml: x2js.json2xml_str
        };
      });
    借助这个轻量的解析服务，可以将 $http 请求返回的XML解析成JSON格式，如下所示：
      angular.factory('Data', [$http, 'xmlParser', function($http, xmlParser) {
        $http.get('/api/msgs.xml', {
          transformResponse: function(data) {
          return xmlParser.xml2json(data);
        }
        });
      });
    现在请求的结果被转换成了JSON对象，可以像服务器本来返回的就是JSON格式一样来使用
    这个对象。
####16.7 使用AngularJS进行身份验证
    16.7.1 服务器端需求
      用来保护客户端应用的两种方法
      1,服务器端视图渲染
        如果站点所有的HTML页面都是由后端服务器处理的，可以使用传统的授权方式，由服务器
        端进行鉴权，只发送客户端需要的HTML
      2,纯客户端身份验证
        通过令牌授权来实现客户端身份验证，服务器需要做的是给客户端应用提供授权令牌。
        令牌本身是一个由服务器端生成的随机字符串， 由数字和字母组成， 它与特定的用户会话相关联。
          uuid库时用来生成令牌的号选择.
          服务端请求返回的状态码:
            状态码           含义
              200          一切正常
              401          未授权的请求
              403          禁止的请求
              404          页面找不到
              500          服务器错误
        当客户端收到这些状态码时会做出相应的响应.
        数据流程如下:
          1,一个未经过身份验证的用户浏览了我们的站点
          2,用户视图访问一个受保护的资源,被重定向到登录页面,或用户手动访问了登录页
          3,用户输入登录的ID以及密码,接着AngularJS应用通过POST请求将用户的信息发送给服务端
          4,服务端对ID和密码进行校验,检查他们是否匹配
          5,如果ID和密码匹配,服务端生成一个唯一的令牌,并将其同一个状态码为200的响应一起返回.如果不匹配,服务器返回一个状态码为401的响应.
          对一个已经通过身份验证的用户,流程如下:
          1,用户请求受保护的资源路径
          2,如果用户尚未登录，应用会将他重定向到登录页面。如果用户登录了，应用会使用该会话对应的令牌来发送请求
          3,服务器对令牌进行校验,并根据请求返回合适的数据.
    16.7.2 客户端身份验证
      重定向未经过身份验证的页面请求；
      捕获所有响应状态码非200的XHR请求，并进行相应的处理；
      在整个页面会话中持续监视用户的身份验证情况
      有下面几种方法可以将路由定义为公共的或非公共
      1,资源AIP访问的资源
        创建$http拦截器来处理所有的响应.
          angular.module('myApp',[])
           .config(function($httpProvider){
            //在这里构造拦截器
            })
          处理所有请求的响应已经响应错误
          angular.module('myApp',[])
            .config(function($httpProvider){
              var interceptor = function($q,$rootScope,Auth){
                return {
                  'response':function(resp){
                    if(resp.config.url='/api/login'){
                      //假设API服务器返回的数据格式如下:
                      //{toke:'AUTH_TOKEN'}
                      Auth.setToken(resp.data.token);
                    }
                    return resp;
                  },
                  'responseError':function(rejection){
                    //错误处理
                    switch(rejection.status){
                      case 401:
                        if(rejection.config.url != 'aip/login')
                        //如果页面不是在登录页面
                          $rootScope.$broadcast('auth:loginRequired');
                        break;
                      case 403:
                        $rootScope.$broadcast('auth:forbidden');
                        break;
                      case 404:
                        $rootScope.$broadcast('page:notFound');
                        break;
                      case 500:
                        $rootScope.$broadcast('server:error');
                        break;
                    }
                    return $q.reject(rejection);
                  }
                };
              };
              //将拦截器和$httpde的request/response链整合在一起
              $httpProvider.inerceptor.push(interceptor);
            });
      2,使用路由定义受保护资源
        监视路由的变化:$routeChangeStart事件
        首先要定义应用的访问规则。可以通过在应用中设置常量，然后在每个路由中通过对比这些
        常量来判断用户是否具有访问权限
          angular.modult('myApp',['ngRoute'])
            .constant('ACCESS_LEVELS',{
              pub:1,
              user:2
            })
        通过把 ACCESS_LEVELS 设置为常量，可以将它注入到 .confgi() 和 .run() 代码块中，并在整
        个应用范围内使用
          angular.module('myApp',['ngRoute'])
            .config(function($routeProvider,ACCESS_LEVELS){
              $routeProvider
                .when('/',{
                  controller:'mainController',
                  templateUrl:'view/main.html',
                  access_level:ACCESS_LEVELS.pub
                })
                .when('/account',{
                  controller:'accountController',
                  templateUrl:'view/account.html',
                  access_level:ACCESS_LEVELS.user
                })
                .otherwise({
                  redirecTo:'/'
                });
            });
          为了验证用户的身份,需要创建一个服务来对已经存在的用户进行监视.同时需要让服务能够访问浏览器的cookie,这样当用户重新登录时,只要回话有效就无需再次进行身份验证.
            angular.module('myApp.services', [])
            .factory('Auth', function($cookieStore,ACCESS_LEVELS) {
            var _user = $cookieStore.get('user');
            var setUser = function(user) {
            if (!user.role || user.role < 0) {
            user.role = ACCESS_LEVELS.pub;
            }
            _user = user;
            $cookieStore.put('user', _user);
            };
            return {
            isAuthorized: function(lvl) {
            return _user.role >= lvl;
            },
            setUser: setUser,
            isLoggedIn: function() {
            return _user ? true : false;
            },
            getUser: function() {
            return _user;
            },
            getId: function() {
            return _user ? _user._id : null;
            },
            getToken: function() {
            return _user ? _user.token : '';
            },
            logout: function() {
            $cookieStore.remove('user');
            _user = null; }
            }
            };
            });
            



      

    
    
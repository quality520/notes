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
    
    
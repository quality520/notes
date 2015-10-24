#同外界通信:XHR 和服务器通信
####15.1 使用$http
    我们可以使用内置的$http服务直接同外部进行通信。$http服务只是简单的封装了浏览器原生的XMLHttpRequest对象。
    $http服务是只能接受一个参数的函数，这个参数是一个对象，包含了用来生成HTTP请求的配置内容。这个函数返回一个promise对象，具有success和error两个方法。
      基本用法:
        $http({
        	method:'GET',
        	url:'/api/user.json'
        }).success(function(data,status,headers,config){
        	//函数主体
        }).error(function(data,status,headers,config){
        	//当响应以错误状态返回时调用
        });
    请注意，看上去我们想$http中传入一个回调函数供响应返回时调用，但事实并非如此。这个方法实际上返回一个promise对象。
    当promise返回时，我们可以将$http方法的运行结果当做变量一并返回，并将其他promise同它串联在一起，进行链式的调用。
    在创建服务时会频繁使用链式调用技术，因此服务可以返回一个promise对象，而不需要回调函数。
      var promise = $http({
      	method:'GET',
      	url:'/api/user.json'
      });
    由于$http方法返回一个promise对象，我们可以在响应返回时用then方法来处理回调。如果使用then方法，会得到一个特殊的参数，它代表了相应对象的成功或失败信息，还可以接受两个可选的函数作为参数，或者可以使用success和error回调代替。
      promise.then(function(resp){
      	//resp是一个响应对象
      },function(resp){
      	//带有错误信息的resp
      });
      //或者使用success/error方法
      promise.success(function(data,status,headers,config){
      	//处理成功的响应
      });
      //错误处理
      promise.error(function(data,status,headers,config){
      	//处理非成功的响应。
      });
    如果响应状态码在200和299之间，会认为响应时成功的，success回调会被调用，否则error回调会被调用。
      tips:如果响应结果时重定向，XMLHttpRequest会跟进这个重定向，error回调并不会被调用。
    我们可以调用HttpPromise对象上的them()、success()和error()方法。then()方法与其他两种方法的主要区别是，它会接受到完整的响应对象，而success()和error()则会对响应对象进行析构。
    调用http方法后，在下一个$digest循环运行之前它并不会真正执行。尽管大部分情况下我们都是在$apply代码块内部使用$http,但也可以在AngularJS的$digest循环以外执行这个方法
    如果要在AngularJS的$digest循环以外执行$http函数，需要将其封装在一个$apply代码块中。这样会强制$digest循环执行，我们的promise可以按预期那样被resolve.
    $scope.$apply(function(){
    	$http({
    		method:'GET',
    		url:'/api/user.json'
    	});
    });
#####快捷方法
    $http服务提供了一些顺手的快捷方法供我们使用，这些方法简化了复杂设置，只需要提供URL和HTTP方法(或者POST或PUT请求中包含的数据)即可。
      //快捷的GET请求
      $http.get('/api/user.json');
    1,get()  该方法时发送GET请求的快捷方式
			get()函数可以接受两个参数
			url(string) 一个绝对或相对路径的URL，代表请求的目的地。
			config(可选，object)
			这是一个可选的设置对象
			get()方法返回HttpPromise对象
    2,delete()  这是用来发送DELETE请求的快捷方式
      delete()函数可以接受两个参数
      url(string)一个绝对或相对路径的URL，代表请求的目的地
      config(可选，object) 这是一个可选的设置对象
			delete()方法返回HttpPromise对象
    3,head()  这是用来发送HEAD请求的快捷方式
      head()函数可以接受两个参数
      url(string)一个绝对或相对路径的URL，代表请求的目的地
      config(可选，object) 这是一个可选的设置对象
			head()方法返回HttpPromise对象
    4,jsonp()  这是用来发送JSONP请求的快捷方式
			jsonp()函数可以接受两个参数
			url(string)
			一个绝对或相对路径的URL，代表请求的目的地。为了发送JSONP请求，其中必须包含JSON_CALLBACK字样，例如：
			  $http.jsonp('/api/users.json?callbakc=JSON_CALLBACK');
        config(可选，object) 这是一个可选的设置对象
  			jsonp()方法返回HttpPromise对象
    5,post() 这是用来发送POST请求的快捷方式。
      post()函数可以接受三个参数
      url(string)一个绝对或相对路径的URL，代表请求的目的地
      data(object/string) 这个对象包含请求的数据
      config(可选，object) 这是一个可选的设置对象
			post()方法返回HttpPromise对象
    6,put() 用来发送PUT请求的快捷方式
      put()函数可以接受三个参数
      url(string)一个绝对或相对路径的URL，代表请求的目的地
      data(object/string) 这个对象包含请求的数据
      config(可选，object) 这是一个可选的设置对象
			put()方法返回HttpPromise对象
####15.2 设置对象
    当我们将$http当做函数来调用时，需要传入一个设置对象,需要传入一个设置对象，用来说明如何构造XHR对象。
      $http({
      	method:'GET',
      	url:'/api/users.json',
      	params:{
      		'username':'auser'
      	}
      })
    设置对象可以包含以下键:
    1,method(sting)
      这个键时我们希望发送的请求的HTTP方法。它的值时下列各项其中之一:'GET','DELETE','HEAD','JSONP','POST','PUT'.
    2,url(string)
      绝对或相对路径的URL，是请求的目标
    3,params(string map /object)
      这个键的值时一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
        //参数会转化为?name=ari的形式
        $http({
        	params:{'name':'ari'}
        })
    4,data(sting/object)
      这个对象中包含了将会被当做消息发送给服务器的数据。通常在发送POST请求时使用。
      从AngularJS 1.3开始，它还可以在POST请求中发送二进制数据。要发送一个blob对象，你可以简单的通过使用data参数来传递它
        var blob = new Blob(['Hello world'],{type:'text/plain'});
        $http({
        	method:'POST',
        	url:'/',
        	data:blob
        });
    5,headers(object)
      一个列表，没一个元素都是一个函数，它会返回代表随请求发送的HTTP头。如果函数的返回值时null，对应的头不会被发送。
    6,xsrfHeaderName(sting)
      保存XSFR令牌的HTTP头的名称
    7,xsrfCookieName(string)
      保存XSFR令牌的cookie的名称
    8,transformRequest(function/function array)
      这是一个函数或函数数组，用来对HTTP请求的请求体和头信息进行转换，并返回转换后的版本。通常用于在请求发送给服务器之前对其进行序列化。
        这个函数看起来时这样的:
        function(data,headers){}
    9,transformResponese(function/function array)
      这是一个函数或函数数组，用来对HTTP响应的响应体和头信息进行转换，并返回转换后的版本。通常用来进行反序列化。
        这个函数看起来时这样的:
        function(data,headers){}
    10,cache(布尔型或缓存对象)
      如果cache属性被设置为true，那么AngularJS会用默认的$http缓存对GET请求进行缓存。如果cache属性被设置为一个$cacheFactory对象的实例，那么这个对象会被用来对GET星球进行缓存。
    11,timeout(数值型或promise对象)
      如果timeout被设置为一个数值，那么请求将会在推迟timeout指定的毫秒数后再此发送。如果被设置为一个promise对象，那么当该promise对象被resolve时请求会被中止。
    12,withCredentials(布尔型)
      如果该属性被设置为true，那么XHR请求对象中会设置withCredentials标记。
      默认情况下，CORS请求不会发送cookie，而withCredentials标记会在请求中加入Access-Control-Allow-Credentials头，这样请求就会将目标域的cookie包含在请求中。
    13,responseType(string)
      responseType选项会在请求中设置XMLHttpRequestResponseType属性。我们可以使用以下HTTP请求类型其中之一:
        ''(字符串，默认);
        'arraybuffer'(ArrayBuffer);
        'blob'(blob对象);
        'document'(HTTP文档);
        'json'(从JSON对象解析而来的JSON字符串);
        'text'(字符串);
        'moz-blob'(Firefox的接收进度事件);
        'moz-chunked-text'(文本流);
        'moz-chunked-arraybuffer'(ArrayBuffer流)。
####15.3 响应对象
    AngularJS传递给then()方法的响应对象包含四个属性。
    data (字符串或对象) 这个数据代表转换过后的响应体(如果定义了转换的话)。
    status (数值型) 响应HTTP状态码
    headers (函数)
    这个函数时头信息的getter函数,可以接受一个参数，用来获取对应名字的值。例如：用如下代码获取X-Auth-ID的值
      $http({
      	method:'GET',
      	url:'/api/users.json'
      }.then(resp){
      	//读取X-Auth-ID
      	resp.headers('X-Auth-ID');
      });
    config (对象)
    这个对象是用来生成原始请求的完整设置对象。
    statusText(字符串)
    这个字符串时响应的HTTP状态文本。
####15.4 缓存HTTP请求
    默认情况下，$http服务不糊对请求进行本地缓存。在发送单独的请求时，我们可以通过向$http请求传入一个布尔值或者一个缓存实例来启用缓存。
      $http.get('/api/users.json',{cache:true})
        .success(function(data){})
        .error(function(data){});
    第一次发送请求时， $http 服务会向/api/users.json发送一个GET请求。 第二次发送同一个GET
    请求时， $http 服务会从缓存中取回请求的结果，而不会真的发送一个HTTP GET请求。
    在这个例子里，由于设置了启用缓存，AngularJS默认会使用 $cacheFactory ,这个服务是
    AngularJS在启动时自动创建的。




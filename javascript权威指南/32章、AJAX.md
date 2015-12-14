#AJAX
    Ajax，是Asynchronous JavaScript + XML的简写
####一、XMLHttpRequest
    Ajax核心技术是XMLHttpRequest对象(简称XHR)，在XHR出现之前
    Ajax式的通信必须借助一些hack手段实现，大多数是使用隐藏的框架或内嵌框架
    虽然Ajax中的x代表XML，但Ajax通信和数据格式无关，也就是说这种技术不一定使用XML

#####原生的XHR对象，在大多数浏览器(IE7+,FF,opera,chrome,safari)
    中创建XHR对象直接实例化XMLHttpRequest即可
      var xhr = new XMLHttpRequest();
      xhr;
    IE6及以下，我们必须还需要使用ActiveX对象通过MSXML库来实现。
    在低版本IE浏览器可能会遇到三种不同版本的XHR，即MSXML2.XMLHttp、
    MSXML2.XMLHttp.3.0、MSXML2.XMLHttp6.0
      <!-- 后续补上 -->


#####在使用XHR对象时，必须调用open()方法，它接受三个参数:要发送的请求类型(get,post)、请求的URL和表示是否同步。
      xhr.open('get','demo.php',false);//对于demo.php的get请求，fase同步
      ps:demo.php代码
      <?php echo Date('Y-m-d H:i:s')?>//一个时间

      open()方法并不会真正发送请求，而是启动一个请求以备发送。
      通过send()方法进行发送请求，send()方法接受一个参数，作为请求主题发送的数据
      如果不需要则必须填“null”，执行send()方法之后，请求就会发送到服务器上。
        xhr.send(null);//发送请求
      当请求发送到服务器端，收到响应后，响应的数据会自动填充XHR对象的属性
      那么一共有四个属性:
        属性名       说明
        responseText  作为响应主体被返回的文本
        responseXML   如果响应主题内容是"text/xml"或"application/xml",
                      则返回包含响应数据的XML DOM文档
        status        响应的HTTP状态
        statusText    HTTP状态的说明
      接受响应之后，第一步检查status属性，以确保响应已经成功
      返回。一般而言一HTTP状态码为200作为成功的标志。
      除了成功的状态码，还有一些别的：
      HTTP 状态码    状态字符串        说明
          200            OK        服务器成功返回了页面
          400        Bad Request   语法错误导致服务器不识别
          401        Unauthorized    请求需要用户认证
          404    Not found 指定的 URL   在服务器上找不到
          500    Internal Server Error  服务器遇到意外错误，无法完成请求
          503     ServiceUnavailable   由于服务器过载或维护导致无法完成请求





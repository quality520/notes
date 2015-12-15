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

        addEvent(document,'click',function(){
          var xhr = new createXHR();
          xhr.open('get','demo.php?rand='+Math.random(),false);//设置了同步
          xhr.send(null);
          if(xhr.status == 200){//如果返回成功
            alert(xhr.responseText);//调出服务器返回的数据
          }  
          else{
            alert('数据返回失败!状态码：'+xhr.status+',状态信息：'+xhr.statusText);
          }
        });
      同步调用固然简单,但使用异步调用才是我们真正常用的手段,使用异步
      调用的时候，需要触发readystatechange事件，然后检查
      readyState属性即可，这个属性有五个值:
        值   状态    说明
        0  未初始化 尚未调用open()方法
        1   启动    已经调用open()方法，但尚未调用send()方法
        2   发送    已经调用send()方法，但尚未调用send()方法
        3   接受    已经接收到部分响应数据
        4   完成    已经接收到全部响应的数据，而且可以使用

      addEventLister(document,'click',function(){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          if(xhr.readyStatus == 4){
            if(xhr.status == 200){
              alert(xhr.responseText);
            }else{
              alert('数据返回失败！状态码：'+xhr.status+',状态信息：'+xhr.statusText);
            }
          }
        };
        xhr.open('get','demo.php?rand='+Math.random(),true);
        xhr.send(null);  
      });
      ps:使用abort()方法可以取消异步请求，放在send()方法之前会报错。
      放在responseText之前会得到一个空值
####二、GET与POST
    在提供服务器请求的过程中,有两种方式,分别是：GET和POST。
    在Ajax使用的过程中,GET的使用频率要比POST高。
#####HTTP头部信息
    HTTP头部信息包含服务器返回的响应头信息和客户端发送出去
    的请求头信息。我们可以获取响应头信息或者设置请求头信息。
      //使用getResponseHeader()获取单个响应头信息
        xhr.getResponseHeader('Content-Type');
      //使用getAllResponseHeaders()获取整个响应头信息
        xhr.getAllResponseHeaders();
      //使用setRequestHeader()设置单个请求头信息
        xhr.setRequestHeader('myHeader','white');
        //放在open()方法之后，send()方法之前
    ps:我们只可以获取服务器返回回来响应头信息,无法获取向服务器提交
    的请求头信息，自然自定义的请求头，在javascript端无法获取到的。
#####GET请求
    GET请求是最常见的请求类型，最常用于想服务器查询某些信息.
    必要时,可以将查询字符串参数追加到URL的末尾，以便提交给服务器。
      xhr.open('get','demo.php?rand='+Math.random()+'&name=white',true);
    通过URL后的问好给服务器传递键值对数据,服务器接收到返回响应数据.
    特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理，
    中文字符的返回及参数，可以将页面保存和设置为UTF-8格式即可。
      //一个通用的URL提交函数
      function addURLParam(url,name,value){
        url +=(url.indexOf('?') == -1?'?':'&');//判断url是否有已有参数
        url +=encodeURIComponent(name)+'='+encodeURIComponent(value);
        alert(url);
        return url;
      }
    ps:当没有encodeURIComponent()方法时，在一些特殊字符比如"&",
    会出现错误导致无法获取。
#####POST请求







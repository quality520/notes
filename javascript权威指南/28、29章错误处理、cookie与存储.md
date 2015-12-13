#28错误处理
#####错误类型
    执行代码时可能会发生的错误有多种,每种错误
    都有对应的错误类型，
    7种错误类型：
      1,Error
      2,EvalError
      3,RangeError  //范围错误
      4,ReferenceError  //引用错误
      5,SyntaxError    //语法错误
      6,TypeError     //类型错误
      7,URIError      
    new Array(-5); //抛出RangeError(范围)
    错误信息为:RangeError:invalid array length(无效的数组长度);
    ps:RangeError错误一般在数值超出相应范围时触发

    var box = a;  //抛出ReferenceError(引用)
    错误信息为:ReferenceError:a is not defined(a是没有定义的)
    ps:ReferenceError通常访问不存在的变量产生这种错误

    a $ b; //抛出 SyntaxError(语法)
    错误信息为：SyntaxError: missing ; before statement（失踪;语句之前）
    PS：SyntaxError 通常是语法错误导致的

    new 10; //抛出 TypeError(类型 )
    错误信息为：TypeError: 10 is not a constructor（10 不是一个构造函数）
    PS：TypeError 通常是类型不匹配导致的

    PS：EvalError 类型表示全局函数 eval()的使用方式与定义的不同时抛出，但实际上并不
    能产生这个错误，所以实际上碰到的可能性不大。
    PS：在使用 encodeURI()和 decodeURI()时，如果 URI 格式不正确时，会导致 URIError
    错误。但因为 URI 的兼容性非常强，导致这种错误几乎见不到。
    alert(encodeURI('李炎恢'));
#29章cookie与存储
####一、cookie
    cookie也叫HTTP Cookie,最初是客户端与服务器端进行会话使用的。
    比如：会员登录，下次回访网站时就无须登录了，
    或者购物车里没有及时付款的商品列表

#####cookie的组成
    cookie由名/值对形式的文本组成:name=value.完整的格式为:
    name=value;[expires=date];[path=path];[domain=somewhere.com];[secure]
    name=value为必选,中括号是可选。
    document.cookie='user='+encodeURIComponent('white');//编码写入
    decodeURIComponent(document.cookie);//解码读取
######expires=date失效时间，如果没有声明，则为浏览器关闭即失效，
    声明了失效时间，那么时间到期后方能失效。
    var date = new Date();
    date.setDate(date.getDate() + 7);
    document.cookie="user="+encodeURIComponent('white')+";expires="+date;
    ps:如果要提前删除cookie也非常简单,只要重新创建cookie把时间设置当前
    时间之前即可:date.getDate()-1 或new Date(0)
######path=path,访问路径,当设置了路径,那么只由设置的
那个路径文件才能访问cookie
    var path='/E:/%E5%A4%87%E8%AF%BE%E7%AC%94%E8%AE%B0/JS1/29/demo';
    document.cookie="user="+encodeURIComponent('white')+";path="+path;
######domain=domain 访问域名,用于限制只由设置的域名才可以访问,
那么没有设置,会默认限制为创建cookie的域名
    var domain = 'white.com';
    document.cookie="user="+encodeURIComponent('white')+";domain="+domain;
    ps:如果定义了white.com,那么在这个域名下的任何网页都可访问,如果定义了v.white.com,那么只能在
    这个二级域名访问该cookie,而主域名和其他子域名则不能访问
######secure安全设置,指明必须通过安全的通信通道来传输(HTTPS)才能获取cookie
    document.cookie="user="+encodeURIComponent('white')+";secure";
    ps:HTTPS安全通信链接需要单独配置
#####将cookie封装成函数
    //创建cookie
    function setCookie(name,value,expires,path,domain,secure){
      var cookieText=encodeURIComponent(name)+'='+encodeURIComponent(value);
      if(expires instanceof Date){
        cookieText +=';expires='+expires;
      }
      if(path){
        cookieText +=';path='+path;
      }
      if (domain) {
      cookieText += '; domain=' + domain;
      }
      if (secure) {
      cookieText += '; secure';
      }
      document.cookie = cookieText
    }
    //获取cookie
    function getCookie(name){
      var cookieName=encodeURIComponent(name)+'=';
      var cookieStart=document.cookie.indexOf(cookieName);
      var cookieValue=null;
      if(cookieStart>-1){
        var cookieEnd=document.cookie.indexOf(';'.cookieStart);
        if(cookieEnd===-1){
          cookieEnd = document.cookie.length;
        }
        cookieValue = dencodeURIComponent(
          document.cookie.substring(cookieStart+cookieName.length,cookieEnd)
        );
      }
      return cookieValue;
    }
    //删除cookie
    function unsetCookie(name){
      document.cookie=name+"=;expires="+new Date(0);
    }
    //失效天数，直接传一个天数即可
    function setCookieDate(day) {
      if (typeof day == 'number' && day > 0) {
        var date = new Date();
        date.setDate(date.getDate() + day);
      } else {
        throw new Error('传递的 day 必须是一个天数，必须比 0 大');
      }
      return date;
    }
####二、cookie局限性
    第一：每个特定的域名下最多生成20个cookie
      1,IE或更低版本最多10个cookie
      2,IE7和之后的版本最多可以50个cookie
      3,firefox最多50个cookie
      4,opera最多30个cookie
      5,safri和chrome没有做硬性限制
      ps:当超过指定的cookie时，浏览器会清理早期的cookie,IE和opera会清理近期最少使用cookie,
      firefox会随机清理cookie
    第二：cookie的最大大约为4096字节(4k)
    第三：cookie存储在客户端的文本文件,所以特别重要和敏感
    的数据是不建议保存在cookie的
####其他存储
    IE提供了一种存储的可以持久化用户数据,叫做userData，从IE5.0开始支持
    每个数据最大128K，么个域名下最多1M，这个持久化数据
    存放在缓存中,如果缓存没有清理，那么会一直存在。
      <div style="behavior:url(#default#userData)" id="box"></div>
      addEvent(window, 'load', function () {
        var box = document.getElementById('box');
        box.setAttribute('name', encodeURIComponent('李炎恢'));
        box.expires = setCookieDate(7);
        box.save('bookinfo');
        //box.removeAttribute('name'); //删除 userDate
        //box.save('bookinfo');
        box.load('bookinfo');
        alert(decodeURIComponent(box.getAttribute('name')));
      });
######WEB存储
    javascript提供了sessionStorage和globalStorage
    HTML5中提供了localStorage来取代globalStorage
    浏览器最低版本:IE8+,FF3.5+,Chrome4+,opera10.5+
    sessionStorage
      //通过方法存储和获取
      sessionStorage.setItem('name','white');//设置
      sessionStorage.getItem('name');//获取
      //通过属性存储和获取
      sessionStorage.book = 'javascript';
      sessionStorage.book;
      //删除存储
      sessionStorage.removeItem('name');
      ps：关闭浏览器就会消失
    localStorage
      //通过方法存储和获取
      localStorage.setItem('name','white');//设置
      localStorage.getItem('name');//获取
      //通过属性存储和获取
      localStorage.book = 'javascript';
      localStorage.book;
      //删除存储
      localStorage.removeItem('name');
      ps：localStorage永久保存在缓存中，需手动删除或清理缓存
      容量限制：
        FF3+,IE8+,Opera为5M
        chrome和safari为2.5M






    



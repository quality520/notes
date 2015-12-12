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
    expires=date失效时间，如果没有声明，则为浏览器关闭即失效，
    声明了失效时间，那么时间到期后方能失效。
    var date = new Date();
    date.setDate(date.getDate() + 7);
    document.cookie="user="+encodeURIComponent('white')+";expires="+date;


    



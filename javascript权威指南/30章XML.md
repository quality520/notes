#XML
####一、IE中的XML
    1,创建XMLDOM对象
      IE浏览器是第一个原生支持XML的浏览器,而它是通过ActiveX对象实现的。
      var xmlDom = new ActiveXObject('MSXML2.DOMDocument');
      var xmlDom = new ActiveXObject('Micorsoft.XMLHTTP');
    2,载入XML
      如果已经获取了XMLDOM对象，那么可以使用loadXML()和
      load()这两个方法可以分别载入XML字符串或XML文件
      xmlDom.loadXML('<root version="1.0"'><user>White</user></root>);
      xmlDom.xml;
      loadXML参数指数直接就是XML字符串,如果想效果更好,可以添加换行符\n.
      .xml属性可以序列化XML,获取整个XML字符串
        xmlDom.load('test.xml');//载入一个XML文件
        xmDom.xml;
    3,同步及异步
      load()方法是用于服务器端载入XML的，并且限制在同一台服务器上的XML文件
      载入的时候有两种模式:同步和异步
        所谓同步:就是在加载XML完成之前，代码不糊继续进行，知道完全加载了
        XML再返回。好处就是简单方便、坏处就是如果加载的数据停止响应或延迟
        太久,浏览器会一直堵塞从而造成假死状态。
          xmlDom.async = false;  //设置同步为false
        所谓异步:就是在加载XML时，javascript会把人物对给浏览器内部后台去处理，不会造成
        堵塞,但要配合readystatechange事件使用，通常我们都是用异步方式
          xmlDom.async = true; //设置异步
        XML DOM中readystatechange事件
          就绪状态           说明
             1            DOM正在加载
             2           DOM已经加载完数据
             3        DOM已经可以使用，但某些部分还无法访问
             4           DOM已经完全加载完毕
          ps:readyState可以获取就绪状态值

          var xmlDom = createXMLDOM();
          xmlDom.async = true;
          xmlDom.onreadystatechange = function(){
            if(xmlDom.readyState == 4){//完全加载了，再去获取XML
              alert(xmlDom.xml);
            }
          }
          xmlDom.load('test.xml');//放在后面重点体现异步的作用
        


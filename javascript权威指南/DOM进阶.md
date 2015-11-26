#DOM进阶
####1,dom类型
    Node	表示所有类型值的统一接口
    Document	表示文档类型
    Element		表示元素节点类型
    Text		表示文本节点类型
    Comment	表示文档中的注释类型
    CDATASection表示CDTAT区域类型
    DocumentType表示文档声明类型
    DocumentFragment表示文档片段类型
    Attr	表示属性节点类型
#####Node类型
    Node接口定义了12个数值常量以表示每个节点的类型值
    常量名：     						说明    nodeType值
    ELEMENT_NODE 						元素				1
    ATTRIBUTE_NODE 					属性				2
    TEXT_NODE								文本				3
    CDATA_SECTION_NODE			CDATA 			4
    ENTITY_REFRRENCE_NODE 	实体参考 		5
    ENTITY_NODE							实体				6
    PROCESSING_INSTRUCETION_NODE 处理指令7
    COMMENT_NODE						注释				8
    DOCUMENT_NODE						文档根			9
    DOCUMENT_TYPE_NODE			doctype     10
    DOCUMENT_PRAGMENT_NODE	文档片段		11
    NOTATION_NODE						符号				12
			IE不支持,我们可以模拟一个类,让IE也支持
			if(typeofNode =='undefined'){	//IE返回
				window.Node={
					ELEMENT_NODE:1,
					TEXT_NODE:3
				}
			}

#####2,Document类型
    Document类型表示文档,或文档的根节点,而这个节点时隐藏的
    没有具体的元素标签
    document;  //document
    document.nodeType;		//9,类型值
    document.childNodes[0];  //DocumentType,第一个子节点对象
    document.childNodes[0].nodeType;//非IE为10,IE为8
    document.childNodes[0].nodeName;//html
    document.childNodes[1];		//HTMLHtmlElement
    document.childNodes[1].nodeType;  //1
    document.childNodes[1].nodeName;//HTML

    //如果想直接得到<html>标签的元素节点对象HTMLHtmlElement,
    不必使用childNodes属性这么麻烦，可以使用
    documentElement即可
    	document.documentElement;//HTMLHtmlElement
		//得到<body>标签
			document.getElementsByTagName('body')[0];
			简便方法:document.body
		//得到<!DOCTYPE>
			document.doctype;  //<!DOCTYPE>
		//Document属性和对象集合
		//属性
			document.title;		//获取和设置<title>标签的值
			document.URL;			//获取URL路径
			document.domain;	//获取域名，服务器端
			document.referrer;//获取上一个URL，服务器端
		//对象集合
			document.anchors;	//获取文档中带name属性的<a>元素的结合
			document.links;		//获取文档中带href属性的<a>元素集合
			document.applets;	//获取文档中<applet>元素集合
			document.forms;		//获取文档中<form>元素集合
			document.images;	//获取文档中<img>元素集合
#####3,Element类型
    元素节点的nodeType为1,nodeName为元素的标签名
    元素节点对象在非IE浏览器可以返回它具体元素节点的对象类型
    //元素对应类型表
    元素名					类型
    HTML				HTMLHtmlElement
    DIV					HTMLDivElement
    BODY				HTMLBodyElement
    P						HTMLParamElement
#####4,Text类型
    Text类型用于表现文本节点类型，文本不包含HTMl，或
    包含转义后的HTML，文本节点的nodeType为3
    	同时创建两个同一级别的文本节点的时候，会产生
    	分离的两个节点
    		var box = document.createElement('div');
    		var text1 = document.createTextNode('Mr');
    		var text2 = document.createTextNode('white');
    		box.appendChild(text1);
    		box.appendChild(text2);
    		document.body.appendChild(box);
    		box.childNodes.length;  //=>2
    	//把两个同邻的文本节点合并在一起使用normalize()即可
    		box.normalize();	//合并成一个节点
    	//有合并就有分离，通过splitText(num)即可实现节点分离
    		box.firstChild.splitText(3);  //分离一个节点
    	//Text还提供了一些别的DOM操作的方法
    		box.firstChild.deleteData(0,2);//删除从0位置的2个字符
    		box.firstChild.insertData(0,'hello');//从0位置添加指定字符
    		box.firstChild.replaceData(0,2,'miss');//从0位置替换2个指定字符
    		box.firstChild.subStringData(0,2);//从0位置获取2个字符，直接输出
    		box.firstChild.nodeValue;
#####5,comment类型
    comment类型表示文档中的注释,nodeType为8,nodeNameshi 
    #comment,nodeValue为注释的内容
    var c = document.getElementsByTagName('!');//ie支持，其他不支持
    c[1].nodeValue;
#####6,Attr类型
    Attr类型表示文档元素中的属性
    nodeType为2
    nodeName为属性名
    nodeValue为属性值
####2,DOM扩展
#####1,呈现模式
    标准模式：
    混杂模式：
    IE为document对象添加了一个名为compatMode属性，
    这个属性可以识别IE浏览器的文档处于声明模式，如果
    时标准模式，则返回CSS1Compat,如果是混杂模式则返回
    BackCompat
    	if(document.compatMode == 'CSS1Compat'){
    		alert(document.documentElement.clientWidth);
    	}else{
    		alert(document.body.clientWidth);
    	}
    firefox,opera和chrome都实现了这个属性
    IE8又引入documentMode新属性因为IE8呈现模式分别为
    标准模式8，仿真模式7，混杂模式5,所以如果想测试IE8
    的标准模式，就判断document.documentMode>7即可
#####2,滚动
    DOM提供了一些滚动页面的方法，如下：
      document.getElementById('box').scrollIntoView();
      //设置指定可见
#####3,children属性
    由于子节点空白问题，IE和其他浏览器解释不一致。
    虽然可以过滤掉，但如果只是想得到有效子节点，
    可以使用children属性，支持的浏览器为IE5+,FF3.5+,OPERA8+,CHROME
    这个属性是非标准的
      var box = document.getElementById('box');
      alert(box.children.length);//得到有效子节点数目
#####4,contains()方法
    判断一个节点是不是另一个节点的后代，我们可以使用
    contains()方法,开发人员无须遍历即可获取此信息.
    var box = document.getElementById('box');
    alert(box.contains(box.firstChild)); //true;


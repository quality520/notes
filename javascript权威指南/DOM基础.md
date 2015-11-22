#DOM
    Document Object Model文档对象模型
####DOM介绍
#####1,节点
    加载HTML页面时,web浏览器生成一个树型结构,用来表示页面内部结构。DOM将这种
    树型结构理解为由节点组成.
#####2,  节点种类:元素节点、文本节点、属性节点
    元素节点:其实就是标签<div></div>
    文本节点:其实就是标签内的纯文本
    属性节点:其实就是标签的属性,id="box"
####查找元素
    getElementById();获取特定ID元素的节点
    	document.getElementById('box')
    	元素节点属性
    	tagName获取元素节点的标签名
    	innerHTML获取元素节点里的内容(包含HTML标签)
    getElementsByTagName();获取相同元素的节点列表
    getElementsByName();获取相同名称的节点列表
    getAttribute();获取特定元素节点属性的值
    setAttribute();设置特定元素节点属性的值
    removeAttribute();移除特定元素节点属性
#####getElementById()
    HTML属性的属性
    	id		元素节点的id名称
    	title 元素节点的title属性值
    	style css内联样式属性值
    	className  css元素的类

    	document.getElementById('box');  //获取id
    	document.getElementById('box').id = 'person'; //设置id
    	
    	document.getElementById('box').title;//获取title
    	document.getElementById('box').title='标题';//设置title

    	document.getElementById('box').style;//获取style
    	document.getElementById('box').style.color//获取style对象中color的值
    	document.getElementById('box').style.color='red';//设置style对象中的color的值

    	document.getElementById('box').className;//获取className
    	document.getElementById('box').className='box';//设置class

    	document.getElementById('box').aaa;  //自定义属性,只有IE支持
#####getElementsByTagName()
    getElemntsByTagName('li'); 返回一个数组
    getElementsByTagName('li')[0];
   	//获取第一个li元素
   	也可以使用下面这种方式
   	getElementsByTagName('li').item(0);
   	//获取第一个li元素
   	getElementsByTagName('li').length;
   	//获取长度
#####getElementsByName();//兼容性又问题,ie不支持
    getElementsByName('abc');
    一般用在input中的name属性
    document.getElementsByName('add')[0].value;//获取input元素的value值
    document.getElementsByName('add')[0].checked;
    //获取input元素的checked值
#####getAttribute()方法
    获取元素中某个属性的值，它和直接使用"."属性获取属性值的方法
    又一定区别
    document.getElementById('box').getAttribute('id');
    //获取元素的id值
    document.getElmentById('box').id;
    //获取元素的id值

    document.getElementById('box').getAttribute('mydiv');
    //获取元素的自定义属性值
    document.getElementById('box').mydiv;
    //获取元素的指定一直,非IE不支持
#####setAttribute()
    设置HTML属性
#####removeAttribute()
    可以移除HTML属性
####DOM节点
#####1,node节点属性
    节点可以氛围元素节点、属性节点和文本节点，
    而这些几点有有3个非常有用的属性:
    nodeName,nodeType和nodeValue
    var box = document.getElementById('box');
    box.nodeName; //获取元素节点的标签名,与tagName等价
    box.nodeType; //1,表示元素2,表示属性3,表示文本
    box.nodeValue; //元素节点本身没有内容,返回null
    node只能获取当前节点的东西,不能获取元素里面的内容


#####2,层次节点属性
    节点的层次结构可以划分为:父节点与子节点、兄弟节点两种
    属性
    	childNodes  获取当前元素节点的所有子节点

    	firstChild  获取当前元素的第一个子节点
    	lastChild  获取当前元素的最后一个子节点
    	ownerDocument  获取该节点的文档根节点,相当于document
    	parentNode  获取当前节点的父节点
    	previousSibling  获取当前节点的前一个同级节点
    	nextSibling  获取当前节点的后一个同级节点
    	attributes  获取当前元素节点的所有属性节点集合

    	//忽略空白字符
    	function filterWhiteNode(node){
    		var ret = [];
    		for(var i = 0;i<node.length;i+=){
    			if(node[i].nodeType===3 && /^\s+$/.test(node[i].nodeValue)){
    				continue;
    			}else{
    				ret.push(node[i]);
    			}
    		}
    		return ret;
    	}

    	//移除空白字符
    	function removeWhiteNode(node){
    		for(var i =0;i<node.length;i++){
    			if(node[i].nodeType===3 && /^\s+$/.test(node[i].nodeValue)){
    				node[i].parentNode.removeChild(node[i]);
    			}
    		}
    		return node;
    	}

    	//获取节点的过程中处理遇到的空白节点
    	function removeWhiteNode(node){
    		for(var i =0;i<node.childNodes.length;i++){
    			if(node.childNodes[i].nodeType===3 && /^\s+$/.test(node.childNodes[i].nodeValue)){
    				node.childNodes[i].parentNode.removeChild(node.childNodes[i]);
    			}
    		}
    		return node;
    	}
#####4,节点操作
    创建节点、复制节点、删除节点和替换节点
    write();   //这个方法可以把任意字符串插入到文档中
	    document.write('hello world!');
	  createElement();  //创建一个元素节点
    document.createElement('div');//创建一个div元素
    appendChild()；  将新节点追加到子节点列表的末尾
			var box = document.getElementById('box');
			var oDiv = document.createElement('div');
			box.appendChild(oDiv);
			//将新节点oDiv添加到id=box的子节点列表的末尾上
    createTextNode();  //创建爱你一个文本节点
    	var text = document.createTextNode('hello world');
    	oDiv.appendChild(text);

    	var a = document.getElementById('xjsd');
    	var oDiv = document.createElement('div');
    	var text = document.createTextNode('hello world!!!');
    	oDiv.appendChild(text);
    	a.appendChild(oDiv);
    insetBefore();//将新节点插入在前面
    	需要两个参数
    		第一个：需要插入的新节点
    		第二个：需要插入到那个元素之前
			并且需要先切换到被插入的元素的父元素上node.parentNode
			var box = document.getElementById('box');
			var p = document.createElement('p');
			box.parentNode.insetBefore(p,box);
		在元素之后创建新节点
		  function insetAfter(newElement,targetElement){
		  	//得到父节点
		  	var parent = targetElement.parentNode;
		  	//如若最后一个子节点时当前元素，那么直接添加
		  	if(parent.lastChild === targetElement){
		  		parent.appendChild(newElement);
		  	}else{
		  		//否则，在当前节点的下一个节点之前添加
		  		parent.insetBefore(newElement,targetElement.nextSibling);
		  	}
		  }

		createElement创建元素的兼容性能(input,radio,checkbox)  
    replaceChild(); //将新节点替换旧节点
    cloneNode();  //赋值节点
    	var clone=box.firstChild.cloneNode(true);//获取第一个子节点，true表示复制内容，false表示标签也clone
    	box.appendChild(clone);
    removeChild();  //移除节点
    	box.parentNode.removeChild(box);//删除指定节点





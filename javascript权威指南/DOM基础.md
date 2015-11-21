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





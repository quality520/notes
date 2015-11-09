######基本:
    var box = new Object();
    box.name = "white";
    box.age = 26;
    box.run = function(){
    	return this.name + this.age;
    };

    var box2 = new Object();
    box2.name = "quality";
    box2.age = 26;
    box2.run = function(){
    	return this.name + this .age;
    }

    box.run();  //white26
    box2.run();	//quality26

    var box = new Object();
    box.name = "white";
    box.age = 26;
    box.run = function(){
    	return this.name + this.age;
    };

    var box2 = box;
    box2.name = "quality";
    box2.age = 26;
    box2.run = function(){
    	return this.name + this .age;
    }

    box.run();  //quality26
    box2.run();	//quality26
######工厂模式
    function createObject(name,age){  //
    	var obj = new Object();					//创建对象
    	obj.name = name;		//添加属性
    	obj.age = age;			
    	obj.run = function(){		//添加方法
    		return this.name + this.age;
    	};
    	return obj;
    }

    var box = createObject("white",26); //创建第一个对象
    var box2 = createObject("quality",26);  //创建第二个对象

    box.run(); //white26   
    box2.run(); //quality26

    工厂模式解决了重复实例化的问题,但是还存在一个问题,
    那就是识别问题,因为根本无法搞清楚他们到底时哪个对象的实例.
######构造函数创建
    function Box(name,age){
    	this.name = name;
    	this.age = age;
    	this.run = function(){
				return this.name + this.age;
    	};
    }
    function Desk(name,age){
    	this.name = name;
    	this.age = age;
    	this.run = function(){
				return this.name + this.age;
    	};
    }

    <!-- 
			1,构造函数没有new Object,但它后台自动var obj = new Object
			2,this相当于obj
			3,构造函数不需要返回对象引用,它时后台自动返回的
			
			构造函数的方法规范
			1,构造函数也是函数,但函数名第一个字母大写
			2,必须new构造函数名(),new Box(),而这个Box第一个字母也时大写的
			3,必须使用new运算符
     -->
    var box1 = new Box('white',26); //实例化
    var box2 = new Box('quality',27);//实例化
    var desk = new Desk('desk',27);

    构造函数能够解决对象识别的问题
    box1 instanceof Box;  //true;
    box2 instanceof Box;  //true;
    desk instanceof Box;  //false;因为desk是Desk对象的引用,所以为false

    var o = new Object();
    Box.call(o,'white',100);	//对象冒充
    o.run();

    o.run();//返回调用函数的值
    o.run;  //返回调用函数的引用



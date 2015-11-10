##面向对象
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


    function Box(name,age){
		this.name = name;
		this.age = age;
		this.run = function(){
		return this.name + this.age;
		}
		}
		var box1 = new Box("a",27);
		var box2 = new Box("a",27);
		console.log(box1.name == box2.name); 	//true
		console.log(box1.age == box2.age); 	//true
		console.log(box1.run ==box2.run); 	//false

##原型prototype
    我们创建的每个函数都有一个prototype(原型)属性,
    这个属性时一个对象,它的用途是包含特定类型的所有实例共享的属性和方法.
    逻辑上理解:prototype通过调用构造函数而创建的那个对象的原型对象.
    使用原型的好处可以让所有对象实例共享它所包含的属性和方法.
    也就是说,不必在构造函数中定义对象信息,而是可以直接将这些信息添加到原型中.
######原型创建构造函数
    function Box(){};  //构造函数体内声明都没有

    Box.prototype.name = "white"; //原型属性
    Box.prototype.age = 26; //原型属性
    Box.prototype.run = function(){	//原型方法
    	return this.name + this.age;
    }

    var box1 = new Box();
    box1.run();

    实例方法,不同的实例化,不同的方法地址是不一样的,是唯一的.
    原型方法,他们的地址是共享的,大家都一样
		function Box(){};
		Box.prototype.name ="white";
		Box.prototype.age = 26;
		Box.prototype.run = function(){

		return this.name + this.age;
		};

		var box1 = new Box();
		var box2 = new Box();
		console.log(box1.prototype); 	//undefined,这个属性是一个对象,无法访问
		console.log(box1.__proto__);	//Box {name: "white", age: 26},这个属性时一个指针指向prototype原型对象
		console.log(box1.run == box2.run); //true
		在原型模式生命中,多了两个属性,这两个属性都是创建对象时自动生成的
		__proto__属性是实例指向原型对象的一个指针,
		它的作用就是指向构造函数的原型属性constructor.
		通过这两个属性,就可以访问到原型里的属性和方法了.
		box1.constructor;		//构造属性,可以获取构造函数本身.
		作用是被原型指针定位,然后得到构造函数本身.
		其实就是对象实例对应的原型对象的作用.
		delect box.name;  //删除实例中的属性
		delete Box.prototype.name;//删除原型中的属性


######isPrototypeOf()方法
    判断一个对象是否指向了该构造函数的原型对象,可以使用isPrototypeOf()方法来测试
    Box.prototype.isPrototypeOf(box);  //只要实例化对象,即都会指向.
######hasOwnProperty
    如何判断属性是在构造函数的实例里,还是在原型里呢?可以使用hasOwnProperty()函数来验证
    box.hasOwnProperty('name'); //实例里返回true,否则返回false
    判断只由原型中有属性
    function isProperty(object,property){
    	return !object.hasOwnProperty(property) && (property in object)
    }

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

    in操作符还在通过对象能够访问给定属性时返回true,
    无论该属性存在实例中还是原型中
    "name" in box; //true,存在实例中或者原型中

    结合hasOwnProperty()与in操作符来判断只有原型中有属性
    function isProperty(object,property){
    	return !object.hasOwnProperty(property) && (property in object)
    }

####原型对象的重写
    使用构造函数创建原型对象和使用字面两创建对象在使用上基本相同,
    不同:字面量串讲的方式使用constructor属性不会指向实例,
    而是object,构造函数创建的方式则相反.
    //原型字面量
    Box.prototype = {
    	constructor:Box,		//如果想让字面量方式的constructor
  												//指向实例对象,直接强制指向即可
			name:'white',
			age:26,
			run:function(){
				return this.name + this.age;
			}
    };
    原型的声明是有先后顺序的,所以,重写的原型会切断之前的原型
    Box.prototype = {
    	age:26
    };
    var box = new Box();
    box.name;		//undefined
    box.run();	//run not a function

######内置应用的功能扩展
    查看sort是否是Array原型对象的方法.
    Array.prototype.sort;
    查看substring是否是String原型对象的方法
    String.prototype.substring;
    自定义方法
    String.prototype.addstring = function(){
    	return this + ",被添加了...";
    }
		"abc".addstring(); //abc,被添加了...

####原型prototype缺点
    数据共享的缘故,导致很多开发者放弃使用原型,因为每次
    实例化出的数据需要保留自己得到特性,而不能共享.
    为了解决构造传参和共享问题,可以组合构造函数+原型模式:
    function Box(name,age){		//不共享的使用构造函数
    	this.name = name;
    	this.age = age;
    	this.family = ['父亲','母亲','妹妹'];
    };
    Box.prototype = {	//共享的使用原型模式
    	constructor:Box,
    	run:function(){
    		return this.name+this.age+this.family;
    	}
    };
    动态原型模式
    //将原型封装到构造函数里
    function Box(name,age){
    	this.name = name;
    	this.age = age;
    	this.family = ['格格','姐姐','妹妹'];

    	Box.prototype.run = function(){
    		return this.name+this.age;
    	};
    }
    var box1 = new Box('white',26);
    var box2 = new Box('quality',26);
    //上述代码

	  //原型的初始化,只要第一次初始化
	  function Box(name,age){
	  	this.name = name;
	  	this.age = age;
	  	this.family = ['格格','姐姐','妹妹'];
	    if(typeof this.run != 'function'){  //判断是否存在
	    	Box.prototype.run = function(){
	  			return this.name+this.age;
  			};
	    }
	  }
	  var box1 = new Box('white',26);
	  var box2 = new Box('quality',26);
####寄生构造函数
    寄生构造函数 = 工厂模式 + 构造函数
    function Box(name,age){
    	var obj = new Object();
    	obj.name = name;
    	obj.age = age;
    	obj.run = function(){
    		return this.name + this.age;
    	};
    	return obj;
    }
    var box1 = new Box('white',26);
    var box2 = new Box('quality',26);
####稳妥构造函数和寄生类似

####继承
    继承是面向对象中一个比较核心的概念.
    其他正统面向对象语言都会用两种方式实现继承:
    1,接口实现
    2,继承
    而ECMAScript只支持继承,不支持接口实现,而实现继承的方式
    依靠原型链完成.
####原型链继承
    function Box(){			//Box构造
    	this.name = 'white';
    }

    function Desk(){   //Desk构造
    	this.age = 26;
    }

    Desk.prototype = new Box(); //Desk继承了Box,通过原型,形成链条
    
    var desk = new Desk();  //实例化
    desk.age;
    desk.name;   //得到被继承的属性
    
    function Table(){			//Table构造
    	this.level = 'AAAAA';
    }

    Table.prototype = new Desk();  //继续原型链继承

    var table = new Table();
    table.name;		//继承了Box和Desk()

    在javascript里，被继承的函数称为超类型(父类，基类)，继承的函数称为子类型(子类，派生类)
    继承也有之前的问题，比如字面量重写原型会终端关系，使用
    引用类型的原型，并且子类还无法给超类型传递参数。
    为了解决引用共享和超类型无法传参的问题，我们采用一种叫借用构造函数的技术，
    或者称为对象毛重(伪造对象、经典继承)的技术来解决这两种问题

    就近原则，实例中有，就返回，
    没有就去原型中查找

    通过instanceof判断是否属于那个父类。
    desk instanceof Desk
    desk instanceof Box
####借用构造函数(对象冒充)
    function Box(age){
    	this.name = ['white','quality'];
    	this.age = age;
    }
    function Desk(age){
    	Box.call(this,age);//对象冒充，给超类型传参
    }
    对象冒充只能继承构实例中的信息
    function Box(name,age){
    this.name = name;
    this.age = age;
    this.family =  ['white','quality'];
    }
    function Desk(name,age){
    Box.call(this,name,age);
    }
    var desk = new Desk('white',26);
    desk; //Desk {name: "white", age: 26, family: Array[2]}
    //{
    	name:"whtie",
    	age:26,
    	family:['white','quality']
    }

    function Box(name,age){
    this.name = name;
    this.age = age;
    }
    Box.prototype.family = ['white','quality'];
    function Desk(name,age){
    Box.call(this,name,age);
    }
    var desk = new Desk('white',26);
    desk;//=>{name:"white",age:26}
		构造函数每次都需要实例化
		eg：var box = new Box()
####组合继承
		借用构造函数(原型冒充)虽然解决了刚才两种问题，但没有
		原型，复用无从谈起，所以，我们
		需要原型链+借用构造函数(原型冒充)的模式，
		这种模式成为组合继承。
		function Box(age){
			this.name = ['white','quality'];
			this.age = age;
		}
		Box.prototype.run = function(){
			return this.name + this.age;
		}

		function Desk(age){
			Box.call(this,age);		//对象冒充
		}
		Desk.prototype = new Box(); //原型链继承

		var desk = new Desk(26);
		desk.run();  //=>white,quality26

		对象冒充只继承构造函数中的对象
		原型链继承原型中的对象
		
####原型式继承
    原型式继承；这种继承借助原型并基于已有的对象创建新对象，
    同时还不比因此创建自定义类型。
######临时中转函数
    function obj(o){        //o表示将要传递进入的一个对象
      function F(){};       //创建一个F构造函数
      F.prototype = o;      //把字面量函数赋值给构造函数的原型
      return new F();       //最终返回出实例化的构造函数
    }
    
    function obj(o){
    function F(){};
    F.prototype = o;    //F.prototype = o;相当于Desk.prototype = new Box();
    return new F();
    
    }
    
    var a = {
    name:"white",
    age:26
    }
    obj(a);//=>F{name:"white",age:26}
    
    function obj(o){
    function F(){};
    F.prototype = o;
    return new F();
    
    }
    
    var a = {
    name:"white",
    age:26,
    sport:['basketball','football']
    }
    var box1 = obj(a);
    console.log(box1.sport);   //=>["basketball", "football"]
    box1.sport.push('vallball');
    console.log(box1.sport);    //=>["basketball", "football", "vallball"]
    var box2 = obj(a);
    console.log(box2.sport);    //=>["basketball", "football", "vallball"]   引用类型共享了。
####寄生式继承
    寄生式继承把原型式+工厂模式结合而来，目的是为了封装创建对象的过程。
    function obj(o){
    function F(){};
    F.prototype = o;
    return new F();
    
    }
    
    var a = {
    name:"white",
    age:26,
    sport:['basketball','football']
    }
    function create(o){
    var f = obj(o);
    return f;
    }
    var box3 = create(a);
    console.log(box3.sport);
    
    寄生组合模式
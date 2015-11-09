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
######模式
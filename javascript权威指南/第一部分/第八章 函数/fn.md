#函数
    javascript函数时参数化的:
      函数的定义会包括一个称为形参(parameter)的标识符列表中,这些参数在函数体中像局部变量一样工作.
      函数调用会为形参提供实参的值.
        tips:形参(parameter)和实参(argument)的区别,
        形参详单与函数中定义的变量,实参时在运行时的函数调用时传入的参数.
      本次调用的上下文  这就是this关键字的值.
      如果函数挂载在一个对象上,作为对象的一个属性,就称他为对象的方法
      当通过这个对象来调用函数时,该对象就是此次调用的上下文(context),也就是该函数的this的值.
      用于初始化一个新建的对象的函数成为构造函数(constructor)
####8.1 函数的定义
    function关键字
    两种形式:函数定义表达式/函数声明语句
      定义javascript函数
        //输出o的每个属性的名称和值,返回undefined
        function printprops(o){
        	for(var p in o){
        		console.log(p + ":" + o[p] + "\n");
        	}
        }
        //计算两个笛卡尔坐标(x1,y1)和(x2,y2)之间的距离
        function distance(x1,y1,x2,y2){
        	var dx = x2 - x1;
        	var dy - y2 - y1;
        	return Math.sqrt(dx*dx + dy*dy);
        }
        //计算阶乘的递归函数(调用自身的函数)
        //x!的值时从x到x递减(步长为1)的值的累乘
        function factorial(x){
        	if(x <= 1) return 1;
        	return x * factorial(x-1);
        }

        //函数表达式定义了一个函数用来求传入参数的平方
        var square = function(x){return x*x;}

        //函数表达式可以包含名称,这在递归时很有用
        var f = function fact(x){if(x <= 1) return 1;else return x*fact(x-1);};

        //表达式也可以作为参数传给其他函数
        data.sort(function(a,b){return a-b});
        //函数表达式有时定义后立即调用
        var tensquared = (function(x) {return x*x;}(10));
      嵌套函数
        函数可以嵌套在其他函数中
        function hypotenuse(a,b){
        	function square(x){return x*x}
        	return Math.sqrt(square(a) + square(b));
        }
####8.2 函数调用
    四种方式来调用javascript函数:
      1,作为函数
      2,作为方法
      3,作为构造函数
      4,通过他们的call()和apply()方法间接调用
######8.2.1函数调用
    使用调用表达式可以进行普通的函数调用也可进行方法调用,
    一个调用表达式由多个函数表达式组成,
    每个函数表达式都是由一个函数对象和左圆括号,参数列表和右圆括号组成,
    参数列表是由逗号分割的零个或多个参数表达式组成
    如果函数表达式时一个属性访问表达式,
    即该函数时一个对象的属性或数组中的一个元素,那么它就是一个方法表达式.
      printprops({x:1});
      var total = distance(0,0,2,1,) + distance(2,1,3,5);
      var probability = factorial(5)/factorial(13);
    对于普通函数调用,函数的返回值成为调用表达式,
    如果该函数返回是因为解释器到达结尾,返回值就是undefined.
    如果函数返回 时因为解释器执行到一条return语句,返回值就是return之后的表达式的值,
    如果return语句没有值,则返回undefinde.

    根据ECMAScript3和非严格的ECMAScript5对函数调用的规定,调用上下文(this的值)是全局对象.
    然而,在严格模式下,调用上下文则是undefined.

    以函数形式调用的函数通常不使用this关键字,不过'this'可以用来判断当前是否时严格模式
     //定义并调用一个函数来确定当前脚本运行是否为严格模式
     var strict = (function() {return | this;}());
######8.2.2方法调用
    一个方法无非是个保存在一个对象的属性里的javascript函数.如果有一个函数f和一个对象o,
    则可以用下面的代码给o定义一个名为m()的方法:
      o.m = f;
    给对象o定义了方法m(),调用它时像这样:
      o.m();
    或者,如果m()需要两个参数,调用起来则像这样:
      o.m(x,y);
    上述代码是一个调用表达式:它包括一个函数表达式o.m,
    以及两个实参表达式x和y,函数表达式本身就是一个属性访问表达式,
    这意味着该函数被当做一个方法,而不是作为一个普通函数来调用.

    方法调用的参数和返回值的处理和普通函数调用完全一致.
    方法调用和函数调用有一个重要的区别,即:调用上下文.
    属性访问表达式由两部分组成:一个对象(本例中的o)
    和属性名称(m).在像这样的方法调用表达式中,
    对象o成为调用上下文,函数体可以使用关键字this
    引用该对象.
      var calculator = { //对象直接量
      	operand1: 1,
      	operand2: 1,
      	add: function(){
      		//注意this关键字的用法,this指代当前对象
      		this.result = this.operand1 + this.operand2;
      	}
      };
      calculator.add();//这个方法调用计算1+1的结果
      calculator.result //=>2
    大多数方法调用使用点符号来访问属性,使用方括号(的属性访问表达式)也可以进行属性访问操作
      下面例子都是函数调用:
        o['m'](x,y); //o.m(x,y)的另外一种写法
        a[0](z) //同样是一个方法调用(a[0]是一个函数)
    方法调用可能包含更复杂的属性访问表达式:
      customer.surname.toUpperCase(); 
        //调用customer.surname的方法
      f().m();  
        //在f()调用结束后继续调用返回值中的方法m()
    方法和this关键字时面向对象编程范例的核心.

    任何函数只要作为方法调用实际上都会传入一个隐式的实参,
    ----这个实参是一个对象,方法调用的母体就是这个对象
      比较下面两行代码:
        rect.setSize(width,height);
        setRectSize(rect,width,height);
      第一行的方法调用语法表明这个函数执行的载体
      是rect对象，函数中的所有操作都将基于这个对象。
    方法链:
      当方法的返回值时一个对象,这个对象还可以再调用它的方法.
      这种调用序列中每次的调用结果都是另外一个表达式的组成部分.
        比如jQuery
        //找到所有的header,取得他们的id的映射,转换为数组并对他们进行排序
        $(':header').map(function(){return this.id}).get().sort();
    tips:this是一个关键字,不是变量,也不是属性名,
    javascript的语法不允许给this赋值.

    和变量不同,关键字this没有作用域的限制,嵌套的函数不会从调用它的函数中继承this.
    如果嵌套函数作为方法调用,其this的值指向调用它的对象.
    如果嵌套函数作为函数调用,其this值不是全局对象(非严格模式)
    就是undefined(严格模式)
    很多人误以为调用嵌套函数时this会指向调用外层函数的上下文.
    如果你想访问这个外部this值,需要将this的值保存在一个变量里.
    这个变量和内部函数都在同一个作用域内.
      var o = {							//对象o
      	m:function(){				//对象中的方法m()
      		var self = this;	//将this的只保存至这个对象o中
      		console.log(this === o); //输出true,this就是这个对象o
      		f();							//调用辅助函数f()

      		function f(){			//定义一个嵌套函数f()
      			console.log(this === o);	//false;this的值时全局对象或undefined
      			console.log(self === o);  //true;self指外部函数的this值
      		}
      	}
      };
      o.m();	//调用对象o的方法m()
######8.2.3 构造函数调用
    如果函数或方法调用之前带有关键字new,它就是构造函数调用
      var o = new Object();    
      var o = new Object;  //没有形参的构造函数可以省略圆括号
    构造函数调用创建一个新的空对象,这个对象继承自构造函数的prototype属性.
    构造函数试图初始化化这个新创建的对象,并将这个对象用做其上下文,
    因此构造函数可以使用this关键字来引用这个新创建的对象
    注意,尽管构造函数看起来像一个方法调用,它依然会使用这个新对象作为调用上下文.
    也就是说,在表达式new o.m()中,调用的上下文并不是o.
    
    构造函数通常不使用return关键字,它们通常初始化新对象,当构造函数的函数体执行完毕时,它会显示返回.
    在这种情况下,构造函数调用表达式的计算结果就是这个新对象的值.
    然而如果构造函数显示德使用return语句返回一个对象,那么调用表达式的值就是这个对象.
    如果构造函数使用return语句但没有指定返回值,或者返回一个原始值,
    那么这时将忽略返回值,同时使用这个新对象作为调用结果.
    
######8.2.4 间接调用
    javascript中的函数也是对象,函数对象也可以包含方法
    其中的两个方法call()和apply()可以用来间接地调用函数.
    这两个方法都允许显式指定调用所需的this值.也就是说,
    任何函数可以作为任何对象的方法来调用,那坡这个函数不是那个对象的方法.
    两个方法都可以指定调用的实参.
    call()方法使用它自有的实参列表作为函数的实参
    call(obj,args1,args2)
    apply()方法则要求以数组的形式传入参数
    apply(obj,[args1,args2])

####8.3 函数的实参和形参
    javascript中的函数并未指定函数形参的类型,函数调用也未对传入的实参值做任何类型检查
######8.3.1 可选形参
    当调用函数的时候传入的实参比函数声明指定的形参个数要少,剩下的形参都将设置为undefined值.
    因此在调用函数时形参是否可选以及是否可以省略应当保存较好的适应性.
    为了做到这一点,应当给省略的参数赋一个合理的默认值:
      //将对象o中可枚举的属性名追加至数组a中,并返回这个数组a
      //如果省略a,则创建一个新数组并返回这个新数组
      function getPropertyName(o,/*optional*/a){
        if(a === undefined) a = [] ; //如果未定义,则使用新数组
        for(var property in o) a.push(property);
        return a;
      }
      //这个函数调用可以传入1个或2个实参
      var a = getPropertyName(o);  //将o属性存储到一个新数组中
      getPropertyName(p,a);  //将p属性追加至数组a中.
    如果在第一行代码中不适用if语句,可以使用"||"运算符,这是一种习惯用法
      a = a || [];
######8.3.2 可变长的实参列表:实参对象
    当调用函数的时候传入的实参个数超过函数定义时的形参个数时,没有办法直接获取未命名值的引用.
    参数对象解决了这个问题
    在函数体内,标识符arguments是指向实参对象的引用,实参对象是一个类数组对象,
    这样可以通过数字下标就能访问传入函数的实参值,而不用非要通过名字来得到实参.
      arguments[0]   第一个参数
      arguments[1]   第二个参数
      argments[3]    第三个参数
      arguments.length;  参数的长度
    
    eg:
      function f(x,y,z){
        //首先验证传入实参的个数是否正确
        if (arguments.length != 3){
          throw new Error("function f called with"+ arugments.length + "
          arguments,but it expects 3 arguments");
        }
        //在执行函数的其他逻辑
      }
    
    大多数情况下javascript的默认行为是可以满足需要的:
      省略的实参都将是undefined,多出的参数会自动省略
    
    实参对象有一个重要的用处,就是让函数可以操作任意数量的实参
      function max(/*....*/){
        var max = Number.NEGATIVE_INFINITY;
        //遍历实参,查找并记住最大值
        for(var i = 0;i < arguments.length;i++){
          if(arguments[i] > max) max = arguments[i];
        //返回最大值
        return max;
        }
      }
      var largest = max(1,10,200,2,3,1000,4,5,10000,6); //=>10000
    tips:不定实参函数的实参个数不能为零,arguments[]对象最适合的应用场景
    是这样一类函数中,这类函数包含固定个数的命名和必须参数,以及随后个数不定的可选参数.
    arguments并不是真正的数组,它是一个实参对象.每个实参对象都包含以数字为索引
    的一组元素以及length属性,但它毕竟不是真正的数组.它是一个对象,具有数字为索引的属性.
      function f(x){
        console.log(x);     //输出实参的初始化值
        arguments[0] = null;//修改实参数组的元素同样会修改x的值
        console.log(x);     //输出"null"
      }
    
    
    
      
    
    














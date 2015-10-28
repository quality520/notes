#函数
    javascript函数时参数化的:
      函数的定义会包括一个称为形参(parameter)的标识符列表中,这些参数在函数体中像局部变量一样工作.
      函数调用会为形参提供实参的值.
        tips:形参(parameter)和实参(argument)的区别,形参详单与函数中定义的变量,实参时在运行时的函数调用时传入的参数.
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



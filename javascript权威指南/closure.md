#匿名函数与闭包
    1,匿名函数就是没有名字的函数
    2,闭包是可以访问一个函数作用域里变量的函数
####匿名函数与自我调用/执行
    (function(){
      return 'white'
    })();	//自我执行


    var box = function(){
    	return 'white';
    }
    box;//得到的是函数function(){return 'white'};
    box();//得到的是调用函数之后得到的值‘white’;

    var box = (function(){
    	return 'white';
  	})();  //把匿名函数自我执行的值赋值给变量box;
  	box;   //=>white;

####闭包
    闭包是指有权访问另一个函数作用域中
    的变量的函数，创建闭包的常见方式，就是这AI一个函数内部
    创建另一个函数，通过另一个函数访问这个函数的局部变量。
    //函数里面嵌套匿名函数   ==>闭包
    var box = function(){
    	return function(){
    		return 'white';
    	}
    }

    box;  //=>function(){
    	return function(){
    		return 'white';
    	}
    }
    box();  //=>fucntion(){
    	return 'white';
    }

    //匿名函数自动执行
    var box = function(){
    	return (function(){
    		return 'white';
    	})();
    }

    box;  //=>function(){
    	return function(){
    		return 'white';
    	}
    }
    box();  //=>white;

    var box = function(){
			return function(){    //闭包
			   return 'white';
		  }
		}
		alert(box()());//=>'white'
		alert(box());  //=>function(){
			return 'white';
		}

		通过闭包可以放回局部变量
		function box(){
			var user = 'white';
			return function(){  //通过匿名函数返回box()局部变量
				return user;
			};
		}
		box()();  //通过box()()来直接调用匿名函数返回值

		var b = box();
		b();   //另一种调用匿名函数返回值
    
    使用闭包的优点，也是它的缺点：
    就是可以把局部变量驻留在内存中，可以避免使用全局变量(
    全局变量污染导致应用程序不可预测性，每个模块都可调用必将引来灾难，所以推荐使用私有的，封装的局部变量。)
    var box = function(){
    var name = "white";
    return function(){
       return name;
      }
    }
    alert(box()()); //=>white;

    //累加
    var num = 1;
    function add(){
    num++;
    }
    add();  //函数调用
    num;  //=>2;
    //局部变量不累加
    function add(){
    var num = 1;
    num++;
    return num;
    }
    add(); //=>2;
    num;  //=>1;

    //使用匿名函数实现局部变量驻留内存中，实现累加
    function add(){
    	var num = 1;
    	return function(){
      	num++;
      	return num;
    	}
    }
    add()();  //=>2;每次执行add()会初始化
    add()();  //=>2;每次执行add()会初始化,所以结果依然是1;
    //使用下列方式进行累加
    var b = add();  //执行一次add()
    b();  //=>2
    b();  //=>3
    b();  //=>4
    b();  //=>5
    b();  //=>6
    b = null;  释放闭包中的局部变量

    ps:由于闭包里作用域返回的局部变量资源不会立刻销毁回收,所有可能会
    占用更多的内存。过度使用闭包会导致性能下降，
    建议在非常有必要的时候才使用闭包。

    作用域链的机制导致一个问题，在循环中里的匿名函数取得的任何变量都是最后一个值



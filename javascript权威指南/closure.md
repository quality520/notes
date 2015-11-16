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

####模仿块级作用域
    javascript没有块级作用域
    //块级作用域(私有作用域)
    function box(){
        for(var i = 0;i<5;i++){

        }
        return i;
    }
    box();  //=>5

    function box(count){
        for(var i = 0;i<count;i++){

        }
        return i;
    }
    box(2);  //=>2;

    上述例子，说明javascript没有块级作用域，if{}for()等没有
    作用域，如果有，出了这个范围i就应该被销毁，就算重新声明同一个变量也不会改变它的值。

    function box(){
        (function(){    //包含自我执行的匿名函数，就可以实现私有作用域
            for(var i=0;i<5;i++){
                console.log(i);   //=>0,1,2,3,4
            }
            })()
        console.log(i);  //=>出了私有作用域,i被销毁,所以结果为undefined
    }
    box();
    使用了块级作用域(私有作用域)后,你名函数中定义的任何变量,
    都会在执行结束时被销毁.这种技术经常咋全局作用域中被用在函数外部,从而限制向
    全局作用域中添加过多的变量和函数.一般来说,我们都应该尽可能少向局部作用域中添加变量和函数.在
    大型项目中,多人开发的时候,过多的全局变量和函数很容易导致命名冲突,引起灾难性的后果.
    如果采用块级作用域(私有作用域),每个开发者既可以使用自己的变量,
    又不必担心搞乱全局作用域.

    私有作用域
    (function(){
        //这里就是全局的私有作用域
        var i =100;
        console.log(i); //=>100;     
    })()
    console.log(i);  //=>变量i已经被销毁,报错undefined
    
    在全局作用域中使用块级作用域可以减少闭包占用的内存问题，
    因为没有指向匿名函数的引用。只要函数执行完毕，就可以立即
    销毁其作用域链.
######私有变量
    私有属性：外部不能访问的属性叫做“私有属性”
    私有方法：外部不能访问的方法叫做“私有方法”

    javascript没有私有属性的概念;所有的对象属性都是公开的。
    不过,却有一个“私有变量”的概念。任何在函数中定义的变量，都可以认为是私有变量，
    因此不能在函数的外部访问这些变量
    function box(){
        var i = 0;   //私有变量，外部无法访问.
    }

    eg:
        function Box(){
            this.age = 26;          //属性
            this.run = function(){  //方法
                return "hello Everyone!!!";
            };
        }
        var box = new Box();
        box.age; //=>26;
        box.run(); //=>hello Everyone;

        function Box(){
            var age = 26;           //私有变量
            function run(){         //私有函数
                return "hello Everyone";
            };
            this.public = function(){  //对外可见的公共接口,特权方法
                return this.age + this.run();
            };
        }
        var box = new Box();
        box.public();  //=>26helloEveryone

    通过构造函数传参来访问私有变量
    function Person(value){
        var age = value;
        this.getUser = function(){
            return age;
        };
        this.setUser = function(value){
            age = value
        }
    }
    var box = new Person(26);
    box.getUser();  //=>26
    box.setUser(27);
    box.getUser();  //=>27
    但是对象的方法，在多次调用的时候，会多次创建。可以使用
    静态私有变量来避免这个问题
######静态私有变量
<!-- 42.[JavaScript]第16章 匿名函数和闭包[下]视频看到22分钟 -->





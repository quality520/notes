#匿名函数与闭包
    1,匿名函数就是没有名字的函数
    2,闭包是可以访问一个函数作用域里变量的函数
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
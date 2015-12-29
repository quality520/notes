#函数与作用域







###this
###arguments
####函数属性&arguments
    foo.name -- 函数名
    foo.length -- 形参个数
    argument.length -- 实参个数
    function foo(x,y,z){
      arguments.length;//2
      arguments[0];//2
      arguments[0] = 10;//绑定关系
      x;//change to 10;

      argument[2] = 100; //未传参失去绑定关系
      z;//still undefined !!

      arguments.callee === foo;//true;
    }
    foo(1,2);
    foo.length;//3
    foo.name;//"foo"
####apply/call方法
    function(x,y){
      console.log(x,y,this);
    }
    foo.call(100,1,2);//1,2,Number(100)
    foo.apply(true,[3,4]);//3,4,Boolean(true)
    foo.apply(null);//undefined,undefined,window
    foo.apply(undefined);//undefined,undefined,window
    ps:'use strict'
    foo.apply(null);//undefined,undefined,null
    foo.apply(undefined);//undefined,undefined,undefined
####bind方法
    this.x = 9;
    var module = {
      x:81,
      getX:function(){return this.x;}
    };
    module.getX();//81
    var getX = module.getX;
    getX();//9
    var boundGetX = getX.bind(module);
    boundGetX();//81
####bind与currying
    function add(a,b,c){
      return a + b + c;
    }
    var func = add.bind(undefined,100);
    func(1,2);//103
    var func2 = func.bind(undefined,200);
    func2(10);//310

    function getConfig(colors,size,otherOptions){
    console.log(colors,size,otherOptions);
    }
    var defaultConfig = getConfig.bind(null,'#c00','1024*768');
    defaultConfig('123');//#c00 1024*768 123
    defaultConfig('456');//#c00 1024*768 456
####bind与new
    function foo(){
      this.b = 100;
      return this.a;
    }
    var func = foo.bind({a:1});
    func();//1
    new func();//{b:100}
//第五章语句
//javascript中有很多语句和控制结果(control structure)来改变语句的默认执行顺序；
//1，条件语句(conditional)语句，javascript解释器可以根据一个表达式来判断是执行还是跳过这些语句，如if语句和switch语句
//2，循环(loop)语句，可以重复执行语句，如while和for语句。
//3，跳转(jump)语句，可以让解释器跳转至程序的其他部分继续执行，如break、return和throw语句
//var语句用来声明一个或者多个变量
//var name_1[=value_1][,...,name_n[=value_n]];
var x = 1;
var y = 2;
var x=1,y=2,z=3;


//function语句 用来定义函数
//两种写法
var f = function(x){return x+1;}      //将表达式赋值给一个变量
function f(x){return x+1;}            //含有变量名的语句
//语法
/*function funcName([arg1[,arg2...]]){
    statements
}*/


//switch
switch(n){
    case 1:         //如果 n ===1,从这里开始执行
        //执行代码块1
    break;      //停止执行switch语句
    case 2:         //如果 n ===2,从这里开始执行
        //执行代码块2
        break;      //从这里停止执行switch语句
    case 3:         //如果 n ===3,从这里开始执行
        //执行代码块3
        break;      //从这里停止执行switch语句

    default:         //如果所有的条件都不匹配
        //执行代码块4
        break;      //从这里停止执行switch语句
}
//example
    function convert(x){
        switch(typeof x){
            case  'number':             //将数字转换为十六进制数
                return x.toString(16);
            case  'string':             //返回两端带双引号的字符串
                return  '"' +  x + '"';
            default:                    //使用普通的方法转换为其他类型
                return String(x);
        }
    }


//循环
//while
   /* while (expression)
        statement*/


        var a = 0;
        while(a < 10){
            a++;
            console.log(a);
        }
//==>1 2 3 4 5 6 7 8 9 10

//do while

/*
    do
        statement
    while
        expression*/

        var a = 1;
        do
        {
            console.log(a);
        }while(a < 0);
        //==> 1
//在do while实践中循环至少会执行一次。

//for(initialize;test;increment)
//      statement


    var i,j;
    var sum=0;
    for (i = 0,j=10;i<10;i++,j--)
        sum += i*j;

    //==>165

//for in
/*for (variable in object)
    statement*/
//variable通常是一个变量名，也可以使一个可以产生左值的表达式或者一个通过var语句声明的变量，总之必须是一个适合赋值表达
//式左侧的值。object是一个表达式，这个表达式的结算结果是一个对象
//使用for循环来遍历数组元素
     for(var i = 0; i < a.length; i++){     //i代表数组元素的索引
         console.log(a[i]);                 //输出数组中的每个元素
     }
//而for/in循环则是用来更方便地遍历对象属性成员:
    for(var p in o){                        //将属性名字复制给变量P
        console.log(o[p]);                  //输出每一个属性的值。
    }

        var a = [1,2,3,4,5,6,7,8,9,10];
        var i = 0;
        for(i in a){
            console.log(a[i]);
        }
    //==> 1,2,3,4,5,6,7,8,9,10

//跳转
//break语句是跳转到循环或者其他语句的结束
//continue语句是终止本次循环的执行并开始下一次循环的执行
//return语句让解释器跳出函数体的执行，并提供本次调用的返回值。
//throw语句触发或者“抛出”一个一场，她是与try/catch/finally语句一同使用，这些语句制定了处理异常的代码逻辑，
//这是一种复杂的跳转语句了，当抛出一个异常的时候，程序将跳转至最近的闭合异常处理程序，这个异常处理程序可以是在同一个函数或者在更高层的调用栈中。
        var data = [
            {
                name:'Jordan',
                team:'bull'
            },
            {
                name:'Kobe',
                team:'Lak'
            },{
                name:'James',
                team:'Cls'
            },{
                name:'T-Mac',
                team:'Rock'
            }
        ];
        var total;
        for(var i = 0;i<data.length;i++){
            if(!data[i]) continue;
            total +=data[i];
        }

//代码不带标签的continue语句，当产生一个错误的时候跳过当前循环的后续逻辑
        var data = [1,2,3,4];
        var total = 0;
        for(var i = 0;i < data.length; i++){
            if(!data[i]) continue;
            total += data[i];
        }
    //==> 10；
//return函数调用是一种表达式，而所有表达式都有值。函数中的return语句既是指定函数调用后的返回值
//      return expression;
//return语句只能在函数体内出现，如果不是的话报语法错误
function square(x) {return x*x}
square(2);          //==>4;

function test(a,b){
    var arr = [a,b];
    return arr;
}
test(2,3);      //==>[2,3]
test(2,3)[0];   //==>2;
test(2,3)[1];   //==>3;

function display_object(o){
    if(!o) return;
    alert("到这里了。");
}
display_object();   //==>返回undefined
display_object(1); //==>弹alert；



//throw，try/catch/finally语句
        function factorial(x){
            if(x < 0) throw new Error("x不能是负数");
            for(var f=1;x>1;f *= x,x--)
                return f;
        }
        factorial(-1);      //==>Error: x不能是负数
        factorial(10);      //==>1；

//try/catch/finally语句是javascript的异常处理机制。其中try从句定义了需要处理的异常所在的代码块。catch从句跟随在try从句之后，当try块内某处发生了
//异常时，调用catch内的代码逻辑。catch从句后跟随finally块，后者中防止清理代码，不管try块中是否产生异常，finally快内的逻辑总是会执行。尽快catch和
//finally都是可选的，但try从句需要至少二者之一与之组成完整的语句。try、catch和finally语句块都需要使用花括号括起来，这里的花括号是必需的，即使从句
//中只有一句语句也不能省略花括号
//下面的代码说明了try/catch/finally的语句和使用目的：
try{
    //通常来讲，这里的代码会从头执行到尾而不会产生任何问题，
    //但有时会抛出一个异常，要么是由throw语句直接抛出异常，
    //要么是通过调用一个方法间接抛出异常
}
catch(e){
    //当且仅当try语句块抛出了异常，才会执行这里的代码
    //这里可以通过局部变量e来获得对Error对象或者抛出的其他值的引用
    //这里的代码块可以基于某种原因处理这个异常，也可以忽略这个异常，
    //还可以通过throw语句重新抛出异常
}
finally{
    //不管try语句块是否抛出异常，这里的逻辑总是会执行，终止try语句块的方式：
    //1）正常终止，执行完语句块的最后一条语句
    //2）通过break、continue或return语句终止
    //3）抛出一个异常，异常被catch从句捕获
    //4）抛出一个异常，异常未被捕获，继续向上传播
}
//with


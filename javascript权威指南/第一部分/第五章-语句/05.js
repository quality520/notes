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

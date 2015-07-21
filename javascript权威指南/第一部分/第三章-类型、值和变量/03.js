/**
 * Created by Root on 2015/7/21 0021.
 */
//排序函数
function sortNumber(a,b){
    return a-b
}
var lists = [2,1,5,3,6,100,220,101,999,55];
//调用sort()排序方法
lists.sort(sortNumber);

//javascript还支持更复杂的算术运算，这些复杂运算通过作为Math对象的属性定义的函数和敞亮来实现：
Math.pow(2,53);             //==> 9007199254740992: 2的53次幂
Math.round(.6);             //==>1.0:四舍五入
Math.ceil(.4);              //==>1.0向上取整
Math.floor(.6);             // ==>0.0向下取整
Math.abs(-5);               //==>5:求绝对值
Math.max(x,y,z);            //==>返回最大值
Math.min(x,y,z);            //==>返回最小值
Math.random();              //==>生成一个大于等于0小于1.0的伪随机数
Math.PI;                    //==>π：圆周率
Math.E;                     //==>e:自然对数的底数
Math.sqrt(3);               //==>3的平方根
Math.pow(3,1/3);            //3的立方根
Math.sin(0);                //三角函数：还有Math.cos,Math,tan等
Math.log(10);               //10的自然对数
Math.log(100)/Math.LN10     //以10为底100的对数
Math.log(512)/Math.LN2      //以2为底512的对数
Math.exp(3)                 //e的三次幂

//javascript中运算在溢出（overflow）、下溢(underflow)或被零整除时不会报错，结果为一个特殊的无穷大(infinity)值、负无穷大(-infinity)值
//NaN：not-a-number
var zero = 0;       //正常的零值
var negz = -1;      //负零值
zero === negz       //==>true;正零值和负零值相等
1/zero  === 1/negz  //==>false:正无穷大和负无穷大不等。


//日期和时间
var mydate = new Date(2011,0,1);    //2011年1月1日；
var enddate = new Date(2011,0,1,17,10,30); //同一天，当地时间5:10:30pm,
var now = new Date(); //当前日期和时间
now.getFullYear();   //==>2015
now.getMonth();     //==>6;从0开始计数的月份
now.getDate();      //21；从1开始计数的天数
now.getDay();       //2;代表星期二，0代表星期日，创建一个星期的数组
now.getHours();     //11；当前小时
now.getUTCHours();
now.getMinutes()      //50；当前分钟数
now.getSeconds()      //53；当前秒
now.getMilliseconds(); //593；当前毫秒数

var weekend = [];
weekend[0] = "星期日";
weekend[1] = "星期一";
weekend[2] = "星期二";
weekend[3] = "星期三";
weekend[4] = "星期四";
weekend[5] = "星期五";
weekend[6] = "星期六";

weekend[now.getDay()];

//string类型
var s = "hello javascript";
s.length;
s.charAt(0);        //==>"h":第一个字符
s.charAt(s.length-1);   //==>"t":最后一个字符
s.substring(1,4);       //==>"ell":
s.slice(1,4);           //==>"ell":
s.slice(-3);            //==>"ipt";最后三个字符
s.indexOf("l");         //==> 2：首次出现“l”的位置索引
s.lastIndexOf("l");     //==>3
s.indexOf("l",3);
s.split(" ");           //==>["hello", "javascript"]
s.replace("l","h");     //==>"hehlo javascript"
s.replace(/l/g,"h");    //==>"hehho javascript"
s.toUppercase();        //==>"HELLO JAVASCRIPT"


//匹配模式
// /^HTML/  匹配以HTML开始的字符串
// /[1-9][0-9]*/  匹配一个非零数字，后面是任意个数字
//  /\bjavascript\b/i  匹配单词“javascript”,忽略大小写
//RegExp对象定义了很多有用的方法，字符串同样具有可以接收RegExp参数的方法
var text = "testing:1,2,3"; //文本示例
var pattern = /\d+/g         //匹配所有包含一个或多个数字的实例
pattern.test(text);          //==>true;匹配成功
text.search(pattern);       //==>9;首次匹配成功的位置
text.match(pattern);        //==>["1","2","3"]；所有匹配组成的数组
text.replace(pattern,"#");  //==>"testing:#,#,#"
text.split(/\D+/);          //==>["", "1", "2", "3"]

//全局对象
//  全局属性：underfined,Infinity和NaN
//  全局函数：isNaN()、parseInt()和eval()
//  构造函数：Date()、RegExp()、String()、Object()和Array()
//  全局对象；Math和JSON


//包装对象
//javascript对象是一个复合值：它是属性或已命名值的集合、通过”。“符号来引用属性值。当属性值是一个函数的时候，称其为方法、通过o.m()来调用对象o中的方法
//我们看到字符串也同样具有属性和方法：
var s = "hello javascript!";        //一个字符串
var word = s.substing(s.indexOf(" ")+1, s.length);      //使用字符串的属性


//
var a = ['a','b','c','d','e','f'];
var b = [];
for(var i = 0;i<a.length;i++){
    b[i] = a[i];
}


//类型转换
10+"objects";      //==>10objects
"7" * "4";          //28:两个字符串均转换为数字
var n = 1 - "x";    //NaN:字符串"x"无法转换为数字
n + "objects";      //==>"NaNobject"

//对象转换为原始值
//所有的对象继承了两个转换方法，第一个toString()，它的作用是返回一个反映这个对象的字符串\
//另一个转换函数是valueOf().
({x:1,y:2}).toString();         //==>"[object Object]";

//数组类(Array class)的toString()方法将每个数组元素转换为一个字符串，并在元素之间添加逗号后合并成结果字符串。
//函数类(Function class)的toString()方法返回这个函数的实现定义的表示方法。
//实际上，这里的实现方式是通常是将用户定义的函数转换为JavaScript源代码字符串。
//日期类(Date class)定义的toString()方法返回一个可读的日期和时间字符串。
var mydate = new Date();
mydate.toString();              //==>"Tue Jul 21 2015 15:06:36 GMT+0800 (中国标准时间)"
//RegExp类(RegExp class)定义的toString()方法将RegExp对象转换为表示正则表达式直接量的字符串
var pattern = /\w+/g;
pattern.toString();             //==> "/\w+/g"

[1,2,3,4].toString();           //==>"1,2,3,4"
(function(x){f(x);}).toString();    //==>function(x){f(x);}
new Date(2015,6,21).toString();     //"Tue Jul 21 2015 00:00:00 GMT+0800 (中国标准时间)"

var now = new Date();
typeof(now + 1);            //==>"string"："+"将日期转换为字符串
typeof(now - 1);            //==>"number": "-"使用对象到数字的转换
now == now.toString();      //==>true:隐式的和显式的字符串转换
now > (now - 1);            //==>true:">"将日期转换为数字



//变量作用域
//在函数体内，局部变量的优先级高于同名的全局变量，如果在函数内声明的一个局部变量或者
//函数参数中带有的变量和全局变量重名，那么全局变量就被局部变量所遮盖
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function nested(){
        var scope = "nested scope";
        return scope;
    }
    return nested();
}
checkscope();               //==>"nested scope"


function test(o){
    var i = 0;
    if(typeof o == "object"){
        var j = 0;
        for(var k =0;k<10;k++){
            console.log(k);
        }
        console.log(k);
    }
    console.log(j);
}
//声明提前(hoisting)，即javascript函数里声明的所有变量(但不涉及赋值)都被"提前"至函数的顶部
var scope ="global";
function f(){
    console.log(scope);         //输出"undefined"，而不是"global"
    var scope = "local";        //变量在这里赋初始值，但变量本身在函数体内任何地方均是有定义的。
    console.log(scope);         //输出"local"
}
上述函数等价于下面函数
var scope ="global";
function f(){
    var scope;                  //在函数顶部声明了局部变量
    console.log(scope);         //变量存在，但其值是"undefined"
    scope = "local";        //变量在这里赋初始值，但变量本身在函数体内任何地方均是有定义的。
    console.log(scope);         //输出"local"
}

//作为属性的变量
var a = 1;      //声明一个不可删除的全局变量
b = 2;          //创建全局对象的一个可删除的属性
this.c = 3;     //创建全局对象的一个可删除的属性
delete a;       //==>false:变量并没有被删除
delete b;       //==> true:变量被删除
delete c;       //==>true:变量被删除

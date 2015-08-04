//1.Call方法
//call 方法
//调用一个对象的一个方法，以另一个对象替换当前对象。

//call([thisObj[,arg1[, arg2[, [,.argN]]]]])
/*
参数
thisObj 可选项。将被用作当前对象的对象。
arg1, arg2, , argN 可选项。将被传递方法参数序列。

说明
call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。

如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。

如果你以前没有用过此方法，读起来是很迷茫的，下面先看看例子，理清一下思路。*/
function person(name,age,sex){  //定义person
    this.name=name;
    this.age=age;
    this.sex=sex;
}
function student(name,age,sex,university,major){  //定义Student
    this.university=university;
    this.major=major;
    person.call(this,name,age,sex);  //person.call(student,argument...)
}

var john=new student("john",20,"male","MIT","webdeveloper"); //添加实例
alert(john.age);  //显示结果为20


//从上面的函数看，按理说student并没有age这个属性，但为什么john.age会是20？原因就是 person.call(student,name,age,sex);从结果看，call多少有点继承的味道。 A.call(B,argument,argument2...)，结果就是B继承了A，对B进行实例化后，B里面继承了A的属性和方法。
function person(name,age,sex){
    this.name=name;
    this.age=age;
    this.sex=sex;
    this.say=function(){alert("my name is "+name);}
}
function student(name,age,sex,university,major){
    this.university=university;
    this.major=major;
    person.call(this,name,age,sex);
}

var john=new student("john",20,"male","MIT","webdeveloper");
alert(john.age);
john.say();  //调用say()方法，显示my name is john

//只有方法才call方法，其他对象或属性没有，这里指的方法即typeof(any)==’function’,其他typeof非function的都没有call方法，比如Array数组就没有call方法。

//稍微改动一下：
function person(name,age,sex){
    this.name=name;
    this.age=age;
    this.sex=sex;
    this.say=function(){alert("my name is "+this.name);}
}
function student(name,age,sex,university,major){
    this.name="inner";
    this.university=university;
    this.major=major;
}
var john=new student("john",20,"male","MIT","webdeveloper");
var person2=new person();
person2.say.call(john);  //显示结果为my name is inner


person2.say.call(john)
//，其实就是让john对象调用person2的say方法，而john对象里面this.name="inner"，john调用perosn2的say方法的时候，关键字变量this.name会被替换，所以结果为：my name is inner。

//同时继承多个类：
function parent(father,mother){
    this.father=father;
    this.mother=mother;
    this.tell=function(){alert(this.father+","+this.mother)}
}
function person(name,age,sex){
    this.name=name;
    this.age=age;
    this.sex=sex;
    this.say=function(){alert("my name is "+this.name);}
}
function student(name,age,sex,university,major){
    this.name="inner";
    this.university=university;
    this.major=major;
    parent.call(this);
    person.call(this,name,age,sex);
}
var john=new student("john",20,"male","MIT","webdeveloper");
alert(john.sex);
john.father="Bob John";
john.mother="Mary John";
john.tell();  //显示结果Bob John,Mary John

//通过parent.call(this);person.call(this); student同时继承了parent和person的属性及方法。

/*2.Apply方法
apply 方法
应用某一对象的一个方法，用另一个对象替换当前对象。
apply([thisObj[,argArray]])

参数
thisObj 可选项。将被用作当前对象的对象。
argArray 可选项。将被传递给该函数的参数数组。
说明
如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。
如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。

Apply方法与Call的区别就是在于，call传递参数直接列出来就可以了，而Apply传递参数需要把参数放入数组里面。*/
function person(name,age,sex){
    this.name=name;
    this.age=age;
    this.sex=sex;
    this.say=function(){alert("my name is "+this.name);}
}
function student(name,age,sex,university,major){
    this.university=university;
    this.major=major;
    person.apply(this,[name,age,sex]);  //apply与call的区别，传递参数的方法不同
}
var john=new student("john",20,"male","MIT","webdeveloper");
alert(john.sex);  //显示male
john.say();  //显示my name is john

/*3.argument对象

argument是JavaScript的内置对象，它代表正在执行的函数和调用它的函数的参数。

使用方法：[function.]arguments[n ]

其中function是可选项。当前正在执行的 Function 对象的名字。
n是必选项。要传递给 Function 对象的从0开始的参数值索引。

不能显式创建arguments对象。arguments对象只有函数开始时才可用。函数的arguments对象并不是一个数组，访问单个参数的方式与访问数组元素的方式相同。索引n实际上是arguments对象的0…n属性的其中一个参数。

演示实例：*/
/*<script language="javascript" type="text/javascript">(function argTest(a,b,c,d){
    alert("函数需要 "+argTest.length+" 个参数");
    alert("已经传入的参数为："+arguments.length+"个");
    document.writeln("参数分别为：");
    for(var i=0;i<arguments.length;i++){
    document.writeln(arguments[i]);
    }
    })(1,2,3,4);</script>*/

//4.callee属性
//callee属性是arguments的一个属性，返回方法的正文。
//即：func.arguments.callee = func;

//示例：
/*<script language="javascript" type="text/javascript">(function argTest(a,b,c,d){
    alert("函数需要 "+argTest.length+" 个参数");
    alert("已经传入的参数为："+arguments.length+"个");
    document.writeln("参数分别为：");
    for(var i=0;i<arguments.length;i++){
    document.writeln(arguments[i]);
    }
    alert(arguments.callee); //增加此句，将alert显示出整段代码
    })(1,2,3,4);</script>*/
//利用callee属性可以轻松实现递归调用：
function fact(n){
    if(n<=0){
        return 1;
    }else{
        return n*arguments.callee(n-1);  //轻松实现递归调用
    }
}
alert(fact(3));

/*5.caller属性

caller属性是方法的一个属性，返回当前调用该方法的方法。
如果在A方法中调用了B方法，在A方法执行的过程中，在B函数中存在B.caller等于A的方法体。

说明
对于函数来说，caller 属性只有在函数执行时才有定义。假如函数是由顶层调用的，那么 caller 包含的就是 null 。假如在字符串上下文中使用 caller 属性，那么结果和 functionName.toString 相同，也就是说，显示的是函数的反编译文本。

下面的例子说明了 caller 属性的用法：*/
function callerDemo() {
    if (callerDemo.caller) {
        var a= callerDemo.caller.toString();
        alert(a);
    } else {
        alert("this is a top function");
    }
}
function handleCaller() {
    callerDemo();
}
handleCaller(); //返回handleCaller方法体
callerDemo();  //返回this is a top function
function one(){two();}
function three(){one();}
function two(){alert(two.caller);}  //显示结果为one的方法体
three();
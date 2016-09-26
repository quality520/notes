### this
> this是执行上下文中的一个属性：
```
activeExecutionContext = {
    VO:{...},
    this:thisValue
};
```
> 这里VO是变量对象

this与上下文中可执行代码的类型有直接关系，this值在进入上下文时确定，并且在上下文运行期间永久不变。

###### 案例:
#### 全局代码中的this
```
//显示定义全局对象的属性
this.a = 10;
console.log(a); //10

//通过赋值给一个无标志符隐式
b = 20;
console.log(this.b); //20

//也是通过变量隐式声明
//因为全局上下文的变量对象是全局对象自身
var c = 30;
console.log(this.c); //30
```
![例子1]('images/1.png')
#### 函数代码中的this
> 在函数代码中使用this时很有趣，这种情况很难且会导致很多问题。
在这种类型的代码中，this值的首要特点（或许是最重要的）是它不是静态的绑定到一个函数
this是进入上下文时确认，在一个函数代码中，这个值在每一次完全不同。
在代码运行是的this值是不变的，也就是说，因为它不是一个变量，就不能为其分配一个新值（在Python编程语言中，它明确的定义为对象本身，在运行期间可以不断改变）。
```
var foo = { x : 10 };

var bar = {
    x : 20,
    test : function(){
        console.log(this === bar); //true;
        console.log(this.x); //20;
        this = foo; // 错误，任何时候不能改变this的值
        console.log(this.x); //如果不出错的话，应该是10，而不是20
    }
};

//进入上下文的时候
//this被当做bar对象
//
bar.test();//true,20
foo.test = bar.test;

//不过，这里this依然不会是foo
//尽管调用的是相同的function
foo.test(); //false,10
```
![案例2]('images/2.png')

###### 影响函数代码中this值的变化有几个因素：
* 首先，在通常的函数调用中，this是由激活上下文代码的调用者来提供的，即调用函数的父上下文（parent context）。this取决于调用函数的方式。
> 为了在任何情况下准确无误的确定this值，有必要理解和记住这重要的一点。真是调用函数的方式影响了调用的上下文中的this值，没有别的什么
我们可以看到即使是正常的全局函数也会被调用方式的不同形式激活，这些不同的调用方式导致了不同的this值。
```
var foo(){
    console.log(this);
}
foo();  //window
console.log(foo === foo.prototype.constructor); //true
foo.prototype.constructor(); //foo.prototype
```
![案例3]('images/3.png')
> 也有可能作为一些对象定义的方法来调用函数，但是this将不会设置为这个对象
```
var foo = {
    bar : function(){
        console.log(this);
        console.log(this === foo);
    }
}
foo.bar(); // foo, true

var exampleFunc = foo.bar;
console.log(exampleFunc === foo.bar); //true
// 再一次，同一个function的不同的调用表达式，this是不同的
exampleFunc();//window, false
```
![案例4]('images/4.png')


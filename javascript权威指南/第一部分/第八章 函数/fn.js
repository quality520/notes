/*
var calculator = { //对象直接量
	operand1: 1,
	opearnd2: 1,
	add:function(){
		//注意this关键字的用法,this指代当前对象
		this.result = this.operand1 + this.operand2;
	}
};
calculator.add();
calculator.result*/

/*
//初始化函数对象的计数器
//由于函数声明被提前了,因此这里可以在函数声明
//之前给它的成员赋值的
uniqueInteger.counter = 0;

//每次调用这个函数都会返回一个不同的整数
//它使用一个属性来记住下一次将要返回的值
function uniqueInteger(){
	return uniqueInteger.counter++; //先返回计数器的值,然后计数器自增1
}

uniqueInteger();  //=>0
console.log(uniqueInteger.counter); //=>1*/
/*
//计算阶乘,并将结果缓存至函数的属性中
function factorial(n){
	if (isFinite(n)  && n>0 && n==Math.round(n)){  //有限的正整数
		if (!(n in factorial)){	//如果没有缓存结果
			factorial[n] = n * factorial(n-1);	//计算结果并缓存
			console.log(factorial[n])
		}
		return factorial[n];	//返回缓存结果
	} else {
		return NaN; //如果输入有误
	}
}

factorial[1] = 1; //初始化缓存以保存这种基本情况

console.log(factorial(10));  //=>362880*/

/*function counter(){
	var n = 0;
	return {
		count: function() {return n++;},
		reset: function() {n = 0;}
	};
}
var c = counter(), d = counter();  //创建两个计数器
console.log(c.count())   //=> 0
console.log(d.count())   //=> 0
console.log(c.reset())   //reset()和count()方法共享状态
console.log(c.count())   //=> 0:因为我们重置了c
console.log(d.count())   //=> 1:而没有重置d*/


//eg8.4 利用闭包实现的私有属性存储器方法


function addPrivateProperty(o,name,predicate){
	var value;	//这是一个属性值
	//getter方法简单地将其返回
	o["get" + name] = function(){return value;};

	//setter方法首先检查值是否合法,若不合法就抛出异常
	//否则就将其存储起来
	o["set" + name] = function(v) {
		if(predicate && !predicate(v)){
			throw Error("set" + name ":invalid value" + v);
		}else {
			value = v;
		}
	}
}

//下面代码展示了addPrivateProperty()方法
var o = {}; //设置一个空对象

//增加属性存储器方法getName()和setName()
//确保只允许字符串值
addPrivateProperty(o,"Name",function(x) { return typeof x == "string";});

o.setName("Frank");	//设置属性值
console.log(o.getName());	//得到属性值
o.setName(0);//视图设置一个错误类型的值





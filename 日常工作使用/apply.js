//prototype属性的两个方法,apply()和call()
//
//比较大小
var a = [1,2,3,4,5,6,7,8,9,10];
Math.max.apply(Math,a);  //=> 10;

//传统的比较大小函数
function compare(arr){
	var mx = 0;
	for(var i = 0;i < arr.length;i++){
		if(arr[i] > mx){
			mx = arr[i];
		}
	}
	return mx;
}
compare(a); //=>10;

//apply和call可以冒充函数
//这两个方法的用途都在特定的作用域中调用函数,
//实际上等于设置函数体内this对象的值
function box(a,b){
	return a + b;
}

function sum(a,b){
	return box.apply(this,[a,b]);  //this表示作用域,这里时window
}																 //[]数组内表示box的所需要的参数

//另外一种方式
function sum2(a,b){
	return box.apply(this,arguments);  //arguments对象表示box所需要的参数
}


//对于call方法而言,只是与apply方法传递参数不一样,
//apply接受两个参数(作用域,[参数]),一个表示作用域,第二个为数组,表示传递的参数
//call接受参数(作用域,参数...),第一个参数为作用域,后续排列参数
//并且call只能一次传递参数,不能使用arguments
//eg:
function sum3(a,b){
	return box.call(this,a,b);
}


//apply和call经常使用的地方时能够扩展函数依赖运行的作用域.
var color = "红色的"; 
var box = {
	color:"蓝色的"
};
function sayColor(){
	alert(this.color);
}
sayColor();  //作用域在window

sayColor.call(this);  //作用域在window
sayColor.call(window);  //作用域在window
sayColor.call(box);		//作用域在box,对象冒充

//使用call()或者apply()来扩充作用域的最大好处,就是对象不需要与
//方法发生任何耦合关系(耦合,就是互相管理的意思,扩展和维护会发生连锁反应).
//也就是说,box对象和sayColor()方法之间不会又多余的关联操作,比如:box.sayColor= sayColor;


/**
 * Created by Root on 2015/8/10 0010.
 */
//7.1创建数组
//使用数组直接量创建数组
var empty = []; //没有元素的数组
var primes = [2,3,5,7,11];  //有5个数值的数组
var misc = [1.1,true,"a"];  //3个不同类型的元素和结尾的逗号
var a = [[1,{i:1,ii:2}],[2,[4,5]]];
a[0][2].i;  //==>1,
a[0];   //==>[1,{i:1,ii:2}];
a[0][1];    //==>{i:1,ii:2}

//如果省略数组直接量中的某个值，省略的元素将被赋予undefined值：
var a = [1,,3];a.length; //==>3;
var b = [,,];  a.length; //==>2;
//数组直接量的语法允许有可选的结尾的逗号，故[,,]只有两个元素而非三个

//调用构造函数array()创建数组
var myArray = new Array();  //一个空的数组
var myA = new Array(10);    //一个长度为10的数组
var myArr = new Array(1,2,3,4,5,6,7,8,9);

var a = ["world"];
var value = a[0];
a[1] = 3.14;
i = 2;
a[i] = 3;
a[i+1]="hello";
a[a[i]];    //==>a[3] "hello"


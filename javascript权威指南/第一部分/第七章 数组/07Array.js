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
//tips:清晰地区分数组的索引和对象的属性名是非常有用的。所有的索引都是属性名，但只有在0~2的23次方-2之间的整数属性
//才是索引，所有的对象数组都是对象，可以为其创建任意名字的属性
//注意，可以使用负数或非整数来索引数组。这种情况下，数值转换为字符串，字符串作为属性名来用。
//既能名字不是非负整数，它就只能当做常规的对象属性，而非数组的索引
//如果使用了非负整数的字符串，他会当做数组的索引，而非对象属性

a[-1.23] = true;    //创建一个名为“-1.23”的属性
a["1000"] = 0;      //这是数组的第1001个元素
a[1.000];           //和a[1]相等

//7.3稀疏数组就是包含从0开始的不连续索引的数组。
a = new Array(5);   //数组没有元素，但是a.length是5
a = [];     //创建一个空数组，length = 0；
a[1000] = 0;    //赋值添加一个元素，但是设置length为1001
//足够稀疏的数组通常在实现上比稠密的数组更慢、内存利用率更高，在这样的数组中查找元素的时间与常规对象属性的查找时间一样长

var a = [1,,3];
a.length;   //==>3
0 in a; //==>true


var a = [,,];
a.length;   //==>2
0 in a; //==>false


var a  = [1,2,3,4,6,7,8,9,10];
a.length = 5;
a;  //==>[1, 2, 3, 4, 6]

//第一个特殊行为：如果为一个数组元素赋值，它的索引i大于或等于现有数组的长度时，length属性的值将设置为i+1；
var a = [1,2,3,4,6,87];
console.log(a.length);  //==>6
a.length = 100;
console.log(a.length);  //==>100
a[5];                   //==>87

//第二个特殊行为就是设置length属性为一个小于当前长度的非负整数n时，当前数组中哪些索引值大于或等于n的元素将从中删除
//还可以将数组的length属性值设置为大于当前的长度，实际上这不会想数组中添加新的元素，它只是在数组尾创建一个空的区域。
var a  = [1,2,3,4,6,7,8,9,10];
a.length = 5;
console.log(a);         //==>[1, 2, 3, 4, 6]
a.length = 9;
console.log(a);         //==>[1, 2, 3, 4, 6]

var a = [1,2,3,4,56];
Object.defineProperty(a,"length",{writable:false});
a.length = 0;       //让length的属性改变成只读，
a.length;       //==>5  a，的长度不会改变

//7.5数组元素的添加和删除
var a = new Array();
a[0] = 1;
a[1] = 2;
a;      //==>[1,2];
//也可以使用push()方法在数组末尾增加一个或多个元素
a.push(1);
a.push(2,3,4,5,6,7);
a;      //==>[1,2,3,4,5,6,7];

//也可以是用unshift()方法在数组首部插入一个或多个元素
var a = new Array();
a.push(1);
a.push(2,3,45,6);
a.unshift(0);
a.unshift(-100,-99);
a;      //==>[-100, -99, 0, 1, 2, 3, 45, 6]

//删除元素，使用delete删除数组元素，不过不会删除其索引。
var a = [1,2,3,4,5];
delete a[0];
delete a[2];
delete a[3];
delete a[4];
a;      //==>[ , 2, , ,  ]

delete a[0];    //a在索引为0的位置不再有元素
0 in a;     //false;数组索引为0并未在数组中定义
1 in a;     //==>2 未被删除的依然还在当前索引位置
//数组有pop()方法（它和push()一起使用），后者一次使减少长度1并返回被删除元素的值。还有一个shift()方法（它和unshift）
//一起使用)，从数组头部删除一个元素，和delete不同的是shift()方法将所有元素下移到比当前索引低1的地方
//splice()是一个通用的方法用来插入、删除或替换数组元素，它会根据需要修改length属性并移动元素到更高或更低的索引处。
var a = [2,3,4,5];
a.shift(1);
a;  //==>[3,4,5,]
var a = [2,3,4,5];
a.unshift(1);
a;  [1,2,3,4,5]


var a = [1,2,3];
a.push(1,2);
a.pop(1);
a;      //==>[1,2,3,1]
//splice
var a = [1,2,3,4,5,6,7];
a.splice(1,2,9);//1,2代表索引为1,2的数组元素[2,3]，被9所替代
a;  //==>[1, 9, 4, 5, 6, 7]

//7.6数组遍历
var a = [1,2,3,4,5];
var b = [];
for(var i = 0;i<a.length;i++){
    b[i] = a[i];
}
a;  //==>[1, 2, 3, 4, 5]
b;//==>[1, 2, 3, 4, 5]
//在嵌套循环或其他性能非常重要的上下文中，可以看到这种基本的数组遍历需要优化，
//数组的长度应该只查询一次而非每次循环都要查询
//优化后，
var a = [1,2,3,4,5];
var b = [];
for(var i = 0,len = a.length;i<len;i++){
    b[i] = a[i];
}
a;  //==>[1, 2, 3, 4, 5]
b;//==>[1, 2, 3, 4, 5]

 var a = [1,,,2,,,3,,,4,,,5],b = [];
 for(var i=0;i<a.length;i++)
    {if(!a[i]) continue;    //跳过null，undefined和不存在的元素
        b[i]=a[i];
    }
    b;  //==>[ 1, , , 2, , , 3, , , 4, , , 5 ]
//forEach()
var a = [1,2,3,4,5];
var sum = 0;
a.forEach(function(x){
    sum += x*x;
});
sum;    //==>55;1+4+9+16+25

//数组方法join(),concat(),sort(),reverse(),slice(),splice(),pop(),push(),shift(),unshift(),toString(),toLocaleString(),



//ECAMScript数组方法forEach(),every(),some(),map(),filter(),reduce(),reduceRight(),indexOf(),lastIndexOf()

var a = [1,2,3,4,5,6,7,8,9];
a.filter(function(x){return x>5;});     //==>[6, 7, 8, 9]

var a = [1,2,3,4,5,6,7,8,9];
a.every(function(x){return x>5;});      //==>false

var a = [1,2,3,4,5,6,7,8,9];
a.every(function(x){return x>0;});      //==>true

var a = [1,2,3,4,5,6,7,8,9];
a.some(function(x){return x>6;});       //==>true

//在数组中查找所有出现的x，并返回一个包含匹配索引的数组
var a = [1,2,3,4,5,7,8,9,1,1,1,1,1,1];
function result(b,x){
    var result = [];        //将会返回的数组
    var index = 0;          //开始搜索的位置
    var len = b.length;     //待搜索数组的长度
    while(index < len){     //循环搜索过个元素
        index = a.indexOf(x,index);     //搜索
        if(index == -1) break;          //未找到，就完成搜索
        result.push(index);             //否则，在数组中存储索引
        index = index +1;               //并从下一个位置开始搜索
    }
    return result;                      //返回包含索引的数组
}
result (a,1);       //==>[0, 8, 9, 10, 11, 12, 13]


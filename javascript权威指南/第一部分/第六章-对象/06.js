//对象是一种复合值：对象也可以看做是属性的无序列表，每个属性都是一个名/值对，属性名是字符串，因此我们可以把对象看成是从字符串到值的映射。
//对象最常见的用法是创建(create)、设置(set)、查找(query)、删除(delete)、检查(test)和枚举(enumerate)它的属性
//属性包含名字和值。属性名可以是包含空字符串在内的任意字符串，但对象中不能存在两个同名的属性。
//值可以是任意javascript值，或者可以是一个getter或setter函数(或两者都有)(属性：attribute)
//除了包含属性之外，每个对象还拥有三个相关的对象特性(object attribute)
//1，对象的原型(prototype)指向另外一个对象，本对象的属性继承自它的原型对象
//2，对象的类(class)是一个标志对象类型的字符串
//3，对象的扩展标记(extensible flag)指明了是否可以向该对象添加新属性

//对三类javascript对象和两类属性作区分
//1，内置对象(native object)是由ECMAScript规范定义的对象或类。例如，数组，函数，日期和正则表达式都是内置对象
//2，宿主对象(host object)是由javascript解释器来嵌入的宿主环境(比如web浏览器)定义的，客户端javascript中表示网页结构的HTMLElement对象
//均是宿主对象，既能宿主环境定义的方法可以当成普通的javascript函数对象，那么宿主对象也可以当成内置对象
//3，自定义对象(user-defined object)是由运行中的javascript代码创建的对象
//4，自由属性(own property)是直接在对象中定义的属性
//5，继承属性(inherited property)是在对象的原型对象中定义的属性

//6.1创建对象 可以通过对象直接量，关键字new和Object.create()函数来创建对象
    var empty = {};         //没有任何属性的对象
    var point = { x:0, y:0};    //两个属性
    var point2 = { x:point.x,y:point.y} //更复杂的值
    var book = {
        "main title":"JavaScript",      //属性名字里有空格，必须用字符串表示
        'sub-title':"The Definitive Guide", //属性名字里有连字符，必需用字符串表示
        "for":"all audiences",              //for是保留字，必须使用银行要
        author :{                           //这个属性的值是一个对象
            firstName : "david",          //注意，这里的属性名都没有引号
            surname : "Flanagan"
        }
    }
//new运算符创建并初始化一个新对象。关键字new后跟随一个函数调用。这里的函数称作构造函数(constructor)，构造函数泳衣初始化一个新创建
//的对象，javascript语言核心中的原始类型都包含内置构造函数，例如：

    var o = new Object();   //创建空对象，和{}一样
    var a = new Array();    //创建空数组，和[]一样
    var b = new Date();     //创建一个表示当前时间的Date对象
    var r = new RegExp("js");   //创建一个可以进行模式匹配的RegExp对象

//原型
//每一个javascript对象(null除外)都和另一个对象相关联。“另一个”对象就是我们熟知的原型，每一个对象都从原型继承属性
//所有通过对象直接量
//通过new Object();   创建的对象，也继承自Object.prototype
//通过new Array();    创建的对象原型为Array.prototype
//通过new Date();     创建的对象的原型为Date.prototype
//原型链：没有原型的对象位数不多，Object.prototype就是其中之一。它不继承任何属性，其他原型对象都是普通对象，普通对象都具有原型。所有的内
// 置构造函数(以及大部分自定义的构造函数)都具有一个继承自Object.prototype的原型。例如，Date.prototype的属性继承自Object.prototype，因此
//由new Date()创建的Date对象的属性同时继承自Date.prototype和Object.prototype。这一系列的原型对象就是所谓的“原型链”(prototype chain)


//Object.create()方法，是一个静态函数，而不是提供给某个对象调用的方法
//使用：只需传入所需的原型对象即可
var o1 = Object.create({x:1,y:2});      //o1继承了属性x和y；

//可以通过传入参数null来创建一个没有原型的对象，但通过这种方式创建的对象不会继承任何东西，甚至不包括基础方法，如toString()，也就是说
//不能和“+”运算符一起正常工作
    var o2  = Object.create(null);  //创建不继承任何属性和方法的对象
//如果需要创建普通的空对象(比如通过{}或new Object()创建的对象)，需要传入Object.prototype
    var o3 = Object.create(Object.prototype);   //o3和{}new Object()一样

        //inherit()返回一个继承自原型对象p的属性的新对象
        //如果不存在Object.create()，则退化使用其他方法
        function inherit(p){
            if(p==null) throw TypeError();  //p是一个对象，但不能是null
            if(Object.create)               //如果object.create()存在
                return Object.create(p);    //直接使用它
            var t = typeof p;               //否则进行进一步的检测
            if(t!=="object" && t !=="function") throw TypeError();
            function f(){};                 //定义一个空构造函数
            f.prototype = p;                //将其原型属性设置为p
            return new f();                 //使用f()创建p的继承对象
        }

//属性的查询和设置
//对象可以通过点(.)或方括号([])运算符来获取属性的值。运算符左侧应当是一个表达式，它返回一个对象。
//对于点(.)来说，右侧必须是一个以属性名称命名的简单标识符
//对于方括号([])来说，方括号内必须是一个计算结果为字符串的表达是，这个字符串就是属性的名字
    var author = book.author;   //得到book的"author"属性
    var name = author.surname;  //得到获得surname的"surname"属性
    var title = book["main title"];  //得到book的"main title"属性
//设置属性的值
    book.edition = 6;           //给book创建一个名为"edition"的属性
    book["main title"] = "ECMAScript";  //给"main title"属性赋值

//下面两个javascript表达式的值相同
    object.property;
    object["property"]

//关联数组
//上述第一种语法使用了点运算符和一个标识符
//上述第二种语法使用了方括号和一个字符串，看起来更像数组，只是这个数组元素是通过字符串索引而不是数字索引。
//这种数组就是我们所说的关联数组(associative array)，也称散列、映射或字典（dictionary），javascript对象都是关联数组。
        var customer = {
            address0:1,
            address1:2,
            address2:3,
            address3:4
        }
        var addr = "";
        for(var i = 0;i < 4;i++){
            addr +=customer["address" + i]+'\n'
        }
    //==>" 1,2,3,4 "
















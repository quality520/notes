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

//继承：javascript对象具有“自有属性”(own property)，也有一些属性是从原型对象继承而来的。
//inherit（）函数为上面的函数
    var a = {};     //a从Object.prototype继承对象方法
    a.x = 1;        //给a定义一个属性x=1；
    var b = inherit(a); //b继承a和Object.prototype
    b.y = 2;        //给b定义一个属性y=2
    var c = inherit(b); //c继承b、a和Object.prototype
    c.z = 3;        //给c定义一个属性z=3；
    var d = z.toString();   //toString继承自Object.prototype
    c.x + c.y;      //==>3:x和y分别继承自a和b

//继承之后，如果定义同名的属性，会将现有的属性重新定义

        function inherit(p){
            if(p ==null) throw TypeError();
            if(Object.create)
                return Object.create(p);
            var t = typeof p;
            if(t !=='object' && t != 'function') throw TypeError();
            function f() {};
            f.prototype = p;
            return new f();

        }

        var r = {x:1};
        var x = inherit(r);
        console.log(x.x);           //==> 1

        var unitcircle = { r:1};    //一个用来继承的对象
        var c = inherit(unitcircle);    //c继承属性r
        c.x = 1;c.y = 1;                //定义两个属性
        c.r = 2;                        //c覆盖继承来的属性
        unitcircle.r;                   //==>

//当属性值不存在的时候，返回undefined
        function inherit(p){
            if(p ==null) throw TypeError();
            if(Object.create)
                return Object.create(p);
            var t = typeof p;
            if(t !=='object' && t != 'function') throw TypeError();
            function f() {};
            f.prototype = p;
            return new f();

        }
        var r = {x:1};
        var x = inherit(r);
        x.z;        //undefined,属性不存在


//如果对象不存在，那么试图查询这个不存在的对象的属性就会报错，null和undefined值都没有属性，因此查询这些值的属性会报错。
        var a = {
            x:[1,2,3],y:[4,5,6,7,8,9],z:[10]
        }
        a.x.length;     //==>3

        var a = {
            x:[1,2,3],y:[4,5,6,7,8,9],z:[10]
        }
        a.y.length;     //==>6

        var a = {
            x:[1,2,3],y:[4,5,6,7,8,9],z:[10]
        }
        a.xx.length;    //==>Uncaught TypeError: Cannot read property 'length' of undefined(anonymous function)
//两种避免属性不存在而调用出错的方法
//一种冗余但很易懂的方法
        var len = undefined;
        if(book){
            if(book.subtitle) len = book.subtitle.length;
        }
//
        var a = {
            x:[1,2,3],y:[4,5,6,7,8,9],z:[10]
        }
        var len = undefined;
        if(a)
            if(a.x) len = a.x.length;
    //==>3

//一种更简练的常用方法，获取subtitle的length属性或undefined
        var len = book && book.subtitle && book.subtitle.length;
        len;    //==> 3

//对象的只读属性
//内置构造函数的原型是只读的。
Object.prototype = o;//赋值失败，但没有报错，Object.prototype没有修改。【貌似有点问题，可以修改】

//js中在只能在闭包里面能够将属性更改为只读

//删除属性,
        var s = {x:[1,2,3],y:[4,5,6,7,8]}
        console.log(s.x);       //==> [1,2,3]
        delete s.x;
        delete s['y'];
        console.log(s.x);        //==>undefined
        console.log(s.y);       //==>undefined
//delete运算符只能删除自有属性，不能删除继承属性(要删除继承属性必须从定义这个属性的原型对象上删除它，而且这会影响到所有继承自这个原型的对象)


//检测属性
//我们经常会检测集合中成员的所属关系---判断某个属性是否存在于某个对象中。可以通过in运算符、hasOwnProperty()和propertyIsEnumerable()方法来完成工作，
//甚至仅通过属性查询也可以做到这一点

//in运算符的左侧是属性名(字符串)，右侧是对象。如果对象的自有属性或继承属性中包含这个属性则反水true；
    var a = {x:1,y:2,z:3}   //定义一个包含3个属性的对象
    'x' in a;               //==>true,‘x'是a的属性
    'y' in a;               //==>true,‘y'是a的属性
    'w' in a;               //==>false,‘w'不是a的属性
    'toString' in a;        //==>true,o继承toString属性

//对象的hasOwnProperty()方法用来检测给定的名字是否是对象的自有属性，对于继承属性它将返回false：
    var a = {x:1,y:2,z:3}   //定义一个包含3个属性的对象
    a.hasOwnProperty('x');  //true:a有一个自有属性x
    a.hasOwnProperty('z');  //true:a有一个自有属性z
    a.hasOwnProperty('toString');  //false:toString是继承属性，不是a的自有属性

//propertyIsEnumerable()是hasOwnProperty()的增强版，只有检测到是自有属性且这个属性的可枚举性(enumerable attribute)为true时它才返回true。
//某些内置属性是不可枚举的。通常由javascript代码创建的属性都是可枚举的，除非在ECMAScript5中使用一个特殊的方法来改变属性的可枚举性，
//可枚举的意思：可以使用for/in列举出来的函数
    function inherit(p){
        if(p ==null) throw TypeError();
        if(Object.create)
            return Object.create(p);
        var t = typeof p;
        if(t !=='object' && t != 'function') throw TypeError();
        function f() {};
        f.prototype = p;
        return new f();

    }

    var o = inherit({y:2});
    o.x = 1;
    o.propertyIsEnumerable('x');    //==>true,o有一个可枚举的自有属性x
    o.propertyIsEnumerable('y');    //==>false,y是继承来的
    Object.prototype.propertyIsEnumerable('toString');  //==>false，不可枚举
//除了使用in运算符，另外一种简便的方法是使用“!==”判断一个属性是否是undefined
    var o = {x:1}       //属性被显式赋值为1
    o.x !== undefined;          //==>true;o中有属性x
    o.y !== undefined;          //==>false:o中没有属性y
    o.toSting !== undefined;    //==>true:o继承了toString属性

//有一种场景只能使用in运算符而不能使用上述属性访问的方式。in可以区分不存在的属性和存在但值为undefined的属性。
    var o = {x:undefined}   //属性被显式赋值为undefined
    o.x !== undefined;      //==>false,属性存在，但是值为undefined
    o.y !== undefined;      //==>false：属性不存在
    'x' in o;               //==>true:属性存在
    'y' in o;               //==>false：属性不存在
    delete o.x;             //删除了属性x
    'x' in o;               //==>false，属性x不存在了

//运算符"!=="可以区分undefined和null

//6.5枚举属性
//for/in循环可以在循环体中遍历对象中所有可枚举的属性(包括自有属性和继承的属性)，把属性名称赋值给循环变量。
//对象继承的内置方法不可枚举，但在代码中给对象添加的属性都是可枚举的（除非用方法将它们转换为不可枚举）
var o = {x:1,y:2,z:3}                   //三个不可枚举的自有属性
o.propertyIsEnumerable('toString');     //==>false ,不可枚举
for (p in o)                            //遍历属性
    console.log(p);                     //输出x,y,z，不会输出toString
//有许多使用工具给Object.prototype添加了新的方法或属性，这些方法和属性可以被所有对象继承并使用。然而在ECMAScript5
//标准之前，这些新添加的方法是不能定义为不可枚举的，因此他们都可以在for/in循环中枚举出来。
//为了避免这种情况，需要过滤for/in循环返回的属性，下面两种方式是最常见的
//1，
for(p in o){
    if(!o.hasOwnProperty(p)) continue;  //跳过继承的属性
}
//2，
for(p in o){
    if(typeof o[p] === 'function') continue;    //跳过方法
}
//extend()
//例6-2：用来枚举属性的对象工具函数
/*
* 把p中的可枚举属性复制到o中，并返回o
* 如果o和p中含有同名属性，则覆盖o中的属性
* 把这个函数并不处理getter和setter以及复制属性
* */
function extend(o,p){
    for(prop in p){
        o[prop] = p[prop];
    }
    return o;
}
/*
* 将p中的可枚举属性复制至o中，并返回o
* 如果o和p中有同名属性，o中的属性将受影响
* 这个函数并不处理getter和setter以及复制属性
* */
function  merga(o,p){
    for(prop in p){                             //遍历p中的所有属性
        if(o.hasOwnProperty[prop]) continue;    //过滤掉已经在o中存在的属性
        o[prop] = p[prop];                      //将属性添加至o中
    }
    return o;
}
/*
* 如果o中的属性在p中没有同名属性，则从o中删除这个属性
* 返回o
* */
function subtract(o,p){
    for(prop in p){                     //遍历o中的所有属性
        if(!(prop in p)) delete o[prop];//如果在p中不存在，则删除
    }
    return o;
}
/*
 * 如果o中的属性在p中存在同名属性，则从o中删除这个属性
 * 返回o
 * */
function subtract(o,p){
    for(prop in p){                     //遍历o中的所有属性
        delete o[prop];                 //从o中删除（删除一个不存在的属性不会报错）
    }
    return o;
}
/*
* 返回一个新对象，这个对象同时拥有o的属性和p的属性
* 如果o和p中有重名属性，使用p中的属性值
* */
function union(o,p) {return extend(extend({},o),p);}
/*
* 返回一个新对象，这个对象有用同时在o和p中出现的属性
* 很像求o和p的交集，但p中属性的值被忽略
* */
function intersection(o,p) {return restrict(extend({},o),p);}
/*
* 返回一个数组，这个数组包含的是o中可枚举的自有属性的名字
* */

function keys(o){
    if(typeof o !== 'object') throw TypeError();    //参数必须是对象
    var result = [];        //将要返回的数组
    for(var prop in o){         //遍历所有可枚举的属性
        if(o.hasOwnProperty(prop))  //判断是否是自有属性
            result.push(prop);  //将属性名添加至数组中
    }
    return result;  //返回这个数组
}
//1，Object.keys();返回一个数组
//2,Object.getOwnPropertyNames()
//属性getter和setter
var o = {
    //普通的数据属性
    data_prop:value,
// 存储器属性都是成对定义的额函数
    get accessor_prop(){/*这里是函数体*/},
    set accessor_prop(value){/*这里是函数体*/}
}

//调用Object.getOwnPropertyDescriptor()可以获得某个对象特定属性的属性描述符：
Object.getOwnPropertyDescriptor({x:1},"x");
//==> Object {value: 1, writable: true, enumerable: true, configurable: true}

//对于继承舒心和不存在的属性，返回undefined
Object.getOwnPropertyDescriptor({},"x");        //undefined,没有x属性
Object.getOwnPropertyDescriptor({},"toString"); //undefined,继承属性
//getOwnPropertyDescriptor()只能得到自有属性的描述符
//要想获得继承属性的特性，需要遍历原型链getPrototypeOf()；
//想要设置属性的特性，或者想让新建属性具有某种特性，则需要调用Object.definePeoperty()，传入需要修改的对象、要创建或
//修改的名称以及属性描述符对象：
var  o = {};    //create empty Object
//add property 一个不可枚举的属性属性x，并赋值为1
Object.defineProperty(o,"x",{
    value:1,                //赋值为1，
    writable:true,          //可写属性
    enumerable:false,       //不可枚举
    configurable:true       //可配置
});
o.x;    //==>1
Object.keys(o); //==>[]
//现在对属性x做修改，让它变为只读
Object.defineProperty(o,"x",{writable:false});
o.x = 2;    //操作失败但不报错
o.x;       //==> 1,x的值怡然为1
//属性依然是可配置的，可以使用Object.defineProperty()中value中进行修改
Object.defineProperty(o,"x",{value:3});
o.x;        //==>3
//将x数据属性修改为存取器属性
Object.defineProperty(o,"x",{get:function(){return 10;}});
o.x;        //==>10;
//Object.defineProperty()这个方法要么修改已有属性要么新建自有属性，但不能修改继承的属性

//修改或者创建多个属性，Object.defineProperties(),第一个参数是要修改的对象，第二个参数是一个映射表，它包含
//要新建或修改的属性的名称，已经他们的属性描述符

var p = Object.defineProperties({},{
    x:{value:1,writable:true,enumerable:false,configurable:true},
    y:{value:2,writable:true,enumerable:false,configurable:true},
    r:{
        get:function(){return Math.sqrt(this.x*this.x + this.y *this.y)},
        enumerable:true,
        configurable:true
    }
});
p.x;    //==>1,
p.y;    //==>2

//任何对Object.defineProperty()或Object.defineProperties()违反规则的使用都会抛出类型错误异常
//1，如果对象是不可扩展的，则可以编辑已有的自有属性，但不能给它添加新属性
//2，如果属性是不可配置的，则不能修改它的可配置性和可没枚举性
//3，如果存取器属性是不可配置的，则不能改其getter和setter方法，也不能将它转换为数据属性
//4，如果数据属性是不可配置的，则不能将它转换为存取器属性
//5，如果数据属性是不可配置的，则不能将它的可写性从false修改为true，但可以从true修改为false
//6，如果数据属性是不可配置且不可写的，则不能修改它的值。然而可配置但不可写属性的值是可以修改的（
// 实际上是先将它标记为可写的，然后修改它的值，最后转换为不可写的）


//例6-3：复制属性的特性
/*
* 给Object.prototype添加一个不可枚举的extend()方法
* 这个方法继承自调用它的对象，将作为参数传入的对象的属性一一复制
* 除了值之外，也复制属性的所有特性，除非在目标对象中存在同名的属性
* 参数对象的所有自有属性(包括不可枚举的属性)也会一一复制
*
*/
Object.defineProperty(Object.prototype,
    "extend",               //定义Object.prototype.extend
    {
        writable : true,
        enumerable : false,
        configurable : true,
        value : function(o){    //值就是这个函数
             //得到所有的自有属性，包括不可枚举的属性
             var names = Object.getOwnPropertyNames(o);
            //遍历它们
            for(var i = 0;i<names.length;i++){
                //如果属性已经存在，则跳过
                if(names[i] in this) continue;
                //获取o中的属性的描述符
                var desc = Object.getOwnPropertyDescriptor(o,names[i]);
                //用它给this创建一个属性
                Object.defineProperty(this,names[i],desc);
            }
        }
    });

//序列化对象（serialization）是指将对象的状态转换为字符串，也可以将字符串还原为对象。
//内置函数JSON.stringify()和JSON.parse()用来序列化和还原javascript对象

var o = {x:1,y:2,z:{zz:[false,null,""]}};
s = JSON.stringify(o);  //==>"{"x":1,"y":2,"z":{"zz":[false,null,""]}}"
p = JSON.parse(s);  //==>Object {x: 1, y: 2, z: Object}

//6.10对象方法
//1，toString()方法，需要将对象转换为字符串的时候，javascript都会调用这个方法。
var s = {x:1,y:2};
s.toString();   //==>"[object Object]"
//2,toLocaleString()
var date = new Date();
date.toString();    //==>"Mon Aug 10 2015 15:27:47 GMT+0800 (中国标准时间)"
date.toLocaleString();  //==>"2015/8/10 下午3:26:58"
//3,toJSON()
date.toJSON();      //==>"2015-08-10T07:28:48.078Z"
//valueOf()返回原始值
date.valueOf();     //==>1439191790978




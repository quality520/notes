//定义对象
var book ={
    topic:"JavaScript",
    fat:true,
    author:"Flanagan"
}
//通过"."或"[]"来访问对象属性
book.topic              //==>"JavaScript"
book["fat"]             //==>"true"
book.price = 100        //通过赋值创建一个新属性
var data = {                //一个包换两个属性的对象
    trial1:[[1,2],[3,4]],   //每一个属性都是数组
    trial2:[[2,3],[4,5]]    //数组的元素也是数组
}
//定义数组
var result=[
    {name:"张三",
        english:80,
        math:90,
        language:100
    },
    {name:"李四",
        english:90,
        math:95,
        language:80
    },
    {name:"王二",
        english:100,
        math:100,
        language:100
    },
    {name:"麻子",
        english:88,
        math:95,
        language:90
    }
];

//javascript运算符
//运算符作用于操作数，生成一个新的值
//最常见的是算术运算符
3 + 2









//函数
function plus1(x){          //定义名为plus1的一个函数，带有参数x
    return x + 1;
}
plus1(y);                   //4:y=3,调用函数结果为3+1；

var square = function(x){       //函数是一种值，可以赋值给变量
    return x * x;
}
square(plus1(y));               //==>16
//当将函数和对象合写在一起时，函数就变成了"方法"（method）;
//javascript对象方法
var a = [];
a.push(1,2,3);           //push()方法向数组中添加元素
a.reverse();                //另外一个方法，将数组元素的次序反转

var a = [];
a.push("张三","李四","王二","麻子");
console.log(a.reverse());           //==> ["麻子", "王二", "李四", "张三"]

//我们也可以定义自己的方法，"this"关键字是对定义方法的对象的引用
//这里的例子是上文中提到的包含两个点位置信息的数组
points.dist = function(){
    var p1 = this[0];
    var p2 = this[1];
    var a = p2.x - p1.x;
    var b = p2.y - p1.y;
    return Math.sqrt(a * a + b * b);    //勾股定理，用Math.sqrt()来计算平方根
};
points.dist();

function factorial(n){
    var product = 1;
    while(n > 1){
        product *= n;
        n--;
    }
    return product;
}
factorial(4);           //==> 24:1*4*3*2

function factorial2(n){
    var i,product =1;
    for(i = 2;i<=n;n++)
        product *= i;           //循环体，当循环体中只有一句代码，可以省略{}
    return product;
}
factorial2(5);                  // ==> 120:1*2*3*4*5




function debug(msg){
    var log=document.getElementById('debuglog');
    if(!log){
        log = document.createElement('div');
        log.id='debuglog';
        log.innerHTML = '<h1>Debug Log</h1>';
        document.body.appendChild(log);
    }
    var pre = document.createElement('pre');
    var text = document.createTextNode(msg);
    pre.appendChild(text);
    log.appendChild(pre);
}
debug("hello javascript!");
//使用jQuery重写上面的函数
function debug(msg){
    var log = $('#debuglog');           //找到要显示msg的元素
    if(log.length == 0){                //如果不存在则创建
        log = $("<div id='debuglog'><h1>Debug Log</h1></div>");
        log.appendTo(document.body);    //将其追加到body里
    }
    log.append($("<pre/>").text(msg));  //将msg包装在<pre>中，再追加到log里
}

function hide(e,reflow){
    if(reflow){
        e.style.display = "none";   //隐藏这个元素，其所占的空间也随之消失
    }else{
        e.style.visibility = "hidden";  //将e隐藏，但是保留其所占的空间
    }
}

function highlight(e){      //通过设置CSS类来高亮显示e
    //简单定义或追加HTML类属性
    //这里假设css样式表中已经有“hilite”类的定义
    if(!e.className) e.className = "hilite";
    else e.className += "hilite";
}

//load事件
window.onload = function(){//当文档加载完成时执行这里的代码
    //找到文档中所有的<img>标签
    var images = document.getElementsByTagName('img');

    //遍历images，给每个节点的“click”事件添加事件处理程序
    //在点击图片的时候将图片隐藏
    for(var i=0;i<images.length;i++){
        var image = images[i];
        if(image.addEventListener)  //注册事件处理程序的另一种方法
            image.addEventListener("click",hide,false);
        else                        //兼容IE8及以前的版本
            image.attachEvent("onclick",hide);
    }

    //这便是上面注册的事件处理函数
    function hide(event) {
        event.target.style.visibility = "hidden";
    }
};


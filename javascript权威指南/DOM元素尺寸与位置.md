#DOM元素尺寸与位置
####一，获取元素css大小
#####1,通过style内联获取元素的大小
    var box=document.getElementById('box');
    box.style.width;
    box.style.height;
    style只能获取到行内style属性的css样式中的宽和高，
    如果有就获取，没有则返回空
#####2,通过计算获取元素的大小
    var style=window.getComputedStyle?window.getComputedStyle(box,nul):null||box.currentStyle;
    style.width;
    style.height;

    var body = document.body;
    var style = window.getComputedStyle(body,null);
    style.width;
    style.height;
    通过计算获取元素的大小，如果本身设置大小，它
    会返回元素的大小，如果本身没有设置，非IE浏览器会返回默认的大小，IE
    浏览器返回auto。
#####3,通过CSSStyleSheet对象中的cssRules(或rules)属性获取元素大小
    var sheet=document.styleSheets[0]; 
    //获取link或style
    var rule=(sheet.cssRules||sheet.rules)[0];
    //获取第一条规则
    rule.style.width;
    rule.style.height;
    cssRules只能获取到内联或链接样式的宽和高
    不能获取到行内和计算后的样式
#####总结
    以上三种css获取元素大小的方法，只能获取元素
    的css大小，query无法获取元素本身实际的大小。
####二,获取元素实际大小
#####1,clientWidth和clientHeight获取元素可视区域的大小
可以得到元素内容及内边距所占据的空间大小
    var body = document.body;
    body.clientWidth;
    body.clientHeight;

    var kw = document.getElementById('kw');
    kw.clientWidth;
    kw.clientHeight;
    改变padding的值会改变获取的clientWdith与clientHeight的值。
    改变滚动条:overflow:scroll也会改变clientWdith与clientHeight的值
    增加边框与外边距都不会改变clientWidth与clientHeight的值(clientWidth,clientHeight
    不包含边框与外边距的值)
    ps:如果没有设置任何CSS的宽度和高度，非IE浏览器会算上
    滚动条和内边距计算后的大小，IE会返回0;
#####2,scrollWidth,scrollHeight,这组属性可以获取滚动内容的元素大小
    box.scrollWidth;
    box.scrollHeight;
    ps:对于元素的实际大小：scrollWidth和scrollHeight理解如下：
      1,增加边框,不同浏览器有不同的解释
        a)ff和opera浏览器会增加边框的大小，220*220
        b)IE,chrome和safari浏览器会会略边框大小,200*200
        c)IE浏览器值显示它本来内容的高度
      2,增加内边距，最终值等于原来大小加上内边距大小，220*220,
      IE为220*38(38为本来内容的高度)
      3,增加滚动条，最终值会等于原本大小减去滚动条大小，184*184，
      IE为184*18
      4,增加外边距，没有变化
      5,增加内容溢出,ff、chrome和IE获取实际内容高度,opera比前三个
      浏览器获取的高度偏小，safari比前面三个浏览器获取的高度偏大
#####offsetWidth和offsetHeight这组属性可以返回元素实际大小，包含
边框、内边距和滚动条
    box.offsetWidth;
    box.offsetHeight;
    ps:对于元素的实际大小：offsetWidth和offsetHeight理解如下：
      1,增加边框，最终值会等于原本大小加上边框大小
      2,增加内边距，最终值等于原本大小加上内边距大小
      3,增加外边距，没有变化
      4,增加滚动条，无变化，不会减小
####三、获取元素周边大小
#####1,clientLeft和clientTop这组属性可以获取元素设置了左边框和上边框的大小
    box.clientLeft;
    box.clientTop;
    ps:目前只提供了Left和Top这组,并没有提供Right和Bottom，这四条边宽度
    不同的化，可以直接通过计算后的样式获取，或者采用以上三种获取元素大小
    的减法求得
#####2,offsetLeft和offsetTop这组属性可以获取当前元素相对于父元素的位置。
    box.offsetLeft;
    box.offsetTop;
    ps:获取元素当前相对于父元素的位置，最好将它设置为定位:position:absolute;
    否则浏览器会有不同的解释
    加上边框和内边距不会影响它的位置，但加上外边距会累加
    box.offsetParent;
    ps:offsetParent中，如果本身父元素是<body>，非IE返回body
    对象，IE返回html对象，如果两个元素嵌套，上级父元素没有使用定位
    position:absolute,那么offsetParent将返回body对象或html对象，所以
    在获取offsetLeft和offsetTop时，css定位很重要

    如果说，在很多层次里，外层已经定位了，我们如何获取
    里层的元素距离body或html元素之间的距离？
    box.offsetTop + box.offsetParent.offsetTop;  //只有两层的情况下
    如果多层的化，就必须使用循环或递归
    function offsetLeft(element){
      var left = element.offsetLeft;   //得到第一层距离
      var parent = element.offsetParent;//得到第一个父元素

      while(parent !== null){  //如果还有上一层父元素
        left += parent.offsetLeft;  //把本层的距离累加
        parent = parent.offsetParent;//得到本层的父元素
      }                              //继续循环
      return left;
    }
#####3,scrollTop和scrollLeft
     这组属性可以获取滚动条被隐藏的区域大小，也
     可以设置定位到该区域
     box.scrollTop;//获取滚动内容上方的位置
     box.scrollLeft;//获取滚动内容左方的位置

     如果要让滚动条滚动到初始位置
     function scrollStart(element){
      if(element.scrollTop!=0) element.scrollTop = 0;
     }

     document.body.scrollTop = 0;



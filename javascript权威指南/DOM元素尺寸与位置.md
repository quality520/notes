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
    




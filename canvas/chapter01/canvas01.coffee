#canvas
#第一章Canvas简介
#创建canvas元素
<canvas id="cas">
	Your browser does not support HTML5 Canvas
</canvas>
#在javascript中使用gdocument对象引用canvas元素
var cas = document.getElementById('cas');
#检查浏览器是否支持canvas
#第一种方式
if(!cas || !cas.getContext){
	return;
}
#第二种方式
function casSupport(){
	return !!document.createElement('canvas').getContext;
}
function casApp(){
	if(!casSupport){
		return;
	}
}
#第三种方法使用modernizr.js库
<script src="modernizr.js"></script>
#为了检测是否支持canvas，将casSupport()函数进行修改
function casSupport(){
	return Modernizr.canvas;
}
#获取2D环境
var ctx = cas.getContext('2d');
#fillStyle设置颜色
ctx.fillStyle = '#ffffaa';
#font设置字体的大小和字号
ctx.font = '20px Sans-Serif';
#设置字体的垂直对齐方式
ctx.textBaseline = 'top';
#绘制矩形填充
ctx.fillRect(0,0,500,300);
#绘制文字fillText(),这个方法接收三个参数分别是：文本字符串、x坐标和y坐标
ctx.fillText('Hello World!',195,80);

###为了将图像显示到画布上，需要创建一个Image()对象的实例，并且将
Images.src属性设置为将要加载的图像的名字。
在显示图像之前，需要等待图像加载完毕。
设置Image对象的onload函数可以为Image load事件创建一个匿名的回调函数。
这个匿名的回调函数将在onload事件发生时被执行。
当图像加载完毕，调用ctx.drawImage()并传入3个参数将图像显示到画布上：
Image对象、x坐标和y坐标。
###
var oImage = new Image();
oImage.onload = function(){
	ctx.drawImage(oImage,160,130);
}
oImage.src = 'helloworld.gif';
#为了绘制方块而不填充，可以使用ctx.strokeStyle属性设置方块表框的颜色
#然后调用ctx.strokeRect()方法绘制矩形边框。strokeRect()的4个参数分别是：
#左上角x坐标和y坐标、以及矩形的宽度和高度
ctx.strokeStyle = '000000';
ctx.strokeRect(5,5,490,490);

#2D环境及其当前环境
###通过canvas对象的getContext()方法可以获取HTML5的2D环境对象(CanvasRenderingContext2D对象),所有操作都要通过该对象进行.
CanvasRenderingContext2D对象包含了在画布上绘图所需要的所有方法和属性。
CanvasRenderingContext2D采用活不左上角为原点(0,0)的笛卡尔坐标系，
坐标轴向右、向下为正方向。
canvas当前状态是一个绘制状态的堆栈，这些状态可以用用到整个画布。
主要包括以下状态：
###
#变换矩形：缩放、旋转、变换和平移的方法
#裁切区域：通过clip()方法创建
#上下文属性：包括strokeStyle、fillStyle、globalAlpha、lineWidth、lineCap、
line、Join、miterLimit、shadowOffsetX、shadowOffsetY、shadowBlur、shadowColor、
global、CompositeOperation、font、textAlign、textBaseline。


#HMTL5 Canvas对象
###Canvas对象的公共方法
#1,getContext(),使用这个方法获得Canvas 2D环境对象的引用，才能在画布上绘图
#2,toDataURL(),这个方法返回的数据是代表当前Canvas对象产生位图的字符串,它就像屏幕的快照,通过提供一个不同的MIME类型作为参数,可以返回部共同的数据格式。
#几本的格式是image/png，单是也可以获取image/jpeg和其他格式
#3,toBlob(),toBlob([callback])将返回一个引用图像的文件，而不是一个base64编码的字符串。
###

#console.log调试
Debugger.log('drawing canvas');

var Debugger = function(){};
Debugger.log = function(message){
	try{
		console.log(message);
	} catch (exception){
		return;
	}
}



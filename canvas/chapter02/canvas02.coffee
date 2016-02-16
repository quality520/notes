#canvas
#第二章 在canvas上绘图
#2.2基本矩形
#在canvas上，绘制基本矩形有3中不同的方式:填充、描边和清除
#创建矩形(获取其他形状)还可以使用路径
#3中操作的API函数
#填充
fillRect(x,y,width,height);
#描边
#在位置(x,y)处以宽为width、高为height绘制一个填充的矩形
strokeRect(x,y,width,height);
#清除
#在位置(x,y)处以宽为width、高height绘制一个矩形边框。它需要使用当前的sytrokeStyle、lineWidth、lineJoin和miterLimit设置。
clearRect(x,y,width,height);

var cas = document.getElementById('cas'); //获取canvas的id

if(!cas){
	console.log('Failed to retrivev the <canvas> elements');
	return;
}

var ctx = cas.getContext('2d');//获取绘制2d图形的绘制上下文

ctx.fillStyle = '#f00';//设置填充颜色为红色

ctx.fillRect(0,0,200,200);//使用填充颜色填充矩形


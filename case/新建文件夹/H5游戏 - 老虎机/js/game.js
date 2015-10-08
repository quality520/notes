//变量
//数据类型
//条件判断
//循环
//API
//对象
//json
var n=0;
init();
function init(){
	moveToNext(0);
}
function moveToNext(i){
	var $target = $('div.target');//代表找到div.target的元素
	var offset = $('#'+(i%20)).offset();
	$target.animate({top:offset.top-2,left:offset.left-2},50);
	n = i;
}
function startRun(){
	var randomNumber = Math.random(10)*20;//随机生成0-20之间的数字
	randomNumber = Math.ceil(randomNumber)+50;//+上一个50的基数
	var m = n;
	for(var i=m;i<randomNumber+m;i++){
		moveToNext(i);
	}
}
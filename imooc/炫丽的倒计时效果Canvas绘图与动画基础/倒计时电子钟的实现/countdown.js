var WINDOW_WIDTH = 1000;
var WINDOW_HEIGHT = 400;
var RADIUS = 4;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var endTime = new Date(2016,6,16,23,59,59);
var curShowTimeSeconds = 0;

/*定义小球*/
var balls = [];
const colors = ['#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000'];




window.onload = function(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	
	curShowTimeSeconds = getCurrentShowTimeSeconds();
	
	setInterval(function(){
		render(context);
		update();
		// console.log(new Date().valueOf());
	},500)
}
function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret / 1000);
	return ret >= 0 ? ret : 0;
}
function update(){
	
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	
	var nextHours = parseInt(nextShowTimeSeconds / 3600);
	var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
	var nextSeconds = nextShowTimeSeconds % 60;
	
	var curHours = parseInt(curShowTimeSeconds / 3600);
	var curMinutes = parseInt((curShowTimeSeconds - nextHours * 3600) / 60);
	var curSeconds = curShowTimeSeconds % 60;
	
	if(nextSeconds != curSeconds){
		/*判断时间的变化*/
		if(parseInt(curHours / 10) != parseInt(nextHours / 10)){
			addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours / 10));
		}
		if(parseInt(curHours % 10) != parseInt(nextHours % 10)){
			addBalls(MARGIN_LEFT + 15*(RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
		}
		/*minutes*/
		if(parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)){
			addBalls(MARGIN_LEFT + 39*(RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
		}
		if(parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)){
			addBalls(MARGIN_LEFT + 54*(RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
		}
		/*seconds*/
		if(parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)){
			addBalls(MARGIN_LEFT + 78*(RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
		}
		if(parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)){
			addBalls(MARGIN_LEFT + 93*(RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
		}

		curShowTimeSeconds = nextShowTimeSeconds;
	}

	// balls
	updateBalls();
	console.log(balls.length);
}

function updateBalls(){
	for(var i = 0;i < balls.length;i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y >= WINDOW_HEIGHT - RADIUS){
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = -balls[i].vy*0.5;
		}
	}
}

function addBalls(x, y, num){

	for(var i = 0;i < digit[num].length;i++){
		for(var j = 0;j < digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x : x+j*2*(RADIUS+1)+(RADIUS+1),
					y : y+i*2*(RADIUS+1)+(RADIUS+1),
					g : 1.5+Math.random(),
					vx : Math.pow(-1, Math.ceil(Math.random()*1000))*4,
					vy : 15,
					color : colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}

}

function render(cxt){
	
	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	
	var hours = parseInt(curShowTimeSeconds / 3600);
	var minutes = parseInt((curShowTimeSeconds - hours*3600)/60)
	var seconds = curShowTimeSeconds % 60;
	// console.log(hours,minutes,seconds);
	
	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1), MARGIN_TOP, 10, cxt);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), cxt);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1), MARGIN_TOP, 10, cxt);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), cxt);

	/*绘制彩色小球*/
	for(var i = 0;i < balls.length;i++){
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
		cxt.closePath();
		cxt.fill();
	}
}

function renderDigit(x, y, num, cxt){
	
	cxt.fillStyle = 'rgb(0,102,153';
	
	for(var i = 0;i <digit[num].length;i++){
		for(var j = 0;j <digit[num].length;j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
			
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI);
				
				cxt.closePath();
				cxt.fill();
			}
		}
	}
	
}



var zWin = $(window);
var total = 29;
var render = function(){
	var padding = 2;
	var winWidth = zWin.width();
	var picWidth = Math.floor((winWidth - padding*3)/4);
	var tmpl = '';
	for(var i = 1;i <= total;i++){
		var p = padding;
		if(i%4 == 1){
			p = 0;
		}
		var imgSrc = 'images/'+i+'.jpg';
		//tmpl += '<li style="padding-top:'+padding+'px;padding-left:'+p+'px;width:'+picWidth+'px;height:'+picWidth+'px;"><img src="'+imgSrc+'"/></li>';
		tmpl += '<li class="animated bounceIn" style="padding-top:'+padding+'px;padding-left:'+p+'px;width:'+picWidth+'px;height:'+picWidth+'px;"><canvas class="cvs_'+i+'"></canvas></li>';
		var imageObj = new Image();
		imageObj.index = i;
		imageObj.onload = function(){
			var cvs = $('.cvs_'+this.index)[0].getContext('2d');
			cvs.width = this.width;
			cvs.height = this.height;
			cvs.drawImage(this,0,0);
		}
		imageObj.src = imgSrc;
	}
	$('.box').html(tmpl);
}
render();




$('.box').delegate('li','tap',function(){
	
})






































































/*自己写的
 * var winW = $(window).width();
var p = 2;
var imgLen = 29;
var con = '';
var liW = Math.floor((winW - 2*3)/4);
function view(){
	for(var i = 1;i <= imgLen;i++){
		if(i%4 == 1){
			p = 0;
		}else{
			p = 2;
		}
		con += '<li class="animated zoomIn " style="padding-left:'+p+'px;padding-top:2px;width:'+liW+'px;height:'+liW+'px;"><img styles="width:'+liW+'px;height:'+liW+'px;"src="images/'+i+'.jpg"/></li>';
		$('.box').html(con);
	}
}
window.onload = view();*/


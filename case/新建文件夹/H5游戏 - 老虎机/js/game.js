//����
//��������
//�����ж�
//ѭ��
//API
//����
//json
var n=0;
init();
function init(){
	moveToNext(0);
}
function moveToNext(i){
	var $target = $('div.target');//�����ҵ�div.target��Ԫ��
	var offset = $('#'+(i%20)).offset();
	$target.animate({top:offset.top-2,left:offset.left-2},50);
	n = i;
}
function startRun(){
	var randomNumber = Math.random(10)*20;//�������0-20֮�������
	randomNumber = Math.ceil(randomNumber)+50;//+��һ��50�Ļ���
	var m = n;
	for(var i=m;i<randomNumber+m;i++){
		moveToNext(i);
	}
}
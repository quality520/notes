//获取id
var $ = function(id){
	return document.getElementById('id');
}
//class
function getClass(tagName,cls){
	if(document.getElementsByClassName){
		return document.getElementsByClassName(cls);
	}else{
		var oEle = document.getElementsByTagName(tagName);
		var oEleArr = [];
		for(var i = 0;i < oEle.length;i++){
			if(oEle[i].className == cls){
				oEleArr[oEleArr.length] = oEle[i];
			}
		}
		return oEleArr;
	}
}
//使用sort()方法排序，因为使用该方法会自动调用toString()方法，比较字符串值。故传入一个比较函数
function compare(a,b){
    if(a > b){
        return 1;
    }
    if(a <  b){
        return -1;
    }
    else{
        return 0;
    }
}
var aArr = [10,12,9,6,15,20,3,0,1,99];
aArr.sort(compare);
//=>[0, 1, 3, 6, 9, 10, 12, 15, 20, 99]




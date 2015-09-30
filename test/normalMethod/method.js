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



window.onload = function(){
	imgLocation("container", "box");
}
function imgLocation(parent, content){
	//将parent下所有的content全部取出
	var cparent = document.getElementById(parent);
	var ccontent = getChildElement(cparent, content);
	var imgWidth = ccontent[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth / imgWidth);
	cparent.style.cssText = "width:" + imgWidth * cols + "px;margin: 0 auto";
}
function getChildElement(parent, content){
	var contentArr = [];
	var allcontent = parent.getElementsByTagName("*");
	for(var i = 0; i < allcontent.length; i++){
		console.log("allcontent[i]=="+allcontent[i]);
		console.log("allcontent[i].className==="+allcontent[i].className);
		if(allcontent[i].className == content){
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}

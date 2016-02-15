var singleLoadImage=function(){
	var imgArr=null,imgBox=null,imageSrc=null;
		  imgArr = ['images/1.png','images/2.png','images/3.png','images/4.png','images/5.png','images/6.png'];
		  imgBox = document.getElementById('imgBox');

  var popImage=function(){
  	 var _parentCall=arguments;
  	 if(imgArr && imgArr.length>0){
  	 	 console.log('pop',new Date().valueOf());
  	   imageSrc=imgArr.shift();
  	 }
  	 else{
  	 	  return ;
  	 }
  	 var img = new Image();
				 img.src = imageSrc;
				 img.onload = function(){
					 	console.log("^^^");
					 	imgBox.appendChild(img);
						_parentCall.callee();
				 } 
  }();
}();
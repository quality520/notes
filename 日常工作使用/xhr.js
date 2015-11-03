//原生javascript ajax请求
//创建XMLHttpRequest
var xhr;
if(window.XMLHttpRequest){
	xhr = new XMLHttpRequest;
}else{
	xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

//请求类型,url
xhr.open('GET','/api/get',true);
//发送请求
xhr.send();

//响应
xhr.onreadystatechange = function(){
	if(xhr.readyState === 4 && xhr.status === 200){
		//请求成功
		console.log(xhr.responseText)
	}else{
		//请求失败
		console.log(xhr);
	}
}
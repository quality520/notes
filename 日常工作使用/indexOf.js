var str = "I'm a pool man";

var index = str.indexOf("m");

var iArr = [];

while(index > -1){
	iArr.push(index);
	index = str.indexOf("m",index+1);
}

iArr;
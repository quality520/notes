//1,在Javascript里，如果克隆对象是基本类型，我们直接赋值就可以了
//把一个值赋给另一个变量时，当那个变量的值改变的时候，另一个值不会受到影响。
var str = "white_";
var cStr = str;
cStr;	//=> white_;
Str = "quality";
cStr; //=>white_


//2,如果不是基本类型:
var aArr = [1,2,3,4];
var m = aArr;
m;   //=>[1,2,3,4]
aArr = [2,3,4,5,6,7];
m;   //=>[1,2,3,4]

//克隆数组最简单的方法:
var cArr = [1,2,3,4,5,6,7,8];
var b = cArr.slice(0);
b;		//=>[1,2,3,4,5,6,7,8]
aArr = [1,2,3,4];
b;		//=>[1,2,3,4,5,6,7,8]

//创建一个函数来克隆所有对象:
function clone(obj){
	var o ;
	if(typeof obj == "object"){
		if(obj === null){
			o = null;
		}else{
			if(obj instanceof Array){
				o = [];
				for(var i = 0;i<obj.length;i++){
					o.push(clone(obj[i]));
				}
			}else{
				o = {};
				for(var j in obj){
					o[j] = clone(obj[j]);
				}
			}
		}
	}else{
		o = obj;
	}
	return o;
}

//节点克隆
var p = document.getElementsByTagName("p")[0];
var cp = p.cloneNode();//克隆p节点
var c = p.cloneNode(true);////克隆p节点，深度克隆，克隆节点以及节点下面的子内容。


var a  = document.getElementById("q");
var ca = a.parentNode.cloneNode(true);   //克隆父节点下的节点
console.log(a)
ca
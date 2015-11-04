//递归
function sum(n){
	if(n <= 1){
		return 1;
	}else{
		return n * sum(n - 1);
	}
}
sum(3); //=>6


//也可以使用arguments.callee,调用自身
fucntion count(n){
	if(n <= 1){
		return 1;
	}else{
		return n * arguments.callee(n - 1)
	}
}
add(3);//=>6;
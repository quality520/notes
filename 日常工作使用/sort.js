function compare(num1,num2){
	if(num1 > num2) return 1;
	if(num1 < num2) return -1;
	if(num1 == num2) return 0;
}

var aArr = [1,3,2,4,5,10,9,8,1000,77];
aArr.sort(compare);//=>[1, 2, 3, 4, 5, 8, 9, 10, 77, 1000]


aArr.sort(function(a,b){return a-b;})//=>[1, 2, 3, 4, 5, 8, 9, 10, 77, 1000]

aArr.sort(function(a,b){return b-a;})//=>[1000, 77, 10, 9, 8, 5, 4, 3, 2, 1]
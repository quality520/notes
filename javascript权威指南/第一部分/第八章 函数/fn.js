var calculator = { //对象直接量
	operand1: 1,
	opearnd2: 1,
	add:function(){
		//注意this关键字的用法,this指代当前对象
		this.result = this.operand1 + this.operand2;
	}
};
calculator.add();
calculator.result
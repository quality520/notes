

var cartController = function($scope){
	$scope.cart = [
		{
			id:1000,
			name:'iPhone 5',
			quantity:3,
			price:4300
		},
		{
			id:1001,
			name:'iPhone 5s',
			quantity:30,
			price:5300
		},
		{
			id:1002,
			name:'Mac',
			quantity:2,
			price:14000
		},
		{
			id:1003,
			name:'iMac',
			quantity:1,
			price:23000
		},
		{
			id:1004,
			name:'ipad',
			quantity:10,
			price:6800
		}
	];
	/*
		计算总价
	*/
	$scope.totalPrice = function(item){
		var total = 0;
		angular.forEach($scope.cart,function(item){
			total += item.quantity * item.price;
		});
		return total;
	};
	/*总购买数量*/
	$scope.totalQuantity = function(item){
		var total = 0;
		angular.forEach($scope.cart,function(item){
			total += item.quantity;
		});
		return total;
	}
	/*移除*/
	$scope.remove = function(id){
		var index = -1;
		angular.forEach($scope.cart,function(item,key){
			//console.log(key);
			if(item.id == id){
				index = key;
			}
		});
		//如果找到那个item,然后移除该行数据
		if(index !== -1){
			$scope.cart.splice(index,1);
		}
	}
}
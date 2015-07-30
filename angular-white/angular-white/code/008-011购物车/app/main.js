

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
			total += parseInt(item.quantity);
		});
		return total;
	}


	/*找一个元素的索引*/
	var findIndex = function(id){
		var index = -1;
		angular.forEach($scope.cart,function(item,key){
			if(item.id == id){
				index = key;
				return;
			}
		});
		return index;
	}
	/*移除*/
	$scope.remove = function(id){
		/*var index = -1;
		angular.forEach($scope.cart,function(item,key){
			//console.log(key);
			if(item.id == id){
				index = key;
			}
		});*/
		var index =findIndex(id);
		//如果找到那个item,然后移除该行数据
		if(index !== -1){
			$scope.cart.splice(index,1);
		}
	}
	/*为产品添加一个数量*/
	$scope.add = function(id){
		var index = findIndex(id);
		if(index != -1){
			++$scope.cart[index].quantity;
		}
	}
	/*为产品减少一个数量*/
	$scope.reduce = function(id){
		var index = findIndex(id);
		if(index != -1){
			var item = $scope.cart[index];
			if(item.quantity > 1){
				--item.quantity;
			}else{
				var returnKey = confirm("从购物车内删除该产品？");
				if(returnKey){
					$scope.remove(id);
				}
			}
		}
	}
	/*当数量为负数的时候是否删除产品*/
	$scope.$watch('cart',function(newValue,oldValue){
		//console.log(newValue);
		angular.forEach(newValue,function(item,key){
			if(item.quantity < 1){
				var returnKey = confirm("是否从购物车删除该产品？");
				if(returnKey){
					$scope.remove(item.id);
				}else{
					item.quantity = oldValue[key].quantity;
				}
			}
		})
	},true);
}
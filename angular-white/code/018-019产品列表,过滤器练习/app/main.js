
var product = angular.module('product',[]);

product.service('productData',function(){
	return [
		{
			id:'1000',
			name:'iphone',
			price:5400
		},
		{
			id:'1001',
			name:'iphone 6',
			price:6000
		},
		{
			id:'1002',
			name:'ipad',
			price:4000
		},
		{
			id:'1003',
			name:'ipad mini',
			price:2000
		},
		{
			id:'1004',
			name:'mac',
			price:14000
		}
	]
});


product.controller('productController',function($scope,productData){
	$scope.productData = productData;

	$scope.orderType = 'id';

	$scope.order = '-';

	$scope.changeOrder = function(type){
		$scope.orderType = type;
		if($scope.order === ''){
			$scope.order = '-';
		}else{
			$scope.order = '';
		}
	}

})
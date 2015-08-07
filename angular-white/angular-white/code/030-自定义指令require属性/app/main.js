

angular.module('myApp',[])


.directive('bookList',function(){
	return {
		restrict : 'ECAM',
		controller : function($scope){
			$scope.books = [
					{
						id : 1,
						name : 'PHP'
					},
					{
						id : 2,
						name : 'Javascript'
					},
					{
						id : 3,
						name : 'java'
					},
					{
						id : 4,
						name : 'IOS'
					}

				];
			this.addBook = function(){
				$scope.$apply(
					$scope.books.push({
						name:'AngularJs'
					})
				)
			}
		},
		controllerAs : 'bookListController',
		template : '<div><ul ng-repeat="book in books"><li>{{book.name}}</li></ul><book-add></book-add></div>',
		replace :true
	}
})
.directive('bookAdd',function(){
	return {
		restrict : 'ECMA',
		require : '^bookList',
		template : '<button type="button">添加</button>',
		replace : true,
		link:function(scope,iElements,iAttrs,bookListController){
			iElements.on('click',bookListController.addBook)
		}
	}

})

.controller('firstController',['$scope',function($scope){
	//console.log($scope);
	/*$scope.books = [
		{
			id : 1,
			name : 'PHP'
		},
		{
			id : 2,
			name : 'Javascript'
		},
		{
			id : 3,
			name : 'java'
		},
		{
			id : 4,
			name : 'IOS'
		}

	];*/
}])
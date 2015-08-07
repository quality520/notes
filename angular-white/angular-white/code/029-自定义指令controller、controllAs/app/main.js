

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
				alert('test');
			}
		},
		controllerAs : 'bookListController',
		template : '<div ng-repeat="book in books"><li>{{book.name}}</li></div>',
		replace :true,
		link:function($scope,iElements,iAttrs,bookListController){
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
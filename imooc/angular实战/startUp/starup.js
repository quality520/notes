/*启动*/
var myModule = angular.module("myModule",[])
myModule.controller("myCtrl",['$scope',function($scope){
  $scope.gameName = "white";
}]);



/*手动启动*/
/*
  注意这里要用ready函数等待文档初始化完成
  @return {[type]} [description]
 */
angular.element(document).ready(function(){
  angular.bootstrap(document,['myModule']);
})
/*angularJS中provider/factory/services/constant/value
provider是基础，其余都是调用provider函数实现的，只是参数不同：
从左到右，灵活性越来越差
一、provider:*/
angular.module("myModule",[])
.provider("helloAngular",function(){
    return {
        $get:function(){
            var name = "white";
            function getName(){
                return name;
            }
            return {
                getName :getName;       
            }
        }
    }
})
.controller('myCtrl',['$scope','helloAngular',function($scope,heloAngular){
    function($scope,helloAngular){
        $scope.getName = helloAngular.getName(); 
    }
}]);
/*二、factory*/
angular.module("myModule",[])
.factory("helloAngular",function(){
    var name = 'white';
    function getName(){
        return name;
    }
    return {
        getName:getName;    
    };
})
.controller('myCtrl',['$scope','helloAngular',function($scope,heloAngular){
    function($scope,helloAngular){
        $scope.getName = helloAngular.getName(); 
    }
}]);
/*三、services*/
angular.module("myModule",[])
.services("helloAngular",function(){
    this.name = 'white';
    this.getName(){
        return this.name;
    }
})
.controller('myCtrl',['$scope','helloAngular',function($scope,heloAngular){
    function($scope,helloAngular){
        $scope.getName = helloAngular.getName(); 
    }
}]);
/*所有的provider都可以用来进行注入：
provider/factory/service/constant/value
以下类型的函数可以接受注入：
controller/directive/filter/service/factory等
ng中的“依赖注入”是通过provider和injector这两个机制联合实现的。*/


































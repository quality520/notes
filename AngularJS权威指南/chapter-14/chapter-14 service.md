#服务service
    服务提供了一种能在应用的整个生命周期内保持数据的方法，它能够在控制器之间进行通信，并且能保证数据的一致性。
    服务是一个单例对象，在每个应用中只会实例化一次(被$injector实例化)，并且是延迟加载的(需要时才会被创建)。服务
    提供了把特定功能相关联的方法几种在一起的接口。
    以AngularJS的$http服务为例，它提供了对浏览器的XMLHttpRequest对象的底层访问功能，我们可以通过$http的API同
    XMLHttpRequest进行交互，而不需要因为调用这些底层代码而污染应用
      //示例服务，在应用的整个生命周期内保存current_user
      angular.module('myApp',[])
        .factory('UserService',function($http){
          var current_user;
          return {
            getCurrentUser:function(){
              return current_user;
            },
            setCurrentUser:function(user){
              current_user = user;
            }
          }
        })
    AngularJS提供了一些内置服务，在任何地方使用他们的方式都是统一的。同时，为复杂应用创建我们自己的服务也是
    非常有用的。
    在AngularJS中创建自己的服务时非常容易的：只需要注册这个服务即可。服务被注册后，AngularJS编译器可以引用它，
    并且在运行时把它当做依赖加载进来。服务名称的注册表使得在测试中伪造和剔除相互隔离的应用依赖变得非常容易。
####14.1 注册一个服务
    用$injector来创建和注册服务有好几种方法:
    使用angular.module的factory API创建服务，是最常见也是最灵活的方式：
    下面例子使用githubService名字注册成为AngularJS应用的一个服务
      angular.module('myApp',[])
        .factory('githubService',function(){
          var serviceInstance = {};
          return serviceInstance;
        });
    服务的工厂函数用来生成一个单例的对象或函数，这个对象或函数就是服务，它会存在于应用的整个生命周期内。
    当我们的AngularJS应用加载服务时，这个函数会被执行并返回一个单例的服务对象。
    同创建控制器的方法一样，服务的工厂函数既可以是一个函数也可以是一个数组:
    //用"[]"声明工厂
    angular.module('myApp',[])
      .factory('githubService',[function($http){
        
      }])
    例如， githubService 需要访问 $http 服务， 所以我们将 $http 服务当作AngularJS应用的一个
    依赖，并将它注入到工厂函数中
    angular.module('myApp',[])
      .factory('githubService',function($http){
        //serviceInstance现在可以在函数定义中访问$http服务
        var serviceInstance ={};
        return serviceInstance;
      })
    通过将方法设置为服务对象的一个属性来将其暴露给外部
      angular.module('myApp',[])
        .factory('githubService',function($http){
          var githubUrl = 'http://api.github.com';
          
          var runUserRequest = function(username,path){
            //从使用JSONP调用github API的$http服务中返回promise
            return $http({
              method:'JSONP',
              url:githubUrl + '/users/'+
                  username + '/'+
                  path + '?callback=JSON_CALLBACK'
            });
          }
            //返回带有一个events函数的服务对象
            return {
              events:function(username){
                return runUserRequest(username,'events');
            }
          }
        })
    githubService 中只包含了一个方法，可以在应用的模块中调用
####14.2使用服务
    将服务的名字当做参数传递给控制器函数，可以将服务注入到控制器中.当服务成为某个控制器的依赖，
    就可以在控制器中调用任何定义在这个服务对象上的方法。
      angular.module('myapp',['myApp.services'])
       .controller('serviceController',function($scope,githubService){
         //我们可以调用对象的事件函数
         $scope.events = githubService.ecents('auser')
       })
####14.3 创建服务时的设置项
    5种方法用来创建服务：
      1,factory()
      2,service()
      3,constant()
      4,value()
      5,provider()
    14.3.1 factory()
      factory()方法是创建和配置服务的最快捷方式。factory()函数可以接受两个参数:
      name(string) 需要注册的服务名
      getFn(function) 这个函数会在AngularJS创建服务时被调用
        angular.module('myApp')
          .factory('myService',function(){
            return {
              'username':'auser'
            };
          });
      因为服务是单例对象，getFn应用的生命周期内只会被调用一次。同其他AngularJS的服务一样，
      在定义服务时，getFn可以接受一个包含可被注入对象的数组或函数
      getFn函数可以返回简单类型、函数乃至对象等任意类型的数据(同value()函数类型)
        angular.module('myApp')
         .factory('githubService',['$http',function($http){
           return {
             getUserEvents:function(username){
               //...
             }
           }
         }])
    14.3.2 service()
      service()方法用来注册一个支持构造函数的服务,它允许我们在服务对象注册一个构造函数。
      service()方法接受两个参数:
        name(string) 要注册的服务名
        constructor(function) 构造函数，我们调用它来实例化服务对象
      service()函数会在创建实例时通过new关键字来实例化服务对象
        ver Person = function($http){
          this.getName = function(){
            return $http({
              method:'GET',
              url:'/api/user'
            });
          };
        };
        angular.service('personService',Person);
    14.3.3 provider()
      所有服务工厂都是由$provide服务创建的，$provide服务负责在运行时初始化这些提供者
      提供者是一个具有$get()方法的对象，$injector通过调用$get方法来创建服务实例。
      $provide提供了数个不同的API用于创建服务，每个方法都有各自的特殊用途。
      所有创建服务的方法都构建在provider方法枝上。provider()方法负责在$providerCache中注册服务。
      从技术上说，当我们假定传入的函数就是$get()时，factory()函数就是用provider()方法注册服务的简略形式。
        下面两种方法的作用完全一样，并且会创建同一个服务。
        angular.module('myApp')
          .factory('myService',function(){
            return {
              'username':'auser'
            };
          })
          //这与上面工厂的用于等价
          .provider('myService',{
            $get:function(){
              return {
                'username':'auser'
              };
            }
          });
      
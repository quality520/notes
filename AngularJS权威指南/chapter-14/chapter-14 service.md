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
      是否可以一直使用.factory()方法来替代.provider()呢？
      答案时取决于是否需要用AngularJS的.config()函数来对.provider()方法返回的服务进行额外的扩展配置。同其他创建服务的方法不同，.config()方法可以被出入特殊的参数。
        比如我们希望在应用启动前配置 githubService 的URL：
        // 使用`.provider`注册该服务
        angular.module('myApp', [])
          .provider('githubService', function($http) {
            // 默认的，私有状态
            var githubUrl = 'https://github.com'
            setGithubUrl: function(url) {
            // 通过.config改变默认属性
            if (url) { githubUrl = url }
            }，
            method: JSONP, // 如果需要，可以重写
            $get: function($http) {
            self = this;
            return $http({ method: self.method, url: githubUrl + '/events'});
            }
          });
      通过使用.provider()方法，可以在多个应用使用同一个服务时获得更强的扩展性，特别时在不同应用或开源社区之间的共享服务时。
      上面的例子中.provider()方法在文本githubService后添加Provider生成了一个新的提供者，githubServiceProvider可以被注入到config()函数中
        angular.module('myApp',[])
          .config(function(githubServiceProvider){
            githubServiceProvider.setGithubUrl('git@github.com');
          })
      如果希望在.config()函数中可以对服务进行配置，必须用.provider()来定义服务
        .provider()方法为服务注册提供者，接受两个参数
        name(string) 
        name参数在providerCache中是注册的名字。name+Provider会成为服务的提供者。同时name也时服务实例的名字。
        eg:如果定义了一个githubService，那么它的提供者就是githubServiceProvider
        aProvider(object/function/array)
        aProvider 可以是多种形式。
        如果aProvider时函数，那么它hi通过依赖注入被调用，并且负责通过$get方法返回一个对象。
        如果aProvider时数组，会被当做一个带有行内依赖注入声明的函数来处理。数组的最后一个元素应该时函数，可以返回一个带有$get方法的对象。
        如果aProvider是对象，它应该带有$get方法
        直接使用provider() API是原始的创建服务的方法:
          //在模块对象上直接创建provoder的例子
          angular.module('myApp',[])
            .provider('userService',{
              favoriteColor:null,
              setFavoriteColor:function(newColor){
                this.favoriteColor = newColor;
              },
              //$get函数可以接受injectables
              $get:function($http){
                return {
                  'name':'Ari',
                  getFavoriteColor:function(){
                    return this.favoriteColor || 'unknown';
                  }
                }
              }
            })
        用这个方法创建服务，必须返回一个定义有$get()函数的对象，否则会导致错误。
        可以通过注入器来实例化服务：
        var injector = angular.injector(['myApp']);
        injector.invoke(['userService',function(userService){
          'name':'Ari',
          getFavoriteColor:function(){

          }
        }])
        .provider()是非常强大的，可以让我们在不同的应用中共享服务。
    14.3.4 constant()
      可以将一个已经存在的变量值注册为服务，并将其注入到应用的其他部分当中。例如，假设我们需要给后端服务一个apikey，可以用constant()将其当做变量保存下来。
      constant()函数可以 接受两个参数
      name(string) 需要住的的变量的名字
      value(常量) 需要注册的常量的值(值或者对象)
      constant()方法返回一个注册后的服务实例。
      angular.module('myApp').constant('apiKey','123')
      这常量服务可以像其他法务一样被注入到配置函数中:
        angular.module('myApp')
          .controller('myController',function($scope,apiKey){
            //可以像上面一样用apiKey作为常量
            //用123作为字符串的值
            $scope.apiKey = apiKey;
          })
    14.3.5 value()
      如果服务的$get方法返回的是一个常量，那就没有必要定义一个包含复杂功能的完整服务，可以通过value()函数方便地注册服务
      value()方法可以接受两个参数
      name(string)同样是需要注册的服务名
      value(key)将这个值作为可以注入的实例返回
      value()方法返回以name参数的值为名称的注册后的服务实例
      angular.module('myApp')
        .value('apiKey','123');
    14.3.6 何时使用value()和constant()
      value()方法和constant()方法之间最主要的区别时，常量可以注入到配置函数中，而值不行。
      通常情况下，可以通过value()来注册服务对象或函数，用constant()来配置数据。
        angular.module('myApp',[])
          .constant('apiKey','123')
          .config(fucntion(apikey){
            // 在这里apiKey将被赋值为123123123
            // 就像上面设置的那样
          })
          .value('FBid','234')
          .config(function(FBid){
            // 这将抛出一个错误，未知的provider: FBid
            // 因为在config函数内部无法访问这个值
          })
    14.3.7 decorator()
      $provide服务提供了在服务实例创建时对其进行拦截的功能，可以对服务进行扩展，或者用另外的内容完全代替它
      angularJS中很多功能的测试就是借助$provide.decorator()建立的
      decotator()函数可以接受两个参数
      name(string)将要拦截的服务名称
      decoratorFn(function)在服务实例化时调用该函数，使用函数由injector.invoke调用，可以将服务注入这个函数中。
      $delegate 是可以进行装饰的最原始的服务，为了装饰其他服务，需要将其注入进装饰器。
      例如，下面的代码展示了如何给 githubService 添加装饰器，从而为每个请求都加上一个时
      间戳：
      var githubDecorator = function($delegate,$log) {
        var events = function(path) {
        var startedAt = new Date();
        var events = $delegate.events(path);
        // 事件是一个promise events.finally(function() {
        $log.info("Fetching events" +
        " took " +
        (new Date() - startedAt) + "ms");
        });
        return events;
        };
        return {
        events: events
        };
        };
      angular.module('myApp')
      .config(function($provide) {
      $provide.decorator('githubService',githubDecorator);
      });



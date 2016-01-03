#面向对象OOP
####概念
    面向对象程序设计(Object-oriented programming,OOP)
    是一种程序设计范型，同时也是一种程序开发的方法。对象指的是类的实例。
    它将对象作为程序的基本单元，将程序和数据封装其中，以提高软件的
    重用性、灵活性和扩展性 -----维基百科
####OOP的特性
    继承
    封装
    多态
    抽象
####基于原型的继承
    function Foo(){
      this.y = 2;
    }
    typeof Foo.prototype;//object
    Foo.prototype.x = 1;

    var obj = new Foo();
    obj.y;//2
    obj.x;//1

    Foo.prototype
    {
      constructor:Foo,
      __prototype__:Object.prototype,
      x:1
    }
    

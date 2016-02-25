#-*-coding:utf-8-*-
#07Python函数
#7-1什么是函数
#函数本身只需要写一次，就可以多次调用
#圆的面积公式：
#S = π * r * r
#计算三个不同大小半径的面积：
r1 = 12.34
r2 = 9.08
r3 = 73.1
s1 = 3.14 * r1 * r1
s2 = 3.14 * r2 * r2
s3 = 3.14 * r3 * r3

#我们可以定义一个函数
#s = area_of_circle(x)


#7-2调用函数
#Python内置很多有用的函数，我们可以直接调用
#要调用一个函数，需要知道函数的名称和参数，比如求绝对值的函数abs，它接收一个参数
#可以直接从Python的官方网站查看文档：
#http://docs.python.org/2/library/functions.html#abs
#调用abs函数：
print abs(100) #==>100
print abs(-20) #==>20
print abs(12.34) #==>12.34

#比较函数cmp(x,y)需要两个参数，如果x<y，返回-1，如果x==y,返回0，如果x>y，返回1：
print cmp(1,2) #==>-1
print cmp(2,1) #==>1
print cmp(3,3) #==>0

#Python内置的常用函数还包括数据类型转换函数，
#比如int()函数可以把其他数据类型转换为整数
print int('123') #==>123
print int(12.34) #==>12
#str()函数把其他类型转换成str
print str(123) #==>'123'
print str(1.23) #==>'1.23'

#任务
#sum()函数接受一个list作为参数，并返回list所有元素之和。请计算 1*1 + 2*2 + 3*3 + ... + 100*100
#笨办法
L = [1,2,3,4,5,6,7,8,9,10,
     11,12,13,14,15,16,17,18,19,20,
     21,22,23,24,25,26,27,28,29,30,
     31,32,33,34,35,36,37,38,39,40,
     41,42,43,44,45,46,47,48,49,50,
     51,52,53,54,55,56,57,58,59,60,
     61,62,63,64,65,66,67,68,69,70,
     71,72,73,74,75,76,77,78,79,80,
     81,82,83,84,85,86,87,88,89,90,
     91,92,93,94,95,96,97,98,99,100
    ]
sum = 0
for i in L:
    sum += L[i-1] *L[i-1]
print sum 
#第二种
# L = []
# x = 1
# while x <= 100:
#     L.append(x * x)
#     x = x + 1
# print sum(L)

#7-3编写函数
#在Python中，定义一个函数要使用def语句，依次写出函数名、括号、括号中的参数和冒号，
#然后，在缩进代码块中编写函数体，函数的返回值用return语句返回
#自定义一个求绝对值的my_ab函数为例
def my_abs(x):
    if x > 0:
        return x
    else:
        return -x


#任务
#请定义一个 square_of_sum 函数，它接受一个list，返回list中每个元素平方的和
def square_of_sum(L):
    sum = 0
    for i in L:#for循环中i就代表L中的元素，并不是索引
        sum = sum + (i**2)
    return sum

print square_of_sum([1, 2, 3, 4, 5])
print square_of_sum([-5, 0, 5, 15, 25])


#7-4返回多值
#Python中函数可以返回多个值吗？答案是肯定的。
#比如在游戏中经常需要从一个点移动到另一个点，给出坐标、位移和角度，就可以计算出新的坐标：
#math包提供了sin()和cos()函数，我们需要先引用它:
import math
def move(x,y,step,angle):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny
#这样我们就可以同时获得返回值：
x, y = move(100,100,60,math.pi/6)
print x, y #151.961524227 70.0

#但其实这只是一个假象，Python函数返回的仍然是单一值
r = move(100,100,60,math.pi/6)
print r #(151.961524227 70.0)

#用print打印返回结果，原来返回值是一个tuple！
#但是，在语法上，返回一个tuple可以省略括号，而多个变量可以同时接收一个tuple，按位置赋给对应的值，所以，Python的函数返回多值其实就是返回一个tuple，但写起来更方便。


#任务
#一元二次方程的定义是：ax² + bx + c = 0
#请编写一个函数，返回一元二次方程的两个解。
#注意：Python的math包提供了sqrt()函数用于计算平方根。
#x1 = (-b + math.sqrt(b**2 + 4 * a * c))/(2 * a)
#x2 = (-b + math.sqrt(b**2 - 4 * a * c))/(2 * a)
import math
def quadratic_eauation(a,b,c):
    x1 = (-b + math.sqrt(b**2 - 4 * a * c))/(2 * a)
    x2 = (-b - math.sqrt(b**2 - 4 * a * c))/(2 * a)
    return x1,x2

print quadratic_eauation(2, 3, 0)
print quadratic_eauation(1, -6, 5)
#数学公式要记牢


#7-5递归函数
#在函数内部，可以调用其他函数，如果一个函数在内部调用自身本身，这个函数就是递归函数
#数学中阶乘
# n! = 1 * 2 * 3 * ... * n,用函数表示fact(n)
#fact(n) = n! = 1 * 2 * 3 * ... * (n-1) * n = (n-1)! * n = fact(n-1) * n
#所以，fact(n)可以表示为 n * fact(n-1)，只有n=1时需要特殊处理。
#fact(n)用递归的方式写出来就是：
def fact(n):
    if n == 1:
        return 1
    return n * fact(n-1)
print fact(10)
print fact(100)
print fact(5)
#print fact(10000)#栈溢出
#递归函数的优点是定义简单，逻辑清晰。理论上，所有的递归函数都可以写成循环的方式，但循环的逻辑不如递归清晰。
#使用递归函数需要注意防止栈溢出。在计算机中，函数调用是通过栈（stack）这种数据结构实现的，每当进入一个函数调用，栈就会加一层栈帧，每当函数返回，栈就会减一层栈帧。由于栈的大小不是无限的，所以，递归调用的次数过多，会导致栈溢出。可以试试计算 fact(10000)
#任务
#汉诺塔 (http://baike.baidu.com/view/191666.htm) 的移动也可以看做是递归函数。
#我们对柱子编号为a, b, c，将所有圆盘从a移到c可以描述为：
#如果a只有一个圆盘，可以直接移动到c；
#如果a有N个圆盘，可以看成a有1个圆盘（底盘） + (N-1)个圆盘，首先需要把 (N-1) 个圆盘移动到 b，然后，将 a的最后一个圆盘移动到c，再将b的(N-1)个圆盘移动到c。
#请编写一个函数，给定输入 n, a, b, c，打印出移动的步骤：
#move(n, a, b, c)
#例如，输入 move(2, 'A', 'B', 'C')，打印出：
#A --> B
#A --> C
#B --> C


def move(n, a, b, c):
    if n ==1:
        print a, '-->', c
        return
    move(n-1, a, c, b)
    print a, '-->', c
    move(n-1, b, a, c)
move(4, 'A', 'B', 'C')

#7-6定义默认参数
#定义函数的时候，还可以有默认参数。
#Python自带的int()函数，其实就有两个参数，我们既可以传一个参数，也可以传两个参数：
print int('123') #123
print int('123',8) #83
#int()函数的第二个参数是转换进制，如果不传，默认是十进制 (base=10)，如果传了，就用传入的参数。
#函数的默认参数的作用是简化调用
#我们来定义一个计算x的N次方的函数：
def power(x,n):
    sum = 1
    while n > 0:
        n = n - 1
        sum = sum * x
    return sum
print power(4,4) #256
#假设计算平方的次数最多，我们就可以把 n 的默认值设定为 2：
def power(x,n=2):
    sum = 1
    while n > 0:
        n = n - 1
        sum = sum * x
    return sum
print power(4) #16
#由于函数的参数按从左到右的顺序匹配，所以默认参数只能定义在必需参数的后面：

# OK:
def fn1(a, b=1, c=2):
    pass
# Error:
#def fn2(a=1, b):
#    pass

#任务
#请定义一个 greet() 函数，它包含一个默认参数，如果没有传入，打印 'Hello, world.'，如果传入，打印 'Hello, xxx.'
def greet(world="world"):
    print "Hello," + world + "."
greet()
greet("white") 

#7-7定义可变参数
#如果想让一个函数接收任意个参数，我们就可以定义一个可变参数：
def fn(*args):
    print args
#可变参数的名字前面有个 * 号，我们可以传入0个、1个或多个参数给可变参数：
fn()   #()
fn('a')  #('a',)
fn('a', 'b')
fn('a', 'b', 'c')  #('a', 'b', 'c')
#Python解释器会把传入的一组参数组装成一个tuple传递给可变参数，因此，在函数内部，直接把变量 args 看成一个 tuple 就好了。

#任务
#请编写接受可变参数的 average() 函数。
def average(*args):
    sum = 0.0
    if len(args) == 0:
        return sum
    for n in args:
        sum = sum + n
    return sum / len(args)

print average()
print average(1, 2)
print average(1, 2, 2, 3, 4)











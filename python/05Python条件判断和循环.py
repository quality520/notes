# -*- coding: utf-8 -*-
#05Python条件判断和循环
#5-1 if语句
score = 59
if score >= 60:
    print 'passed'
    print 'quality'
print 'END'
#tips:Python代码的缩进规则。具有相同缩进的代码被视为代码块。如果if语句判断为True，就会执行这个代码块
#缩进请严格按照Python的习惯写法：4个空格，不要使用Tab，更不要混合Tab和空格，否则很容易造成因为缩进引起的语法错误
#if语句后接表达式，然后用":"表示代码块开始



#5-2 if-else语句
#当if语句判断表达式的结果为True时，就会执行if包含的代码块
age = 20
if age >= 18:
    print 'adult'
else:
    print 'teenager'
#利用if……else……语句，我们可以根据条件表达式的值为True或者False，分别执行if代码块或者else代码块
#else后面加':'


#5-3 if……elif……else
#可以使用if...多个elif...else...的结构
score = 85
if score >= 90:
    print 'excellent'
elif score >= 80:
    print 'good'
elif score >= 60:
    print 'passed'
else:
    print 'failed'

#5-4for循环
#list或tuple可以表示一个集合。可以使用for循环一次将list或tuple的每个元素迭代出来：
L = ['Adam', 'Lisa', 'Bart']
for name in L:
    print name
#name这个变量是在for循环中定义的，意思是依次去除list中的每个元素，并赋值给name
s = [90,80,88,100]
sum = 0.0
for score in s:
    sum += score
print sum

#5-5 while 循环
#和for循环不同的另一种循环是while循环，while循环不会迭代list或tuple的元素，而是根据表达式判断循环是否结束
#比如要从0开始打印不大于N的整数：
N = 10
x = 0
while x < N:
    print x
    x = x + 1
#while循环每次先判断 x < N，如果为True，则执行循环体的代码块，否则，退出循环。
#在循环体内，x = x + 1 会让 x 不断增加，最终因为 x < N 不成立而退出循环。
#如果没有这一个语句，while循环在判断x<N时总是为True，就会无限循环下去，变成死循环，所以要特别留意while的退出条件
#任务 100以内奇数和
sum = 0
x = 1
n = 1
while x <= 100:
    sum += x
    n = n + 1
    x = 2*(n-1) + 1 
print sum


#5-6break退出循环
#用 for 循环或者 while 循环时，如果要在循环体内直接退出循环，可以使用 break 语句
#比如计算1至100的整数和，我们用while来实现
sum = 0
x = 1
while True:
    sum = sum + x
    x = x + 1
    if x > 100:
        break
print sum

#任务
#利用 while True 无限循环配合 break 语句，计算 1 + 2 + 4 + 8 + 16 + ... 的前20项的和。
sum = 0
x = 1
n = 1
while True:
    sum = sum + x
    n = n + 1
    x = 2 * x
    if n > 20:
        break
print sum


#5-7 continue继续循环
#在循环过程中，可以用break退出当前循环，还可以用continue跳过后续循环代码，继续下一次循环。
#利用for循环计算平均分
L = [75, 98, 59, 81, 66, 43, 69, 85]
sum = 0.0
n = 0
for s in L:
    sum = sum + s
    n = n + 1
print sum / n
#计算平均分时，将小于60分的剔除，我们就可以利用continue，当是<60时，不继续执行循环体的后续代码，直接进入下一个循环
L = [75, 98, 59, 81, 66, 43, 69, 85]
sum = 0.0
n = 0
for s in L:
    if s < 60:
        continue
    sum = sum + s
    n = n + 1
print sum / n

#计算100内奇数的和
sum = 0
x = 0
while True:
    x = x + 1
    if x > 100:
        break
    if x % 2: 
        sum = sum + x
    else:
        continue
print sum #==>2500


#5-8多重循环
#在循环内部，还可以嵌套循环，我们来看一个例子：
for x in ['A','B','C']:
    for y in ['1','2','3']:
        print x + y
#结果
#A1
#A2
#A3
#B1
#B2
#B3
#C1
#C2
#C3
#任务
#对100以内的两位数，请使用一个两重循环打印出所有十位数数字比个位数数字小的数，例如，23（2 < 3）。
#分析:十位数循环1~9，个位数循环0~9
for x in [1, 2, 3, 4, 5, 6, 7, 8, 9]:
    for y in [0,1, 2, 3, 4, 5, 6, 7, 8, 9]:
        if x < y:
            print x * 10 + y
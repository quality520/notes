# -*- coding:utf-8 -*-
#06Python Dict和Set类型
#6-1什么是dict
#list和tuple可以用来表示顺序集合
print ['Adam', 'Lisa', 'Bart']
print [95, 85, 59]
#但是，要根据名字找到对应的成绩，用两个list表示就不方便了。
#所以需要将名字和分数关联起来，组成类似的查找表
#'Adam' ==> 95
#'Lisa' ==> 85
#'Bart' ==> 59
#给定一个名字，就可以直接查到分数
#Python的dict就是专门干这件事的。用dict表示"名字"-"成绩"的查找表如下：
d = {
	'Adam' : 95,
	'Lisa' : 85,
	'Bart' : 59
}
print d
#我们把名字称为key，对应的成绩称为value,dict是通过key来查找value
#"{}"或括号表示这是一个dict,然后按照可以:value,写出来即可，最后一个key:value的逗号可以省略
#由于dict也是结合，len()函数可以计算任意集合的大小：
print len(d) #==>3
#tips:一个key-value算一个，因此，dict大小为3


#6-2访问dict
#dict可以简单的使用d[key]的形式来查找对应的value，这和list很像，不同之处是，list必须使用索引返回对应的元素，而dict使用key：
print d['Adam']
print d['Lisa']
print d['Bart']
#通过访问dict的value,只有key存在，dict就返回对应的value，如果key不存在，就直接报错：keyError
#要避免KeyError发生，有两个办法:
#一是先判断以下key是否存在，用in操作符：
if 'Paul' in d:
    print d['Paul']
#如果'Paul'不存在，if语句判断为False，自然不会执行print d['paul']，从而避免错误
#二是使用dict本身提供的一个get方法，在Key不存在的时候，返回None
print d.get('Bart') #==>59
print d.get('Paul') #==>None


#6-3 dict的特点
#第一个特点是查找速度快，无论dict有10个元素还是10万个元素，查找速度都一样。而list的查找的查号速度随着元素增加而逐渐下降
#不过dict的查找速度快不是没有代价的，dict的缺点是占用内存大，还会浪费很多内容，list正好相反，占用内存小，但是查找速度慢
#由于dict是按key查找，所以，在一个dict中，可以不能重复
#dict的第二个特点就是存储的key-value序对是没有顺序的！这和list不一样：
d = {
    'Adam': 95,
    'Lisa': 85,
    'Bart': 59
}
#当我们视图打印这个dict时：
print d
#打印的顺序不一定是我们创建时的顺序，而且，不同的机器打印的顺序都可能不同，这说明dict内部是无序的，不能用dict存储有序的集合。
#dict第三个特点是作为key的元素必须不可变，Python的基本类型如字符串、整数、浮点数都是不可变的，都可以作为key，但是list是可变的，就不能作为key
#不可变这个限制仅作用于key，value是否可变无所谓
{
    '123': [1, 2, 3],  # key 是 str，value是list
    123: '123',  # key 是 int，value 是 str
    ('a', 'b'): True  # key 是 tuple，并且tuple的每个元素都是不可变对象，value是 boolean
}
#任务
d = {
    95:'Adam',
    85:'Lisa',
    59:'Bart'
}


#6-4更新dict
#dict是可变的，也就是说，我们可以随时往dict中添加新的key-vlue
d = {
    'Adam': 95,
    'Lisa': 85,
    'Bart': 59
}
#要把新同学'paul'的成绩72加进去，用赋值语句：
d['Paul'] = 72
print d #==>{'Lisa': 85, 'Paul': 72, 'Adam': 95, 'Bart': 59}
#如果key已经存在，则赋值会用新的value替换原来的value
d['Adam'] = 100
print d #==>{'Lisa': 85, 'Paul': 72, 'Adam': 100, 'Bart': 59}


#6-5遍历dict
#由于dict也是一个集合，所以遍历dict和遍历list类似，都可以通过for循环实现
#直接使用for循环遍历dict的key
for key in d:
    print key
    print d[key]
#由于通过 key 可以获取对应的 value，因此，在循环体内，可以获取到value的值。
d = {
    'Adam': 95,
    'Lisa': 85,
    'Bart': 59
}
for name in d:
    print name,':',d[name]


#6-6什么是set
#dict的作用是建立一组key和一组value的映射关系，dict的key是不能重复的。
#有的时候，我们只想要 dict 的 key，不关心 key 对应的 value，目的就是保证这个集合的元素不会重复，这时，set就派上用场了。
#set持有一系列元素，这一点和list很像，list的元素将作为set的元素：
#创建set的方式是调用set()并传入一个list，list的元素将作为set的元素
s = set(['A','B','C','D'])
print s #==>set(['A', 'C', 'B', 'D'])
#因为set内部存储的元素是无序的，所以打印出来的顺序会有所不一样
#因为set不能包含重复的元素，所以，当我们传入包含重复元素的list，set将会自动去掉重复的元素
s = set(['A', 'B', 'C', 'C'])
print s
print len(s)

#6-7访问set
#由于set存储的是无序集合，所以我们没法通过索引来访问
#访问set中的某个元素实际上就是判断一个元素是否在set中
s = set(['Adam', 'Lisa', 'Bart', 'Paul'])
#我们可以用in操作符判断：
#Bart是该班的同学吗？
'Bart' in s #==>True
#Bill是该班的同学吗？
'Bill' in s #==>False
#bart是该班的同学吗？
'bart' in s #==>False
#区分大小写



#6-8 set的特点
#set的内部结构和dict很像，唯一区别是不存储value，因此，判断一个元素是否在set中速度最快
#set存储的元素和dict的key类似，必须是不变对象，因此，任何可变对象是不能放入set中的
#最后，set存储的元素也是没有顺序的。
#set的这些特点，可以应用在哪些地方呢？
#假设我们让用户输入星期一至星期日的某天，如何判断用户的输入是否是一个有效的星期呢？
#可以用if语句判断，但这样做非常繁琐
x = '???' # 用户输入的字符串
if x!= 'MON' and x!= 'TUE' and x!= 'WED' and x!='THU' and x!='FRI' and x!='SAT' and x!= 'SUN':
    print 'input error'
else:
    print 'input ok'

#如果实现创建好一个set，包含'MON'~'SUN'
weekdays = set(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'])
#判断输入
x = '???'
if  x in weekdays:
    print 'input error'
else:
    print 'input ok'


months = set(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
x1 = 'Feb'
x2 = 'Sun'

if x1 in months:
    print 'x1: ok'
else:
    print 'x1: error'

if x2 in months:
    print 'x2: ok'
else:
    print 'x2: error'


#6-9遍历set
#由于 set 也是一个集合，所以，遍历 set 和遍历 list 类似，都可以通过 for 循环实现。
#直接使用for循环可以遍历set的元素：
s = set(['Adam', 'Lisa', 'Bart'])
for name in s:
    print name
#注意: 观察 for 循环在遍历set时，元素的顺序和list的顺序很可能是不同的，而且不同的机器上运行的结果也可能不同。
#任务
#请用 for 循环遍历如下的set，打印出 name: score 来。

s = set([('Adam', 95), ('Lisa', 85), ('Bart', 59)])
for x in s:
    print x[0],':',x[1]

#6-10更新set
#由于set存储的是一组不重复无序元素，因此，更新set主要做两件事：
#一是把新的元素添加到set中，而是把已有元素从set中删除。
#添加元素时，用set的add()方法
s = set([1,2,3])
s.add(4)
print s
#如果添加的元素已经存在set中，add()不会报错，但是不会加进去
s = set([1,2,3])
s.add(3)
print s
#删除set中的元素是，用set的remove()方法
s = set([1,2,3])
s.remove(1)
print s
#如果删除的元素不再set中，remove()会报错
s = set([1,2,3,4])
#s.remove(5)
#Traceback (most recent call last):
#  File "<stdin>", line 1, in <module>
#KeyError: 4
#所以用add()可以直接添加，而remove()前需要判断。
#任务
#针对下面的set，给定一个list，对list中的每一个元素，如果在set中，就将其删除，如果不在set中，就添加进去。
s = set(['Adam', 'Lisa', 'Paul'])
L = ['Adam', 'Lisa', 'Bart', 'Paul']
for name in L:
    if name in s:
        s.remove(name)
    else:
        s.add(name)
print s



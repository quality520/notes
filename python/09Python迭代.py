# -*- coding:utf-8 -*-
# 9-1什么是迭代
# 在Python中，如果给定一个list和tuple，我们可以通过for循环来遍历这个list或tuple，这种遍历我们称为迭代(Iteration)
# 在Python中，迭代是通过for...in来完成的，而很多语言比如c语言或者java，迭代list是通过下标来完成的，比如Java代码：
#for(i=0;i<list.length;i++){
#    n = list[i];
#}
#可以看出，Python的for循环抽象程度高于java的for循环
#因为Python中for循环不仅可以用于list或tuple上，还可以作用于其他任何可迭代对象上
#因此，迭代操作就是对于一个集合，无论该集合是有序还是无序，我们用for循环总是可以一次取出集合的每一个元素
#tips；集合是指包含一组元素的数据结构，我们已经介绍的包括：
#有序集合：list、tuple、str和unicode
#无序集合：set
#无需集合并且具有key-value对：dict
#而迭代是一个动词，它指的是一种操作，在python中，就是for循环
#迭代与按下标访问数组最大的不同是：后者是一种具体的迭代实现方式，而前者只关心迭代结果，根本不关心迭代内部是如何实现的。
#任务
#请用for循环迭代数列1-100并打印出7的倍数
n = range(1,101)
for i in n:
    if (i%7)==0:
        print i


#9-2索引迭代
#python中，迭代永远是取出元素本身，而非元素的索引
#对于有序集合，元素是有索引的，有时候，我们确实想在for循环中拿到索引，怎么办？
#方法是使用enumerate()函数
L = ['Adam','Lisa','Bart','Paul']
for index,name in enumerate(L):
    print index,'-',name;
#result:
#0 - Adam
#1 - Lisa
#2 - Bart
#3 - Paul

#通过enumerate()函数，我们可以在for循环中同时绑定索引index和元素那么。
#但是，这不是enumerate()的特殊语法，实际上，enumerate()函数把:
['Adam','Lisa','Bart','Paul']
#变成了
[(0,'Adam'),(1,'Lisa'),(2,'Bart'),(3,'Paul')]
#因此，迭代每一个元素实际上是一个tuple：
for t in enumerate(L):
    index = t[0]
    name = t[1]
    print index,'-',name
#如果我们知道每个tuple元素都包含两个元素，for循环又可以进一步简写为：
for index ,name in enumerate(L):
    print index,'-',name
#这样不但代码更简单，而且还少了两条赋值语句。
#可见，索引迭代也不是真的按索引访问，而是由 enumerate() 函数自动把每个元素变成 (index, element) 这样的tuple，再迭代，就同时获得了索引和元素本身。

#任务
#zip()函数可以把两个 list 变成一个 list：
zip([10, 20, 30], ['A', 'B', 'C'])
#[(10, 'A'), (20, 'B'), (30, 'C')]
#在迭代 ['Adam', 'Lisa', 'Bart', 'Paul'] 时，如果我们想打印出名次 - 名字（名次从1开始)，请考虑如何在迭代中打印出来。
#提示：考虑使用zip()函数和range()函数
L = ['Adam', 'Lisa', 'Bart', 'Paul']
for index, name in zip(range(1,len(L)+1),L):
    print index, '-', name

#9-3 迭代dict的value
#我们已经了解了dict对象本身就是可迭代对象，用 for 循环直接迭代 dict，可以每次拿到dict的一个key。
#如果我们希望迭代 dict 对象的value，应该怎么做？
#dict 对象有一个 values() 方法，这个方法把dict转换成一个包含所有value的list，这样，我们迭代的就是 dict的每一个 value：
d = { 'Adam': 95, 'Lisa': 85, 'Bart': 59 }
print d.values() #[85, 95, 59]
for v in d.values():
    print v
#dict除了values()方法外，还有一个itervalues()方法，用itervalues()方法替代values()方法，迭代效果完全一样：
d = { 'Adam': 95, 'Lisa': 85, 'Bart': 59 }
print d.itervalues() #[85, 95, 59]
for v in d.itervalues():
    print v
#那这两个方法有何不同之处呢？
#1. values() 方法实际上把一个 dict 转换成了包含 value 的list。
#2. 但是 itervalues() 方法不会转换，它会在迭代过程中依次从 dict 中取出 value，所以 itervalues() 方法比 values() 方法节省了生成 list 所需的内存。
#3. 打印 itervalues() 发现它返回一个 <dictionary-valueiterator> 对象，这说明在Python中，for 循环可作用的迭代对象远不止 list，tuple，str，unicode，dict等，任何可迭代对象都可以作用于for循环，而内部如何迭代我们通常并不用关心。
#如果一个对象说自己可迭代，那我们就直接用 for 循环去迭代它，可见，迭代是一种抽象的数据操作，它不对迭代对象内部的数据有任何要求。
#任务
#给定一个dict：
#d = { 'Adam': 95, 'Lisa': 85, 'Bart': 59, 'Paul': 74 }
#请计算所有同学的平均分。
d = { 'Adam': 95, 'Lisa': 85, 'Bart': 59, 'Paul': 74 }
sum = 0.0
for s in d.values():
    print 's',s
    sum = sum + s
print 'ave',sum/len(d)


#9-4 迭代dict的key和value
#我们了解了如何迭代 dict 的key和value，那么，在一个 for 循环中，能否同时迭代 key和value？答案是肯定的。
#首先，我们看看 dict 对象的 items() 方法返回的值：
d = { 'Adam': 95, 'Lisa': 85, 'Bart': 59 }
print d.items() #[('Lisa', 85), ('Adam', 95), ('Bart', 59)]
#可以看到，items() 方法把dict对象转换成了包含tuple的list，我们对这个list进行迭代，可以同时获得key和value：
for key,value in d.items():
    print key,":",value
#Lisa : 85
#Adam : 95
#Bart : 59
#和 values() 有一个 itervalues() 类似， items() 也有一个对应的 iteritems()，iteritems() 不把dict转换成list，而是在迭代过程中不断给出 tuple，所以， iteritems() 不占用额外的内存。
#任务
#请根据dict：
#d = { 'Adam': 95, 'Lisa': 85, 'Bart': 59, 'Paul': 74 }
#打印出 name : score，最后再打印出平均分 average : score。
d = { 'Adam': 95, 'Lisa': 85, 'Bart': 59, 'Paul': 74 }
sum = 0.0
for name ,score in d.items():
    sum = sum + score
    print name ,":", score
print 'average',":",sum/len(d)










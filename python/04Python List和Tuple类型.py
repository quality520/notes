# -*- coding: utf-8 -*-
#第4章 Python List和Tuple类型.py
#4-1创建list
#Python内置的一种数据类型是列表:list。list是一种有序的集合，可以随时添加和删除其中的元素。
#比如，列出班里所有同学的名字，就可以用一个list表示：
print ['white','quality','slicely']
#list是数学意义上的有序集合，也就是说，list中的元素是按照顺序排列的。
#list格式： 直接用[]把list的所有元素括起来，就是一个list对象
classmates = ['white','quality','slicely']
print classmates
#由于Python是动态语言，所以list中包含的元素并不要求都必须是同一个数据类型
L = ['white',100,True]
print L
#一个元素也没有的list，就是空list
emptyList = []
#任务
#假设班里有3名同学：Adam，Lisa和Bart，他们的成绩分别是 95.5，85 和 59，请按照 名字, 分数, 名字, 分数... 的顺序按照分数从高到低用一个list表示，然后打印出来。
point = ['Adam',95,'Lisa',85,'Bart',59]
print point


#4-2按照索引访问list
#由于list是一个有序集合，所以我们可以用一个list按分数从高到低表示班里的3个同学；
pointL = ['white','quality','slicely']
print pointL
#通过索引来获取list中的指定元素
#tips，索引从0开始，第一个元素的索引是0，第二个元素的索引是1，以此类推
#要打印第一名同学的名字，用pointL[0]
print pointL[0]
#要打印第二名同学的名字，用pointL[1]
print pointL[1]
#要打印第三名同学的名字，用pointL[2]
print pointL[2]
#要打印第四名同学的名字，用 pointL[3]
#print pointL[3] 
#报错了，超过索引范围 IndexError: list index out of range



#4-3倒序反问list
#最后一个元素的索引为2
print pointL[2]
#更简便的方法，倒数第一 -1
print pointL[-1]
#倒数第二用 -2表示，以此类推
print pointL[-2]
print pointL[-3]

#4-4添加新元素
classmates = ['white','quality','silencly']
#新增一个元素
#第一个办法是用list的append()方法，把新元素追加到list的末尾
classmates.append('wine')
print classmates
#append()总是将新的元素添加到list的尾部
#第二种方法使用list的insert()方法，它接受两个参数，第一个参数是索引号，第二个参数是待添加的新元素
cm = ['white','quality','silencly']
cm.insert(0,'wine')
print cm
cm.insert(1,'quaility')
print cm
#cm.insert(0, 'wine') 的意思是，'wine'将被添加到索引为 0 的位置上（也就是第一个），而原来索引为 0 的white同学，以及后面的所有同学，都自动向后移动一位。


#4-5从list删除元素
#删除list的最后一个元素，可以使用lsit的pop()方法
cm = ['white','quality','silencly']
cm.pop()
print cm
#pop()方法总是删掉list的最后一个元素，并且它还返回这个元素
#想要删除list中间的元素如何操作呢？
#使用pop()方法传入一个索引参数pop(1) 
cm.pop(0)#删除第一个元素
print cm
#任务
#注意右边编辑器代码中 list 如下：
L = ['Adam', 'Lisa', 'Paul', 'Bart']
#Paul的索引是2，Bart的索引是3，如果我们要把Paul和Bart都删掉，请解释下面的代码为什么不能正确运行：
#L.pop(2)
#L.pop(3)
#print L
#怎样调整代码可以把Paul和Bart都正确删除掉？
#运行结果为超过范围，更改顺序就可以执行了。
L.pop(3)
L.pop(2)
print L


#4-6替换元素
#第一种方法，可以先删除一个元素，再添加一个元素
L = ['Adam', 'Lisa', 'Paul', 'Bart']
L.pop(1)
L.insert(1,'white')
print L
#第二种方法，直接用white替换lisa
L = ['Adam', 'Lisa', 'Paul', 'Bart']
L[1] = 'white'
print L
#对list中的某一个索引赋值，就可以直接用新的元素替换掉原来的元素，list包含的元素个数保持不变。
#也可以使用负数索引



#4-7创建tuple
#tuple是另一种有序的列表，中文翻译为“元组”
#tuple和list非常类似，但是tuple一旦创建完毕，就不能修改
#创建tuple
t = ('Adam', 'Lisa', 'Paul', 'Bart')
#创建tuple和创建list唯一不同之处使用"()"替代了"[]"
#现在t就不能改变了，tuple没有append()方法，也没有insert()、pop()方法
#获取tuple元素的方式和list的一模一样，通过索引
#t[0]/t[-1]等索引方式访问元素
print t

#4-8创建但元素tuple
#tuple和list一样，可以包含0个、1个和任意多个元素
#包含0个元素的tuple，也就是空tuple，直接用()表示：
t = ()
pritn t
#创建1个元素的tuple呢？
t = (1)
print t #==>1
#why,为什么返回1而不是tuple呢？
#因为()既可以是表示tuple，又可以作为括号表示运算时的优先级
#结果(1)被Python解释器计算出结果1，导致得到的不是tuple，而是整数1
#避免上述情况发生，使用下列方式创建单个元素tuple
t = (1,)  #多加一个","
print t #==>(1,)

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


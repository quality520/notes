#-*- coding:utf-8-*-
#Python 切片
#8-1对list进行切片
#去一个list的部分元素都是非常常见的的操作：
L = ['white','quality','wine']
#取前3个元素
#笨方法
print L[0]
print L[1]
print L[2]
#要是想取前N个元素该如何呢？
#使用for循环，取前N个元素，也就是索引为0-(N-1)的元素：
#取前三个元素
r = []
n = 3
for i in range(n):
    r.append(L[i])
    print r ,"hello"
print r #['white', 'quality', 'wine']

#Python提供了切片(slice)操作符，能大大简化这种操作。
#取前3个元素
print L[0:3] #['white', 'quality', 'wine']
#L[0:3]表示，从索引0开始取，直到索引3为止，但不包括索引3。即索引0，1，2，正好是3个元素
#如果第一个索引是0，还可以省略
print L[:3]
#也可以从索引1开始，取出2个元素来：
print L[1:3] #['quality', 'wine']
#只用一个:，表示从头到尾巴
print L[:] #['white', 'quality', 'wine']

#切片操作还可以指定第三个参数：
print L[::2] #['white', 'wine']
#第三个参数表示每N个取一个，上面的L[::2]会每两个元素取出一个来，也就隔一个取一个
#把list换成tuple，切片操作完全相同，只是切片的结果变成tuple。
#range()函数可以创建一个数列
print range(1,101)
#
List = range(1, 101)

print List[:10]
for i in List:
    if i%3==0:
        print i
print List[2::3]
print List[4:50:5]

#任务
#range()函数可以创建一个数列：
range(1, 101) #[1, 2, 3, ..., 100]
#请利用切片，取出：
#1. 前10个数；
#2. 3的倍数；
#3. 不大于50的5的倍数。
L = range(1, 101)

print L[:10]
print L[2::3]
print L[4:50:5]

#8-2倒序切片
#对于list，既然Python支持L[-1]取倒数第一个元素，那么它同样支持倒数切片，试试：
L = ['Adam', 'Lisa', 'Bart', 'Paul']
print L[-2:]
print L[:-2]
print L[-3:-1]
print L[-4:-1:2]
#记住倒数第一个元素的索引是-1，倒序切片包含起始索引，不包含结束索引
#任务
#利用倒序切片对 1 - 100 的数列取出：
#* 最后10个数；
#* 最后10个5的倍数。
A = range(1,101)
print A[-10:]
print A[-46::5]

#8-3对字符串切片
#字符串 'xxx'和 Unicode字符串 u'xxx'也可以看成是一种list，每个元素就是一个字符。因此，字符串也可以用切片操作，只是操作结果仍是字符串：
#
print 'ABCDEFG'[:3] #'ABC'
print 'ABCDEFG'[-3:] #'EFG'
print 'ABCDEFG'[::2] #'ACEG'
#在很多编程语言中，针对字符串提供了很多各种截取函数，其实目的就是对字符串切片。Python没有针对字符串的截取函数，只需要切片一个操作就可以完成，非常简单。
#任务
#字符串有个方法 upper() 可以把字符变成大写字母：
print 'abc'.upper() #'ABC'
#但它会把所有字母都变成大写。请设计一个函数，它接受一个字符串，然后返回一个仅首字母变成大写的字符串。
#提示：利用切片操作简化字符串操作。
def firstCharUpper(s):
    First = s[:1].upper()
    World = First + s[1:]
    return World
print firstCharUpper('hello');



# -*- coding:utf-8 -*-
#Python入门
#
#
#
#
#



#3-7 Unicode字符串
#Python对unicode的支持，以Unicode表示的字符串用u'...'表示，比如：
print u'中文'
#=>中文
#tips:不加u，中文就不能正常显示了。
#Unicode字符串除了多了一个"u"之外，与普通字符串没啥区别，转义字符和多行表示法仍然有效：
#转义字符
print u'中文\n日文\n韩文'
#多行
print u'''第一行
第二行'''
#raw+多行
print ur'''Python的Unicode字符串支持"中文",
"日文",
"韩文"等多种语言'''
#如果中文字符串中在Python环境下遇到UnicodeDecodeError，这是英文.py文件保存的格式有问题。可以在第一行添加注释
# -*- coding: utf-8 -*-
# 目的是告诉Python解释器，用UTF-8编码读取源代码，然后用编辑器另存为...并选择UTF-8格式保存
#任务
# -*- coding: utf-8 -*-
# -*- coding: utf-8 -*-
print u'''静夜思
窗前明月光，
疑是地上霜。
举头望明月，
低头思故乡。''' 

#3-8整数和浮点数
#Python支持对整数和浮点数直接进行size混合运算，运算规则和数学上的四则运算完全一致。
#基本的运算:
print 1 + 2 + 3 #==>6
print 4 * 5 - 6 #==>14
print 7.5 / 8 + 2.1 #==>3.0375
#使用括号可以提升优先级，这和数学运算完全一致，注意只能使用小括号，但是括号可以嵌套很多层:
print (1 + 2) * 3 #==>9
print (2.2 + 3.3) / (1.5 * (9 - 0.3)) #==>0.42145593869731807
#和数学运算不同的地方是，Python的整数运算结果仍然是整数，浮点数运算结果仍然是浮点数:
print 1 + 2 #==>整数3
print 1.0 + 2.0 #==>浮点数3.0
#但是整数和浮点数混合运算的结果就是变成浮点数了:
print 1 + 2.0 #==>浮点数3.0

#为什么要区分整数运算和浮点数运算呢？这是因为整数运算的结果永远是精确的，而浮点数运算的结果不一定精确，因为计算机内存再大，也无法精确表示出无限循环小数，比如 0.1 换成二进制表示就是无限循环小数。
#取模 /
print 11 / 4 #==>2
#Python的整数除法，即使除不尽，结果仍然是整数，余数直接被扔掉
#取余 % Python提供了一个求余的运算符% 可以计算余数
print 11 % 4 #==>3
#如果我们要计算11/4的精确结果，按照“整数和浮点数混合运算的结果是浮点数”的原则，把两个数中的一个变成浮点数再运算就没问题了：
print 11.0 / 4 #==>2.75

#任务
#请计算 2.5 + 10 / 4 ,并解释计算结果为什么不是期望的 5.0 ?
print 2.5 + 10 / 4
print 2.5 + 10.0 / 4



#3-9布尔类型
#布尔类型只由“True”和“False”两种值，但是布尔类型有以下几种运算：
#与运算：只由两个布尔值都为True时，计算结果才为True。
print True and True  #==>True
print True and False  #==>False
print False and True  #==>False
print False and False  #==>False
#或运算：只要有一个布尔值为True，计算结果就是True
print True or True #==>True
print True or False #==>True
print False or True #==>True
print False or False #==>False
#非运算：把True变为False，或者False变为True
print not True #==>False
print not False #==>True
#布尔运算在计算机中用来条件判断，根据计算结果为True或False，计算机可以自动执行不同的后续代码
#在Python中，布尔类型还可以与其他数据类型做and/or和not运算：
a = 'True'
print a and 'a = T' or 'a=F'
#计算结果不是布尔类型，而是字符串'a = T',这是为什么呢？
#因为Python把0、空字符串和None看成False，其他数值和非空字符串都看成True，所以：
True and 'a = T' #计算结果是 'a = T'
#继续计算  'a = T' or 'a = F'计算结果还是 'a = T'
#要解释上述结果，又涉及到and和or运算的一条重要法则:
#短路计算
#1,在计算 a and b 时，如果a是False，则根据与运算法则，这个结果必定为False，因此返回a；如果
#a是True，、则整个计算结果必定取决于b，因此返回b。
#2,在计算 a or b时，如果a是True，则根据或运算法则，这个结果必定为True，因此返回a；如果a是
#False，则整个计算结果必定取决于b，因此返回b
#所以Python解释器在做布尔运算时，只要能提前确定计算结果，它就不会往后算了，直接返回结果。
a = 'python'
print 'hello',a or 'world'
b = ''
print 'hello',b or 'world'
#执行a时a不为''所以为True，返回a
#执行b时b为'',所以为False,返回world
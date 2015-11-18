#BOM
    BOM(Bowser Object Model)浏览器对象模型
####1,window对象
    BOM的核心对象时window,它表示浏览器的一个实例。
    window对象处于javascript结构的最顶层，
    对于每个打开的窗口，系统都会自动为其定义window对象。
######window对象的属性:
    	document(窗口中当前显示的文档对象):
    	  document对象的五大对象
	    		anchors
	    		forms
	    		images
	    		links
	    		location
    	frames(窗口中的框架对象数组),
    	history(保存有窗口最近加载的URL),
    	location(当前窗口的URL),
    	navigator,
    	screen



    	close(当窗口关闭时为真)
    	defaultStatus(窗口底部状态栏显示的默认状态消息)
    	name(窗口名)
    	offscreenBuffering(用于绘制新窗口内容并在
    		完成后复制已存在的内容，控制屏幕更新)
    	opener(打开当前窗口的窗口)
    	parent(指向包含另一个窗口的窗口(由框架使用))
    	top(包含特定窗口的最顶层窗口(由框架使用))
    	self(指示当前窗口)
    	status(描述由用户交互导致的状态栏的临时消息)
    	window(指示当前窗口，与self等效)
######window对象的方法
    alert(text)创建一个警告对话框,显示一条信息
    blur()将焦点从窗口移除
    focus()将焦点移至窗口
    clearInterval(interval)清除之前设置的定时器间隔
    clearTimeOut(timer)清除之前设置的超时
    setInterval(expression,milliseconds)经过指定时间间隔计算一个表达式
    setInterval(expression,milliseconds,[arguments])
    经过指定时间间隔后调用一个函数
    setTimeout(expression,milliseconds)在定时器超过后调用一个函数
    setTimeout(expression,milliseconds,[argument])
    在定时器超过时后计算一个函数
    close()关闭窗口
    confirm()创建一个需要用户确认的对话框
    open(url,name,[options]) 打开一个新窗口并返回新window对象
    open方法中options参数可以设置：
    	width:新窗口宽度,不能小于100;
    	height:新窗口高度,不能小于100;
    	top:新窗口的Y坐标，不能是负值;
    	left:新窗口的X坐标,不能时负值;
    	location:(yes or no)是否在浏览器窗口中显示地址栏。
    	menubar:(yes or no)是否在浏览器窗口显示菜单栏,默认为no
    	resizable:(yes or no)是否可以通过拖动浏览器窗口
    	的边框改变大小，默认为no
    	scrollbars:(yes or no)如果内容在页面中显示不下，是否允许
    	滚动，默认为no
    	status:(yes or no)是否在浏览器窗口中显示状态栏，默认为no
    	toolbar:(yes or no)是否在浏览器窗口中显示工具栏，默认为no
    	fullscreen:(yes or no)浏览器窗口是否最大化，仅限IE
    open方法第四个参数:
    	_blank,新建
    	_parent,在本窗口打开
    	_top
    prompt(text,defaultInpt)创建一个对话框要求用户输入信息
    scroll(x,y)在窗口中滚动到一个像素点的位置
    print()调用打印对话框
    find()调用查找对话框

    window的属性和方法的调用:window.Attribute、window.方法()
    也可以直接Attribute、方法





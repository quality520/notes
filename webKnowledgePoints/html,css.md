html
1,对前端标准的理解

2，浏览器内核差异

3，兼容性

4，hack

css
1，布局
	1)、display:none和visibility:hidden的区别？
		display:none  隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素会合拢，
		就当他从来不存在。
		visibility:hidden  隐藏对应的元素，但是在文档布局中仍保留原来的空间。
	2)、CSS中 link 和@import 的区别是？
		(1) link属于HTML标签，而@import是CSS提供的; 
		(2)页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;
		(3) import只在IE5以上才能识别，而link是HTML标签，无兼容问题; 
		(4) link方式的样式的权重 高于@import的权重.
	3)、position的absolute与fixed共同点与不同点
		A：共同点：
			1.改变行内元素的呈现方式，display被置为block；
			2.让元素脱离普通流，不占据空间；
			3.默认会覆盖到非定位元素上
		B不同点：
			absolute的“根元素”是可以设置的(相对与父元素进行定位)，而fixed的“根元素”固定为浏览器窗口。当你滚动网页，fixed元素与浏览器窗口之间的距离是不变的。 
	(4)、列出display的值，说明他们的作用。   
		  block 象块类型元素一样显示。
		  inline 缺省值。象行内元素类型一样显示。
		  inline-block 象行内元素一样显示，但其内容象块类型元素一样显示。
		  list-item 象块类型元素一样显示，并添加样式列表标记。

2，盒子模型
	1)介绍一下CSS的盒子模型？
		(1)有两种， IE 盒子模型、标准 W3C 盒子模型；IE的content部分包含了 border 和 pading;
		(2)盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border).
3，选择器
	1)CSS 选择符有哪些？哪些属性可以继承？优先级算法如何计算？ 
		1.id选择器（ # myid）
        2.类选择器（.myclassname）
        3.标签选择器（div, h1, p）
        4.相邻选择器（h1 + p）
        5.子选择器（ul > li）
        6.后代选择器（li a）
        7.通配符选择器（ * ）
        8.属性选择器（a[rel = "external"]）
        9.伪类选择器（a: hover, li:nth-child）

	    *   可继承的样式： font-size font-family color, text-indent;
	    *   不可继承的样式：border padding margin width height ;
	    *   优先级就近原则，同权重情况下样式定义最近者为准;
	    *   载入样式以最后载入的定位为准;
		优先级为:
		   !important >  id > class > tag  
		   important 比 内联优先级高,但内联比 id 要高
		http://www.w3school.com.cn/cssref/css_selectors.asp
	(2)CSS3新增伪类有那些？
		p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
		p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
		p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
		p:only-child    选择属于其父元素的唯一子元素的每个 <p> 元素。
		p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。
		:nth-last-child(n)	p:nth-last-child(2)	从最后一个子元素开始计数。
		:last-child	p:last-child	选择属于其父元素最后一个子元素每个 <p> 元素。
		:root	:root	选择文档的根元素。
		:empty	p:empty	选择没有子元素的每个 <p> 元素（包括文本节点）。
		:target	#news:target	选择当前活动的 #news 元素。
		:not(selector)	:not(p)	选择非 <p> 元素的每个元素。
		::selection	::selection	选择被用户选取的元素部分。
		:enabled  :disabled 控制表单控件的禁用状态。
		:checked        单选框或复选框被选中。
		element1~element2	p~ul	选择前面有 <p> 元素的每个 <ul> 元素。
		[attribute^=value]	a[src^="https"]	选择其 src 属性值以 "https" 开头的每个 <a> 元素。
		[attribute$=value]	a[src$=".pdf"]	选择其 src 属性以 ".pdf" 结尾的所有 <a> 元素。
		[attribute*=value]	a[src*="abc"]	选择其 src 属性中包含 "abc" 子串的每个 <a> 元素。
5，css3
	(1)、新属性
		CSS3实现圆角（border-radius），阴影（box-shadow），
		对文字加特效（text-shadow、），线性渐变（gradient），旋转（transform）
		transform:rotate(9deg) scale(0.85,0.90) translate(0px,-30px) skew(-9deg,0deg);//旋转,缩放,定位,倾斜
		增加了更多的CSS选择器  多背景 rgba 
		在CSS3中唯一引入的伪元素是::selection.
		媒体查询，多栏布局
		border-image

html5+css3
1,html5新定义的语意话标签

2,html5新增标签
canvas

geolocation


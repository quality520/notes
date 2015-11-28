#DOM操作表格与样式
####js操作dom
    var table = document.createElement('table');
    table.width = 400;
    table.setAttribute('border',1);
    var tr = document.createElement('tr');
    table.appendChild(tr);
    var th = document.createElement('th');
    tr.appendChild(th);
    var text = document.createTextNode('abc');
    th.appendChild(text)
####HTML DOM中，给表格元素提供了一些属性和方法
    属性或方法    说明
    caption         保存着<caption>元素的引用
    tBodies         保存着<tbody>元素的HTMLCollection集合
    tFoot           保存着对<tfoot>元素的引用
    tHead           保存着对<thead>元素的引用
    rows            保存着对<tr>元素的HTMLCollection集合
    createTHead()   创建<thead>元素，并返回引用
    createTFoot()   创建<tfoot>元素，并返回引用
    createCaption()  创建<caption>元素，并返回引用
    deleteTHead()    删除<thead>元素
    deleteTFoot()    删除<tfoot>元素
    deleteCaption()  删除<caption>元素
    deleteRow(pos)   删除指定的行
    insertRow(pos)   向rows集合中的指定的位置插入一行

    <tbody>元素添加的属性和方法
    属性或方法      说明
    rows            保存着<tbody>元素中行的HTMLCollection
    deleteRow(pos)  删除指定位置的行
    insertRow(pos)  向rows集合中的指定位置插入一行，并返回引用


    <tr>元素添加的属性和方法
    属性或方法       说明
    cells            保存着<tr>元素中单元格的HTMLCollection
    deleteCell(pos)  删除指定位置的单元格
    insertCell(pos)  向cells集合的指定位置插入一个单元格，并返回引用


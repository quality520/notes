#svg
    基于XML
####基本图形和属性
    基本图形：
      <rect>(矩形)/<circle>(原型)/<ellipse>(椭圆)/<line>(直线)/<polyline>(折线)/<polygon>(多边形)
    基本属性
      fill(填充)/stroke(线颜色)/stroke-width(线宽度)/transform(变换)
#####<rect>矩形
    x:x坐标(左上角)
    y:y坐标(左上角)
    width:矩形宽度
    height:矩形高度
    rx:定义矩形的圆角x值
    ry:定义矩形的圆角y值
#####<circle>圆
    cx:圆心x值
    cy:原型y值
    r:半径
#####<ellipse>椭圆
    cx:圆心x值
    cy:圆心y值
    rx:圆角x值
    ry:圆角y值
#####<line>直线
    x1:起点x坐标
    y1:起点y坐标
    x2:终点x坐标
    y2:终点y坐标
#####<polyline>折线
    points
      格式(xi,yi)+
    points="x1 y1 x2 y2 x3 y3 x4 y4"
#####<polygon>多边形
    在折线基础上来了个闭合
    points
      格式(xi,yi)+
    points="x1 y1 x2 y2 x3 y3 x4 y4"
####填充、描边和变换
    fill
    stroke
    stroke-width
    transform
      fill = #FFB3AE
      stroke = #971817
      strokeWidth = 10
      transform = "rotate(30)"
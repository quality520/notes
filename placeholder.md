<input type="text" placeholder="输入您的手机号码">
更改placeholder字的颜色
example
input::-webkit-input-placeholder,
input::-moz-input-placeholder,
input::-o-input-placeholder{
color:#dcdcdc;
}
li:first-child{}
li:last-child{}

使用js/jQ动态的更改placeholder的内容
jQ:$(".className").click(function(){
    $("input").attr("placeholder","hello world!");
})

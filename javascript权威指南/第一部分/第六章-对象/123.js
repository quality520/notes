$(function(){
    $('.subBtn').click(function(){
        checkUserName();
    });

    $('.telNumber').blur(function(){
        checkMobile($('.telNumber').val());
    });


    $(".submit").click(function(){
        $.ajax({
            type:'GET',
            url:"http://192.168.10.53:8811/driverService.ashx?action=wzFreeCount&CellPhone="+ $('.telNumber').val(),
            dataType:'jsonp',
            success:function(data){
                if(data.IsSuccess == true){
                    $('.telPhone').html($('.telNumber').val());
                    $('.count').html(data.Rseult.FreeCount);
                }else{
                    alert(data.ErrorMsg);
                }
            },
            error:function(){
                alert('查询失败！');
            }
        });
    });
})





//手机号码验证函数
function checkMobile(str){
    var reg = /^((?:13\d|14\d|15[\d]|17[\d]|18[\d])-?\d{5}(\d{3}|\*{3}))$/;
    if(!reg.test(str)){
        alert("手机号码错误，请重新输入额~~");
    }
}

//用户名密码验证
function checkUserName(){
    if($('.userName').val() != '' || $('.passWord').val() != ''){
        if($('.userName').val() == 'admin' && $('.passWord').val()=='admin'){
            window.location.href = './query.html';
        }else{
            alert('用户名，密码错误！');
        }
    }
    else{
        alert('用户名、密码不能为空~');
    }
}
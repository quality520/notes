/**
 * Created by Rayr Lee on 2015/11/13 0013.
 */
//时间倒计时
var wait = 60;
function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.value = "获取验证码";
        wait = 60
    } else {
        o.setAttribute("disabled", true);
        o.value = wait + "秒后获取";
        wait--;
        setTimeout(function () {
                time(o)
            },
            1000)
    }
}


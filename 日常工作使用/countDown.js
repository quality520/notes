/**
 * Created by Rayr Lee on 2015/11/13 0013.
 */
//ʱ�䵹��ʱ
var wait = 60;
function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.value = "��ȡ��֤��";
        wait = 60
    } else {
        o.setAttribute("disabled", true);
        o.value = wait + "����ȡ";
        wait--;
        setTimeout(function () {
                time(o)
            },
            1000)
    }
}


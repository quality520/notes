//�ж�ʱ���С
function validTime(startTime, endTime) {
    var arr1 = startTime.split("-");
    var arr2 = endTime.split("-");
    var date1 = new Date(parseInt(arr1[0]), parseInt(arr1[1]) - 1, parseInt(arr1[2]), 0, 0, 0);
    var date2 = new Date(parseInt(arr2[0]), parseInt(arr2[1]) - 1, parseInt(arr2[2]), 0, 0, 0);
    if (date1.getTime() > date2.getTime()) {
        return false
    } else {
        return true
    }
    return false
}


function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//��ȡAddDayCount��������
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//��ȡ��ǰ�·ݵ�����
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
}
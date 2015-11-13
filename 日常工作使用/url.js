urlinfo = window.location.href; //获取当前页面的url
len = urlinfo.length;//获取url的长度
offset = urlinfo.indexOf("?");//设置参数字符串开始的位置
newsidinfo = urlinfo.substr(offset, len)//取出参数字符串 这里会获得类似“id=1”这样的字符串
offset1 = newsidinfo.indexOf("&");
newsidinfo1 = newsidinfo.substr(offset1, len);
newsids = newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割
newsids1 = newsidinfo1.split("=");
newsid = newsids[1].substr(0, 1);//得到参数值
newsid1 = newsids1[1].substr(0, 28);//得到参数值
newsname = newsids[0];//得到参数名字

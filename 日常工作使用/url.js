urlinfo = window.location.href; //��ȡ��ǰҳ���url
len = urlinfo.length;//��ȡurl�ĳ���
offset = urlinfo.indexOf("?");//���ò����ַ�����ʼ��λ��
newsidinfo = urlinfo.substr(offset, len)//ȡ�������ַ��� ����������ơ�id=1���������ַ���
offset1 = newsidinfo.indexOf("&");
newsidinfo1 = newsidinfo.substr(offset1, len);
newsids = newsidinfo.split("=");//�Ի�õĲ����ַ������ա�=�����зָ�
newsids1 = newsidinfo1.split("=");
newsid = newsids[1].substr(0, 1);//�õ�����ֵ
newsid1 = newsids1[1].substr(0, 28);//�õ�����ֵ
newsname = newsids[0];//�õ���������

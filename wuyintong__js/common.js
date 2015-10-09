;(function(_window){

    var obj={};

    obj["getChannelOrg"]=function(_func){
        $util.ajax.postJson({
            url: $config.base_url + "/channelOrg/findOrgs",
            data: {
                otype: 4
            },
            success: function (_rep) {
                if (_rep.success) {
                    _func(_rep);
                }
            }
        });
    };

    obj["showUploadError"]=function(_errors,_removeOld){
       var c=  $("#wyt_dialog_container .upload_message");
        if(_errors==null || _errors.length==0)
        {
            return;
        }

        if(_removeOld)
        {
            c.html("");
        }

        $(_errors).each(function(_i,_n){
           var div=  $("<div />");
            div.html(_n);
            div.appendTo(c);
        });
    };

    _window["$common"]=obj;

})(window);




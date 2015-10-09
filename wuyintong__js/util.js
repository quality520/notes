;(function(_window){

    var util={};

    /*字符串工具类*/
    util["string"]={
        format:function(args){
            var str=arguments[0], kv = arguments[1],reg;
            for (var k in kv) {
                reg = new RegExp("({)" + k + "(})", "g");
                str = str.replace(reg, kv[k]);
            }
            return str;
        }
    };

    /*数字工具类*/
    util["number"]={
        random:function(){
            return  parseInt((1+Math.random())*1000000);
        }
    };

    /*日期工具类*/
    util["date"]={

    };

    /*动画工具类*/
    var animate={
        /*设置网页卷去的高度为指定元素的top值*/
        scrollTop:function(elementSelector){
            var obj=Object.prototype.toString.apply(elementSelector)=="[object String]"?$(elementSelector):elementSelector;
            var top= obj.offset().top;
            $("body").animate({
                scrollTop:top
            },1000);
        },
        /*设置指定的元素居中显示*/
        alignCenter:function(element){
            var isAni=arguments[1] || false;
            var ch= document.body.clientHeight,
                cw=document.body.clientWidth ;

            var l=document.body.scrollLeft+(cw-element.width())/2,
                t=document.body.scrollTop+(ch-element.height())/2;

            if(isAni)
            {
                element.animate({left:l,top:t},500);
            }else{
                element.css({"left":l,"top":t}).show();
            }

        },
        ScrollPlay:function(option){

            var opt= $.extend(true,{
                direct:"v",
                selector:""
            },option);

            if(opt.selector=="")
            {
                return null;
            }

            if($(opt.selector).length==0)
            {
                return null;
            }

            function _ScrollPlayer(selector){
                var $d=$(selector),$parent=$d.parent(),intv,self=this;

                $parent.css({"position":"relative","overflow":"hidden"});
                $d.css({"position":"relative","left":"0","top":"0"});

                this.clear=function(){
                    clearInterval(intv);
                };

                if(opt.direct=="v")
                {
                    /*获取父元素高度*/
                    var h= $parent.height(),dh=$d.height();

                    /*如果子项目*/
                    if(dh<=h){
                        return;
                    }

                    var sit=function(){
                        intv=setInterval(function(){
                            var top=$d.position().top;
                            if(dh-Math.abs(top)<=h)
                            {
                                /*滚动到最后一页，从头显示*/
                                $d.css({"top":0});
                            }else{
                                /*没有滚动到最后一页，继续滚动*/
                                $d.animate({
                                    top:top-h
                                },500);
                            }


                        },1000*60*1);
                    };

                    sit();

                    $d.hover(function(){
                        self.clear();
                    },function(){
                        sit();
                    });
                }
            }

            return  new _ScrollPlayer(opt.selector);
        }
    };
    util["animate"]=animate;

    /*网页操作类*/
    util["html"]=(function(){

        function UtilHtml()
        {
            var cacheItemSize= 3,items=new Array(),views=new Array(),currentView=null;

            /*
             * 根据模板字符串渲染html*/
            this.render=function(_templateHtml,_templateData,_templateHandle)
            {
                var render=template.compile(_templateHtml);
                var thtml=render(_templateData);
                _templateHandle(thtml);
                return thtml;
            };


            /*解析html，并返回渲染完成的html字符串
             * viewName js/viewmodel/html目录下 html文件名.不带文件扩展名
             * viewData html要处理的json数据对象
             * viewCallBack 回调函数，渲染完成的html会作为字符串当做第一个参数调用此函数
             * */
            this.request=function(_viewName,_viewData,_viewCallBack){
                var self=this,
                    viewHtml="",
                    firstLoad=true;


                $(views).each(function(i,n){
                    if(n.viewName==_viewName)
                    {
                        firstLoad=false;
                        viewHtml= n.viewHtml;
                        return false;
                    }
                });

                /*第一次加载从外部资源访问*/
                if(firstLoad)
                {
                    $.ajax({
                        url:$util.string.format("{1}/{0}.html",{0:_viewName,1:$config.html_path}),
                        cache:false,
                        async:true,
                        dataType:"html",
                        success:function(rep){
                            viewHtml=rep;
                            views.push({viewName:_viewName,viewHtml:rep});
                            self.render(viewHtml,_viewData,_viewCallBack);
                        }
                    });

                }
                else
                {
                    self.render(viewHtml,_viewData,_viewCallBack);
                }
            };

            /*加载局部模板*/
            this.requestPartial=function(_viewName,_viewData,_viewCallBack){
                var self=this,
                    viewHtml="",
                    firstLoad=true;


                $(views).each(function(i,n){
                    if(n.viewName==_viewName)
                    {
                        firstLoad=false;
                        viewHtml= n.viewHtml;
                        return false;
                    }
                });

                /*第一次加载从外部资源访问*/
                if(firstLoad)
                {
                    $.ajax({
                        url:$util.string.format("{1}/{0}.html",{0:_viewName,1:$config.html_path}),
                        cache:false,
                        async:false,
                        dataType:"html",
                        success:function(rep){
                            viewHtml=rep;
                            views.push({viewName:_viewName,viewHtml:rep});
                        }
                    });
                }

                return self.render(viewHtml,_viewData,_viewCallBack);
            };

            this.get=function(_viewName,_success){
                $.ajax({
                    url:$util.string.format("{1}/{0}.html",{0:_viewName,1:$config.html_path}),
                    cache:true,
                    dataType:"html",
                    success:function(_rep){
                        _success(_rep);
                    }
                });
            };

            /*弹出一个对话框，并居中显示
             *
             * */
            this.showDialog=function(option){

                var evtOpen=option.open || function(){

                };

                var opt= $.extend(true,{
                    modal: true,
                    closeOnEscape:true,
                    title: "消息提示",
                    content:"",
                    minHeight:100,
                    open:"",
                    buttons:{},
                    close:function(){
                        $("#wyt_dialog_container").html("");
                        $(this).dialog("destroy");
                    }
                },option);

                opt.open=function(){

                    setTimeout(function(){
                        evtOpen();
                        //$util.animate.alignCenter($(".ui-dialog"),true);

                    },500);


                };

                if($("#wyt_dialog_container").length==0)
                {
                    var div= $("<div />");
                    div.attr("id","wyt_dialog_container");
                    div.appendTo($("body"));
                }

                $("#wyt_dialog_container").html(opt.content).dialog(opt);

            };

            /*显示无遮罩提示*/
            this.showTip=function(option){
                var opt= $.extend(true,{
                    content:"操作成功！",
                    timeOut:5000
                },option);


                var dh=$("<div />");
                dh.addClass("global_tip_ani");
                dh.html(opt.content);
                dh.appendTo($("body"));


                var ch= document.body.clientHeight,
                    cw=document.body.clientWidth ;

                var l=document.body.scrollLeft+(cw-dh.width())/2,
                    t=document.body.scrollTop+ch*0.2;

                dh.css({"left":l,"top":t});
                //$Animate.alignCenter(dh);
                dh.show();

                setTimeout(function(){
                    $(dh).fadeOut(1000,function(){
                        dh.remove();
                    });
                },opt.timeOut);
            };

            /*删除指定element的提示信息*/
            this.removeTitle=function(_target){
                _target["elementTitle"].remove();
            };

            /*随即生成一个带前缀的id*/
            this.newId=function(_opt){

                var opt= $.extend(true,{
                    prefix:"",
                    tagName:"div",
                    prop:"id"
                },_opt);


                var strId= opt.prefix+$util.number.random();

                var selector=$util.string.format("{0}[{1}={2}]",{0:opt.tagName,1:opt.prop,2:strId});
                if($(selector).length>0)
                {
                    return this.newId(_opt);
                }
                return strId;
            };

            /*生成下拉框，每次调用会覆盖原有的option*/
            this.dropDownList=function(_opt){
                var opt= $.extend(true,{
                    selector:"",
                    data:[],
                    valueField:"text",
                    textField:"value",
                    emptyOption:true
                },_opt);
                if(opt.selector=="")
                {
                    return;
                }
                var slt=Object.prototype.toString.apply(opt.selector)=="[object String]"?$(opt.selector):opt.selector;
                slt.empty();
                if(opt.emptyOption)
                {
                    slt.append($('<option value="">请选择</option>'));
                }
                $(opt.data).each(function(_i,_n){
                    var str=$util.string.format('<option value="{0}">{1}</option>',{
                        0:_n[opt.valueField],
                        1:_n[opt.textField]
                    });
                    var option=$(str);
                    slt.append(option);
                });

            };
        }


        return new UtilHtml();
    })();

    /*ajax工具类*/
    util["ajax"]=(function(_util){

        function UtilAjax() {
            var self=this;

            var defaultOption={
                dataType:"json",
                complete:function(){},
                data:{},
                type:"post",
                loading:"",
                async:true,
                contentType:self.contentType.request_body,
                tip:"",
                cache:false
            };

            var showLoading=function(option){

                if(option.loading=="")
                {
                    return;
                }

                var lt="加载中，请稍后";
                if(option.loading=="$$")
                {
                    lt="正在处理您的请求，请耐心等待";
                }

                var loadingOpt= $.extend({loadingText:lt},option);
                $util.html.request("loading",{loadingText:loadingOpt.loadingText},function(thtml){
                    switch (option.loading)
                    {
                        case "$$":
                            var bodyContainer=$("body"),winContainer=$(window);
                            var d=$("<div />");
                            d.addClass("loading_shadow");
                            d.css({"height":bodyContainer[0].scrollHeight,"width":bodyContainer.width()});
                            d.appendTo($("body"));
                            d.show();

                            var dh=$("<div />");
                            dh.addClass("loading_ani");
                            dh.html(thtml);
                            dh.appendTo($("body"));


                            var ch= document.body.clientHeight,
                                cw=document.body.clientWidth;

                            var l=document.body.scrollLeft+(cw-dh.width())/2,
                                t=document.body.scrollTop+(ch-dh.height())/2;

                            //dh.css({"left":l,"top":t}).show();
                            $util.animate.alignCenter(dh);
                            dh.show();
                            break;
                        default :
                            $(option.loading).html(thtml);
                            break;
                    }
                });

            },hideLoading=function(option){
                if(option.loading=="")
                {
                    return;
                }

                switch (option.loading)
                {
                    case "$$":
                        // $("#wyt_dialog_container").dialog("close");
                        $(".loading_shadow").remove();
                        $(".loading_ani").remove();
                        break;
                    default :
                        $(option.loading).html("");
                        break;
                }

            };

            this.send=function(option){
                var opt=  $.extend(true,{},defaultOption,option);

                var isAns=opt.loading!="",tipInfo={
                    success:true,
                    message:opt.tip
                };

                function _ajaxSend()
                {
                    var s={
                        url:opt.url,
                        contentType:opt.contentType,
                        cache:opt.cache,
                        async:opt.async,
                        dataType:opt.dataType,
                        data:(opt.contentType==self.contentType.request_body ?JSON.stringify(opt.data):opt.data),
                        type:opt.type,
                        success:function(rep){
                            //console.log("$Ajax url:"+opt.url+" response :"+ JSON.stringify(rep));
                            /*请求成功结果提示*/
                            tipInfo.success=rep.success;
                            if(!rep.success && rep.hasOwnProperty("message"))
                            {
                                tipInfo.message = rep.message;
                            }

                            opt.success(rep);
                        },
                        error:function(){
                            console.log("ajax error");
                        },
                        complete:function(xhr,msg){

                            switch (xhr.status){
                                case 401:
                                    $util.html.showDialog({
                                        width:350,
                                        height:200,
                                        content:"登录超时，请重新登录",
                                        buttons:{
                                            "返回登录":function(){
                                                location.href="./";
                                            }
                                        }
                                    });
                                    break;
                            }

                            /*如果查询事件没超过最大等待时间，销毁最长等待时间执行的动作*/
                            if(isAns) {
                                clearTimeout(stloading);
                                hideLoading(opt);
                            }

                            if(tipInfo.message!="")
                            {
                                if(tipInfo.message==null)
                                {
                                    tipInfo.message="操作失败";
                                }
                                $util.html.showTip({
                                    content:tipInfo.message
                                });
                            }
                            opt.complete();
                        }
                    };

                    //console.log("$Ajax request:"+JSON.stringify(s));

                    xhr=$.ajax(s);
                }

                if(!isAns)
                {
                    _ajaxSend();
                }else{
                    /*加载动画*/
                    showLoading(opt);

                    /*设置加载动画最长时间*/
                    var stloading,xhr;
                    stloading= setTimeout(function(){
                        xhr.abort();
                        hideLoading(option);
                    },1000*10);

                    /*延迟加载时为了保证动画执行的最短时间*/
                    setTimeout(_ajaxSend,1000);
                }

            };

            /*发送ajax请求使用post方式提交json数据*/
            this.postJson=function(_option){
                var opt= $.extend(true,_option,{
                    contentType:self.contentType.request_body,
                    type:"post"
                });

                this.send(opt);
            };
        }

        UtilAjax.prototype.contentType={
            request_body:"application/json;charset=utf-8",
            form_data:"application/x-www-form-urlencoded;charset=utf-8"
        };

        return new UtilAjax();
    })();

    /*本地数据*/
    util["localData"]={
        get:function(_key){
            if(localStorage==undefined)
            {
                return null;
            }
            return localStorage.getItem(_key);
        },
        set:function(_key,_value){
            if(localStorage==undefined)
            {
                return;
            }
            localStorage.setItem(_key,_value);
        }
    };

    /*session数据*/
    util["sessionData"]={
        get:function(_key){
            if(sessionStorage==undefined)
            {
                return null;
            }
            return sessionStorage.getItem(_key);
        },
        set:function(_key,_value){
            if(sessionStorage==undefined)
            {
                return;
            }
            sessionStorage.setItem(_key,_value);
        }
    };

    /*根据一个json对象(source)给ko对象(target)赋值,如果source包含target所有字段，mapping可以设置为null*/
    util["json"]={
        mappingJson:function(_source,_target,_mapping){

            if(_mapping==null)
            {
                for(var k in _target)
                {
                    if(!_source.hasOwnProperty(k))
                    {
                        continue;
                    }
                    _target[k]=_source[k];
                }

                return _target;

            }else{

                $(_mapping).each(function(_i,_n){
                    if(!_target.hasOwnProperty(_n[0]))
                    {
                        return;
                    }
                    if(!_source.hasOwnProperty(_n[1]))
                    {
                        return;
                    }
                    _target[_n[0]]=_source[_n[1]];
                });

            }
            return _target;
        },
        mappingArray:function(_source,_target,_mapping){
            var arr=[];
            if(_mapping==null){
                $(_source).each(function(_i,_n){
                    var tmp={};
                    for (var k in _target){
                        if(!_n.hasOwnProperty(k))
                        {
                            tmp[k]=_target[k];
                        }else{
                            tmp[k]=_n[k];
                        }
                    }
                    arr.push(tmp);
                });
            }else{
                $(_source).each(function(_i,_n){
                    var tmp={};
                    $(_mapping).each(function(_i2,_n2){

                        if(!_target.hasOwnProperty(_n2[0]))
                        {
                            return;
                        }
                        if(!_n.hasOwnProperty(_n2[1]))
                        {
                            tmp[_n2[0]]=_target[_n2[0]];
                        }else{
                            tmp[_n2[0]]=_n[_n2[1]];
                        }
                        arr.push(tmp);
                    });
                });
            }
            return arr;
        },
        convertFormSerialize:function(_arr){
            var data={};
            $(_arr).each(function(_i,_n){
                data[_n.name]=_n.value;
            });
            return data;
        }
    };

    /*验证工具*/
    util["validator"]={
        valid:function(k,v,t){


            var validResult={success:true,message:""},targetValue=t.val();
            switch (k)
            {
                case "required":
                    validResult.success=v?targetValue!="":true;
                    validResult.message=validResult.success?"":"必须输入的信息";
                    break;
                case "maxlength":
//                    validResult.success=(targetValue+"").replace(/[^\x00-\xff]/g,"aa").length<=v;
                    validResult.success=targetValue.length<=v;
                    validResult.message=validResult.success?"":"请输入最多"+v+"个字";
                    break;
                case "minlength":
//                    validResult.success=(targetValue+"").replace(/[^\x00-\xff]/g,"aa").length>=v;
                    validResult.success=targetValue.length>=v;
                    validResult.message=validResult.success?"":"请输入最少"+v+"个字";
                    break;
                case "date":
                    validResult.success=/(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/.test(targetValue);
                    validResult.message=validResult.success?"":"日期格式不正确";
                    break;
                case "email":
                    validResult.success=/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/.test(targetValue) || /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(targetValue);
                    validResult.message=validResult.success?"":"电子邮件地址格式不正确";
                    break;
                case "number":
                    validResult.success=/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(targetValue);
                    validResult.message=validResult.success?"":"必须输入合法的数字";
                    break;
                case "digits":
                    validResult.success=/^[0-9]*$/.test(targetValue);
                    validResult.message=validResult.success?"":"必须输入整数";
                    break;
                case "regex":
                    validResult.success=v.test(targetValue);
                    validResult.message=validResult.success?"":"格式不匹配";
                    break;
                case "max":
                    validResult.success=v>=targetValue;
                    validResult.message=validResult.success?"":"不能超过"+v;
                    break;
                case "min":
                    validResult.success=v<=targetValue;
                    validResult.message=validResult.success?"":"不能小于"+v;
                    break;
                case "func":
                    var fr= v(t,targetValue);
                    validResult.success=fr.success;
                    validResult.message=fr.message;
                    break;
                case "phone":
                    var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
                    var isMob=/^((\+?86)|(\(\+86\)))?1\d{10}$/;
                    validResult.success=isPhone.test(targetValue) || isMob.test(targetValue);
                    validResult.message=validResult.success?"":"请输入有效的联系方式";
                    break;
            }
            return validResult;

        },
        create:function(_option){
            var self=this;
            function ViewValidator(option)
            {

                var rules,
                    errorHandle=option.error,
                    successHandle=option.success || function(){},
                    unfocous=option.unfocous || true;

                /*从自定义错误信息中选取错误消息*/
                function _getError(kk,kmsg)
                {
                    if(!kmsg.hasOwnProperty(kk))
                    {
                        return "";
                    }
                    return kmsg[kk];
                }


                /*自定义验证*/
                var _validCheck=function(_rules,errorHandle){
                    var kr,kt,kmsg,result,arr=[],msg="",sarr=[];
                    for(k in _rules)
                    {
                        kr=_rules[k].rule;
                        kmsg=_rules[k].message;
                        kt=_rules[k].target;//验证目标是数组，因为存在批量验证情况
                        for(kk in kr)
                        {
                            /*循环验证目标对验证规则进行验证*/
                            $(kt).each(function(i,n){
                                result= self.valid(kk,kr[kk],n);
                                if(!result.success)
                                {
                                    msg=_getError(kk,kmsg);
                                    arr.push({
                                        target:n,
                                        error:msg==""?result.message:msg,
                                        key:k
                                    });
                                    //return;
                                }else{
                                    sarr.push({
                                        target:n,
                                        key:k
                                    });
                                }
                            });

                        }

                    }

                    if(arr.length>0)
                    {
                        errorHandle(arr.distinct(function(m1,m2){return m1.key==m2.key;}));
                    }else  if(sarr.length>0)
                    {
                        successHandle(sarr);
                    }

                    return arr.length==0;
                };



                this.valid=function(){
                    return  _validCheck(rules,errorHandle);
                };

                /*刷新验证绑定*/
                this.refresh=function(){
                    /*验证规则绑定到具体的dom对象*/
                    rules= $.extend(true,{},option.rules);
                    $(option.selector).find("*[valid-bind]").each(function(i,n){

                        var key= $(n).attr("valid-bind"),$n=$(n);
                        if(!rules.hasOwnProperty(key))
                        {
                            return;
                        }
                        if(!rules[key].hasOwnProperty("target"))
                        {
                            rules[key]["target"]=[];
                        }

                        if(unfocous)
                        {

                            $(n).unbind("blur.ValidBind").bind("blur.ValidBind",function(){
                                console.log("blur valid");
                                var tmpr={

                                };
                                tmpr[key]={
                                    message:rules[key].message,
                                    rule:rules[key].rule,
                                    target:[$n]
                                };
//                    tmpr[key]=rules[key];
//                    tmpr[key].target=[$n];
                                _validCheck(tmpr,errorHandle);
                            });

                        }

                        rules[key]["target"].push($n);


                    });
                };


                this.refresh();
            }

            var vv=new ViewValidator(_option);
            return vv;
        },
        clear:function(koError){
            for(var k in koError)
            {
                koError[k]("");
            }
        }
    };

    /**/
    util["mapping"]={
         get:function(_setting){
            var container=$(_setting.container),arr=[];
            $(container).each(function(_i,_n){
                var data={};
                $(_setting.mapping).each(function(_i2,_n2){
                    var dom= $(_n).find("."+_n2.selector);
                    var field=_n2.hasOwnProperty("field")?_n2.field:_n2.selector;
                    data[field]=dom.length==0?"": dom.val();
                });
                arr.push(data);
            });
            return arr;
        }
    };

    util["gis"]={
        getCityInfo:function(_provID,_cityID){
            var info="",self=this;
            /*获取省份信息*/
            var prov=  $config.city_info.where(function(_n){
                return _n.v==_provID;
            },false),city="";

            /*获取到省份信息后获取城市信息*/
            if(prov!=null)
            {
                info+=prov.p;
                city= prov.c.where(function(_n){
                    return _n.v==_cityID;
                },false);

                if(city!=null)
                {
                    info+=city.n;
                }
            }
            return info;
        }
    };

    _window["$util"]=util;

})(window);




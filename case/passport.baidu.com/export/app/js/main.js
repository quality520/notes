(function($,window) {
    var $scrollElem = $('html, body'),
        $win = $(window),
        $doc = $(window.document),
        isIE6 = !-[1,] && !window.XMLHttpRequest,
        isMac = window.navigator.platform.toLowerCase().indexOf('mac') > -1;

    var PageCtrl = function(options) {
        this.init.call(this, options);
    };

    PageCtrl.prototype = {
        init: function(options) {
            this.curIndex = 0;
            this.wrapper = options.wrapper;
            this.pages = this.wrapper.children('section');
            this.pageCount = this.pages.length;
            this.scrollTop = 0;
            this.isScroll = false;
            this.time = null;
//            this._initPage();
            this._bindEvent();
        },

        /**
         * 根据当前scrollTop，计算curIndex
         * 浏览器刷新会记录scrollTop，所以不能确定curIndex === 0
         * @private
         */
//        _initPage: function() {
//            // 平均高度
//            var pageHeight = this.wrapper.height() / this.pageCount;
//
//            this.scrollTop = $win.scrollTop();
//            console.log(this.scrollTop / pageHeight);
//        },

        /**
         * 事件绑定
         * @private
         */
        _bindEvent: function() {
            var self = this;
            if (window.addEventListener) {
                window.addEventListener('DOMMouseScroll', function(event) {self.scroll.call(self, event)}, false);
                window.addEventListener('mousewheel', function(event) {
                    self.scroll.call(self, event);
                }, false);
                window.addEventListener('MozMousePixelScroll', function(event) {
                    event.preventDefault();
                }, false);
            } else {
                document.onmousewheel = function() {
                    self.scroll.call(self);
                };
            }

            // change.page事件
            var topDelta = isIE6 ? 0 : 50,
                animateName = isMac ? 'mac' : 'pc';

            var animateFn = {
                mac: function(scrollTop) {
                    $scrollElem.animate({
                        scrollTop: scrollTop
                    }, 1000, function() {
                        setTimeout(function() {
                            self.isScroll = false;
                        }, 500);
                    });
                },
                pc: function(scrollTop) {
                    $scrollElem.animate({
                        scrollTop: scrollTop
                    }, function() {
                        self.isScroll = false;
                    });
                }
            };
            this.wrapper.on('changepage', function(event, data) {
                var $nextPage = self.pages.eq(data.nextIndex);
                self.pages.eq(data.prevIndex).trigger('exit');
                $nextPage.trigger('enter');
                self.scrollTop = data.nextIndex === 0 ? 0 : $nextPage.offset().top;
                self.scrollTop -= topDelta;
                animateFn[animateName](self.scrollTop);
            });

            // pages 进入/退出事件
            self.pages.on('enter', function() {
                var $this = $(this);
                self.onEnter($this);
            });
            self.pages.on('exit', function() {
                var $this = $(this);
                self.onExit($this);
            });
        },
        scroll: function(event) {
            var oEvent = event || window.event;
            if (oEvent.preventDefault) {
                oEvent.preventDefault();
            } else {
                oEvent.returnValue = false;
            }
            if (this.isScroll) {
                return;
            }
            this.isScroll = true;
            var self = this,
                delta = oEvent.wheelDelta ? oEvent.wheelDelta : -oEvent.detail;
            var curIndex = 0;
            if (delta < 0) {
                curIndex = Math.min((self.curIndex + 1), self.pageCount - 1);
            } else {
                curIndex = Math.max((self.curIndex - 1), 0);
            }
            self.setIndex(curIndex);
        },
        onEnter: function($dom) {
            $dom.addClass('animate-enter').removeClass('animate-exit');
        },
        onExit: function($dom) {
            $dom.removeClass('animate-enter').addClass('animate-exit');
        },

        setIndex: function(index) {
            var prevIndex = this.curIndex;
            this.curIndex = index;
            this.wrapper.trigger('changepage', {
                prevIndex: prevIndex,
                nextIndex: index
            });
        }
    };

    var pageCtrl = new PageCtrl({
        wrapper: $('.content')
    });

    // go-top
    var goTopTime = null, 
        $goTop = $('.gotop'),
        $next = $('.footer-next'),
        $qrcode = $('.footer-qrcode');

    $win.on('scroll', function() {
        if (goTopTime) {
            clearTimeout(goTopTime);
            goTopTime = null;
        }
        goTopTime = setTimeout(function() {
            var top = $win.scrollTop(),
                bottom = $doc.height()-$win.height()-top;
                
            if(top > 0){
                $next.hide();
                $goTop.show();
            }else{
                $next.show();  
                $goTop.hide();              
            }

            if(bottom <= 0){
                $qrcode.hide();
            }else{
                $qrcode.show();                
            }

        }, 300);
    });
    $goTop.on('click', function() {
        pageCtrl.setIndex(0);
    });
    $next.click(function(){
        pageCtrl.setIndex(pageCtrl.curIndex+1);
    })

    // qrcode go-top
    if (isIE6) {
        var time = null, $qrcode = $('.qrcode');
        $win.on('scroll', function() {
            if (time) {
                clearTimeout(time);
                time = null;
            }
            time = setTimeout(function() {
                var top = $win.scrollTop(),
                    height = $win.height();
                $qrcode.animate({
                    top: top + 100
                });
                $goTop.animate({
                    top: top + height - 100
                })
            }, 300);
        });
    }

    var changeView = function(options){
        this.init.call(this,options)
    }
    changeView.prototype = {
        init:function(options){
            this.current = document.location.hash.substr(document.location.hash.indexOf('#')+1) || 'android';
            this.current = this.current == 'ios' ?'ios':'android';
            this.$change = options.changeEle || '';
            this.$nav = options.navEle || '';
            this._bindEvent();
            this.changeHash(this.current)
        },
        _bindEvent:function(){
            var self = this;

            if(!self.$change || !self.$nav) return;

            self.$nav.click(function(event){
                var curr = $(event.target).attr('data-click');

                curr && self.change(curr)
            })
        },
        change:function(tab){
            if(tab == this.current) return;

            pageCtrl.setIndex(0);


            //window.location.href = window.location.href.substr(0,window.location.href.indexOf('#')) + '#' + tab
            this.changeHash(tab)
        },
        changeHash:function(tab){
            this.$change.removeClass(this.current)
            this.$change.addClass(tab)
            this.current = tab;
        }
    }
    var changeNav = new changeView({
        changeEle: $('#wrapper'),
        navEle: $('#nav')
    });

    //下载按钮
    var $download = $('.download');
    $download.click(function(){
        /*if(changeNav.current == 'ios'){
            document.location.href="https://itunes.apple.com/cn/app/bai-du-quan-zhong-xin-shou/id695439229"
        }else{
            document.location.href="http://passport.baidu.com/export/app/download/BaiduSecurityCenter.apk?v="+new Date().getTime()
        }*/
    })

    //轮播图
    var $carouselAndroid = $('.a-left-ul-android .a-left-img'),
        $carouselIos = $('.a-left-ul-ios .a-left-img'),
        curType = changeNav.current,
        preNum = 0,
        curNum = 0;

    var carousel = setInterval(function(){
        var lists = (changeNav.current == 'ios') ? $carouselIos : $carouselAndroid,
            length = lists.length,
            width = $(lists[0]).width(),
            i = 0,
            move;

        if(curType != changeNav.current){
            preNum = 0;
            curNum = 0;
            curType = changeNav.current;
            move && clearInterval(move)
        }

        if(preNum < length-1){
            curNum = preNum+1
        }else{
            curNum = 0
        }

        move = setInterval(function(){
            if(32*i<width-1){
                lists[preNum].style.left = -32*i +'px';
                lists[curNum].style.left = width-32*i + 'px';
                i++
            }else{
                lists[curNum].style.left = '0px';
                lists[preNum].style.left = (0-width) + 'px';
                clearInterval(move)
                preNum = curNum;
            }
        },32)
    },3000)
})(jQuery, window);
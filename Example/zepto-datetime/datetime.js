$.fn.aiDatetime = function() {
  var $el, init, opts;
  $el = $(this);
  var modulo = function(a, b) { return (+a % (b = +b) + b) % b; };
  opts = {
    template: $('<div ai-modal="bottom noEvent" class="datetimePicker" style="display:none"> <article> <header ai-row> <div ai-col ai-close>取消</div> <div ai-col ai-close>确定</div> </header> <div class="box"> <div ai-row="top"> <div ai-col="1/2"> <div class="viewport date"> <div> <div ng-repeat="date in datetime.dates track by $index">今天 2015-08-20</div> <div ng-repeat="date in datetime.dates track by $index">今天 2015-08-20</div> </div> </div> </div> <div ai-col> <div class="viewport hour"> <div> <div ng-repeat="hour in datetime.hours track by $index">01</div> <div ng-repeat="hour in datetime.hours track by $index">01</div> <div ng-repeat="hour in datetime.hours track by $index">01</div> <div ng-repeat="hour in datetime.hours track by $index">01</div> <div ng-repeat="hour in datetime.hours track by $index">01</div> <div ng-repeat="hour in datetime.hours track by $index">01</div> </div> </div> </div> <div ai-col> <div class="viewport minute"> <div> <div ng-repeat="minute in datetime.minutes track by $index">03</div> <div ng-repeat="minute in datetime.minutes track by $index">03</div> <div ng-repeat="minute in datetime.minutes track by $index">03</div> <div ng-repeat="minute in datetime.minutes track by $index">03</div> <div ng-repeat="minute in datetime.minutes track by $index">03</div> <div ng-repeat="minute in datetime.minutes track by $index">03</div> <div ng-repeat="minute in datetime.minutes track by $index">03</div> </div> </div> </div> </div> <div class="activeArea"></div> </div> </article> </div>'),
    curr: (function() {
      if((new Date($el.val())).valueOf()){
        return new Date($el.val())
      }else{
        return new Date
      }
    })(),
    totalBlocks: 15
  };
  var Hex = (function() {
    return function(curr, max, min) {
      if (curr == null) {
        curr = 0;
      }
      if (max == null) {
        max = 10;
      }
      if (min == null) {
        min = 0;
      }
      this.plus = function(num) {
        if (num == null) {
          num = 1;
        }
        return curr = modulo(curr + num, max);
      };
      this.minus = function(num) {
        if (num == null) {
          num = 1;
        }
        return curr = modulo(curr - num, max);
      };
      this.getMax = function() {
        return max;
      };
      this.getMin = function() {
        return min;
      };
      this.setCurr = function(num) {
        if (curr < min) {
          return curr = modulo(curr - num, max);
        } else if (curr > max) {
          return curr = modulo(curr + num, max);
        } else {
          return curr = num;
        }
      };
    };
  })();
  var minutesHex = new Hex(opts.curr.getMinutes(), 60);
  var genMinutes = function(count) {
    var currIdx, i, tmp;
    if (count == null) {
      count = 15;
    }
    tmp = [];
    currIdx = Math.floor(count / 2);
    minutesHex.minus(currIdx);
    while (--count) {
      i = minutesHex.plus();
      i = '' + i;
      if (i.length < 2) {
        i = '0' + i;
      }
      tmp.push(i);
    }
    return tmp;
  };
  var hoursHex = new Hex(opts.curr.getHours(), 24);
  var genHours = function(count) {
    var currIdx, i, tmp;
    if (count == null) {
      count = 15;
    }
    tmp = [];
    currIdx = Math.floor(count / 2);
    hoursHex.minus(currIdx);
    while (--count) {
      i = hoursHex.plus();
      i = '' + i;
      if (i.length < 2) {
        i = '0' + i;
      }
      tmp.push(i);
    }
    return tmp;
  };
  var genDates = function(count) {
    var currIdx, localWeek, tmp;
    if (count == null) {
      count = 15;
    }
    tmp = [];
    localWeek = '';
    currIdx = Math.floor(count / 2);
    curr = new Date(opts.curr)
    curr.setDate(curr.getDate() - currIdx);
    while (--count) {
      curr.setDate(1 + curr.getDate());
      switch (curr.getDay()) {
        case 1:
          localWeek = '一';
          break;
        case 2:
          localWeek = '二';
          break;
        case 3:
          localWeek = '三';
          break;
        case 4:
          localWeek = '四';
          break;
        case 5:
          localWeek = '五';
          break;
        case 6:
          localWeek = '六';
          break;
        case 0:
          localWeek = '日';
      }
      if (curr == new Date) {
        tmp.push('今天');
      } else {
        tmp.push((curr.getMonth() + 1) + "月" + (curr.getDate()) + "日 周" + localWeek);
      }
    }
    return tmp;
  };
  var minutes = genMinutes()
  var hours = genHours()
  var dates = genDates()
  var refresh = function(target){
    if(target === 'minute'){
      var minuteWrap = opts.template.find('.minute').children().empty()
      for(i in minutes){
        minuteWrap.append('<div>'+minutes[i]+'</div>')
      }
    }
    if(target === 'hour'){
      var hourWrap = opts.template.find('.hour').children().empty()
      for(i in hours){
        hourWrap.append('<div>'+hours[i]+'</div>')
      }
    }
    if(target === 'date'){
      var dateWrap = opts.template.find('.date').children().empty()
      for(i in dates){
        dateWrap.append('<div>'+dates[i]+'</div>')
      }
    }
  }

  refresh('minute')
  refresh('hour')
  refresh('date')

  var format = function(val,type){
    return val
  }

  var setValue = function(format){
    $el.val(format(opts.curr))
  }
  
  var pick = function(target,floor){
    var date, dateIdx, dateStr, month, monthIdx;
    if (target === 'minute') {
      opts.curr.setMinutes(minutes[floor])
      minutesHex.setCurr(minutes[floor]);
      minutes = genMinutes()
      refresh(target)
      
    }
    if (target === 'hour') {
      opts.curr.setHours(minutes[floor])
      hoursHex.setCurr(hours[floor]);
      hours = genHours()
      refresh(target)
    }
    if (target === 'date') {
      dateStr = dates[floor];
      if (dateStr === '今天') {
        month = (new Date).getMonth();
        date = (new Date).getDate();
      } else {
        monthIdx = dateStr.indexOf('月');
        dateIdx = dateStr.indexOf('日');
        month = parseInt(dateStr.slice(0, monthIdx)) - 1;
        date = parseInt(dateStr.slice(monthIdx + 1, dateIdx));
      }
      opts.curr.setMonth(month)
      opts.curr.setDate(date);
      dates = genDates()
      refresh(target)
    }
    setValue(format)
  }

  return init = (function() {
    var cellHeight, tmpMarginTop, tmpY, viewports;
    viewports = opts.template.find('.viewport')
    cellHeight = 40
    tmpY = 0;
    tmpMarginTop = 0;
    viewports.each(function(i,el){
      var $v = $(el).children()
      $v.css('margin-top', -(Math.floor(opts.totalBlocks / 2) - 3) * cellHeight + 'px');
      $v.on('touchstart', function(ev) {
        tmpY = ev.touches[0].clientY;
        return tmpMarginTop = parseInt($v.css('margin-top'));
      });
      $v.on('touchmove', function(ev) {
        return $v.css('margin-top', tmpMarginTop + ev.touches[0].clientY - tmpY + 'px');
      });
      $v.on('touchend', function(ev) {
        var floor, m, marginTop, target;
        marginTop = parseInt($v.css('margin-top'));
        floor = (Math.abs(Math.floor(marginTop / cellHeight))) + 2;
        m = modulo(marginTop, cellHeight);
        if (m < cellHeight / 2) {
          $v.css('margin-top', marginTop - m + 'px');
        }
        if (m >= cellHeight / 2) {
          $v.css('margin-top', marginTop + cellHeight - m + 'px');
          floor--;
        }
        if ($v.parent().hasClass('date')) {
          target = 'date';
        }
        if ($v.parent().hasClass('hour')) {
          target = 'hour';
        }
        if ($v.parent().hasClass('minute')) {
          target = 'minute';
        }
        pick(target,floor)
        return $v.css('margin-top', -(Math.floor(opts.totalBlocks / 2) - 3) * cellHeight + 'px');
      });
    })
    
    $el.on('focus',function(){
      opts.template.show()
    })
    opts.template.find('[ai-close]').on('click',function(){
      opts.template.hide()
    })
      
    $('body').append(opts.template);
    return arguments.callee;
  })();
};

$(function() {
  return $('[ai-datetime]').aiDatetime();
});



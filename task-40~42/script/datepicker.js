(function($) {
    function DatePicker(options) {
        var defaultConf = {
            triggerArea: [], // 触发的元素
            bindArea: $('input'), // 绑定的input元素
            theme: '#0074f5', // 主题颜色
            initDate: new Date().toString(), // 指定的初始日期
            yearRange: ['100', '2500'], // 默认的年份范围
            dateSelectRange: null, // 可选择的日期范畴
            callback: null,
        };
        
        this.conf = $.extend(defaultConf, options);
        this.initDate = new Date(this.conf.initDate);
        if (this.isValidDate(this.initDate)) {
            this.curDateObj = this.initDate; // curDateObj是渲染日历时的标记
        } else {
            this.curDateObj = new Date();
        }
        this.frame = null;
        this.curYear = null;
        this.curMonth = null;
        this.curDate = null;
        this.headerData = null;
        this.yearArr = [];
        this.datePanel = null;
        this.monthPanel = null;
        this.yearPanel = null;
        this.selectedBtn = null;
        this.selectBtnArr = []; // 选择时间区域的数组 
    }
    
    DatePicker.prototype.init = function() {
        this.renderPanel(); 
        this.setData(); // 填入日历的数据
        this.frame.hide();
        this.bind(); // 绑定事件
    };
    
    DatePicker.prototype.renderPanel = function() {
        var conf = this.conf;
        var bindArea = conf.bindArea; // 绑定的input元素
        var panelStr = ``;
        
        panelStr += `<div class="date-picker">`;
        panelStr += `<div class="header" style="background: ${conf.theme}">
                        <span class="pre-btn"></span>
                        <span class="header-data date-title"></span>
                        <span class="next-btn"></span>
                    </div>`;

        panelStr += `<div class="body body-date">`;
        panelStr += `<table class="panel">
                <thead>
                <tr>
                    <th class="weekend">日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th class="weekend">六</th>
                </tr>
            </thead>`;
        panelStr += `<tbody>`;
        
        panelStr += `</tbody>`;
        panelStr += `</table>`;
        panelStr += `<div class="sub-area">
                        <button class="confirm-btn" style="border-color:${conf.theme};color:${conf.theme};">确定</button>
                        <button class="cancel-btn" style="border-color:${conf.theme};color:${conf.theme};">取消</button>
                    </div>`;
        panelStr += `</div>`;

        // 月份选择部分
        panelStr += `<div class="body body-month">`;
        panelStr += `<table class="panel">`;
        panelStr += `<tbody>`;
        panelStr += `</tbody>`;
        panelStr += `</table>`;
        panelStr += `<div class="sub-area">
                        <button class="confirm-btn" style="border-color:${conf.theme};color:${conf.theme};">确定</button>
                        <button class="cancel-btn" style="border-color:${conf.theme};color:${conf.theme};">取消</button>
                    </div>`;
        panelStr += `</div>`;

        // 年份选择部分
        panelStr += `<div class="body body-year">`;
        panelStr += `<table class="panel">`;
        panelStr += `<tbody>`;
        
        panelStr += `</tbody>`;
        panelStr += `</table>`;
        panelStr += `<div class="sub-area">
                        <button class="confirm-btn" style="border-color:${conf.theme};color:${conf.theme};">确定</button>
                        <button class="cancel-btn" style="border-color:${conf.theme};color:${conf.theme};">取消</button>
                    </div>`;
        panelStr += `</div>`;
        
        this.frame = $(panelStr);
        this.frame.appendTo($('body'))
                  .css({
                      'position': 'absolute',
                      'left': conf.bindArea.offset().left,
                      'top': conf.bindArea.offset().top + conf.bindArea.outerHeight() + 5
                  });
        this.headerData = this.frame.find('.header-data');
    };

    DatePicker.prototype.setData = function() {
        // 先清空已有的数据
        var me = this;
        this.frame.find('.body-date tbody').html('');
        this.frame.find('.body-month tbody').html('');
        this.frame.find('body-year tbody').html('');
        var curDateObj = this.curDateObj; // 初始日期对象
        this.curYear = curDateObj.getFullYear(); // 年份;
        this.curMonth = curDateObj.getMonth(); // 月份
        this.curDate = curDateObj.getDate(); // 日
        this.yearArr = this.getYearSection(this.curYear);
        
        var firstDay = new Date(this.curYear, this.curMonth, 1); // 本月第一天
        var lastDay = new Date(this.curYear, this.curMonth+1, 0); // 本月最后一天
        
        var dateArr = [];
        for (var i=firstDay.getDay(); i>0; i--) {
            var d = new Date(firstDay.getTime() - i * 24 * 60 * 60 * 1000);
            dateArr.push({type: 'pre-month', date: d});
        }
        for (var j=0; j<lastDay.getDate()-firstDay.getDate()+1; j++) {
            var d = new Date(firstDay.getTime() + j * 24 * 60 * 60 * 1000);
            dateArr.push({type: 'cur-month', date: d});
        }
        for (var k=1; k<=42-lastDay.getDate()-firstDay.getDay(); k++) {
            var d = new Date(lastDay.getTime() + k * 24 * 60 * 60 * 1000);
            dateArr.push({type: 'next-month', date: d});
        }
        
        this.setHeaderData(); // 设置头部
        
        // body-date部分
        var tpl = ``;
        dateArr.forEach(function(item, index) {
            if (index % 7 === 0) {
                tpl += '<tr>';
            }
            tpl += `<td class="${item.type}" data-date="${me.getYYMMDD(item.date)}">${item.date.getDate()}</td>`;
            
            if (index % 7 === 6) {
                tpl += `</tr>`;
            }
        });
        this.frame.find('.body-date tbody').html(tpl);
        
        // body-month部分
        var monthStr = ``;
        monthStr += `<tr>
                         <td class="month-select" data-month="0" data-year=${this.curYear}>01月</td>
                         <td class="month-select" data-month="1" data-year=${this.curYear}>02月</td>
                         <td class="month-select" data-month="2" data-year=${this.curYear}>03月</td>
                         <td class="month-select" data-month="3" data-year=${this.curYear}>04月</td>
                     </tr>
                     <tr>
                         <td class="month-select" data-month="4" data-year=${this.curYear}>05月</td>
                         <td class="month-select" data-month="5" data-year=${this.curYear}>06月</td>
                         <td class="month-select" data-month="6" data-year=${this.curYear}>07月</td>
                         <td class="month-select" data-month="7" data-year=${this.curYear}>08月</td>
                     </tr>
                     <tr>
                         <td class="month-select" data-month="8" data-year=${this.curYear}>09月</td>
                         <td class="month-select" data-month="9" data-year=${this.curYear}>10月</td>
                         <td class="month-select" data-month="10" data-year=${this.curYear}>11月</td>
                         <td class="month-select" data-month="11" data-year=${this.curYear}>12月</td>
                     </tr>`;
        this.frame.find('.body-month tbody').html(monthStr);

        // body-year部分
        var yearStr = ``;
        this.yearArr.forEach(function(item, index, arr) {
            if (index % 4 === 0) {
                yearStr += '<tr>';
            }
            yearStr += `<td class="year-select" data-year="${item}">${item}年</td>`;
            if (index % 4 === 3) {
                yearStr += '</tr>';
            }
        });
        this.frame.find('.body-year tbody').html(yearStr);

        this.datePanel = this.frame.find('.body-date');
        this.monthPanel = this.frame.find('.body-month');
        this.yearPanel = this.frame.find('.body-year');

        this.monthPanel.find('.month-select').each(function(index, item) {
            $(item).data('year', me.curYear);
        });
        // 给curDate加上css
        this.datePanel.find('.cur-month').each(function(index, item) {
            $(item).removeClass('cur-date');
            var day = new Date($(this).data('date')).getDay();
            if (day % 7 === 0 || day % 7 === 6) {
                $(this).addClass('weekend'); // 加红
            }
            if ($(item).data('date') === me.getYYMMDD(me.initDate)) {
                $(item).addClass('cur-date');
                me.selectedBtn = $(item);
            }
        });
        this.monthPanel.find('.month-select').each(function(index, item) {
            $(item).removeClass('cur-date');
            if ($(item).data('month') === me.initDate.getMonth() && $(item).data('year') === me.initDate.getFullYear()) {
                $(item).addClass('cur-date');
            }
        });
        this.yearPanel.find('.year-select').each(function(index, item) {
            $(item).removeClass('cur-date');
            if ($(item).data('year') === me.initDate.getFullYear()) {
                $(item).addClass('cur-date');
            }
        });
        this.yearPanel.find('.year-select:first').addClass('out-year');
        this.yearPanel.find('.year-select:last').addClass('out-year');
    };

    DatePicker.prototype.bind = function() {
        var me = this;
        // 点击pre-btn
        this.frame.find('.pre-btn').on('click', function() {
            if (me.headerData.hasClass('date-title')) {
                if (me.conf.yearRange[0] > new Date(me.curYear, me.curMonth, 0).getFullYear()) {
                    return;
                } else {
                    me.curDateObj = new Date(me.curYear, --me.curMonth, 1);
                }
            } else if (me.headerData.hasClass('month-title')) {
                if (me.conf.yearRange[0] > new Date(me.curYear-1, me.curMonth, 1).getFullYear()) {
                    return;
                } else {
                    me.curDateObj = new Date(--me.curYear, me.curMonth, 1);
                }
            } else if (me.headerData.hasClass('year-title')) {
                if (me.conf.yearRange[0] >= me.yearArr[0] && me.conf.yearRange[0] <= me.yearArr[me.yearArr.length-1]) {
                    return;
                } else {
                    me.curDateObj = new Date(me.curYear -= 10, me.curMonth, 1);
                }
            }
            me.setData();
        });
        // 点击next-btn
        this.frame.find('.next-btn').on('click', function() {
            if (me.headerData.hasClass('date-title')) {
                if (me.conf.yearRange[1] < new Date(me.curYear+2, me.curMonth+1, 1).getFullYear()) {
                     return;
                } else {
                    me.curDateObj = new Date(me.curYear, ++me.curMonth, 1);
                }
            } else if (me.headerData.hasClass('month-title')) {
                if (me.conf.yearRange[1] < new Date(me.curYear+3, me.curMonth, 1).getFullYear()) {
                    return;
                } else {
                    me.curDateObj = new Date(++me.curYear, me.curMonth, 1);
                }
            } else if (me.headerData.hasClass('year-title')) {
                if (me.conf.yearRange[1] >= me.yearArr[0] && me.conf.yearRange[1] <= me.yearArr[me.yearArr.length-1]) {
                    return;
                } else {
                    me.curDateObj = new Date(me.curYear += 10, me.curMonth, 1);
                }
            }
            me.setData();
        });

        // hover效果
        this.frame.on('mouseover', 'td', function() {
            if (!$(this).hasClass('cur-date') && !$(this).hasClass('to-selected')) {
                    $(this).addClass('hover-date');
                }
        }).on('mouseout', 'td', function() {
            if (!$(this).hasClass('cur-date') && !$(this).hasClass('to-selected')) {
                    $(this).removeClass('hover-date');
                }
        });

        // 触发事件, 显示日历
        this.conf.triggerArea.forEach(function(item) {
            item.on('focus', function() {
                if (me.frame.is(':hidden')) {
                    me.frame.show();
                    me.datePanel.show();
                    me.monthPanel.hide();
                    me.yearPanel.hide();
                } 
            });
        });

        // 取消按钮, 隐藏日历
        this.frame.find('.cancel-btn').on('click', function() {
            me.hideFrame();
        });
        
        // 点击表头切换年月日
        this.headerData.click(function() {
            if ($(this).hasClass('date-title')) { // 从日切换到月
                $(this).removeClass('date-title');
                $(this).addClass('month-title');
                me.setData();
                me.datePanel.hide();
                me.yearPanel.hide();
                me.monthPanel.show();
            } else if ($(this).hasClass('month-title')) { // 切换成年
                $(this).removeClass('month-title');
                $(this).addClass('year-title');
                me.setHeaderData();
                me.datePanel.hide();
                me.monthPanel.hide();
                me.yearPanel.show();
            }
        });

        // 点击月份
        $('.body-month').on('click', '.month-select', function() {
            me.curMonth = $(this).data('month');
            me.curDateObj = new Date(me.curYear, me.curMonth, 1);
            me.headerData.removeClass('month-title');
            me.headerData.addClass('date-title');
            me.setData();
            me.datePanel.show();
            me.monthPanel.hide();
        });
        // 点击年份
        $('.body-year').on('click', '.year-select', function() {
            me.curYear = $(this).data('year');
            me.curDateObj = new Date(me.curYear, me.curMonth, 1);
            me.headerData.removeClass('year-title');
            me.headerData.addClass('month-title');
            me.setData();
            me.monthPanel.show();
            me.yearPanel.hide();
        });
        // 点击日期
        $('.body-date').on('click', '.cur-month', function() {
            $(this).removeClass('hover-date');
            if (!$(this).hasClass('cur-date')) {
                $('.body-date').find('.cur-month').removeClass('cur-date');
                if (me.conf.dateSelectRange === null) {
                    // $(this).removeClass('hover-date');
                    $(this).addClass('cur-date');
                    me.initDate = new Date($(this).data('date'));
                    me.selectedBtn = $(this);
                } else {
                   var timeStart = new Date(me.conf.dateSelectRange[0]).getTime();
                   var timeEnd = new Date(me.conf.dateSelectRange[1]).getTime();
                   var selectTime = new Date($(this).data('date')).getTime();
                   if (selectTime >= timeStart && selectTime <= timeEnd) {
                       me.setSelectArr(selectTime); // 设定日期列表
                       me.datePanel.find('.cur-month').each(function(index, item) {
                           $(item).removeClass('cur-date');
                           $(item).removeClass('to-selected');
                           if ($(item).data('date') === me.getYYMMDD(new Date(me.selectBtnArr[0])) || $(item).data('date') === me.getYYMMDD(new Date(me.selectBtnArr[1]))) {
                               $(item).addClass('cur-date');
                           }
                           if (new Date($(item).data('date')).getTime() > new Date(me.selectBtnArr[0]).getTime() && new Date($(item).data('date')).getTime() < new Date(me.selectBtnArr[1]).getTime()) {
                               $(item).addClass('to-selected');
                           }
                       });
                   } else {
                       return alert('超过可选日期范围!');
                   }
                }
            }
        });
        

        // 确定按钮
        $('.confirm-btn').on('click', function() {
            if (me.conf.dateSelectRange === null) {
                me.conf.bindArea.attr('value', me.selectedBtn.data('date'));
                me.conf.callback.call(null, me.initDate);
            } else {
                if (me.selectBtnArr.length < 2) {
                    return alert('没有选择合适的日期范围!');
                } else {
                    var value1 = me.getYYMMDD(new Date(me.selectBtnArr[0])),
                        value2 = me.getYYMMDD(new Date(me.selectBtnArr[1]));
                    me.conf.bindArea.attr('value', `${value1} - ${value2}`);
                    me.conf.callback.call(null, [new Date(me.selectBtnArr[0]), new Date(me.selectBtnArr[1])]);
                }
            }
            me.hideFrame();
        });

    };
    
    DatePicker.prototype.setHeaderData = function() {
        if (this.headerData.hasClass('date-title')) {
            this.headerData.text(`${this.curYear}年${this.toFixed(this.curMonth+1)}月`);
        } else if (this.headerData.hasClass('month-title')) {
            this.headerData.text(this.curYear + '年');
        } else if (this.headerData.hasClass('year-title')) {
            this.headerData.text(this.yearArr[1] + '年 - ' + this.yearArr[this.yearArr.length - 2] + '年');
        }
    };

    DatePicker.prototype.getYYMMDD = function(date) {
        var yy = this.toFixed(date.getFullYear());
        var mm = this.toFixed(date.getMonth() + 1);
        var dd = this.toFixed(date.getDate());
        return `${yy}/${mm}/${dd}`;
    };

    DatePicker.prototype.toFixed = function(n) {
        return (n + '').length === 1? ('0' + n + ''): (n + '');
    };

    DatePicker.prototype.isValidDate = function(dateStr) {
        return new Date(dateStr).toString() !== "Invalid Date";
    };
    
    // 取得年份列表
    DatePicker.prototype.getYearSection = function(year) {
        var yearsArr = [];
        year = year.toString();
        var startNum = +(year.replace(/\d$/, '0') - 1);
        for (var i=0; i<12; i++) {
            yearsArr.push(startNum + i);
        }
        return yearsArr;
    };

    DatePicker.prototype.setSelectArr = function(time) {
        if (this.selectBtnArr.length !== 2) {
            this.selectBtnArr.push(time);
        } else {
            if (Math.abs(time - this.selectBtnArr[0]) > Math.abs(time - this.selectBtnArr[1])) {
                this.selectBtnArr[1] = time;
            } else {
                this.selectBtnArr[0] = time;
            }
        }
        this.selectBtnArr.sort(function(a, b) {
            return a-b;
        });
    };

    DatePicker.prototype.hideFrame = function() {
        this.headerData
            .removeClass('month-title')
            .removeClass('year-title')
            .addClass('date-title');
        this.setHeaderData();
        this.frame.hide();
        this.monthPanel.hide();
        this.yearPanel.hide();
        this.datePanel.hide();
    };

    // 作为jq插件
    $.datePicker = function(options) {
        var datePicker = new DatePicker(options);
        datePicker.init();
    };
}(jQuery));
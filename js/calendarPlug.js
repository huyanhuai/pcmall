//封装区间日期的日历区间
function priceCalendar(startTime, endTime, endSale, price) {
    /*此处处理以解决：ios中日期实例的问题，在日期之中添加“T”即可*/
    var startTime=startTime.replace(/\s/g,"T");
    var endTime=endTime.replace(/\s/g,"T");

    console.log(startTime, endTime);

    var innerEmpty = '';

    var year = new Date().getFullYear();      //获取当前年份
    var today = new Date().getDate();         //获取当天日期
    var month = new Date().getMonth() + 1;    //获取当前月份(月份需要+1)
    var hours = new Date().getHours();         //获取当前小时
    var min = new Date().getMinutes();         //获取当前分钟
    var this_month, this_month_count, this_start_day, this_end_day;

    var sYear = parseInt(timeTransformation(startTime, "year"));
    var sMonth = parseInt(timeTransformation(startTime, "month"));
    var sDay = parseInt(timeTransformation(startTime, "day"));
    var sTime = parseInt(timeTransformation(startTime, "hour"));

    var eYear = parseInt(timeTransformation(endTime, "year"));
    var eMonth = parseInt(timeTransformation(endTime, "month"));
    var eDay = parseInt(timeTransformation(endTime, "day"));
    var eTime = parseInt(timeTransformation(endTime, "hour"));

    //当天截止时间
    var endSaleTime = endSale;
    //
    //将今天的时间转换为1970/01/01时候的时间戳和截止时间进行比较
    var str = "1970/01/01 " + hours + ":" + min;
    var date = new Date(str);
    var time = date.getTime();
    console.log(time);


    if (sMonth < month) {
        //当月前
        this_month = month;
        this_start_day = today;
        if (eDay > today) {
            this_end_day = eDay;
        } else {
            this_end_day = today;
        }
    } else if (sMonth == month) {
        //当月
        this_month = month;
        if (sDay - today >= 0) {
            this_start_day = sDay;
        } else {
            this_start_day = today;
        }
        if (eDay > today) {
            this_end_day = eDay;
        } else {
            this_end_day = today;
        }
    } else if (sMonth > month) {
        //当月后
        this_month = sMonth;
        this_start_day = sDay;
        this_end_day = eDay;
    }
    //横跨多少月
    if (sYear == eYear) {
        this_month_count = (eMonth - this_month) + 1;
        dayHtmlFn(this_month_count, sYear, this_month)
    } else {
        var this_yearCount = eYear - sYear;
        for (var i = 0; i < this_yearCount; i++) {

            if (this_yearCount == 1) {
                dayHtmlFn(12 - sMonth + 1, sYear, this_month)
                dayHtmlFn(eMonth, sYear + 1, 1)
            }
        }
    }

    console.log("总共跨过几个月" + this_month_count);


    //循环有多少个月份
    function dayHtmlFn(this_month_count, year, this_month) {
        for (var num = 0; num < this_month_count; num++) {
            //计算当前月的天数
            var this_monthDaysCount = new Date(parseInt(year), parseInt(this_month + num), 0).getDate();
            console.log("当月天数" + this_monthDaysCount);
            //获取当月的第一天是星期几[0(周日)~6]
            var this_monthStartDayWeek = new Date(parseInt(year) + '/' + parseInt(this_month + num) + '/' + 1).getDay();
            console.log("当月第一天周几" + this_monthStartDayWeek);

            console.log("this_month:" + (this_month + num), "month:" + month)
            innerEmpty += '<div class="smallBox"><div class="calendar-day-title">' + year + '年' + (this_month + num) + '月' + '</div>';
            innerEmpty += '<ul class="calendar-days-box">';

            //计算上月空格数
            for (var j = this_monthStartDayWeek; j > 0; j--) {
                innerEmpty += '<li class="calendar-days-item"></li>';
            }


            console.log("sssssssss" + this_month_count);
            //计算本月日期
            for (var i = 1; i <= this_monthDaysCount; i++) {
                if (num == 0 && this_month >= month) {
                    if (this_month_count == 1) {
                        if (i < this_start_day) {
                            if (i == today) {
                                innerEmpty +=
                                    ' <li class="calendar-days-item today">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            } else {
                                innerEmpty +=
                                    ' <li class="calendar-days-item old">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            }
                        } else if (i > this_end_day) {
                            innerEmpty +=
                                ' <li class="calendar-days-item old">\n' +
                                '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                ' </li>';
                        } else if (i == today) {
                            if (endSaleTime > time) {
                                innerEmpty +=
                                    ' <li class="calendar-days-item new today">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    '    <span class="price">￥' + price + '</span>\n' +
                                    ' </li>';
                            } else {
                                innerEmpty +=
                                    ' <li class="calendar-days-item old today">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            }
                        } else {
                            innerEmpty +=
                                ' <li class="calendar-days-item new">\n' +
                                '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                '    <span class="price">￥' + price + '</span>\n' +
                                ' </li>';
                        }
                    } else {
                        if (i < this_start_day) {
                            if (this_month == month &&i == today) {
                                innerEmpty +=
                                    ' <li class="calendar-days-item  today">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            } else {
                                innerEmpty +=
                                    ' <li class="calendar-days-item old">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            }
                        } else if (this_month == month &&i == today) {
                            if (endSaleTime > time) {
                                innerEmpty +=
                                    ' <li class="calendar-days-item new today">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    '    <span class="price">￥' + price + '</span>\n' +
                                    ' </li>';
                            } else {
                                innerEmpty +=
                                    ' <li class="calendar-days-item old today">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            }
                        } else {
                            innerEmpty +=
                                ' <li class="calendar-days-item new">\n' +
                                '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                '    <span class="price">￥' + price + '</span>\n' +
                                ' </li>';
                        }
                    }

                } else if (num == (this_month_count - 1) && i > eDay) {
                    //判断是最后一个月，并且截止日期之后的不可点击

                    if (sYear !== eYear) {

                        innerEmpty +=
                            ' <li class="calendar-days-item new">\n' +
                            '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                            '    <span class="price">￥' + price + '</span>\n' +
                            ' </li>';

                    } else {

                        //判断是最后一个月，并且截止日期之后的不可点击
                        innerEmpty +=
                            ' <li class="calendar-days-item old">\n' +
                            '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                            ' </li>';

                    }

                } else {

                    innerEmpty +=
                        ' <li class="calendar-days-item new">\n' +
                        '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                        '    <span class="price">￥' + price + '</span>\n' +
                        ' </li>';

                }

            }

            //计算下月空格数
            for (k = 0; k < 35 - (this_monthDaysCount + this_monthStartDayWeek); k++) {//表格保持等高6行42个单元格
                innerEmpty += '<li class="calendar-days-item"></li>';
            }

            innerEmpty += '</ul></div>';

        }
    }


    $(".calendar-day-box").append(innerEmpty);


}

//区间日期显示三个日期
function choseDay(startTime, endTime, endSale) {
    /*此处处理以解决：ios中日期实例的问题，在日期之中添加“T”即可*/
    var startTime = startTime.replace(/\s/g, "T");
    var endTime = endTime.replace(/\s/g, "T");
    var innerHtml = '';
    var year = new Date().getFullYear();      //获取当前年份
    var today = new Date().getDate();         //获取当天日期
    var month = new Date().getMonth() + 1;    //获取当前月份(月份需要+1)
    var hours = new Date().getHours();         //获取当前小时
    var min = new Date().getMinutes();         //获取当前分钟
    var this_monthDaysCount = new Date(parseInt(year), parseInt(month), 0).getDate();

    var sMonth = parseInt(timeTransformation(startTime, "month"));
    var sDay = parseInt(timeTransformation(startTime, "day"));
    var sTime = parseInt(timeTransformation(startTime, "hour"));

    var eMonth = parseInt(timeTransformation(endTime, "month"));
    var eDay = parseInt(timeTransformation(endTime, "day"));
    var eTime = parseInt(timeTransformation(endTime, "hour"));

    //当天截止时间
    var endSaleTime = endSale;

    //将今天的时间转换为1970/01/01时候的时间戳和截止时间进行比较
    var str = "1970/01/01 " + hours + ":" + min;
    var date = new Date(str);
    var time = date.getTime();

    /*此处有一个bug，每个月月底触发*/
    //明天
    var t, a, nextMonth;
    //当月天数
    var monthDays = new Date(parseInt(year), parseInt(month), 0).getDate();
    console.log("你试试试试+" + monthDays);
    /*每个月倒数第二天*/
    if (monthDays - today == 1) {
        nextMonth = month;
        afterMonth = month + 1;
        t = monthDays;
        a = 1;
    } else if (monthDays - today == 0) {
        /*每个月最后一天*/
        nextMonth = month + 1;
        afterMonth = month + 1;
        t = 1;
        a = 2;
    } else {
        nextMonth = month;
        afterMonth = month;
        t = today + 1;
        a = today + 2;
    }


    var newToday =
        '<div class="dateList-day com">'+
            '<span>今天</span>'+
           ' <span class="lay-calendar" data-year="'+year+'">' + month + '月' + today + '日' + '</span>'+
        '</div>';
        // '<li class="package-data-item com">\n' +
        // '   <p class="lay-data">今天</p>\n' +
        // '   <p class="lay-calendar" data-year="'+year+'">' + month + '月' + today + '日' + '</p>\n' +
        // '</li>';
    var oldToday =
        '<div class="dateList-day invalid">'+
            '<span>今天</span>'+
           ' <span>' + month + '月' + today + '日' + '</span>'+
        '</div>';
        // '<li class="package-data-item invalid">\n' +
        // '   <p class="lay-data">今天</p>\n' +
        // '   <p class="lay-calendar" data-year="'+year+'">' + month + '月' + today + '日' + '</p>\n' +
        // '</li>';
    var newTomorrow =
        '<div class="dateList-day com">'+
            '<span>明天</span>'+
            ' <span class="lay-calendar" data-year="'+year+'">' + nextMonth + '月' + t + '日' + '</span>'+
        '</div>';
        // '<li class="package-data-item com">\n' +
        // '   <p class="lay-data">明天</p>\n' +
        // '   <p class="lay-calendar" data-year="'+year+'">' + nextMonth + '月' + t + '日' + '</p>\n' +
        // '</li>';
    var oldTomorrow =
        '<div class="dateList-day invalid">'+
            '<span>明天</span>'+
            ' <span class="lay-calendar" data-year="'+year+'">' + nextMonth + '月' + t + '日' + '</span>'+
        '</div>';
        // '<li class="package-data-item invalid">\n' +
        // '   <p class="lay-data">明天</p>\n' +
        // '   <p class="lay-calendar" data-year="'+year+'">' + nextMonth + '月' + t + '日' + '</p>\n' +
        // '</li>';
    var afterDay =
        '<div class="dateList-day com">'+
            '<span>后天</span>'+
            ' <span class="lay-calendar" data-year="'+year+'">' + afterMonth + '月' + a + '日' + '</span>'+
        '</div>';
        // '<li class="package-data-item com">\n' +
        // '   <p class="lay-data">后天</p>\n' +
        // '   <p class="lay-calendar" data-year="'+year+'">' + afterMonth + '月' + a + '日' + '</p>\n' +
        // '</li>';
    var other =
        '<div class="dateList-day com dateList-otherday" ">'+
            '<span>其他日期</span>'+
        '</div>';
        // '<li class="package-data-item com other">\n' +
        // '   其他日期\n' +
        // '</li>';


    if (sMonth < month && eMonth == month) {
        if (eDay - today == 0) {
            innerHtml += newToday + other;
        } else if (eDay - today == 1) {
            if (endSaleTime > time) {
                innerHtml += newToday;
            } else {
                innerHtml += oldToday;
            }
            innerHtml += newTomorrow + other;
        } else if (eDay - today >= 2) {
            if (endSaleTime > time) {
                innerHtml += newToday;
            } else {
                innerHtml += oldToday;
            }
            innerHtml += newTomorrow + afterDay + other;
        } else {
            innerHtml += '<span>已失效</span>';
        }
    }
    else if (sMonth < month && eMonth > month) {
        if (endSaleTime > time) {
            innerHtml += newToday;
        } else {
            innerHtml += oldToday;
        }
        innerHtml += newTomorrow + afterDay + other;
    }
    else if (sMonth == month && eMonth == month) {
        if (sDay <= today) {
            if (eDay - today == 0) {
                if (endSaleTime > time) {
                    innerHtml += newToday;
                } else {
                    innerHtml += oldToday;
                }
                innerHtml += other;
            } else if (eDay - today == 1) {
                if (endSaleTime > time) {
                    innerHtml += newToday;
                } else {
                    innerHtml += oldToday;
                }
                innerHtml += newTomorrow + other;
            } else if (eDay - today >= 2) {
                if (endSaleTime > time) {
                    innerHtml += newToday;
                } else {
                    innerHtml += oldToday;
                }
                innerHtml += newTomorrow + afterDay + other;
            } else {
                innerHtml += '<span>已失效</span>';
            }
        } else {
            if (sDay - today == 0) {
                innerHtml += newToday + newTomorrow + afterDay + other;
            } else if (sDay - today == 1) {
                innerHtml += oldToday + newTomorrow + afterDay + other;
            } else if (sDay - today == 2) {
                innerHtml += oldToday + oldTomorrow + afterDay + other;
            } else if (sDay - today > 2) {
                innerHtml += other;
            }
        }
    }
    else if (sMonth == month && eMonth > month) {
        if (sDay <= today) {
            var num = (this_monthDaysCount - today) + (eDay - 1);
            if (num == 0) {
                if (endSaleTime > time) {
                    innerHtml += newToday;
                } else {
                    innerHtml += oldToday;
                }
                innerHtml += other;
            } else if (num == 1) {
                if (endSaleTime > time) {
                    innerHtml += newToday;
                } else {
                    innerHtml += oldToday;
                }
                innerHtml += newTomorrow + other;
            } else if (num >= 2) {
                if (endSaleTime > time) {
                    innerHtml += newToday;
                } else {
                    innerHtml += oldToday;
                }
                innerHtml += newTomorrow + afterDay + other;
            }
        } else {
            if (sDay - today == 0) {
                innerHtml += newToday + newTomorrow + afterDay + other;
            } else if (sDay - today == 1) {
                innerHtml += oldToday + newTomorrow + afterDay + other;
            } else if (sDay - today == 2) {
                innerHtml += oldToday + oldTomorrow + afterDay + other;
            } else if (sDay - today > 2) {
                innerHtml += other;
            }
        }

    }
    else if (sMonth > month) {
        innerHtml += other;
    }

    return innerHtml;

}

//封装获取当天的日期
function getThisDay() {
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var data = new Date().getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (data < 10) {
        data = "0" + data;
    }
    return year + "-" + month + "-" + data;
}

//周区间
function priceCalendarWeek(startTime, endTime, endSale, price, weekItem) {
    /*此处处理以解决：ios中日期实例的问题，在日期之中添加“T”即可*/
    var startTime=startTime.replace(/\s/g,"T");
    var endTime=endTime.replace(/\s/g,"T");

    weekItem = weekItem.split(",");

    console.log(startTime, endTime);

    var innerEmpty = '';

    var year = new Date().getFullYear();      //获取当前年份
    var today = new Date().getDate();         //获取当天日期
    var month = new Date().getMonth() + 1;    //获取当前月份(月份需要+1)
    var hours = new Date().getHours();         //获取当前小时
    var min = new Date().getMinutes();         //获取当前分钟
    var this_month, this_month_count, this_start_day, this_end_day;

    var sYear = parseInt(timeTransformation(startTime, "year"));
    var sMonth = parseInt(timeTransformation(startTime, "month"));
    var sDay = parseInt(timeTransformation(startTime, "day"));
    var sTime = parseInt(timeTransformation(startTime, "hour"));

    var eYear = parseInt(timeTransformation(endTime, "year"));
    var eMonth = parseInt(timeTransformation(endTime, "month"));
    var eDay = parseInt(timeTransformation(endTime, "day"));
    var eTime = parseInt(timeTransformation(endTime, "hour"));

    //当天截止时间
    var endSaleTime = endSale;
    // var endSaleTime = "10140000";
    //
    //将今天的时间转换为1970/01/01时候的时间戳和截止时间进行比较
    var str = "1970/01/01 " + hours + ":" + min;
    var date = new Date(str);
    var time = date.getTime();


    if (sMonth < month) {
        //当月前
        this_month = month;
        this_start_day = today;
        if (eDay > today) {
            this_end_day = eDay;
        } else {
            this_end_day = today;
        }
    } else if (sMonth == month) {
        //当月
        this_month = month;
        if (sDay - today >= 0) {
            this_start_day = sDay;
        } else {
            this_start_day = today;
        }
        if (eDay > today) {
            this_end_day = eDay;
        } else {
            this_end_day = today;
        }
    } else if (sMonth > month) {
        //当月后
        this_month = sMonth;
        this_start_day = sDay;
        this_end_day = eDay;
    }


    //横跨多少月
    if (sYear == eYear) {
        this_month_count = (eMonth - this_month) + 1;
        dayHtmlFn(this_month_count, sYear, this_month)
    } else {
        var this_yearCount = eYear - sYear;
        for (var i = 0; i < this_yearCount; i++) {

            if (this_yearCount == 1) {
                dayHtmlFn(12 - sMonth + 1, sYear, this_month)
                dayHtmlFn(eMonth, sYear + 1, 1)
            }
        }
    }

    console.log("总共跨过几个月" + this_month_count);


    //循环有多少个月份
    function dayHtmlFn(this_month_count, year, this_month) {
        for (var num = 0; num < this_month_count; num++) {
            //计算当前月的天数
            var this_monthDaysCount = new Date(parseInt(year), parseInt(this_month + num), 0).getDate();
            console.log("当月天数" + this_monthDaysCount);
            //获取当月的第一天是星期几[0(周日)~6]
            var this_monthStartDayWeek = new Date(parseInt(year) + '/' + parseInt(this_month + num) + '/' + 1).getDay();
            console.log("当月第一天周几" + this_monthStartDayWeek);

            console.log("this_month:" + (this_month + num), "month:" + month);
            innerEmpty += '<div class="smallBox"><div class="calendar-day-title">' + year + '年' + (this_month + num) + '月' + '</div>';
            innerEmpty += '<ul class="calendar-days-box">';

            //计算上月空格数
            for (var j = this_monthStartDayWeek; j > 0; j--) {
                innerEmpty += '<li class="calendar-days-item"></li>';
            }

            console.log("sssssssss" + this_month_count);
            console.log(eDay);
            //计算本月日期
            for (var i = 1; i <= this_monthDaysCount; i++) {

                var weekDay = new Date(parseInt(year) + '/' + parseInt(this_month + num) + '/' + i).getDay();

                if (num == 0 && this_month >= month) {  //只有一个月，且这个月是在本月之后

                    if (this_month_count == 1) {  //只有一个月

                        if (i < this_start_day) {  //i指的是当天，  15日为例  i=15  this_start_day=17
                            if (i == today) {
                                innerEmpty +=
                                    ' <li class="calendar-days-item today">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            } else {
                                innerEmpty +=
                                    ' <li class="calendar-days-item old">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            }
                        } else if (i > this_end_day) {  //i指的是当天，  15日为例  i=15  this_start_day=13
                            innerEmpty +=
                                ' <li class="calendar-days-item old">\n' +
                                '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                ' </li>';

                        } else if (i == today) {  //i指的是当天，  15日为例  i=15  this_start_day=15

                            if (weekItem.indexOf(weekDay.toString()) > -1) {
                                if (endSaleTime > time) {//endSaleTime=当天截止时间  time=此时此刻   11:00  10:00
                                    innerEmpty +=
                                        ' <li class="calendar-days-item new today">\n' +
                                        '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                        '    <span class="price">￥' + price + '</span>\n' +
                                        ' </li>';
                                } else {
                                    innerEmpty +=
                                        ' <li class="calendar-days-item old today">\n' +
                                        '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                        ' </li>';
                                }
                            } else {
                                innerEmpty +=
                                    ' <li class="calendar-days-item old today">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            }

                        } else {

                            if (weekItem.indexOf(weekDay.toString()) > -1) {
                                innerEmpty +=
                                    ' <li class="calendar-days-item new">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    '    <span class="price">￥' + price + '</span>\n' +
                                    ' </li>';
                            } else {
                                innerEmpty +=
                                    ' <li class="calendar-days-item old">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            }
                        }
                    } else {//横跨好几个月
                        if (i < this_start_day) {  //i指的是当天，  15日为例  i=15  this_start_day=17

                            if (this_month == month && i == today) {
                                innerEmpty +=
                                    ' <li class="calendar-days-item today">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            } else {
                                innerEmpty +=
                                    ' <li class="calendar-days-item old">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            }
                        } else if (this_month == month && i == today) {  //i指的是当天，  15日为例  i=15  this_start_day=15

                            if (weekItem.indexOf(weekDay.toString()) > -1) {
                                if (endSaleTime > time) {//endSaleTime=当天截止时间  time=此时此刻   11:00  10:00
                                    innerEmpty +=
                                        ' <li class="calendar-days-item new today">\n' +
                                        '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                        '    <span class="price">￥' + price + '</span>\n' +
                                        ' </li>';
                                } else {
                                    innerEmpty +=
                                        ' <li class="calendar-days-item old today">\n' +
                                        '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                        ' </li>';
                                }
                            } else {
                                innerEmpty +=
                                    ' <li class="calendar-days-item old today">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '" data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            }

                        } else {

                            if (weekItem.indexOf(weekDay.toString()) > -1) {
                                innerEmpty +=
                                    ' <li class="calendar-days-item new">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    '    <span class="price">￥' + price + '</span>\n' +
                                    ' </li>';
                            } else {
                                innerEmpty +=
                                    ' <li class="calendar-days-item old">\n' +
                                    '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                    ' </li>';
                            }
                        }

                    }

                } else if (num == (this_month_count - 1) && i > eDay) {

                    if (sYear !== eYear) {
                        if (weekItem.indexOf(weekDay.toString()) > -1) {
                            innerEmpty +=
                                ' <li class="calendar-days-item new">\n' +
                                '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                '    <span class="price">￥' + price + '</span>\n' +
                                ' </li>';
                        } else {
                            innerEmpty +=
                                ' <li class="calendar-days-item old">\n' +
                                '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                                ' </li>';
                        }
                    } else {

                        //判断是最后一个月，并且截止日期之后的不可点击
                        innerEmpty +=
                            ' <li class="calendar-days-item old">\n' +
                            '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                            ' </li>';

                    }

                } else {

                    if (weekItem.indexOf(weekDay.toString()) > -1) {
                        innerEmpty +=
                            ' <li class="calendar-days-item new">\n' +
                            '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                            '    <span class="price">￥' + price + '</span>\n' +
                            ' </li>';
                    } else {
                        innerEmpty +=
                            ' <li class="calendar-days-item old">\n' +
                            '    <span class="days" data-month="' + (this_month + num) + '"  data-year="' + year + '">' + i + '</span>\n' +
                            ' </li>';
                    }

                }


            }

            //计算下月空格数
            for (k = 0; k < 35 - (this_monthDaysCount + this_monthStartDayWeek); k++) {//表格保持等高6行42个单元格
                innerEmpty += '<li class="calendar-days-item"></li>';
            }

            innerEmpty += '</ul></div>';

        }
    }


    $(".calendar-day-box").append(innerEmpty);


}
//周区间
//区间日期显示三个日期
function choseDayWeek(startTime, endTime, endSale,weekItem) {
    /*此处处理以解决：ios中日期实例的问题，在日期之中添加“T”即可*/
    var startTime = startTime.replace(/\s/g, "T");
    var endTime = endTime.replace(/\s/g, "T");

    var weekItem = weekItem.split(",");

    var innerHtml = '';
    var year = new Date().getFullYear();      //获取当前年份
    var today = new Date().getDate();         //获取当天日期
    var month = new Date().getMonth() + 1;    //获取当前月份(月份需要+1)
    var hours = new Date().getHours();         //获取当前小时
    var min = new Date().getMinutes();         //获取当前分钟
    var this_monthDaysCount = new Date(parseInt(year), parseInt(month), 0).getDate();

    var sYear = parseInt(timeTransformation(startTime, "year"));
    var sMonth = parseInt(timeTransformation(startTime, "month"));
    var sDay = parseInt(timeTransformation(startTime, "day"));
    var sTime = parseInt(timeTransformation(startTime, "hour"));

    var eYear = parseInt(timeTransformation(endTime, "year"));
    var eMonth = parseInt(timeTransformation(endTime, "month"));
    var eDay = parseInt(timeTransformation(endTime, "day"));
    var eTime = parseInt(timeTransformation(endTime, "hour"));

    //当天截止时间
    var endSaleTime = endSale;

    //将今天的时间转换为1970/01/01时候的时间戳和截止时间进行比较
    var str = "1970/01/01 " + hours + ":" + min;
    var date = new Date(str);
    var time = date.getTime();


    //明天
    var t, a, nextMonth;
    //当月天数
    var monthDays = new Date(parseInt(year), parseInt(month), 0).getDate();
    console.log("你试试试试+" + monthDays);
    /*每个月倒数第二天*/
    if (monthDays - today == 1) {
        nextMonth = month;
        afterMonth = month + 1;
        t = monthDays;
        a = 1;
    } else if (monthDays - today == 0) {
        /*每个月最后一天*/
        nextMonth = month + 1;
        afterMonth = month + 1;
        t = 1;
        a = 2;
    } else {
        nextMonth = month;
        afterMonth = month;
        t = today + 1;
        a = today + 2;
    }

    var newToday =
        '<div class="dateList-day com">'+
            '<span>今天</span>'+
           ' <span class="lay-calendar" data-year="'+year+'">' + month + '月' + today + '日' + '</span>'+
        '</div>';
        // '<li class="package-data-item com">\n' +
        // '   <p class="lay-data">今天</p>\n' +
        // '   <p class="lay-calendar" data-year="'+year+'">' + month + '月' + today + '日' + '</p>\n' +
        // '</li>';
    var oldToday =
        '<div class="dateList-day invalid">'+
            '<span>今天</span>'+
           ' <span>' + month + '月' + today + '日' + '</span>'+
        '</div>';
        // '<li class="package-data-item invalid">\n' +
        // '   <p class="lay-data">今天</p>\n' +
        // '   <p class="lay-calendar" data-year="'+year+'">' + month + '月' + today + '日' + '</p>\n' +
        // '</li>';
    var newTomorrow =
        '<div class="dateList-day com">'+
            '<span>明天</span>'+
            ' <span class="lay-calendar" data-year="'+year+'">' + nextMonth + '月' + t + '日' + '</span>'+
        '</div>';
        // '<li class="package-data-item com">\n' +
        // '   <p class="lay-data">明天</p>\n' +
        // '   <p class="lay-calendar" data-year="'+year+'">' + nextMonth + '月' + t + '日' + '</p>\n' +
        // '</li>';
    var oldTomorrow =
        '<div class="dateList-day invalid">'+
            '<span>明天</span>'+
            ' <span class="lay-calendar" data-year="'+year+'">' + nextMonth + '月' + t + '日' + '</span>'+
        '</div>';
        // '<li class="package-data-item invalid">\n' +
        // '   <p class="lay-data">明天</p>\n' +
        // '   <p class="lay-calendar" data-year="'+year+'">' + nextMonth + '月' + t + '日' + '</p>\n' +
        // '</li>';
    var afterDay =
        '<div class="dateList-day com">'+
            '<span>后天</span>'+
            ' <span class="lay-calendar" data-year="'+year+'">' + afterMonth + '月' + a + '日' + '</span>'+
        '</div>';
        // '<li class="package-data-item com">\n' +
        // '   <p class="lay-data">后天</p>\n' +
        // '   <p class="lay-calendar" data-year="'+year+'">' + afterMonth + '月' + a + '日' + '</p>\n' +
        // '</li>';


    // if (sMonth < month && eMonth == month) {  // 2  8  8
    //     if (eDay - today == 0) {
    //         innerHtml += newToday + other;
    //     } else if (eDay - today == 1) {
    //         if (endSaleTime > time) {
    //             innerHtml += newToday;
    //         } else {
    //             innerHtml += oldToday;
    //         }
    //         innerHtml += newTomorrow + other;
    //     } else if (eDay - today >= 2) {
    //         if (endSaleTime > time) {
    //             innerHtml += newToday;
    //         } else {
    //             innerHtml += oldToday;
    //         }
    //         innerHtml += newTomorrow + afterDay + other;
    //     } else {
    //         innerHtml += '<span>已失效</span>';
    //     }
    // }
    // else if (sMonth < month && eMonth > month) {
    //     if (endSaleTime > time) {
    //         innerHtml += newToday;
    //     } else {
    //         innerHtml += oldToday;
    //     }
    //     innerHtml += newTomorrow + afterDay + other;
    // }
    // else if (sMonth == month && eMonth == month) {
    //     if (sDay <= today) {
    //         if (eDay - today == 0) {
    //             if (endSaleTime > time) {
    //                 innerHtml += newToday;
    //             } else {
    //                 innerHtml += oldToday;
    //             }
    //             innerHtml += other;
    //         } else if (eDay - today == 1) {
    //             if (endSaleTime > time) {
    //                 innerHtml += newToday;
    //             } else {
    //                 innerHtml += oldToday;
    //             }
    //             innerHtml += newTomorrow + other;
    //         } else if (eDay - today >= 2) {
    //             if (endSaleTime > time) {
    //                 innerHtml += newToday;
    //             } else {
    //                 innerHtml += oldToday;
    //             }
    //             innerHtml += newTomorrow + afterDay + other;
    //         } else {
    //             innerHtml += '<span>已失效</span>';
    //         }
    //     } else {
    //         if (sDay - today == 0) {
    //             innerHtml += newToday + newTomorrow + afterDay + other;
    //         } else if (sDay - today == 1) {
    //             innerHtml += oldToday + newTomorrow + afterDay + other;
    //         } else if (sDay - today == 2) {
    //             innerHtml += oldToday + oldTomorrow + afterDay + other;
    //         } else if (sDay - today > 2) {
    //             innerHtml += other;
    //         }
    //     }
    // }
    // else if (sMonth == month && eMonth > month) {
    //     if (sDay <= today) {
    //         var num = (this_monthDaysCount - today) + (eDay - 1);
    //         if (num == 0) {
    //             if (endSaleTime > time) {
    //                 innerHtml += newToday;
    //             } else {
    //                 innerHtml += oldToday;
    //             }
    //             innerHtml += other;
    //         } else if (num == 1) {
    //             if (endSaleTime > time) {
    //                 innerHtml += newToday;
    //             } else {
    //                 innerHtml += oldToday;
    //             }
    //             innerHtml += newTomorrow + other;
    //         } else if (num >= 2) {
    //             if (endSaleTime > time) {
    //                 innerHtml += newToday;
    //             } else {
    //                 innerHtml += oldToday;
    //             }
    //             innerHtml += newTomorrow + afterDay + other;
    //         }
    //     } else {
    //         if (sDay - today == 0) {
    //             innerHtml += newToday + newTomorrow + afterDay + other;
    //         } else if (sDay - today == 1) {
    //             innerHtml += oldToday + newTomorrow + afterDay + other;
    //         } else if (sDay - today == 2) {
    //             innerHtml += oldToday + oldTomorrow + afterDay + other;
    //         } else if (sDay - today > 2) {
    //             innerHtml += other;
    //         }
    //     }
    //
    // }
    // else if (sMonth > month) {
    //     innerHtml += other;
    // }

    innerHtml += other;

    return innerHtml;

}
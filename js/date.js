(function ($) {
    "use strict";
    var calendarSwitch = (function () {
        function calendarSwitch(element, options) {
            this.settings = $.extend(true, $.fn.calendarSwitch.defaults, options || {});
            this.element = element;
            this.init();
        }

        calendarSwitch.prototype = {
            /*璇存槑锛氬垵濮嬪寲鎻掍欢*/
            /*瀹炵幇锛氬垵濮嬪寲dom缁撴瀯锛屽竷灞€锛屽垎椤靛強缁戝畾浜嬩欢*/
            init: function () {
                var me = this;
                me.selectors = me.settings.selectors;
                me.sections = me.selectors.sections;
                me.index = me.settings.index;
                me.comfire = me.settings.comfireBtn;
                me.cancel = me.settings.cancelBtn;


                var html = "<div class='headerWrapper'><div class='cancelChoose'>取消</div><div class='headerTip'>请选择入住离店日期</div><div class='comfire'>确定</div></div><table class='dateZone'><tr><td class='colo'>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td class='colo'>六</td></tr></table><table class='dateZone'><tr><td class='colo'>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td class='colo'>六</td></tr></table>" + "<div class='tbody'></div>"
                $(me.sections).append(html);
                $(me.sections).find('.headerWrapper').css({
                    "width": "100%",
                    "height": "50px",
                    "line-height": "50px",
                    // "position": "fixed",
                    // "top": "0",
                    // "left": "0",
                    "margin": "auto",
                    "background": "#fff"
                });
                $(me.sections).find('.cancelChoose').css({
                    "height": "26px",
                    "line-height": "24px",
                    "width": "60px",
                    "color": "#47bfc6",
                    "position": "absolute",
                    "left": "15px",
                    "text-align": "center",
                    "font-size": "14px",
                    "cursor": "pointer",
                    "top": "15px"
                });
                $(me.sections).find('.headerTip').css({
                    "width": "130px",
                    "text-align": "center",
                    "line-height": "50px",
                    "font-size": "14px",
                    "position": "absolute",
                    "left": "185px",
                    "top": "0"
                });
                $(me.sections).find(me.comfire).css({
                    "height": "26px",
                    "line-height": "24px",
                    "width": "60px",
                    "color": "#47bfc6",
                    "position": "absolute",
                    "right": "25px",
                    "text-align": "center",
                    "font-size": "14px",
                    "cursor": "pointer",
                    "top": "15px",
                    "border": "1px solid #47bfc6"

                });
                for (var q = 0; q < me.index; q++) {
                    var select = q;
                    $(me.sections).find(".tbody").append("<div><p class='ny1'></p><table class='dateTable'></table></div>")
                    var currentDate = new Date();
                    currentDate.setMonth(currentDate.getMonth() + select);
                    var currentYear = currentDate.getFullYear();
                    var currentMonth = currentDate.getMonth();
                    var setcurrentDate = new Date(currentYear, currentMonth, 1);
                    var firstDay = setcurrentDate.getDay();
                    var yf = currentMonth + 1;
                    if (yf < 10) {
                        // $(me.sections).find('.ny1').eq(select).text(currentYear + '年' + '0' + yf + '月');
                        $(me.sections).find('.ny1').eq(select).text(currentYear + '年' + '0' + yf + '月');
                    } else {
                        $(me.sections).find('.ny1').eq(select).text(currentYear + '年' + yf + '月');
                    }
                    var DaysInMonth = [];
                    if (me._isLeapYear(currentYear)) {
                        DaysInMonth = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                    } else {
                        DaysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                    }
                    var Ntd = firstDay + DaysInMonth[currentMonth];
                    var Ntr = Math.ceil(Ntd / 7);
                    for (var i = 0; i < Ntr; i++) {
                        $(me.sections).find('.dateTable').eq(select).append('<tr></tr>');
                    }
                    ;
                    var createTd = $(me.sections).find('.dateTable').eq(select).find('tr');
                    createTd.each(function (index, element) {
                        for (var j = 0; j < 7; j++) {
                            $(this).append('<td></td>')
                        }
                    });
                    var arryTd = $(me.sections).find('.dateTable').eq(select).find('td');
                    for (var m = 0; m < DaysInMonth[currentMonth]; m++) {
                        arryTd.eq(firstDay++).text(m + 1);
                    }
                }
                me._initselected();

                me.element.on('click', function (event) {
                    event.preventDefault();
                    me._slider(me.sections)
                });
                $(me.comfire).on('click', function (event) {
                    event.preventDefault();
                    var st = $('#startDate').val();
                    var en = $('#endDate').val();
                    if (st) {
                        me._slider(me.sections)
                        me._callback();

                    } else {
                        var b = new Date();
                        var ye = b.getFullYear();
                        var mo = b.getMonth() + 1;
                        var da = b.getDate();
                        $('#startDate').val(ye + '-' + mo + '-' + da);
                        b = new Date(b.getTime() + 24 * 3600 * 1000);
                        var ye = b.getFullYear();
                        var mo = b.getMonth() + 1;
                        var da = b.getDate();
                        $('#endDate').val(ye + '-' + mo + '-' + da);
                        // alert("璇烽€夋嫨入住离店鏃ユ湡")
                        me._slider(me.sections)
                        me._callback()
                    }

                });
                $(me.cancel).on('click', function (event) {
                    event.preventDefault();
                    me._slider(me.sections);
                    me._callback();

                });

            },
            _isLeapYear: function (year) {
                return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
            },
            _slider: function (id) {
                var me = this;
                me.animateFunction = me.settings.animateFunction;
                if (me.animateFunction == "fadeToggle") {
                    $(id).fadeToggle();
                } else if (me.animateFunction == "slideToggle") {
                    $(id).slideToggle();
                } else if (me.animateFunction == "toggle") {
                    $(id).toggle();
                }

            },
            _initselected: function () {
                var me = this;
                me.comeColor = me.settings.comeColor;
                me.outColor = me.settings.outColor;
                me.daysnumber = me.settings.daysnumber;
                var strDays = new Date().getDate();
                var arry = [];
                var arry1 = [];
                var tds = $(me.sections).find('.dateTable').eq(0).find('td');
                tds.each(function (index, element) {
                    if ($(this).text() == strDays) {
                        var r = index;
                        $(this).append('</br><p class="rz">入住</p>');
                        if ($(this).next().text() != "") {
                            $(this).next().append('</br><p class="rz">离店</p>');
                        } else {
                            $(".dateTable").eq(1).find("td").each(function (index, el) {
                                if ($(this).text() != "") {
                                    $(this).append('</br><p class="rz">离店</p>');
                                    return false;
                                }
                            });
                        }
                        me._checkColor(me.comeColor, me.outColor)

                    }
                })

                $(me.sections).find('.tbody').find('td').each(function (index, element) {
                    if ($(this).text() != '') {
                        arry.push(element);
                    }
                });
                for (var i = 0; i < strDays - 1; i++) {
                    $(arry[i]).css('color', '#ccc');
                }
                if (me.daysnumber) {
                    //鍙互鍦ㄨ繖閲屾坊鍔�90澶╃殑鏉′欢
                    for (var i = strDays - 1; i < strDays + 90; i++) {
                        arry1.push(arry[i])
                    }
                    for (var i = strDays + 90; i < $(arry).length; i++) {
                        $(arry[i]).css('color', '#ccc')
                    }
                } else {
                    for (var i = strDays - 1; i < $(arry).length; i++) {
                        arry1.push(arry[i])
                    }
                }
                me._selectDate(arry1)
            },
            _checkColor: function (comeColor, outColor) {
                var me = this;
                var rz = $(me.sections).find('.rz');
                console.log(rz);
                for (var i = 0; i < rz.length; i++) {
                    if (rz.eq(i).text() == "入住") {
                        rz.eq(i).closest('td').css({
                            'background': comeColor,
                            'color': '#fff'
                        });
                    } else {
                        rz.eq(i).closest('td').css({
                            'background': outColor,
                            'color': '#fff'
                        });
                    }
                }

            },
            _callback: function () {
                var me = this;
                if (me.settings.callback && $.type(me.settings.callback) === "function") {
                    me.settings.callback();
                }
            },
            _selectDate: function (arry1) {
                var me = this;
                me.comeColor = me.settings.comeColor;
                me.outColor = me.settings.outColor;
                me.comeoutColor = me.settings.comeoutColor;
                me.sections = me.selectors.sections;

                var flag = 0;
                var first;
                var sum;
                var second;
                $(arry1).on('click', function (index) {
                    //绗竴娆＄偣鍑�
                    if (flag == 0) {
                        $(me.sections).find('.hover').remove();
                        $(me.sections).find('.tbody').find('p').remove('.rz');
                        $(me.sections).find('.tbody').find('br').remove();
                        $(arry1).css({
                            'background': '#fff',
                            'color': '#333'
                        });
                        $(this).append('<p class="rz">入住</p>')
                        first = $(arry1).index($(this));
                        me._checkColor(me.comeColor, me.outColor)
                        flag = 1;
                    } else if (flag == 1) { //绗簩娆＄偣鍑�
                        flag = 0;

                        second = $(arry1).index($(this))
                        sum = Math.abs(second - first);
                        if (sum == 0) {
                            sum = 1;
                        }

                        if (first < second) {
                            $(this).append('<p class="rz">离店</p>')
                            first = first + 1;
                            for (first; first < second; first++) {
                                $(arry1[first]).css({
                                    'background': me.comeoutColor,
                                    'color': '#fff'
                                });
                            }
                        } else if (first == second) {

                            $(me.sections).find('.rz').text('入住');
                            $(this).append('<p class="rz">离店</p>');
                            $(this).find('.rz').css('font-size', '12px');
                            var e = $(this).text().replace(/[^0-9]/ig, "");
                            var c, d;
                            var a = new Array();
                            var b = new Array();
                            var f;
                            var same = $(this).parents('table').prev('p').text().replace(/[^0-9]/ig, "").split('');
                            for (var i = 0; i < 4; i++) {
                                a.push(same[i]);

                            }
                            c = a.join('');
                            for (var j = 4; j < 6; j++) {
                                b.push(same[j]);
                            }
                            d = b.join('');

                            f = c + '-' + d + '-' + e;
                            $("#startDate").val(f);

                        } else if (first > second) {

                            $(me.sections).find('.rz').text('离店');
                            $(this).append('<p class="rz">入住</p>')
                            second = second + 1;
                            for (second; second < first; second++) {
                                $(arry1[second]).css({
                                    'background': me.comeoutColor,
                                    'color': '#fff'
                                });
                            }
                        }
                        $(me.sections).find('.rz').each(function (index, element) {
                            if ($(this).text() == '离店') {
                                $(this).parent('td').append('<span class="hover">' + sum + '</span>');
                                $(this).parent('td').css('position', 'relative');
                            }

                        });

                        $('.hover').css({
                            'position': 'absolute',
                            'left': '-17px',
                            'top': '0px'
                        })
                        me._slider('firstSelect')

                        //鐐瑰嚮鐨勬棩鏈熷瓨鍏nput
                        $(me.sections).find('.tbody .rz').each(function (index, element) {
                            if ($(this).text() == '入住') {
                                // var day = parseInt($(this).parent().text().replace(/[^0-9]/ig, "")) //鎴彇瀛楃涓蹭腑鐨勬暟瀛�
                                var str = $(this).parent().text().replace(/入住/ig, ",").replace(/晚/ig, "").replace(/离店/ig, "").split(",");
                                var day = str[0];
                                if(day<10){
                                    day="0"+day;
                                }
                                var startDayArrays = $(this).parents('table').prev('p').text().split('');
                                var startDayArrayYear = [];
                                var startDayArrayMonth = [];
                                var startDayYear = "";
                                var startDayMonth = "";
                                for (var i = 0; i < me.index; i++) {
                                    var select = i;
                                    startDayArrayYear.push(startDayArrays[select])
                                }
                                startDayYear = startDayArrayYear.join('');
                                for (var i = 5; i < 7; i++) {
                                    startDayArrayMonth.push(startDayArrays[i])
                                }
                                startDayMonth = startDayArrayMonth.join('');
                                $('#startDate').val(startDayYear + '-' + startDayMonth + '-' + day)
                            }
                            if ($(this).text() == '离店') {
                                // var day = parseInt($(this).parent().text().replace(/[^0-9]/ig, "").substring(0, 2));
                                // alert($(this).parent().text().replace(/离店/ig, ",").replace(/晚/ig, ""));
                                // day=$(this).parent().text().split('绂�')[0];
                                var str = $(this).parent().text().replace(/离店/ig, ",").replace(/晚/ig, "").split(",");
                                var day = str[0];
                                if(day<10){
                                    day="0"+day;
                                }
                                var endDayArrays = $(this).parents('table').prev('p').text().split('');
                                var endDayArrayYear = [];
                                var endDayArrayMonth = [];
                                var endDayYear = "";
                                var endDayMonth = "";
                                for (var i = 0; i < 4; i++) {
                                    endDayArrayYear.push(endDayArrays[i])
                                }
                                endDayYear = endDayArrayYear.join('');
                                for (var i = 5; i < 7; i++) {
                                    endDayArrayMonth.push(endDayArrays[i])
                                }
                                endDayMonth = endDayArrayMonth.join('');

                                $('#endDate').val(endDayYear + '-' + endDayMonth + '-' + day);
                                var a = "12-3";
                                console.log(a.replace(/[^0-9]/ig, ""));
                                console.log($("#startDate").val())
                                console.log($("#endDate").val().replace(/[^0-9]/ig, ""))
                                if (parseInt($("#startDate").val().replace(/[^0-9]/ig, "")) == parseInt($("#endDate").val().replace(/[^0-9]/ig, ""))) {
                                    var x = $('#startDate').val();
                                    var a = new Date(x.replace(/-/g, "/"));
                                    var b = new Date();
                                    b = new Date(a.getTime() + 24 * 3600 * 1000);
                                    var ye = b.getFullYear();
                                    var mo = b.getMonth() + 1;
                                    var da = b.getDate();
                                    $('#endDate').val(ye + '-' + mo + '-' + da);


                                }

                                // dateNum();
                            }
                            startDayArrayYear = [];
                            startDayArrayMonth = [];
                            endDayArrayYear = [];
                            endDayArrayMonth = [];

                        });
                        var myweek = ["鏄熸湡鏃�", "鏄熸湡涓€", "鏄熸湡浜�", "鏄熸湡涓�", "鏄熸湡鍥�", "鏄熸湡浜�", "鏄熸湡鍏�"];

                        var st = new Date($('#startDate').val());
                        var en = new Date($('#endDate').val());
                        $('.week').text(myweek[st.getDay()])
                        $('.week1').text(myweek[en.getDay()])
                        me._checkColor(me.comeColor, me.outColor)


                    }
                    //绗簩娆＄偣鍑荤粨鏉�

                })
            }

        }
        return calendarSwitch;
    })();
    $.fn.calendarSwitch = function (options) {
        return this.each(function () {
            var me = $(this),
                instance = me.data("calendarSwitch");

            if (!instance) {
                me.data("calendarSwitch", (instance = new calendarSwitch(me, options)));
            }

            if ($.type(options) === "string") return instance[options]();
        });
    };
    $.fn.calendarSwitch.defaults = {
        selectors: {
            sections: "#calendar"
        },
        index: 4,
        //灞曠ず鐨勬湀浠戒釜鏁�
        animateFunction: "toggle",
        //鍔ㄧ敾鏁堟灉
        controlDay: false,
        //鐭ュ惁鎺у埗鍦╠aysnumber澶╀箣鍐咃紝杩欎釜鏁板€肩殑璁剧疆鍓嶆彁鏄€绘樉绀哄ぉ鏁板ぇ浜�90天
        daysnumber: "90",
        //鎺у埗澶╂暟
        comeColor: "blue",
        //入住棰滆壊
        outColor: "red",
        //离店棰滆壊
        comeoutColor: "#0cf",
        //入住鍜岀搴椾箣闂寸殑棰滆壊
        callback: "",
        //鍥炶皟鍑芥暟
        comfireBtn: '.comfire' //纭畾鎸夐挳鐨刢lass鎴栬€卛d

    };
})(jQuery);
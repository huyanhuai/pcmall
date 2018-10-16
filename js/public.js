//公共获取地址栏信息
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 轮播
function lunbo() {
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        autoplay:true,
        // autoplay : 2000,
        
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable :true,
        },
        // navigation: {
        //     nextEl: '.button-next',
        //     prevEl: '.button-prev',
        // },
    })
}

// 搜索框
function searchSites(){
    var searchtext = $("#searchtext").val();
    if(searchtext != "" || searchtext != null){
        location.href = "scenic.html?content="+searchtext;
    } 
}

//转换时间
function timeTransformation(time, type) {
    // new Date('2014-02-18T15:00:48'.replace(/\s/, 'T'))
    var datatime = new Date(time);
    var year = datatime.getFullYear();//取得年
    var month = datatime.getMonth() + 1;    //取得月,js从0开始取,所以+1
    var date1 = datatime.getDate(); //取得天
    var hour = datatime.getHours();//取得小时
    var minutes = datatime.getMinutes();//取得分钟
    var second = datatime.getSeconds();//取得秒
    // alert(month);
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (second < 10) {
        second = "0" + second;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (date1 < 10) {
        date1 = "0" + date1;
    }

    if (type == "time") {
        return hour + ':' + minutes;
    } else if (type == "hour") {
        return hour;
    } else if (type == "minutes") {
        return minutes;
    } else if (type == "year") {
        return year;
    } else if (type == "month") {
        return month;
    } else if (type == "day") {
        return date1;
    } else if (type == "date") {
        return month + '月' + date1 + '日';
    } else if (type == "dateCount") {
        return year + '-' + month + '-' + date1;
    } else if (type == "timeCount") {
        return hour + ':' + minutes + ':' + second;
    } else {
        return year + '-' + month + '-' + date1 + ' ' + hour + ':' + minutes + ':' + second;
    }
}
//将中文日期替换成——
function DayReg(day,packageYear) {
    var firstPo = day.indexOf("月");
    var lastPo = day.indexOf("日");
    var m = day.substring(0, firstPo);
    var d = day.substring(firstPo + 1, lastPo);
    if (m.length == 1) {
        m = "0" + m;
    }
    if (d.length == 1) {
        d = "0" + d;
    }
    // var y = new Date().getFullYear();
    return (packageYear + '-' + m + '-' + d);
}

//将——替换成中文日期
function replaceSeparator(day, type) {
    type = type || "MD";
    var dayArr = day.split("-");
    var result = '';
    if (dayArr.length == 3) {
        if (type == "YMD") {
            result = dayArr[0] + "年" + dayArr[1] + "月" + dayArr[2] + "日";
        } else {
            result = dayArr[1] + "月" + dayArr[2] + "日";
        }
    }
    return result;
}

//手机号码验证
function mobileReg(phone) {
    var reg = /^1[34578][0-9]{9}$/;
    return reg.test(phone);
}
//验证身份证
function IDcardReg(card) {
// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(card);
}
//验证邮箱
function emailReg(mail) {
    // var szReg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
    var szReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return szReg.test(mail);
}

//封装统一弹框
function layMessage(msg, type) {
    type = type || 0;
    layer.msg(msg,{
        // content: msg
        offset: '100px'
        , time: 2000 //2秒后自动关闭
    });
}

// 获取验证码
var countSeconds=60;//验证码倒计时
var aa;             //延迟变量
$("#checkCode").click(function () {
    var phone=$("#phone").val();
    if(phone==''){
        layMessage("请输入手机号！");
        return false;
    }
    if(!mobileReg(phone)){
        layMessage("手机格式不正确");
        return false;
    }

    clearTimeout(aa);//清除延迟
    settime();
    $("#checkCode").attr("disabled",true)

    var code=$.md5(phone+"APP_20!$_TY_HZ");
    console.log(code);
    //向手机发送验证码
    publicAjax(baseAjaxUrl+"/ty_api/user/sendMessage","POST",{"code":code,"mobile":phone},sendInfoCall);

});

//验证码倒计时
function settime() {
    if(countSeconds==0){
        $("#checkCode").attr("disabled",false)
        $("#checkCode").html("获取验证码");
        countSeconds=60;
        return;
    }else{
        $("#checkCode").html("剩余"+countSeconds+"s");
        countSeconds--;
    }
    aa=setTimeout(function () {
        settime()
    },1000)
}
//发送短信的回调
function sendInfoCall(res) {
    if(res.errorCode==200){
        layMessage(res.message);
    }else{
        layMessage(res.message);
    }
}

// 合作伙伴图片tab
$(".invest-dot li").each(function (i, v) {
    $(v).mouseover(function (){
        $(this).addClass("change").siblings().removeClass("change");
        $(".invest-list ul").eq(i).show();
        $(".invest-list ul").eq(i).siblings().hide();
        
    });
});
    
/*封装通用ajax*/
function publicAjax(url, type, data, callback) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        success: callback,
    })
}

//带token的ajax
function publicAjaxToken(url, type, data, callback, async) {
    async = async || true;
    var token = $.cookie('token');
    $.ajax({
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        beforeSend: function (xhr) {
            //发送ajax请求之前向http的head里面加入验证信息
            xhr.setRequestHeader("token", token); // 请求发起前在头部附加token
        },
        url: url,
        type: type,
        data: data,
        async: async,
        success: callback,
    })
}

//formdata传递的ajax
function publicAjaxFormdata(url, type, data, callback) {
    var token = $.cookie('token');
    $.ajax({
        beforeSend: function (xhr) {
            //发送ajax请求之前向http的head里面加入验证信息
            xhr.setRequestHeader("token", token); // 请求发起前在头部附加token
        },
        url: url,
        type: type,
        data: data,
        processData: false,  // 不处理数据
        contentType: false,  // 不设置内容类型
        success: callback,
    })
}

/*定义ajax的基本路径*/
//海报的前缀
// var posterUrl="http://nwx.tongyoutrip.com/";
// var oneselfUrl="http://nwx.tongyoutrip.com/"
// var posterUrl="http://2y0640281b.imwork.net:48474/";
// var oneselfUrl="http://2y0640281b.imwork.net:48474/";
var posterUrl="http://web.tongyoutrip.com/";
var oneselfUrl="http://web.tongyoutrip.com/";
/*正式服务器*/
var baseAjaxUrl = "http://api.tongyoutrip.com";          //接口
var baseImgUrl="http://image.tongyoutrip.com";           //图片服务器
/*线上先下测试服务器*/
// var baseAjaxUrl="http://192.168.0.16:8060";                 //小许
// var baseAjaxUrl="http://192.168.0.148:8060";                 //小许
// var baseAjaxUrl="http://2y0640281b.imwork.net:35024";    //本地测试
// var baseImgUrl="http://192.168.0.148:80";
// var baseImgUrl="http://192.168.0.16:9000";                  //小马

// var baseAjaxUrl="http://192.168.0.192:8060";

//获取token
function getToken() {
    // delLocal("token");
    // alert(getLocal("token"));
    var token = getLocal("token");
    console.log("dsdffd" + token);
    // alert(token)
    //用于判断获取微信的code

}

// $.cookie('token', null);
// console.log($.cookie('token'));

function getUser() {

    /*获取用户的详细信息，并且存储起来*/
    publicAjaxToken(baseAjaxUrl + "/ty_api/user/getDetail", "POST", {}, getUserInfoCall);

    //用户信息的回调
    function getUserInfoCall(res){
        if(res.errorCode == 200){
            var html = '<li><a href="userinfo.html"><p id="nickName">'+res.data.nickName+'</p></a></li>'+
            '<li><p style="color: rgb(41, 75, 230);font-size:14px;padding:0 0 0 10px;" onclick="exit();"> 退出</p></li>';
            $(".topLogin ul").html(html);
        }
    }
}
function getUserInfo() {

    /*获取用户的详细信息，并且存储起来*/
    publicAjaxToken(baseAjaxUrl + "/ty_api/user/getDetail", "POST", {}, getUserInfoCall);

    //用户信息的回调
    function getUserInfoCall(res){
        if(res.errorCode == 200){
            var html = '<li><a href="userinfo.html"><p id="nickName">'+res.data.nickName+'</p></a></li>'+
            '<li><p style="color: rgb(41, 75, 230);font-size:14px;padding:0 0 0 10px;" onclick="myExit();"> 退出</p></li>';
            $(".topLogin ul").html(html);
        }
    }
}

function exit(){
    $.cookie('token', null, { expires: -1, path: '/' });
    window.location.reload();
}

function myExit(){
    $.cookie('token', null,{ expires: -1, path: '/' });
    location.href = "index.html";
}

/*sessionStorage*/
//设置sessionStorage
function setSess(name,val) {
    sessionStorage.setItem(name,val) //存储名字为name值为caibin的变量
}

//获取sessionStorage
function getSess(name) {
    return sessionStorage.getItem(name);
}

// cookie

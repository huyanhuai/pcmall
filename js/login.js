var loginStatus = 0;
// 登录框
function layLogin(type){
    layer.open({
        type: 1
        ,content: '<div class="register-box">'+
                    '<ul>'+
                        '<li class="loginMethod active">账号登录</li>'+
                        '<li class="loginMethod">验证码登录</li>'+
                    '</ul>'+
                    '<div style="clear: both;"></div>'+
                    '<div>'+
                        '<label for="">手机号</label>'+
                        '<input type="text" id="phone" placeholder="请输入手机号">'+
                    '</div>'+
                    '<div class="codeBox">'+
                        '<label for="">验证码</label>'+
                        '<input type="text" id="code" placeholder="请输入验证码">'+
                        '<button id="checkCode" onkeydown="EnterPress()">获取验证码</button>'+
                    '</div>'+
                    '<div class="password">'+
                        '<label for="">密码</label>'+
                        '<input onkeydown="EnterPress()" type="password" id="password" placeholder="请输入密码">'+
                    '</div>'+
                    '<button id="subLogin" onclick="signIn();">登录</button>'+
                    '<ul class="tab-check">'+
                        '<li><a href="forgetPassword.html">忘记密码</a> </li>'+
                        '<li><a href="register.html">立即注册</a> </li>'+
                    '</ul>'+
                '</div>'
        // ,btn: '确定',
        ,title: ["登录", 'font-size:18px;'],
        area: ['380px', '360px'],
        shadeClose: true,
        yes: function(){
            layer.closeAll();
        }
    }); 
    if(type == "hotel"){
        var html = '<li><a href="/forgetPassword.html">忘记密码</a> </li>'+
                    '<li><a href="/register.html">立即注册</a> </li>';
        $(".tab-check").html(html);
    }
    // 登录切换
    $(".loginMethod").each(function (i, v) {
        $(v).click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            if (i == 0) {//账号
                $(".codeBox").hide();
                $(".password").show();
                loginStatus = 0;
                console.log(loginStatus);
            } else if (i == 1) {//验证码
                $(".codeBox").show();
                $(".password").hide();
                $("#code").css("width","164px");
                loginStatus = 1;
                console.log(loginStatus);
            }
        })
    });
    // 验证码发送
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
}

// 登录
function signIn(){
    var phone=$("#phone").val();
    var code=$("#code").val();
    var password = $("#password").val();
    if(loginStatus == 0){ // 密码
        if(password == ""){
            layMessage("请输入密码");
            return false;
        }
        password = $.md5(password);
        publicAjaxToken(baseAjaxUrl+"/ty_api/user/doLogin","POST",
        {"mobile":phone,"password":password},
        passwordCall);
    }else if(loginStatus == 1){ // 验证码
        if(code == ""){
            layMessage("请输入验证码");
            return false;
        }
        publicAjaxToken(baseAjaxUrl+"/ty_api/user/verificationCodeLogin","POST",{"mobile":phone,"verificationCode":code},
        passwordCall);
    }
};
function passwordCall(res) {
    if(res.errorCode==200){
        var token = res.data.token;
        $.cookie('token', token , { expires: 7, path: '/' });
        layer.closeAll();
        layMessage("登录成功");
        setTimeout("openHtml();",500);
    }else{
        layMessage(res.message);
    }
}

function openHtml() {
    // historyUtils.back();
    window.location.reload();
}

// 回车事件
function EnterPress(e){ //传入 event 
    var e = e || window.event; 
    if(e.keyCode == 13){ 
        signIn();
    } 
} 
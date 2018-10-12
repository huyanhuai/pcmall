//第一个参数ajax地址，第二个参数ajax请求数据，第三个参数对数据进行的操作,第四个参数暂未用到,第五个参数请求的方式,第六个参数是否带token
var mescroll;
function upLoading(url, ajaxData, setListData, isReset, type) {
    //创建MeScroll对象


    var obj = {
        down: {
            isLock: true   //锁定下拉刷新
//                callback: downCallback, //下拉刷新的回调
        },
        up: {
            isBounce: false,//与ios有关
            auto: false, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
            callback: upCallback, //上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
            loadFull: {
                use: false, //列表数据过少,是否自动加载下一页,直到满屏或者无更多数据为止;默认false
                delay: 1000 //延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
            },
            page: {
                num: 0,
                size: 10,
                time: null
            },
            toTop: { //配置回到顶部按钮
                src: "js/meScroll/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
                offset: 800
            },
            htmlNodata: '<p class="upwarp-nodata">-- 无更多数据 --</p>',
            empty: {
                warpId: "mescroll",
                icon: "static/nodata.png",
                tip: "暂无相关数据~",
                btntext: "",
                btnClick: null,
                supportTap: false
            }
        }
    };

    console.log(isReset);
    if (isReset) {
        mescroll.destroy();
        mescroll = new MeScroll("mescroll", obj);
        console.log("这里重置")
    } else {
        mescroll = new MeScroll("mescroll", obj);
        console.log("这里未重置")
    }

    /*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    function upCallback(page) {

        getListDataFromNet(page.num, page.size, function (res) {
            if (res.errorCode == 200) {
                var data = res.data.list;
                //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
                //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

                //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                mescroll.endByPage(res.data.size, res.data.pages);//必传参数(当前页的数据个数, 总页数)

                //设置列表数据
                // setListData(data, true);
                setListData(data);
            }
        }, function () {
            //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr();
        });
    }


    var type = type ? type : 'post';

    function getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
        // console.log("pageNum====" + pageNum);
        ajaxData.pageNum = pageNum;
        // console.log(ajaxData);
        var token = null;
        $.ajax({
            beforeSend: function (xhr) {
                //发送ajax请求之前向http的head里面加入验证信息
                xhr.setRequestHeader("token", token); // 请求发起前在头部附加token
            },
            url: url,
            data: ajaxData,
            type: type,
            dataType: 'json',
            success: successCallback,
            error: errorCallback
        })
    }


}

//清除下拉刷新产生的bug
function clearDown() {
    $(".content").html('');
    $(".mescroll-empty").remove();
    $(".mescroll-downwarp").remove();
    $(".mescroll-upwarp").remove();
}
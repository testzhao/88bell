var app = getApp();
Page({
  data: {
    user: {},
    COUNTALL:"0",
    MONEYALL:"0",
    OPENID: "",
    RedMyTaskArray:[],
    rtabArray: [
      { "id": "1", changetColor: true, changeColor: true, txt: "我发出的" },
      { "id": "2", changetColor: false, changeColor: false, txt: "我收到的" }
    ]
  },
  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.setData({
          user: userInfo,
          encryptedData: res.encryptedData
        })
        
        wx.login({
          success: function (res) {
            if (res.code) {
              var NICKNAME = userInfo.nickName;
              var GENDER = userInfo.gender == 1 ? "男" : "女";
              var ADDRESS = userInfo.province + userInfo.city + userInfo.country;
              var AVATARURL = userInfo.avatarUrl;
              //发起网络请求
              wx.request({
                url: app.globalData.bathpath + '/MiniProgram/onLogin',
                data: {
                  code: res.code,
                  NICKNAME: NICKNAME,
                  GENDER: GENDER,
                  ADDRESS: ADDRESS,
                  AVATARURL: AVATARURL,
                },
                method: 'POST',
                success: function (res) {
                  if (res.data == "0") {
                    return;
                  }
                  var OPENID = res.data.openid
                  that.setData({
                    OPENID: OPENID
                  })
                  that.GettingAll(OPENID)

                },
                fail: function (res) {

                },
                complete: function (res) {

                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },


  /***获取数据 */
  GettingAll: function (OPENID) {
    var that = this;
    wx.request({

      url: app.globalData.bathpath + '/MiniProgram/getTaskMylist',
      data: {
        CUSTOMERAPPID: OPENID,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        that.setData({
          RedMyTaskArray: res.data
        })
      },
      fail: function () {
        console.log("失败");
      },
      complete: function () {
        // complete
      }
    })

    wx.request({
      url: app.globalData.bathpath + '/MiniProgram/getAll',
      data: {
        CUSTOMERAPPID: OPENID,
        istask: "1",
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        that.setData({
          COUNTALL: res.data[0].COUNTALL,
          MONEYALL: res.data[0].REDALL,
        })
      },
      fail: function () {
        console.log("失败");
      },
      complete: function () {
        // complete
      }
    })
  },


 //红包详情
  toast: function (event) {
    var p = event.currentTarget.id

    wx.navigateTo({
      url: '/pages/command/command?scene=' + p
    })
  },

  //切换页面
  clickTab: function (event) {
    
    if(event.target.id==1){
      wx.switchTab({
        url: "../send/send"
      })
    }else{
      wx.navigateTo({
        url: "../receive/receive"
      })
    }
  },
 
});
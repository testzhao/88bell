//index.js
var app = getApp();
Page({
  data: {
    user: {},
    encryptedData: "",
    content: "",
    money: "",
    count: "",
    openid:""
  },
  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.setData({
          user: userInfo
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
                    openid: OPENID
                  })
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
  textinput: function (event) {
    var type = event.currentTarget.dataset.type;
    if (type == 1) {
      this.setData({
        content: event.detail.value
      })
    } else if (type == 2) {
      this.setData({
        money: event.detail.value
      })
    } else if (type == 3) {
      this.setData({
        count: event.detail.value
      })
    }
  },
  sendRed: function () {
    var that = this;
    var openid = that.data.openid;
    console.log(openid);
    wx.request({
      url: app.globalData.bathpath + '/MiniProgram/sendRed',
      data: {
        content: that.data.content,
        money: that.data.money,
        count: that.data.count,
        openid: openid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        var status = res.data;
        console.log(status);
        if(status == "4"){
          app.okcash("提示", "语音口令不允许输入敏感字词");
        }else if(status == "3"){
          app.okcash("提示", "系统异常");
        }else if(status == "1"){
          app.okcash("提示", "赏金介于1-200之间");
        }else if(status == "2"){
          app.okcash("提示", "单个赏金不低于0.01");
        } else if (status == "0" || status == ""){
          app.okcash("提示", "系统异常");
        }else{
          that.pay(res.data)
        }
        
      },
      fail: function () {

      },
      complete: function () {
        // complete
      }
    })
  },

  pay: function (obj) {
    var that = this;
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': 'MD5',
      'paySign': obj.paySign,
      'success': function (res) {
        that.updateState(obj.redTask_id, '1')
      },
      fail: function () {
        
      },
      complete: function () {
        // complete
      }
    })
  },

  updateState: function (ID, TASKSTATE) {
    wx.request({
      url: app.globalData.bathpath + '/MiniProgram/updateState',
      data: {
        REDTASK_ID: ID,
        TASKSTATE: TASKSTATE

      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.log(res.data)
        if (res.data == 1) {
          wx.navigateTo({ url: "/pages/share/share?REDTASK_ID=" + ID});
        } else {
          //失败
        }
      },
      fail: function () {

      },
      complete: function () {
        wx.navigateTo({ url: "/pages/share/share?REDTASK_ID=" + ID });
      }
    })
  }
});

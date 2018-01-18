var app = getApp();
Page({
  data:{
    openid:"",
    money:"",
    outMoney:""
  },
  onLoad: function (options) {
    var that = this;
    var openid = getApp().globalData.openid;
    that.setData({
      openid: getApp().globalData.openid
    })
    wx.request({
      url: app.globalData.bathpath + '/MiniProgram/goWithdrawals',
      data: {
        OPENID: openid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.log(res.data)
        that.setData({
          money: res.data
        })
      },
      fail: function () {

      },
      complete: function () {
        // complete
      }
    })
  },
  textinput: function (event) {
    var type = event.currentTarget.dataset.type;
    if (type == 1) {
      this.setData({
        outMoney: event.detail.value
      })
    } else if (type == 2) {
      
    } else if (type == 3) {
      
    }
    
  },
  withdrawals:function(){
    var that = this;
    var openid = getApp().globalData.openid;
    wx.request({
      url: app.globalData.bathpath + '/MiniProgram/withdrawals',
      data: {
        MONEY: that.data.outMoney,
        OPENID: openid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        var result = res.data;
        console.log(result)
        if (result == 1){
          app.okcash("提示", "提现成功,预计1-5个工作日内到账!");
        } else if (result == 0){
          app.okcash("提示", "获取用户信息失败,请重新登录!");
        } else if (result == 2) {
          app.okcash("提示", "提现失败,余额不足!");
        } else if (result == -1) {
          app.okcash("提示", "提现失败,请联系管理员!");
        } else {
          app.okcash("提示", "提现失败,请联系管理员!");
        }
      },
      fail: function () {

      },
      complete: function () {
        // complete
      }
    })
  }
})

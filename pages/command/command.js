var app = getApp();
Page({
  data:{
    REDTASK_ID:"",
    openid: app.nextLogin(),
    taskInfo:null,
    list:null,
    flag:"-1"
  },
  onLoad: function (options) {
    var that = this;
    var REDTASK_ID = decodeURIComponent(options.scene)
    that.setData({
      REDTASK_ID: REDTASK_ID
    })
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
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
                  that.loadPage(REDTASK_ID, OPENID);

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
  loadPage: function (REDTASK_ID, OPENID){
    var that = this;
    wx.request({
      url: app.globalData.bathpath + '/MiniProgram/showMyRed',
      data: {
        REDTASK_ID: REDTASK_ID,
        OPENID: OPENID
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        that.setData({
          taskInfo: res.data.taskInfo,
          list: res.data.list,
          flag: res.data.flag
        })
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })
  },
  mytouchstart: function () {
    var that = this;
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath
        wx.uploadFile({
          url: app.globalData.bathpath + '/MiniProgram/getRed', //仅为示例，非真实的接口地址
          filePath: tempFilePath,
          name: 'file',
          formData: {
            'OPENID': getApp().globalData.openid,
            'REDTASK_ID': that.data.REDTASK_ID
          },
          success: function (res) {
            var r = res.data
            if(r == "1"){
              wx.showToast({ title: '领取成功' })
              that.loadPage(that.data.REDTASK_ID, that.data.openid);
            } else if (r == "6"){
              wx.showToast({ title: '领取完毕' })
            } else if (r == "4") {
              wx.showToast({ title: '语音匹配失败' })
            } else if (r == "3") {
              wx.showToast({ title: '语音匹配失败' })
            } else if (r == "5") {
              wx.showToast({ title: '已领取过,不能再次领取' })
            } else{
              wx.showToast({ title: '语音匹配失败' })
            }
            
          }
        })
      },
      fail: function (res) {
        //录音失败
      }
    })
    setTimeout(function () {
      //结束录音  
      wx.stopRecord()
    }, 20000)

  },
  mytouchend: function () {
    wx.stopRecord()
  },
  //跳转到发口令页面
  sendpass:function(){
    wx.switchTab({url:"/pages/index/index"});
  },
  //去提现
  getmoney:function(){
    var that = this
    
    wx.switchTab({url:"/pages/money/money"});
  },
  playVoice: function(e){
    var src = app.globalData.bathpath+"/"+ e.currentTarget.dataset.voice+".mp3"
    console.log(src)
    
    wx.playBackgroundAudio({
      dataUrl: src,
      title: '',
      coverImgUrl: ''
    })
  },
  //去转发
  onShareAppMessage: function (res) {
    var that = this;
    var REDTASK_ID = that.data.REDTASK_ID
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '送福利来咯',
      path: '/pages/command/command?scene=' + REDTASK_ID,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
});
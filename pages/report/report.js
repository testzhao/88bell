// pages/report/report.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    phone:"",
    repName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = [
    { "id": 1, "name": "欺诈" },
    { "id": 2, "name": "色情" },
    { "id": 3, "name": "政治谣言" },
    { "id": 4, "name": "常识性谣言" },
    { "id": 5, "name": "诱导分享" },
    { "id": 6, "name": "恶意营销" },
    { "id": 7, "name": "隐私信息收集" },
    { "id": 8, "name": "其他侵权类(冒名/诽谤/抄袭)" },
    { "id": 9, "name": "欺诈" }];
    this.setData({
      arr: arr
    })
  },
  report: function(){
    var phone = this.data.phone
    var repName = this.data.repName
    if (repName == ""){
      app.okcash("提示", "请选择举报原因!");
      return;
    }
    wx.request({
      url: app.globalData.bathpath + '/MiniProgram/report',
      data: {
        phone: phone,
        repName: repName
      },
      method: 'POST',
      success: function (res) {
        if(res.data){
          app.okcash("提示", "提交成功!");
        }else{
          app.okcash("提示", "提交失败,联系管理员!");
        }
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })
  },
  textinput: function (event){
    this.setData({
      phone: event.detail.value
    })
  },
  radioChange: function (e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      repName: e.detail.value
    })
  }

})
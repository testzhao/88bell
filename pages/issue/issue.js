Page({
  data:{
    qtArray:[
      { id: "1", question: "怎么玩？", qtColor: false, showAs: false, answer:"你可以设置一个带奖励的语音口令，好友说对口令才能领到福利"},
      { id: "2", question: "我支付了但没有发出去？", qtColor: false, showAs: false, answer: "请在主页【我的记录】中找到相应的记录，点击进入详情后点击【去转发】可把口令转发给好友或群" },
      { id: "3", question: "好友可以转发我的口令吗？", qtColor: false, showAs: false, answer: "可以的，您分享给好友或者转发到微信群的语音口令，其他好友均可再次转发" },
      { id: "4", question: "发口令会收服务费吗？", qtColor: false, showAs: false, answer: "发语音口令会收取2%的服务费" },
      { id: "5", question: "未领取的金额会怎样处理？", qtColor: false, showAs: false, answer: "未领取的金额将于24小时后退至小程序余额；同时，未领取的服务费也将全部退回" },
      { id: "6", question: "如何提现到微信钱包？", qtColor: false, showAs: false, answer: "在主页的【余额提现】或详情页的【去提现】均可跳转至余额体现页面进行提现，提现金额每次至少1元，每天至多提现3次" },
      { id: "7", question: "提现会收取服务费吗？", qtColor: false, showAs: false, answer: "提现不收取服务费；申请提现后会在1-5个工作日内转账到您的微信钱包" }
    ]
  },
  clickTab:function(e){
    console.log(e)
    var that=this
    var uqtArray=[]
    //遍历一次显示答案
    for(var i=0;i<this.data.qtArray.length;i++){
      if(e.target.id==this.data.qtArray[i].id){
        uqtArray[i]={id:i+1,question:this.data.qtArray[i].question,qtColor:true,showAs:true,answer:this.data.qtArray[i].answer}
      }else{
        uqtArray[i] = { id: i + 1, question: this.data.qtArray[i].question, qtColor: false, showAs: false, answer: this.data.qtArray[i].answer }
      }
    }
    that.setData({
      qtArray:uqtArray
    })
  },
  report: function(){
    wx.navigateTo({
      url: '/pages/report/report'
    })
  }
});

import {
  alert,
  getCurrentAddress, reverseGeocoder, connectWebsocket,
  getPrevPage
} from '../../utils/util'

import { getMineInfo, addOrder, getMineProcessingOrder } from '../../utils/api'

const app = getApp()
Page({
  data: {
    agree:false
  },
  onLoad: function (options) {
    var that = this;
  },

  onShow() { 
    //this.initData();
    //this.init();
  },


  initData() {
    this.setData({
      text: "您有订单正在进行中，请处理",
      marqueePace: 1,//滚动速度
      marqueeDistance: 0,//初始滚动距离
      marquee_margin: 200,
      size: 16, //与css中定义的字体大小一致，单位为px
      rollinterval: 20, // 时间间隔
      windowWidth: 686, //显示空间宽度，与css中定义一致
      orderingId: null,
      callCart:true
    })
  },

  init(cb) {
    var that = this
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          getApp().getLoginInfo(loginInfo => {
            if (loginInfo != null && loginInfo.is_login) {

              getMineProcessingOrder({
                success(data) {
                  if (data.orderId != null && data.orderId.length > 0) {
                    var length = that.data.text.length * that.data.size;//文字长度
                    //var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度

                    that.setData({
                      length: length,
                      orderingId: data.orderId,
                      orderingStatus: data.orderStatus
                    });
                    //that.scrolltxt();// 第一个字消失后立即从右边出现
                  }
                  
                  cb && cb()
                  var { user_id, user_token } = loginInfo.userInfo
                  console.log("connect socket")
                  connectWebsocket({
                    user_id,
                    success(res) { },
                    error(res) { }
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  createOrder(e) {
    var { agree } = this.data

    if(agree == false)
    {
      alert('请接受服务协议');
      return;
    }

    var { user_id } = wx.getStorageSync("userInfo")
    if (user_id == null || user_id.length == 0)
    {
      alert('用户未登录，请在我的页面授权登录');
      return;
    }

    wx.navigateTo({
      url: '/pages/addInfo/addInfo',
    })
  },

  toAgree: function (e) {
    var { agree } = this.data
    this.setData({
      agree: !agree
    })
  },

  callback(){
    this.initData();
    this.init();
  }
})
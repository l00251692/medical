//import util from '../../utils/index';
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'FPOBZ-UT2K2-ZFYUC-CX67E-IOOYS-7XFQ6'
});

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

  toDaSan(e) {
    const destination = this.data.destination
    const address_detail = this.data.address_detail
    const destination_detail = this.data.destination_detail
    if (destination == '') {
      wx.showModal({
        title: '目的地不能为空',
        content: '请填写或选择正确的目的地',
      })
    }
    else if (this.data.orderingId != null) {
      wx.showModal({
        title: '您当前有订单在进行中',
        content: '请先处理当前进行中的订单',
      })
    } else {
      //注意此接口的from和to的形式是不一样的，to是数组
      qqmapsdk.calculateDistance({
        mode: 'walking',
        from: address_detail.location,
        to: [{
          latitude: destination_detail.location.latitude,
          longitude: destination_detail.location.longitude
        }],
        success: (res) => {
          if (res.result.elements[0].distance != -1) {
            this.setData({
              distance: (res.result.elements[0].distance / 1000).toFixed(2),
            })
          }
        },
        fail: function (res) {
          console.log(res);
        }
      });
      this.setData({
        callCart: false
      })
    }
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

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
    //调用API从本地缓存中获取数据
    var is_login = wx.getStorageSync("is_login")
    if (is_login) {
    }
    else {
      wx.redirectTo({
        url: '/pages/login/login',
        fail(res) {
          console.log(res)
        }
      })
    }
  },

  onShow() { 

  },

  createOrder(e) {
    var { agree } = this.data

    if(agree == false)
    {
      alert('请勾选确认已阅读并理解告知信息');
      return;
    }

    var { user_id } = wx.getStorageSync("userInfo")
    if (user_id == null || user_id.length == 0)
    {
      alert('用户未登录，请先在我的页面授权登录');
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

  onShareAppMessage() {
    return {
      title: '上海明静',
      path: '/pages/index/index'
    }
  },

  callback(){
    this.initData();
    this.init();
  }
})
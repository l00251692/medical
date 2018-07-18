// pages/mine/mine.js
import { getUserInfo, makePhoneCall, alert } from '../../utils/util'
import { getMineInfo } from '../../utils/api'

const app = getApp()
Page({
  data: {
  },
  onLoad: function (options) {
    var that = this
    var userInfo = wx.getStorageSync("userInfo")
    if (userInfo)
    {
      this.setData({
        userInfo: userInfo
      })
    }
    getApp().getLoginInfo(loginInfo => {
      if (loginInfo != null && loginInfo.is_login) {
        that.setData({
          userInfo: loginInfo.userInfo
        })
        getMineInfo({
          success(data) {
            that.setData({
              list: data
            })
          }
        })
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onPhoneTap(e) {
    makePhoneCall(e.currentTarget.dataset.phone)
  },

  callback() {
    this.onLogin()
  },
  
  onLogin() {
    var that = this
    getApp().getLoginInfo(loginInfo => {
      if (loginInfo != null && loginInfo.is_login) {
        that.setData({
          userInfo: loginInfo.userInfo
        })

        getMineInfo({
          success(data) {
            that.setData({
              list: data
            })
          }
        })
      }
    })

  },
  onShareAppMessage() {
    return {
      title: '我的',
      path: '/pages/mine/mine'
    }
  }
})
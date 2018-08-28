import { getMineInfo } from '../../utils/api'

Page({
  data: {
  },

  onLogin() {
    var that = this
    wx.showToast({
      title: '处理中',
      icon: 'loading',
      duration: 5000
    });

    getApp().getLoginInfo(loginInfo => {
      wx.switchTab({
        url: '/pages/index/index',
      })
    })

  },
})
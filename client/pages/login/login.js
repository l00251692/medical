import { getMineInfo } from '../../utils/api'

Page({
  data: {
  },

  onLogin() {
    var that = this
    getApp().getLoginInfo(loginInfo => {
      wx.switchTab({
        url: '/pages/index/index',
      })
    })

  },
})
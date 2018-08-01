import { ORDER_STATES } from '../order/constant'
import { getUserInfo, makePhoneCall, alert, datetimeFormat } from '../../utils/util'
import { getMineOrders } from '../../utils/api'

const app = getApp()

var initData = {
  page: 0,
  hasMore: true,
  loading: false,
  list: null,
}
Page({
  data: {
    ORDER_STATES
  },
  onLoad: function (options) {
    var that = this

    var userInfo = wx.getStorageSync("userInfo")
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
    }

    getApp().getLoginInfo(loginInfo => {
      if (loginInfo != null && loginInfo.is_login) {
        that.setData({
          userInfo: loginInfo.userInfo
        })
      }
      else{
        that.setData({
          userInfo: wx.getStorageSync("userInfo")
        })      
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.getOrdersList()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onPhoneTap(e) {
    makePhoneCall("18261149876")
  },

  onReachBottom(e) {
    if (!this.data.hasMore || this.data.loading) {
      return
    }
    var that = this
    var { page, list } = this.data
    getMineOrders({
      page,
      success(data) {
        var list2 = data.list.map(item => {
          item['create_time_format'] = datetimeFormat(item.create_time)
          return item
        })

        that.setData({
          list: list ? list.concat(list2) : list2,
          page: page + 1,
          hasMore: data.count == 5,
          loading: false
        })
      },
      error() {
        that.setData({
          loading: false
        })
      }
    })
  },
  
  onLogin() {
    var that = this
    getApp().getLoginInfo(loginInfo => {
      if (loginInfo != null && loginInfo.is_login) {
        that.setData({
          userInfo: loginInfo.userInfo
        })
        that.getOrdersList()
      }
    })

  },

  getOrdersList(){
    var that = this
    this.setData(initData)

    this.setData({
      loading: true
    })

    var { page, list } = this.data
    getMineOrders({
      page,
      success(data) {
        var list2 = data.list.map(item => {
          item['create_time_format'] = datetimeFormat(item.create_time)
          return item
        })

        that.setData({
          list: list ? list.concat(list2) : list2,
          page: page + 1,
          hasMore: data.count == 5,
          loading: false
        })
      },
      error() {
        that.setData({
          loading: false
        })
      }
    })
  },

  callback(){
    
  },

  onShareAppMessage() {
    return {
      title: '我的',
      path: '/pages/mine/mine'
    }
  }
})
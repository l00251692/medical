// pages/upload/uploadIdCard.js
import {
  alert
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  initData(){

    var that = this
    var tmp1 = wx.getStorageSync('idCardFrontPath')
    if (tmp1){
      wx.getFileInfo({
        filePath: tmp1,
        success(res){
          that.setData({
            idCardFrontPath: tmp1
          })
        },
        fail(res){
          that.setData({
            idCardFrontPath: null
          })
        }
      })
      
    }

    var tmp2 = wx.getStorageSync('idCardBackPath')
    if (tmp2) {
      wx.getFileInfo({
        filePath: tmp1,
        success(res) {
          that.setData({
            idCardBackPath: tmp2
          })
        },
        fail(res) {
          that.setData({
            idCardBackPath: null
          })
        }
      })
    }
  },

  onChooseFront(e){
    wx.navigateTo({
      url: '/pages/upload/takePhoto?type=1&callback=callback',
    })
  },

  onChooseBack(e) {
    wx.navigateTo({
      url: '/pages/upload/takePhoto?type=2&callback=callback',
    })
  },

  uploadIdCard(e){

    var { idCardFrontPath, idCardBackPath} = this.data

    if (idCardFrontPath != null && idCardBackPath !=null){
      wx.navigateTo({
        url: '/pages/order/pay',
      })
    }
    else{
      alert("请先上传身份证照片")
    }
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  callback(e){
    this.initData();
  }
})
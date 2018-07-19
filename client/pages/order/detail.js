// pages/order/detail.js

import {
  getOrderInfo
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // state: [{ status: '已完成', name: '受理', type: 'finished', list: { '受理人': '六六六', "受理部门": "哈哈哈部门" } }, { status: '已完成', name: '审核', type: 'finished', list: { "审核人": "七七七" } }, { status: '已完成', name: '申请', type: 'finished', list: { '申请人': '六六六', "审核人": "七七七" } }],

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id
    this.init()
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

  init(){
    var that = this
    var order_id = this.id

    getOrderInfo({
      order_id,
      success(data){
        that.setData({
          info:data.info,
          state: data.state
        })
      },
      error(){
        console.log("获取订单信息失败")
      }
    })
  }


})
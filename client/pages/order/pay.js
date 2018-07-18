// pages/order/pay.js
const qiniuUploader = require("../../utils/qiniuUploader")
import {
  addOrder, getQiniuToken, updateOrderIdCard, getPayment, updateOrderPayed
} from '../../utils/api'
import {
  alert, requestPayment
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
    this.init()
  },

  init() {
    var info = wx.getStorageSync("info")
    if (info) {
      this.setData({
        name: info.name,
        phone: info.phone,
        idcard: info.idcard,
        hospital: info.hospital,
        mrNo: info.mrNo,
        department: info.department,
        doctor: info.doctor,
        bedNo: info.bedNo,
        adDetail: info.adDetail,
      })
    }

    var address = wx.getStorageSync("address")
    var { adDetail } = this.data
    if (address) {
      this.setData({
        address: address,
        addressStr: address.province + address.city + address.title + adDetail
      })
    }

    var tmp1 = wx.getStorageSync('idCardFrontPath')
    if (tmp1) {
      this.setData({
        idCardFrontPath: tmp1
      })
    }

    var tmp2 = wx.getStorageSync('idCardBackPath')
    if (tmp2) {
      this.setData({
        idCardBackPath: tmp2
      })
    }
  },

  formSubmit(e) {
    var {
      name, phone, idcard, hospital, mrNo, department, doctor, bedNo, address, adDetail, idCardFrontPath, idCardBackPath
    } = this.data

    var addresstr = JSON.stringify(address)

    addOrder({
      name, phone, idcard, hospital, mrNo, department, doctor, bedNo, addresstr, adDetail,
      success(data) {
        var token = ''
        var order_id = data.orderId
        getQiniuToken({
          success(data) {
            token = data.upToken;
            qiniuUploader.upload(idCardFrontPath, (res) => {
              var front_img = res.imageURL
              //上传反面身份证照片
              qiniuUploader.upload(idCardBackPath, (res) => {
                var back_img = res.imageURL
                //更新照片信息到订单信息中
                updateOrderIdCard({
                  front_img,
                  back_img,
                  order_id,
                  success(data) {
                    //获取支付参数
                    var pay_money = "0.01"
                    getPayment({
                      order_id,
                      pay_money,
                      success(data) {
                        //发起微信支付
                        console.log("getPayment success:")
                        requestPayment({
                          data,
                          success() {
                            //更新订单状态
                            updateOrderPayed({
                              order_id,
                              success(data){
                                wx.switchTab({
                                  url: '/pages/mine/mine',
                                })
                              }
                            })    
                          },
                          fail(data) {
                            console.log("用户取消支付")
                          }
                        })
                        
                      }, error(data) {
                        console.log("getPayment err:" + JSON.stringify(data))
                      }
                    })
                  },
                  error(data) {
                    console.log("上传身份证照片失败")
                  }

                })

              }, (error) => {
                console.log('error2: ' + error);
                alert("上传身份证照片失败")
              }, {
                  region: 'ECN', //华东
                  domain: 'img.ailogic.xin',
                  key: 'order_' + order_id + '_back',
                  uptoken: token
                }, (res) => {
                  console.log('上传进度', res.progress)
                  console.log('已经上传的数据长度', res.totalBytesSent)
                  console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
                });

            }, (error) => {
              console.log('error: ' + error);
              alert("上传身份证照片失败")
            }, {
                region: 'ECN', //华东
                domain: 'img.ailogic.xin',
                key: 'order_' + order_id + '_front',
                uptoken: token
              }, (res) => {
                console.log('上传进度', res.progress)
                console.log('已经上传的数据长度', res.totalBytesSent)
                console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
              });
          },
          error(data) {
            alert("上传身份证照片失败，请稍候")
          }
        })
      },
      error(data) {
        console.log("订单创建失败，请稍后重试")
      }
    })
  },

  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  },
})
// pages/order/pay.js
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
    var { adDetail} = this.data
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

    var info = Object.assign({ name, phone, idcard, hospital, mrNo, department, doctor, bedNo, adDetail }, {})

    wx.switchTab({
      url: '/pages/mine/mine',
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
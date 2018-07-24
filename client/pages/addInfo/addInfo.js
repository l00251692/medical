import WxValidate from '../../utils/WxValidate'
import {
  reverseGeocoder,alert
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
    this.initValidate()
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
    var that = this
    wx.getSetting({
       success(res) {
         if (res.authSetting['scope.userLocation']) {
           that.setData({
             authed:true
           })
         }
       }
     })
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

  initValidate() {
    this.validate = new WxValidate({
      name: {
        required: true,
      },
      phone: {
        required: true,
        tel: true,
      },
      idcard: {
        required: true,
        idcard: true,
      },
      hospital: {
        required: true,
      },
      mrNo: {
        required: true,
      },
      department: {
        required: true,
      },
      doctor: {
        required: true,
      },
      bedNo: {
        required: true,
      },
    }, {
        name: {
          required: '请输入您的姓名'
        },
        phone: {
          required: '请输入手机号',
          tel: '请输入有效手机号码'
        },
        idcard: {
          required: '请输入身份证号',
          idcard: '请输入有效身份证号码'
        },
        hospital: {
          required: '请输入医院名称'
        },
        mrNo: {
          required: '请输入住院号'
        },
        department: {
          required: '请输入科室信息'
        },
        doctor: {
          required: '请输入主治医生姓名'
        },
        bedNo: {
          required: '请输入床位号'
        },
      })
  },

  init(){
    var info = wx.getStorageSync("info")
    if(info){
      this.setData({
        name: info.name,
        phone: info.phone, 
        idcard: info.idcard, 
        hospital: info.hospital, 
        mrNo: info.mrNo, 
        department: info.department, 
        doctor: info.doctor, 
        bedNo: info.bedNo, 
        adDetail: info.adDetail
      })
    }

    var address = wx.getStorageSync("address")
    if (address) {
      this.setData({
        address: address
      })
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

  onChooseLocation(e) {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        var {
          name: title, address,
          longitude, latitude
        } = res
        var location = {
          longitude, latitude
        }
        reverseGeocoder({
          location,
          success(data) {
            that.setData({
              address: Object.assign({
                title, address, location
              }, data),
              disabled: false,
            })
          }
        })
      },
      fail(res){
        that.setData({
          authed:false
        })
      }
    })
  },

  formSubmit(e){
     if (!this.validate.checkForm(e)) {
       const error = this.validate.errorList[0]
       return alert(error.msg)
     }

    var { address } = this.data

    if (!address) {
       return alert('请选择邮寄地址')
    }

    var {
      name, phone, idcard, hospital, mrNo, department, doctor, bedNo, adDetail
    } = e.detail.value

    var info = Object.assign({ name, phone, idcard, hospital, mrNo, department, doctor, bedNo, adDetail},{})

    console.log(JSON.stringify(info))

    wx.setStorageSync("info", info);
    wx.setStorageSync("address", address);

    wx.navigateTo({
      url: '/pages/upload/uploadIdCard',
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
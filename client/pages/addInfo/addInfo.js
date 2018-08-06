import WxValidate from '../../utils/WxValidate'
import {
  reverseGeocoder,alert
} from '../../utils/util'

import dateFormat from '../../utils/dateformat'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexArray: ['男', '女'],
    sexIndex: 0,
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
      idcard: {
        required: true,
        idcard: true,
      },
      hospital: {
        required: true,
      },
      hospitalArea:{
        required: true,
      },
      department: {
        required: true,
      },
      bedNo: {
        required: true,
      },
      mrNo: {
        required: true,
      },
      doctor: {
        required: true,
      },
      diseases: {
        required: true,
      },
      phone: {
        required: true,
        tel: true,
      },
      concatName:{
        required: true,
      },
      concatPhone: {
        required: true,
        tel: true,
      },
    }, {
        name: {
          required: '请输入患者姓名'
        },
        idcard: {
          required: '请输入身份证号',
          idcard: '请输入有效身份证号码'
        },
        hospital: {
          required: '请输入医院名称'
        },
        hospitalArea: {
          required: '请输入病区信息'
        },
        department: {
          required: '请输入科室信息'
        },
        bedNo: {
          required: '请输入床位号'
        },
        mrNo: {
          required: '请输入住院号'
        },  
        doctor: {
          required: '请输入主治医生姓名'
        },
        diseases: {
          required: '请输入疾病信息'
        },
        phone: {
          required: '请输入手机号',
          tel: '请输入有效邮寄信息手机号码'
        },
        concatName: {
          required: '请输入主要联系人'
        },
        concatPhone: {
          required: '请输入联系人电话',
          tel: '请输入有效联系人手机号码'
        },
      })
  },

  init(){
    var info = wx.getStorageSync("info")
    var tmp_date = dateFormat(new Date(), "yyyy-mm-dd")
    this.setData({
      date: tmp_date
    })
    if(info){
      this.setData({
        name: info.name,
        idcard: info.idcard, 
        sexIndex: info.sexIndex,
        hospital: info.hospital, 
        hospitalArea: info.hospitalArea,
        department: info.department,
        bedNo: info.bedNo,
        mrNo: info.mrNo,
        doctor: info.doctor,
        diseases: info.diseases,
        date: info.date,
        adDetail: info.adDetail,
        phone: info.phone,
        concatName: info.concatName,
        concatPhone: info.concatPhone,
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

  bindSexPickerChange: function (e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  formSubmit(e){
     if (!this.validate.checkForm(e)) {
       const error = this.validate.errorList[0]
       return alert(error.msg)
     }

    var { address, sexIndex, date } = this.data

    if ( !sexIndex){
       sexIndex = 0
    }

    if (!address) {
       return alert('请选择邮寄地址')
    }

    var {
      name, idcard, hospital, hospitalArea, department, bedNo, mrNo, doctor, diseases, adDetail, phone, concatName, concatPhone
    } = e.detail.value

    var info = Object.assign({ name, idcard, sexIndex, hospital, hospitalArea, department, bedNo, mrNo, doctor, diseases, date, adDetail, phone, concatName, concatPhone},{})

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
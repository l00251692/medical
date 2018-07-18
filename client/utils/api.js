import {
  fetch, coordFormat,
  alert, confirm,
} from './util'


// 短信验证码
export function getCode(options) {
  const {
    phone, success, error
  } = options

  fetch({
    url: "user/getCheckCode",
    data: {
      phone,
      key: 'fast_login'
    },
    success, error
  })
}

// 登录
export function bindPhone(options) {
  const {
    phone,
    success, error
  } = options

  var { user_id, user_token } = getApp().globalData.loginInfo.userInfo
  
  fetch({
    url: "user/bindPhone",
    data: {
      phone,
      user_id,
      key: 'fast_login'
    },
    success, error
  })

}
/*
// 退出账号
export function logout(options) {
  const {
    phone,
    success, error
  } = options
  fetch({
    url: 'index.php?m=Api&c=WeixinMall&a=logout',
    data: {
      phone
    },
    success, error
  })
}
*/

// 获取登录信息
export function getLoginInfo(options) {
  const {
    success, error, fail
  } = options

  //调用登录接口
  wx.login({
    success(res) {
      wx.getUserInfo({
        success: function (userRes) {
          fetch({
            url: 'user/toLoginWx',
            data: {
              wx_code: res.code,
              encryptedData: userRes.encryptedData,
              iv: userRes.iv
            },
            success,
            error
          })
        },
        fail
      })
    },
    error(res) {
      alert(res['errMsg'])
      error && error(res['errMsg'])
    }

  })
}

export function getMineInfo(options) {
  const {
    success
  } = options
  if (!getApp().globalData.loginInfo.is_login) {
    return alert('用户未登录')
  }
  var { user_id, user_token } = getApp().globalData.loginInfo.userInfo
  fetch({
    url: 'user/getMineInfoWx',
    data: {
      user_id,
    },
    success
  })
}



 //添加准订单
export function addOrder(options) {
  const {
    name, phone, idcard, hospital, mrNo, department, doctor, bedNo, addresstr, adDetail,
    success, error
  } = options

  var { user_id } = wx.getStorageSync("userInfo")

  fetch({
    url: 'order/addOrderWx',
    data: {
      name, phone, idcard, hospital, mrNo, department, doctor, bedNo, addresstr, adDetail,
      user_id
    },
    success, error
  })
}

export function updateOrderIdCard(options) {
  const {
    front_img, back_img, order_id,
    success, error
  } = options

  var { user_id } = wx.getStorageSync("userInfo")

  fetch({
    url: 'order/updateOrderIdCardWx',
    data: {
      front_img, back_img, order_id, 
      user_id
    },
    success, error
  })
}

// 获取准订单
export function getOrderInfo(options) {
  var {
    order_id,
    success, error
  } = options

  var { user_id, user_token } = getApp().globalData.loginInfo.userInfo
  fetch({
    url: 'order/getOrderInfoWx',
    data: {
      user_id,
      order_id
    },
    success, error
  })
}

// 取消订单
export function cancelOrder(options) {
  var {
    order_id,
    success, error
  } = options
  
  var { user_id, user_token } = getApp().globalData.loginInfo.userInfo
  fetch({
    url: 'order/cancelOrderWx',
    data: {
      user_id,
      order_id
    },
    success, error
  })
}

// 获取订单列表
export function getMineOrders(options) {
  var {
    page,
    success, error
  } = options

  var { user_id } = getApp().globalData.loginInfo.userInfo
  fetch({
    url: 'order/getMineOrdersWx',
    data: {
      user_id,
      page
    },
    success, error
  })

}

export function getQiniuToken(options) {

  var { success, error } = options

  fetch({
    url: 'order/getQiniuTokenWx',
    data: {
    },
    success,
    error
  })
}

// 获取支付参数
export function getPayment(options) {
  var {
    order_id,
    pay_money,
    success, error
  } = options

  var { user_id } = wx.getStorageSync("userInfo")

  fetch({
    url: 'pay/getPaymentWx',
    data: {
      order_id,
      user_id,
      pay_money
    },
    success, error
  })

}

export function updateOrderPayed(options) {
  var {
    order_id,
    success, error
  } = options

  var { user_id } = wx.getStorageSync("userInfo")
  fetch({
    url: 'order/updateOrderPayedWx',
    data: {
      user_id,
      order_id
    },
    success, error
  })
}

export function paySuccess(options) {
  var {
    order_id, prepay_id, success
  } = options
  var { user_id, user_token } = getApp().globalData.loginInfo.userInfo
  fetch({
    url: 'pay/setPaySuccessWx',
    data: {
      order_id,
      user_id,
      prepay_id
    },
    success
  })
}

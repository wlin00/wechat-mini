// pages/home/index.js

// 引入接口配置文件urlconfig
const interfaces = require('../../utils/urlconfig.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipers: [],
    logos: [],
    quicks: [],
    pageRow: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500
  },

  handleJumpTest: function() {
    console.log('jump')
    wx.navigateTo({
      url: '/pages/test/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: interfaces.homepage,
      header: {
        'content-type': 'application/json' // 默认值，返回的数据设置为json数组格式
      },
      success(res) {
        self.setData({
          swipers: res.data.swipers,
          logos: res.data.logos,
          quicks: res.data.quicks,
          pageRow: res.data.pageRow
        })
        wx.hideLoading()
      }
    })
  },

  //监听页面的显示
  onShow: function(){
    let self = this
    wx.getStorage({
      key: 'cartInfo',
      success: function(res) {
        const cartArray = res.data;
        cartArray.length > 0 ? 
        wx.setTabBarBadge({
          index: 2,
          text: String(cartArray.length),
        }) :
        wx.removeTabBarBadge({
          index: 2,
        })
     
      }
    });
  }
})
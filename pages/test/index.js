const interfaces = require("../../utils/urlconfig.js");
// pages/test/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{id: '333', name:'testA'}, {id:'444', name: 'testB'}], // 列表数据
    startX: 0,
    startY: 0, // 滑动关闭的起始坐标
  },

  // test 
  getItem: function(item) {
    console.log('item', item, this.data.list)
  },

  // 计算两点之间的角度函数
  getAngle: function(start, end) {
    let x = end.X - start.X;
    let y = end.Y - start.Y;
    return (360 * Math.atan(y / x)) / (Math.PI * 2)
  },

  // 触摸到面板的回调
  handleClick: function(e) {
    // 关闭列表中处于激活状态的按钮
    const list = this.data.list
    list.forEach(e => {
      if (e.isTouchMove) {
        e.isTouchMove = false
      }
    })

    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      list: list,
    })

  },

  // 滑动面板的回调
  handleMove: function(e) {
    let self = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = self.data.startX, //开始X坐标
      startY = self.data.startY, //开始Y坐标
      endX = e.changedTouches[0].clientX, //滑动变化坐标
      endY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = self.getAngle(
        { X: startX, Y: startY },
        { X: endX, Y: endY }
      );

      // 将其他按钮置为关闭状态
      const list = self.data.list
      list.forEach((v, i) => {
        v.isTouchMove = false;
        //滑动角度超过30度角视为无效滑动
        if (Math.abs(angle) > 30) return;
        if (i == index) {
          v.isTouchMove = endX < startX
        }
      });

      //更新数据
      self.setData({
        list: list
      });
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
  
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

  }
})
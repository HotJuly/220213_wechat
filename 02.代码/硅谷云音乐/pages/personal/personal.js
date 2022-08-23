// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用于控制页面上元素的移动效果
    moveDistance:0,

    // 用于控制页面上元素的过渡效果
    moveTransition:""
  },

  // 用于监视用户手指按下事件
  handleTouchStart(event){
    // console.log('event',event)
    // 获取到手指按下的位置
    this.startY = event.touches[0].clientY;

    // 当手指按下时,清除上次遗留的过渡效果
    this.setData({
      moveTransition:""
    })

    // console.log('startY',startY)
  },

  // 用于监视用户手指的移动事件
  handleTouchMove(event){
    // console.log('event',event)
    // 获取手指移动的位置
    const moveY =  event.touches[0].clientY;

    const moveDistance = moveY - this.startY;

    // console.log('moveDistance',moveDistance)

    // 如果移动距离小于0或者大于80,那么该元素就不移动了
    if(moveDistance<80&&moveDistance>0){
      this.setData({
        moveDistance
      })
    }
  },

  // 用于监视用户手指抬起事件
  handleTouchEnd(){
    this.setData({
      moveDistance:0,
      moveTransition:"transform 1s"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
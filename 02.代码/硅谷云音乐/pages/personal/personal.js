// pages/personal/personal.js
// 小程序中引入文件不要使用绝对路径,会出问题,路径不对
import myAxios from '../../utils/myAxios';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用于控制页面上元素的移动效果
    moveDistance:0,

    // 用于控制页面上元素的过渡效果
    moveTransition:"",

    // 用于存储用户个人信息
    userInfo:{},

    // 用于存储最近播放记录列表数据
    playList:[]
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

  // 用于监视用户点击用户信息区域,跳转login页面
  toLogin(){
    // 由于用户进入登录界面,如果不登录还可以返回个人中心
    // 所以选择使用wx.navigateTo跳转
    wx.navigateTo({
      url: '/pages/login/login',
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
  onShow:async function () {
    // 由于personal页面从项目启动到结束,一直都存在,不会卸载
    // 所以生命周期选择使用onShow,最为稳妥

    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    })

    if(userInfo.userId){
      // 请求最近播放记录必须要有用户的userId才行
      const result = await myAxios('/user/record',{
        uid:userInfo.userId,
        type:1
      })

      const playList = result.weekData.map((item)=>{
        return item.song.al
      })
      // console.log('result',result)
      this.setData({
        playList
      })
    }
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
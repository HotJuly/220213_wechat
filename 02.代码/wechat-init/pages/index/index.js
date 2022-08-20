// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   * 乞丐版深拷贝:JSON
   *  var data = new Date();
   *  JSON.parse(JSON.stringify(data));
   * 缺点:
   *  1.拷贝得到的结果一定是一个Object对象,会丢失原型链
   *  2.如果属性值是undefined,那么拷贝结束,该属性会消失
   *  3.如果属性值是函数,那么拷贝结束,该属性会变为undefined
   *  4.遇到特殊类型凉凉,例如:Set,Map,这些都会变成数组和对象
   */
  data: {
    msg:"我是初始化数据",
    userInfo:{}
  },

  handleClick(){
    // console.log('handleClick')

    // wx.navigateTo({
    //   // url: '../log/log',
    //   url: '/pages/log/log',
    // })

    wx.redirectTo({
      url: '../log/log',
      // url: '/pages/log/log',
    })
  },

  handleParent(){
    console.log('handleParent')
  },

  changeMsg(){
    this.setData({
      msg:"我是点击之后的结果"
    })
  },

  getUserProfile(){

    wx.getUserProfile({
      desc:"用于测试授权功能",
      success:(res)=>{
        // 在各种框架中,框架想要给开发者传递数据,一般就两种渠道
        // 一种是通过this,另一种就是通过回调函数的形参

        // console.log('res',res)

        this.setData({
          userInfo:res.userInfo
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(1,this.data.msg)
    // // this.data.msg="我是修改之后的数据"
    // this.setData({
    //   msg:"我是修改之后的数据"
    // })
    // console.log(2,this.data.msg)

    // console.log('-------- onLoad ---------')

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('-------- onReady ---------')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('-------- onShow ---------')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('-------- onHide ---------')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('-------- onUnload ---------')
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
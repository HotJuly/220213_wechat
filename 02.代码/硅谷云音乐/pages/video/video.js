// pages/video/video.js
// import myAxios from '../../utils/myAxios';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于存储导航区域列表数据
    navList:[],

    // 用于记录用户点击选中的导航选项
    currentId:null
  },
  // $myAxios:myAxios,

  // 用于监视用户点击导航区域选项操作
  changeCurrentId(event){
    console.log('changeCurrentId',event)
    // 获取到当前被点击标签的自定义属性data-id,从中可以知道用户选择的是哪个选项

    // event.target是找最内层的触发者
    // 如果用户点击文本上,那么触发者就是text组件
    // 如果用户点击在text组件外面,那么触发者就是view组件
    // const id = event.target.dataset.id;
    const id = event.currentTarget.dataset.id;


    // 最终将用户选中的选项id更新到data中,最终实现页面上类名和下划线的切换效果
    this.setData({
      currentId:id
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
    // tabBar页面除非使用某些特殊手段,否则正常情况下会一直存在
    // 最多是隐藏页面,不会销毁,所以选择使用onShow生命周期最稳妥

    const { data } = await this.$myAxios("/video/group/list");

    // 切割前十三条数据进行展示
    // 小程序更新数据是同步更新,但是以下代码还在解析实参的过程中,还没有触发setData内部的代码,也就是说还没有更新navList.所以不能写成以下写法
    this.setData({
      navList:data.slice(0,13),
      // currentId:this.data.navList[0].id 错误写法
      currentId:data[0].id
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
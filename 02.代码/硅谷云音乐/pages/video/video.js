// pages/video/video.js
// import myAxios from '../../utils/myAxios';
import hasPermission from '../../utils/hasPermission';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于存储导航区域列表数据
    navList:[],

    // 用于记录用户点击选中的导航选项
    currentId:null,

    // 用于存储视频列表区域数据
    videoList:[]
  },
  // $myAxios:myAxios,

  // 该函数用于请求对应分组的视频列表数据
  async getVideoList(){

    this.setData({
      videoList:[]
    })

    const result = await this.$myAxios("/video/group",{
      id:this.data.currentId
    })

    this.setData({
      videoList:result.datas.map((item)=>{
        return item.data;
      })
    })

  },

  // 该函数仅用于测试练习视频相关API,不属于当前项目功能
  testApi(){
    const videoContext = wx.createVideoContext('DAEC00324DE081DC072B09BD90AAAE4D');
    videoContext.pause();
  },

  // 用于监视用户播放视频操作
  handlePlay(event){
    // console.log('handlePlay',event)
    // console.log(this.oldVid)

    // 1.获取当前正在播放视频id
    const vid = event.currentTarget.id;

    // 3.使用API暂停上一个视频的播放
    // 判断条件:
    //  1.必须要有上一次播放的记录
    //  2.上一次播放的视频不能和当前正要播放的视频是同一个
    if(this.oldVid&&this.oldVid!==vid){
      const videoContent = wx.createVideoContext(this.oldVid)
      videoContent.pause();
    }

    // 2.将当前视频的id存储起来,留给下一次使用
    this.oldVid = vid;
  },

  // 用于监视用户点击导航区域选项操作
  async changeCurrentId(event){
    // console.log('changeCurrentId',event)
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

    wx.showLoading({
      title:"加载中,请稍等"
    });

    await this.getVideoList();

    wx.hideLoading();
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
    console.log('this',this)
    /*
      需求:如果用户没有登录,就不发送请求
      拆解:
        1.怎么知道用户是否登录了?
          通过Storage中的cookie属性可以得知

        2.不发送请求
          就是不执行发送请求的代码
    */
   
    // 根据函数的返回值可以判断是否已经登录
    // const flag = hasPermission();
    // if(!flag)return;

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

    this.getVideoList();

    // console.log('result',result)
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
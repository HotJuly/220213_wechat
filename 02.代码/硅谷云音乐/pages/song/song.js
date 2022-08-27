// pages/song/song.js
import PubSub from 'pubsub-js';
console.log('PubSub',PubSub);
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   * Vue必须准备好存储数据的属性名,因为Vue中这些属性名都是响应式的
   * 小程序的data可以不提前声明,因为小程序没有响应式操作
   * 也就是说,小程序可以后续新增状态属性
   */
  data: {

    // 用于存储当前页面展示的歌曲详情
    musicInfo:{},

    // 用于存储当前页面歌曲的音频链接
    musicUrl:"",

    // 用于存储当前页面的歌曲id
    songId:null,

    // 用于控制页面C3效果的状态
    isPlay:false
  },

  // 用于监视用户点击下一首按钮
  switchType(event){

    // 流程1:向每日推荐页面发送用户操作标识
    const type = event.currentTarget.id;
    PubSub.publish('switchType',type);
  },

  // 专门用于请求歌曲详细信息,并实现动态渲染
  async getMusicInfo(){
    const result = await this.$myAxios('/song/detail',{ids:this.data.songId});

    this.setData({
      musicInfo:result.songs[0]
    })

    wx.setNavigationBarTitle({
      title:this.data.musicInfo.name
    })
  },

  // 专门用于请求歌曲音频链接
  async getMusicUrl(){
    // 请求歌曲的音频链接
    const result1 = await this.$myAxios('/song/url',{id:this.data.songId});

    this.setData({
      musicUrl:result1.data[0].url
    })
  },

  // 用于监视用户点击播放按钮操作
  async handlePlay(){
    // 1.获取背景音频管理器对象
    const backgroundAudioManager = wx.getBackgroundAudioManager();

    // 根据页面播放状态,执行不同效果
    if(this.data.isPlay){
      // 能进入这里说明页面处于播放状态,需要暂停歌曲
      backgroundAudioManager.pause();

      // 缓存当前歌曲的播放状态
      appInstance.globalData.playState = false;
    }else{
      if(!this.data.musicUrl){
        await this.getMusicUrl();
      }

      // 2.添加src,title属性,实现自动播放
      backgroundAudioManager.src=this.data.musicUrl;
      backgroundAudioManager.title=this.data.musicInfo.name;

      // 缓存当前播放的歌曲id
      appInstance.globalData.audioId = this.data.songId;

      // 缓存当前歌曲的播放状态
      appInstance.globalData.playState = true;

    }

    this.setData({
      isPlay:!this.data.isPlay
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 错误做法:对象体积太大,无法完整传递
    // console.log('options',options)
    // const jsonObj = options.song;
    // const song = JSON.parse(jsonObj);
    // console.log('song',song)
    
    // 获取当前需要显示的歌曲id
    const songId = options.songId;

    this.setData({
      songId
    })

    this.getMusicInfo();

    // this.getMusicUrl();

    // 用于练习,测试app实例对象操作方法
    // console.log('appInstance1',appInstance.globalData.msg)
    // appInstance.globalData.msg = "我是全局修改之后的数据";
    // console.log('appInstance2',appInstance.globalData.msg)

    // 如果当前页面显示的歌曲和正在播放的背景音频是同一首歌
    const { audioId, playState} = appInstance.globalData;
    // console.log(playState,audioId ,songId)
    if(playState&&audioId == songId){
      this.setData({
        isPlay:true
      })
    }

    // 准备工作3:用于接收每日推荐页面返回的歌曲id
    this.token = PubSub.subscribe("sendId",(msg,id)=>{
      // console.log('id',id);

      this.setData({
        songId:id
      })

      const promise1 = this.getMusicInfo();
      const promise2 = this.getMusicUrl();

      // Promise.all方法会返回一个全新的promise对象
      // 该对象的状态,由数组中的promise决定
      Promise.all([promise1,promise2])
      .then(()=>{
        // 如果前两个请求都成功才执行以下代码,播放歌曲
        const backgroundAudioManager = wx.getBackgroundAudioManager();
  
        backgroundAudioManager.src=this.data.musicUrl;
        backgroundAudioManager.title=this.data.musicInfo.name;
        
        // 缓存当前播放的歌曲id
        appInstance.globalData.audioId = this.data.songId;

        // 缓存当前歌曲的播放状态
        appInstance.globalData.playState = true;

        this.setData({
          isPlay:true
        })
      })
      .catch((error)=>{
        // 如果任何一个请求失败,则弹窗提示用户
        wx.showToast({
          title:error,
          icon:"none"
        })
      })

    })
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
    // 在页面卸载的时候,解绑当前组件绑定的消息订阅
    PubSub.unsubscribe(this.token);
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
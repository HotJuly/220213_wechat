// pages/song/song.js
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

    // 用于控制页面C3效果的状态
    isPlay:false
  },

  // 用于监视用户点击播放按钮操作
  handlePlay(){
    // 1.获取背景音频管理器对象
    const backgroundAudioManager = wx.getBackgroundAudioManager();

    // 根据页面播放状态,执行不同效果
    if(this.data.isPlay){
      // 能进入这里说明页面处于播放状态,需要暂停歌曲
      backgroundAudioManager.pause();
    }else{
      // 2.添加src,title属性,实现自动播放
      backgroundAudioManager.src=this.data.musicUrl;
      backgroundAudioManager.title=this.data.musicInfo.name;
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

    const result = await this.$myAxios('/song/detail',{ids:songId});
    // console.log('result',result)

    this.setData({
      musicInfo:result.songs[0]
    })

    wx.setNavigationBarTitle({
      title:this.data.musicInfo.name
    })

    
    // 请求歌曲的音频链接
    const result1 = await this.$myAxios('/song/url',{id:songId});
    // console.log('result',result)

    this.setData({
      musicUrl:result1.data[0].url
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
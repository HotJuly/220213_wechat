// pages/recommendSong/recommendSong.js
import PubSub from 'pubsub-js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

      // 用于存储当前月份
      month:"--",

      // 用于存储当前日期
      day:"--",

      // 用于存储每日推荐列表数据
      recommendList:[],

      // 用于存储当前用户点击的歌曲下标
      currentIndex:null
  },

  // 用于监视用户点击歌曲卡片,实现跳转到song页面功能
  toSong(event){
    // console.log('event',event.currentTarget.dataset.song)

    // 小程序路由传参方式
    // 发送数据:通过url使用query字符串进行拼接数据
    // 接受数据:在页面的onLoad函数的形参options中可以获取到传递的query数据

    // 注意:url具有长度限制,不能传递太大的数据

    const song = event.currentTarget.dataset.song
    const currentIndex = event.currentTarget.dataset.index;

    this.setData({
      currentIndex
    })

    wx.navigateTo({
      // 不能传对象,数据量太大了
      // url:`/pages/song/song?song=${JSON.stringify(song)}`
      url:`/pages/song/song?songId=${song.id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    const date = new Date();

    const day = date.getDate();

    const month = date.getMonth() + 1;
    // console.log('month',month)

    this.setData({
      month,
      day
    });

    const result = await this.$myAxios('/recommend/songs');

    this.setData({
      recommendList:result.recommend
    })
    // console.log('result',result)

    PubSub.subscribe("switchType",(msg,type)=>{
      // console.log('switchType',msg,type)

      let {currentIndex,recommendList} = this.data;

      if(type==="next"){
        currentIndex++;
      }

      // 根据下标找到对应歌曲的信息
      const song = recommendList[currentIndex];

      PubSub.publish('sendId',song.id);
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
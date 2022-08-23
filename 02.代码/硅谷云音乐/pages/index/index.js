// pages/index/index.js
import myAxios from '../../utils/myAxios';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用于存储首页轮播图相关数据
    banners:[],

    // 用于存储推荐歌曲区域相关数据
    recommendList:[],

    // 用于存储排行榜区域相关数据
    topList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    /*
      发送请求所需要知道的三个事情
        1.在哪发
          在Vue中,我们会考虑在created或者mounted中发送请求
          小程序的onLoad类似于created
          小程序的onReady类似于mounted

          我选择:onLoad

        2.怎么发
          在Vue中,使用axios发送请求(axios的源码其实是用promise和ajax组合实现)
            小程序中没有window对象,所以无法发送ajax请求
            小程序的全局对象是wx

          API:wx.request(Object object)

            小程序中,
              如果请求方式是GET,那么data对象就会变成query字符串进行url拼接
              如果请求方式是POST,那么data对象就会作为请求体参数进行发送

        3.往哪发
          查看接口文档
            请求三要素:地址+请求方式+请求参数
    */

    // console.log('window',window)
    // wx.request({
    //   url:"http://localhost:3000/banner",
    //   method:"GET",
    //   data:{
    //     type:2
    //   },
    //   success:(res)=>{
    //     // 此处的res是响应报文对象,其中的data才是响应体数据
    //     // console.log('res',res)
    //     const banners = res.data.banners;
    //     this.setData({
    //       // banners:banners,
    //       banners
    //     })
    //   }
    // })


    // 用于请求轮播图数据
    const result1 = await myAxios("/banner",{
      type:2
    });

    const banners = result1.banners;
    this.setData({
      // banners:banners,
      banners
    })


    // 用于请求推荐歌曲区域数据
    const result = await myAxios("/personalized");
    // console.log('result',result)
    this.setData({
      recommendList:result.result
    })

    // 用于请求排行榜区域数据

    // 用于声明需要展示的榜单key值
    const keys = [1,4,8,22,33];

    // 用于存储所有榜单的数据
    const topList = [];

    // 用于记录当前请求的次数
    let index = 0;

    // 开始请求榜单数据
    // while循环的判断条件,如果为true就执行内部代码,如果是false就跳出循环
    // 循环停止的条件就是keys中所有的榜单都请求结束了
    while(keys.length>index){
      const result2 = await myAxios("/top/list",{
        idx:keys[index++]
      });

      // 用该对象存储所需要的数据,过滤掉无用的数据
      // slice方法接收两个实参,第一个是开始下标,第二个是结束下标
      // slice切割数组,开始下标的内容会带上,但是结束下标的内容不会
      // map方法接受一个回调函数
      // map返回值是一个全新的数组,内部的数据是根据回调函数的返回值决定的
      const obj = {
        id:result2.playlist.id,
        name:result2.playlist.name,
        list:result2.playlist.tracks.slice(0,3).map((item)=>{
          return item.al
        })
      };
  
      topList.push(obj)
      // console.log('topList',topList)
  
      this.setData({
        topList
      })
    }
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
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于收集用户手机号码
    phone: "17688197777",

    // 用于收集用户密码
    password: "abc123",
  },

  // 用于监视phone输入框失去焦点事件
  handlePhone(event) {
    // 如果你想知道一些跟当前事件相关的数据,就找事件对象event
    // 小程序中通过event.detail.value可以获取到输入框的结果
    // console.log('handlePhone',event)
    const value = event.detail.value;

    this.setData({
      phone: value
    })
  },

  handlePassword(event) {
    const value = event.detail.value;

    this.setData({
      password: value
    })
  },

  // 用于实现一个回调函数,收集多个input框的数据操作
  handleInput(event) {
    // 通过给标签添加自定义属性,可以实现向事件回调函数内部传参的效果
    // 获取方式:event.target.dataset.type

    // 收集得知哪个组件触发的当前事件
    const type = event.target.dataset.type;

    const value = event.detail.value;

    this.setData({
      [type]: value
    })
  },

  // 用于监视用户点击登录按钮,实现登录功能
  handleLogin() {
    /*
      登录操作流程:
        1.收集数据
        2.处理数据
        3.前端表单校验
        4.发送请求
          网易云音乐在近期对登录接口进行了改动,无法直接请求了
          所以此处只能做一个假登录

        5.成功做什么
          失败做什么
    
    */

    // 1.收集数据
    let {
      phone,
      password
    } = this.data;

    // 2.处理数据
    phone = phone.trim();
    password = password.trim();

    // 3.前端表单校验
    if (!phone) {
      // phone没有数据才会进入

      // 弹窗提示用户
      wx.showToast({
        title: "手机号码不能为空",
        icon: "none"
      });
      return;
    }
    if (!password) {
      // password没有数据才会进入
      wx.showToast({
        title: "密码不能为空",
        icon: "none"
      });
      return;
    }

    // 4.发送请求
    // 假登录,用于存储用户数据,其中code代表状态码,result代表用户信息
    let result;
    if (phone === "17688197776" && password === "chh112233") {
      // 就视作登录成功
      result = {
        code:200,
        profile:{
          accountStatus: 0,
          authStatus: 0,
          authority: 0,
          avatarDetail: null,
          avatarImgId: 109951165120404640,
          avatarImgIdStr: "109951165120404634",
          avatarImgId_str: "109951165120404634",
          avatarUrl: "https://p2.music.126.net/,Ni3aqGjQX85pPr8XU20XDg==/109951165120404634.jpg",
          backgroundImgId: 2002210674180204,
          backgroundImgIdStr: "2002210674180204",
          backgroundUrl: "https://p1.music.126.net/,5L9yqWa_UnlHtlp7li5PAg==/2002210674180204.jpg",
          birthday: -2209017600000,
          city: 350500,
          defaultAvatar: false,
          description: "",
          detailDescription: "",
          djStatus: 0,
          eventCount: 1,
          expertTags: null,
          experts: {},
          followed: false,
          followeds: 2,
          follows: 6,
          gender: 0,
          mutual: false,
          nickname: "七月入栈",
          playlistBeSubscribedCount: 0,
          playlistCount: 10,
          province: 350000,
          remarkName: null,
          signature: "",
          userId: 59421805,
          userType: 0,
          vipType: 0
        }
      }
    }

    //5.成功和失败分别做什么
    /*
      状态码:
        200->代表登录成功
        400->代表帐号格式错误
        501->代表帐号不存在
        502->代表密码错误

      写代码的时候一般先考虑大部分的情况,也就是成功,再考虑失败
    */

    const code = result.code;

    // if(code===200){

    //   wx.showToast({
    //     title:"登录成功,即将跳转",
    //     icon:"none"
    //   });
    //   return;

    // }else if(code===400){

    //   wx.showToast({
    //     title:"帐号格式错误",
    //     icon:"none"
    //   });
    //   return;
    // }else if(code===501){

    //   wx.showToast({
    //     title:"帐号不存在",
    //     icon:"none"
    //   });
    //   return;
    // }else if(code===502){

    //   wx.showToast({
    //     title:"密码错误",
    //     icon:"none"
    //   });
    //   return;
    // }




    // 策略模式写法
    // 策略:你出招,我是用对应的招数接招

    // 创建了一个对象,该对象的属性名是可能出现的状态码
    // 属性值是该状态码下,需要执行的代码

    // 策略模式最经典的使用位置就是Vue中的生命周期钩子函数

    const codeFn = {
      200(){

        wx.showToast({
          title:"登录成功,即将跳转",
          icon:"none"
        });
        return;

      },
      400(){

        wx.showToast({
          title:"账号格式错误",
          icon:"none"
        });
        return;

      },
      501(){

        wx.showToast({
          title:"帐号不存在",
          icon:"none"
        });
        return;
        
      },
      502(){

        wx.showToast({
          title:"密码错误",
          icon:"none"
        });
        return;
        
      }
    }


    // &&语法,如果前一个判断条件是false,那么后一个判断条件不会执行
    // codeFn[code]();
    // if(codeFn[code]){
    //   codeFn[code]();
    // }
    codeFn[code]&&codeFn[code]();
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
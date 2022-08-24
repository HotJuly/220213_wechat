// app.js
import myAxios from './utils/myAxios';
App({
  onLaunch() {
    const PageFn = Page;

    Page = function(config){

      config.$myAxios = myAxios;

      // 1.获取到每个页面配置对象中的onShow钩子函数
      const showFn = config.onShow;

      // 2.重写每个页面的onShow函数
      // 对配置对象中的onShow属性进行重新赋值
      // 而在这个新创建的函数中,我会调用原先开发者传入的旧函数

      // 当每个页面开始显示的时候,会调用这个重写完的onShow函数
      config.onShow = function(){

        // 当页面开始显示时,会调用onShow,而onShow会调用showFn
        // 这个showFn就是开发某个页面的开发者传入的onShow函数的代码
        // 注意:每个页面的生命周期钩子函数中的this都是当前页面的实例对象

        // 如果直接showFn()调用,那么该函数的this就不是当前页面的实例对象
        // 此行代码的含义,是将showFn中的this强行改变成外层函数的this
        // 而外层函数的this刚好是页面的实例对象,可以防止showFn函数因为this指向错误而执行代码失败的效果
        showFn.call(this);
      }
    
      return PageFn(config);
    }
  },
  globalData: {
    userInfo: null
  }
})

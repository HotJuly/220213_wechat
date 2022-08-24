// app.js
import myAxios from './utils/myAxios';
App({
  onLaunch() {
    // 这个onLaunch是App的独享生命周期,他相当于是页面的onLoad
    // 代表App开始加载,也是整个小程序最早执行的生命周期

    // 1.将Page函数的地址值复制一份给PageFn进行存储
    // 此处是地址值的传递,等号赋值是将内部的数据复制一份给对方

    // Page函数的作用:整个小程序中只有他有能力创建页面的实例对象
    const PageFn = Page;

    //2.
    // 此处将Page变量中的地址值换成了一个新的函数,而PageFn不会受到影响
    // 虽然Page变量的内容发生了变化,但是PageFn中的函数还是那个可以创建页面实例对象的函数
    // 声明形参config,用于接收每个页面调用Page时,传入的配置对象
    Page = function(config){

      // 给每个页面的配置对象中都添加一个$myAxios属性,属性值是myAxios函数
      // 虽然每个页面实例对象都会具有$myAxios属性,但是实际上存储的都是同一个myAxios函数的地址值
      config.$myAxios = myAxios;
    
      // Page没法创建页面实例,但是PageFn可以,所以调用PageFn进行帮忙
      return PageFn(config)
    }
  },
  globalData: {
    userInfo: null
  }
})

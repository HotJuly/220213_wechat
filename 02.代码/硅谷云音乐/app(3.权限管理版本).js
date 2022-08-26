// app.js
import myAxios from './utils/myAxios';
import hasPermission from './utils/hasPermission';
import utilConfig from './utils/config';
App({
  onLaunch() {
    const PageFn = Page;

    Page = function(config){

      config.$myAxios = myAxios;

      const showFn = config.onShow;

      config.onShow = function(){
        // 针对部分页面实现权限检测功能
        // 如果当前页面的路径出现在utilConfig的checkPermission数组中,那就说明需要检查权限
        // 问题:如何知道当前页面的路径?
        // 解答:通过this.route可以获取到当前页面的路径
        // console.log(this.route)

        // 用于检查当前页面是否存在于黑名单中,存在就要做权限检测
        const result = utilConfig.checkPermission.includes(this.route);
        
        if(result){
          // 在页面开始显示的时候,检查当前用户是否有登陆
          const flag = hasPermission();
          // 如果没有登录,后续代码就不执行
          if(!flag)return;
        }

        showFn.call(this);
      }
    
      return PageFn(config);
    }
  },
  globalData: {
    userInfo: null
  }
})

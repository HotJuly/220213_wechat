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
        
        // const result = utilConfig.checkPermission.includes(this.route);

        const result = utilConfig.checkPermission[this.route];
        
        if(result){
          const flag = hasPermission();
          if(!flag)return;
        }

        // showFn();
        showFn&&showFn.call(this);
      }
    
      return PageFn(config);
    }
  },
  globalData: {
    userInfo: null
  }
})

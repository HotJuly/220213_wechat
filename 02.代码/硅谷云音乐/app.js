// app.js
import myAxios from './utils/myAxios';
import moment from 'moment';
import hasPermission from './utils/hasPermission';
import utilConfig from './utils/config';
App({
  onLaunch() {
    const PageFn = Page;

    Page = function(config){

      config.$myAxios = myAxios;

      config.$moment= moment;

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
    msg:"我是全局初始化的数据",
    playState:false,
    audioId:null
  }
})

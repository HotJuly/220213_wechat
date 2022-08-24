// app.js
import myAxios from './utils/myAxios';
App({
  onLaunch() {
    const PageFn = Page;

    Page = function(config){

      config.$myAxios = myAxios;
    
      return PageFn(config);
    }
  },
  globalData: {
    userInfo: null
  }
})

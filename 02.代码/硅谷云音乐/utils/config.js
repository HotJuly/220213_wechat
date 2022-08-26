export default{
  // 黑名单,在这个名单中出现的页面,都需要做权限检测功能
  // checkPermission:["pages/video/video"],
  checkPermission:{
    "pages/video/video":true,
    "pages/index/index":false
  }
}
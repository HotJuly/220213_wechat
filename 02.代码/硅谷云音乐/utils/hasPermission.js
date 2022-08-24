// 该文件返回一个检查是否登录的函数
// 如果没有登录,就弹出窗口提示用户未登录,并且返回false
// 如果有登录,就返回true
export default function(){
  if(!wx.getStorageSync('cookie')){
    // 以上判断,说明如果没有cookie数据就会进入当前判断内部

    wx.showModal({
      title:"请先登录",
      content:"该功能需要登录之后才能使用",
      confirmText:"去登陆",
      cancelText:"回到首页",
      success(event){
        // 无论用户点击确定还是取消,都会触发成功的回调函数
        // 问题:如何分辨用户当前点的是确定还是取消?
        // console.log('success',event)
        if(event.confirm){
          // 能进入这里说明用户点了去登陆
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }else{
          // 能进入这里说明用户点了回到首页
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      },
      fail(){
        // 只有显示失败了,才会触发
        console.log('fail')
      }
    });

    return false;
  }
  return true;
}
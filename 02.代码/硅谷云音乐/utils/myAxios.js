
/*
  该文件一定暴露一个函数,而且该函数调用之后可以发送请求
  封装代码核心思想:
    1.保留重复出现的部分
    2.将每次都不同的内容提取出来
    3.谁使用谁传入
*/

export default function(url,data={},method="GET"){
  // let result;
  return new Promise((resolve)=>{
    wx.request({
      url:"http://localhost:3000" + url,
      method,
      data,
      success:(res)=>{
        // console.log('res',res)
        // const recommendList = res.data.result;
        // this.setData({
        //   recommendList
        // })
        // result = res;

        // 此处的res是响应报文对象,其中的data才是响应体数据
        // 此处相当于就是axios的响应拦截器
        resolve(res.data);
      }
    })
  })
  // return result;
}
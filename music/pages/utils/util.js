
function http(url,callback,type,desc){
  
  wx.request({
    url:url,
    header: {
      'content-type': 'application/json'//默认值
    },
    success: function (res) {
      // callback 回调函数
      callback(res.data,type,desc);

    }
  })
}
module.exports = {
  http:http
}
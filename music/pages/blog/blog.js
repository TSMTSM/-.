// pages/blog/blog.js
//导入data.js文件
var data = require("../data/data.js")
Page({

  
  data: {
    //声明数据
    musicInfo:[]

  
  },

  onLoad: function (options) {
    
    this.getNewsInfo();
  },
/*
网络请求：
    拿到数据
*/
getNewsInfo:function(){
  // javascript的this关键字问题
  var that = this;
  wx.request({
    url: 'https://v.juhe.cn/toutiao/index?type=top&  key=182e9e4d6c616c76309bc294e4368cda',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      
      that.setData({
        musicInfo: res.data.result.data
      })
    }
  })

}
})
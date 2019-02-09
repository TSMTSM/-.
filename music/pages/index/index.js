Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //跳转
  gotoBlog:function(){
    // 页面跳转navigate
    // 只有switchTab才能跳转到tabBar
    wx.switchTab({
      url: '../blog/blog'
      
    })
  }

  
})
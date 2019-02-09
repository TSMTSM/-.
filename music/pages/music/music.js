// pages/music/music.js
var utils = require("../utils/util.js");
// 引用全局对象
var app = getApp();
Page({


  data: {
    currentMusic: [],
    newMusic: [],
    hotMusic: [],
    rockMusic: [],
    // 存储搜索数据
    searchData: "",
    // 声明数据
    musicDesc: [{
        name: "新歌榜",
        num: 2312
      },
      {
        name: "热歌榜",
        num: 222
      },
      {
        name: "摇滚榜",
        num: 251
      },
    ]

  },

  onLoad: function(options) {
    // 调用网络请求
    utils.http(app.globalData.gURL + app.globalData.urlPath + "type=1&count=3&offset=0", this.getData, "newMusic", this.data.musicDesc[0])
    utils.http(app.globalData.gURL + app.globalData.urlPath + "type=2&count=3&offset=0", this.getData, "hotMusic", this.data.musicDesc[1])
    utils.http(app.globalData.gURL + app.globalData.urlPath + "type=11&count=3&offset=0", this.getData, "rockMusic", this.data.musicDesc[2])

    // 等待加载
    wx.showLoading({
      title: '让子弹飞一会...',
    })

  },

  /** 封装网络请求
   *    utils
   *
   */
  getData: function(data, type, desc) {
    // 拿到数据消失
    wx.hideLoading();
    // 分别处理数据
    var readyData = {};
    // type区分数据类型
    readyData[type] = {
      currentMusic: data.song_list,
      desc: desc

    }
    // 渲染视图
    this.setData(readyData)
    // 打印
    console.log(readyData);

  },
  // 事件：所有的参数都有一个事件对象：叫event
  gotoDetails: function(event) {
    var currentType = event.currentTarget.dataset.type;
    // 点击事件
    // console.log("点击事件")

    //跳转
    wx.navigateTo({
      url: '../music-details/music-details?type=' + currentType
    })
  },

  getInputContent: function(event) {
    this.setData({
      searchData: event.detail.value
    })
  },
  gotoSearch: function(event) {
    wx.navigateTo({
      url: '../search-music/search-music?search=' + this.data.searchData,
    })

  }

})
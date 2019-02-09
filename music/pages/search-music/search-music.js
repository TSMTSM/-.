// pages/search-music/search-music.js
var utils = require("../utils/util.js");
var app = getApp();
Page({


  data: {
    readyData: []
  },


  onLoad: function(options) {
    utils.http(app.globalData.gURL + "/sxtstu/music/baidu/search.php?content=" + options.search, this.getSearchInfo, null, null);
  },
  getSearchInfo: function(data) {
    console.log(data);
    var readyData = [];
    // 过滤数据
    if (data.error_code != 22001) {
      for (var i = 0; i < data.song.length; i++) {
        var temp = {
          id: data.song[i].songid,
          title: data.song[i].songname,
          author: data.song[i].artistname,
        }
        readyData.push(temp);
      }
    }
    this.setData({
      readyData: readyData
    });
  },
  gotoPlay: function(event) {
    var musicid = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../play-music/play-music?musicid=' + musicid,
    })
  }
})



// 判断length是否为空，空报错
// 搜索是有就体现，没有报错
// 数据信息过滤
// var musics = [];
// if (data.song_list != null) {
//   for (var i = 0; i < data.song_list.length; i++) {
//     var temp = {
//       // 歌曲id
//       id: data.song_list[i].song_id,
//       // 歌曲名称
//       title: data.song_list[i].title,
//       // 作者
//       author: data.song_list[i].author,
//       // 歌曲图片
//       pic: data.song_list[i].pic_big,
//     }
//     // 数组的push方法
//     musics.push(temp);
//   }
// } else {
//   wx.showToast("服务器开小差了");
// }
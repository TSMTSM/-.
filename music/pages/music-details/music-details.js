// pages/music-details/music-details.js
// 引入数据
var data = require("../data/musicinfo.js");
var utils = require("../utils/util.js");


/* 编程中注意的细节与重点
  1.代码必须具有可维护性
  2.代码必须具有公共数据提取
 */
// 引用全局对象
var app = getApp();
/* 参数1：url
 *参数2：callback
 */

Page({
  data: {
    pageInfo: {},
    publicUrl: "",
    musicList: [], //缓存数据
    // offset偏移量
    offset: 0,
    src: "",
    poster: "",
    author: "",
    name: app.globalData.musicInfo.name,
    // 代表音乐是否播放
    playing: app.globalData.musicInfo.isPlaying
  },


  onLoad: function(options) {
    // 判断本地是否存在数据
    if (wx.getStorageSync("musicName") && wx.getStorageInfoSync("playstatus")) {
      this.setData({
        name: wx.getStorageInfoSync("musicName"),
        playing: wx.getStorageInfoSync("playstatus")
      })
    }
    // options.type是页面的数据区分
    console.log(options.type)
    switch (options.type) {
      case "24":
        this.setData({
          pageInfo: data.musicInfo[3],
          publicUrl: app.globalData.gURL + app.globalData.urlPath + "type=24&count=10"
        })
        break;
      case "25":
        this.setData({
          pageInfo: data.musicInfo[4],
          publicUrl: app.globalData.gURL + app.globalData.urlPath + "type=25&count=10"
        })
        break;
      case "热歌榜":
        this.setData({
          pageInfo: data.musicInfo[1],
          publicUrl: app.globalData.gURL + app.globalData.urlPath + "type=2&count=10"
        })
        break;
      case "新歌榜":
        this.setData({
          pageInfo: data.musicInfo[0],
          publicUrl: app.globalData.gURL + app.globalData.urlPath + "type=1&count=10"
        })
        break;
      case "摇滚榜":
        this.setData({
          pageInfo: data.musicInfo[2],
          publicUrl: app.globalData.gURL + app.globalData.urlPath + "type=11&count=10"
        })
        break;
      default:
        // 搜索的结果
        this.setData({
          publicUrl: app.globalData.gURL + "/sxtstu/music/baidu/search.php?content=" + options.type
        })
        break;
    }
    // 网络请求
    utils.http(this.data.publicUrl + "&offset=0", this.getMusicInfo, null, null);
    // 添加等待加载过程
    wx.showLoading({
      title: "等待歌曲加载",
      mask: true
    })
  },

  getMusicInfo: function(data) {
    // 拿到数据停止下拉刷新：
    wx.stopPullDownRefresh()
    // 拿到数据取消等待
    wx.hideLoading();
    console.log(data);
    // 数据信息过滤
    var musics = [];
    if (data.song_list != null) {
      for (var i = 0; i < data.song_list.length; i++) {
        var temp = {
          // 歌曲id
          id: data.song_list[i].song_id,
          // 歌曲名称
          title: data.song_list[i].title,
          // 作者
          author: data.song_list[i].author,
          // 歌曲图片
          pic: data.song_list[i].pic_big,
        }
        // 数组的push方法
        musics.push(temp);
      }
    } else {
      wx.showToast("服务器开小差了");
    }

    /**
     * 合并数据
     * 上一次加载的数据累加新刷新的数据
     * 数组有一个方法：concat
     * 
     * 哪一个数据是上一次的，那个数据是当前请求到的
     * 
     * this.data.musicList.concat(musics)
     * 
     */
    //创建一个呈现所有数据的集合：totalMusic
    var totalMusic = [];
    totalMusic = this.data.musicList.concat(musics)
    console.log(totalMusic);
    // 注意：放在for循环的外面
    this.setData({
      musicList: totalMusic,
      offset: this.data.offset += 10
    })
  },
  onReachBottom: function() {
    // 等待变化数据
    wx.showLoading({
      title: '等待变化数据',
    });
    //  再次重新请求数据
    utils.http(this.data.publicUrl + "&offset=" + this.data.offset, this.getMusicInfo, null, null)
  },
  /*
   *下拉刷新时事件
   */
  onPullDownRefresh: function() {
    // 从新请求数据
    utils.http(this.data.publicUrl + "&offset=0", this.getMusicInfo, null, null);
    // 清空数据
    this.setData({
      musicList: [],
      offset: 0
    })
  },

  /**
   * 播放音乐
   */
  play: function(src) {
    var that = this;
    wx.playBackgroundAudio({
      dataUrl: this.data.src,
      title: this.data.name,
      coverImgUrl: this.data.poster,
      // 完成后得回调函数
      complete: function() {
        that.setData({
          palying: true
        })
      }
    })
    // 改变全局状态
    app.globalData.musicInfo.name = this.data.name;
    app.globalData.musicInfo.isPlay = true;

    // 本地存储状态
    wx.setStorageSync("musicName", this.data.name);
    wx.setStorageSync("playstatus", true);
  },

  /**
   * 停止播放
   */
  stop: function() {
    var that = this;
    wx.stopBackgroundAudio({
      dataUrl: this.data.src,
      success: function() {
        that.setData({
          playing: false
        })
      }
    })
    // 改变全局状态
    app.globalData.musicInfo.name = this.data.name;
    app.globalData.musicInfo.isPlay = false;

    // 本地存储状态
    wx.setStorageSync("musicName", this.data.name);
    wx.setStorageSync("playstatus", false);
  },



  /**
   * 暂停播放事件
   */
  pauseHandler: function(event) {
    if (this.data.playing) {
      this.pause();
    } else {
      this.play();
    }
  },



  /**
   * 暂停音乐
   */
  pause: function() {
    var that = this;
    wx.pauseBackgroundAudio({
      dataUrl: this.data.src,
      success: function() {
        that.setData({
          playing: false
        })
      }
    })

    // 改变全局状态
    app.globalData.musicInfo.name = this.data.name;
    app.globalData.musicInfo.isPlay = false;

    // 本地存储状态
    wx.setStorageSync("musicName", this.data.name);
    wx.setStorageSync("playstatus", false);
  },


  /**
   * 播放的功能
   */
  gotoPlay: function(event) {
    var that = this;
    var musicId = event.currentTarget.dataset.id;
    // wx.navigateTo({
    //   url:'../play-music/play-music?musicid=' + musicId,
    // })

    // 实现播放
    wx.request({
      url: app.globalData.gURL+'/sxtstu/music/baidu/play.php?mid=' + musicId,
      method: "get",
      success: function(res) {
        console.log(res.data)
        var temp = {
          src: res.data.bitrate.file_link,
          poster: res.data.songinfo.pic_huge,
          author: res.data.songinfo.author,
          name: res.data.songinfo.title,
        }
        that.setData(temp);
        that.play();
      }
    })
  },

})
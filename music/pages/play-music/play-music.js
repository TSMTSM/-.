// pages/play-music/play-music.js
var utils = require("../utils/util.js")
var app = getApp();
Page({


  data: {
    poster: '',
    name: '',
    author: '',
    src: "",
    lrc:[]

  },
  onReady: function(e) {
    this.audioCtx = wx.createAudioContext('myAudio')
  },



  onLoad: function(options) {
    // 读取可播放的歌曲
    utils.http(app.globalData.gURL + '/sxtstu/music/baidu/play.php?mid='  + options.musicid, this.getPlayMusic, null, null);
    // 读取歌曲歌词
    utils.http(app.globalData.gURL + '/sxtstu/music/baidu/lrc.php?mid=' + options.musicid, this.getMusicLRC, null, null)
  
  },
  getPlayMusic: function(data) {

    this.setData({
      poster: data.songinfo.pic_huge,
      name: data.songinfo.title,
      author: data.songinfo.author,
      src: data.bitrate.file_link
    })
  },
  //获取歌词
  getMusicLRC: function (data) {
    var lyrics = data.lrcContent.split("\n");
    var lrcObj = {};
    var lrcArr = [];
    for (var i = 0; i < lyrics.length; i++) {
      var lyric = decodeURIComponent(lyrics[i]);
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      var timeRegExpArr = lyric.match(timeReg);
      if (!timeRegExpArr) continue;
      var clause = lyric.replace(timeReg, '');
      for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
        var t = timeRegExpArr[k];
        var min = Number(String(t.match(/\[\d*/i)).slice(1)),
          sec = Number(String(t.match(/\:\d*/i)).slice(1));
        var time = min * 60 + sec;
        lrcObj[time] = clause;
        lrcArr.push(clause);
      }
    }

    this.setData({
      lrc: lrcArr
    })

  },

  // 转发
  onShareAppMessage: function(res) {
    return {
      title: "慢慢来吧",
      path: "/pages/play-music/play-music"
    }
  }
})
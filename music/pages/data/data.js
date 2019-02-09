//创建模拟真实数据-->模拟json（前后端传输数据）格式数据
//采用数组存储
var data = [
  {
    id:0,
    icon:"../images/head1.png",
    username:"iwen",
    time:"2015/6/1",
    title:"qwwecnrwc",
    sub:"../images/sub2.png",
    desc:"i like",
    collected:20,
    comment:15
  },

  {
    id: 1,
    icon: "../images/head1.png",
    username: "baby",
    time: "2015/6/19",
    title: "sky",
    sub: "../images/sub2.png",
    desc: "i don't like",
    collected: 45,
    comment: 75
  },

  {
    id: 2,
    icon: "../images/head1.png",
    username: "蓝莓",
    time: "2015/7/1",
    title: "blue",
    sub: "../images/sub2.png",
    desc: "no yes",
    collected: 78,
    comment: 56
  }
  
]

//在小程序中，文件与文件之间是不能互相直接访问的，需要通过模块操作
module.exports ={
  data:data
}
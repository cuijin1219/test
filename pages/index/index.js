// index.js
// 获取应用实例
const app = getApp()
Page({
  test(e){
    console.log(e)
  },
  handleInput(e){
    this.setData({
      mytext:e.detail.value
    })
  },
  pro1(e){
    this.setData({
      type:e.detail.value
    })
    if(this.data.type=="c"){
      this.setData({
        hiddenName:false
      })
    }
    else{
        this.setData({
          hiddenName:true
        })
    }
  },
  CompareData(){
    let that=this
    wx.cloud.callFunction({
      name:"CompareData",
      success(res){
        console.log("success",res.result.data)
        that.setData({
          compareList : res.result.data
        })
      }
    })
  },
  setYear(e){
    this.setData({
      year:e.detail.value
    })
  },
  setNum1(e){
    console.log(e.detail.value)
    this.setData({
      num1:e.detail.value
    })
  },
  setNum2(e){
    console.log(e.detail.value)
    this.setData({
      num2:e.detail.value
    })
  },
  data: {
    mytext:"",
    compareList:[],
    testList:["aaa","bbb","ccc","abc"],
    f_part1:"0",
    f_part2:"0",
    type:'',
    year:"0",
    num1:"0",
    num2:"0",
    hiddenName:true,
    count:"0"
  },
  
  
})

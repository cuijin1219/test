
Page({
  data: {
    id:[],
    idi:[],
    id1:'a',
    id2:'',
    id3:'',
    id4:'',
    f1:"0",
    f2:"0",
    f3:"0",
    f4:"0",
    f5:"0",
    f_part1:"",
    f_part2:"",
    num1:"",
    num2:"",
    f_total:"0",
    hiddenName:true,
    year:"0",
    type:"",
    count:'',
    f_total_ex:"0",
  },
  clear(){
    this.setData({
    f1:"0",
    f2:"0",
    f3:"0",
    f4:"0",
    f5:"0",
    f_total:'0',
    f_total_ex:"0"
    })
  },
  click:function(e){
    this.setData({
        hiddenName:!this.data.hiddenName
    })
},
  pro1(e){
    this.setData({
      id1:"a"
    })
  },
  pro2(e){
    this.setData({
      id2:e.detail.value
    })
  },
  pro3(e){
    this.setData({
      id3:e.detail.value
    })
  },
  pro4(e){
    this.setData({
      id4:e.detail.value
    })
  },
  
  link(){
    if(this.data.id1!=""&this.data.id2!=""&this.data.id3!=""&this.data.id4!=""){
      this.setData({                          //给用户选择的id赋值
        id:this.data.id1+this.data.id2+this.data.id3+this.data.id4
      })
      let that=this
      wx.cloud.callFunction({               //调用云函数查询数据库，
      name:"getData_Bare",
      success(res){
        that.setData({
          idi : res.result.data
        })
        let i=that.data.idi.length         //获取数据库长度
        let j=0
        while(j<i){                        //遍历，选择相同id的数据，并取出
          if(that.data.id==that.data.idi[j].id){
            that.setData({
              f1:that.data.idi[j].service_fee,
              f2:that.data.idi[j].mobilization_fee,
              f4:that.data.idi[j].average_fee,
              f5:that.data.idi[j].average_single_port,
             })
            let a=0;                      //计算总价，三个类型分别计算
            let b=0;
            if(that.data.type=="a"){
              console.log(that.data.f1)
              a=Number(that.data.f1)+Number(that.data.f2)+Number(that.data.f3)+0.04*that.data.year
              that.setData({
              f_total:a.toFixed(2)
            })
            }
            else if(that.data.type=="b"){
              a=(Number(that.data.f1)+Number(that.data.f2))*2+0.04*that.data.year
              that.setData({
                f_total:a.toFixed(2)
              })
            }
            else if(that.data.type=="c"){
              a=Number(that.data.f1)+Number(that.data.f2)
              b=0.04*that.data.year
              that.setData({
                count:that.data.count+1,
                f_part1:a.toFixed(2),
                f_part2:b.toFixed(2)
              })
            }
            else if(that.data.type==""){
              wx.showToast({
                icon:"error",
                title:"请返回上一页选择类型"
            })
          }          
          }
          j=j+1 
        }
        if(that.data.f1=="0"&that.data.f2=="0"&that.data.f4=="0"&that.data.f5=="0"){
          wx.showToast({
            icon:"none",
            title:"该组合未存在"
          })
        }
       },
    })
    }
    else{
      wx.showToast({
        icon:"loading",
        title:"请完成所有选项后重试"
      })
    }
  },
  link1(){
    if(this.data.id1!=""&this.data.id2!=""&this.data.id3!=""&this.data.id4!=""){
      this.setData({                          //给用户选择的id赋值
        id:this.data.id1+this.data.id2+this.data.id3+this.data.id4
      })
      let that=this
      wx.cloud.callFunction({               //调用云函数查询数据库，
      name:"getData_Bare",
      success(res){
        that.setData({
          idi : res.result.data
        })
        let i=that.data.idi.length         //获取数据库长度
        let j=0
        while(j<i){                        //遍历，选择相同id的数据，并取出
          if(that.data.id==that.data.idi[j].id){
            that.setData({
              f1:that.data.idi[j].service_fee,
              f2:that.data.idi[j].mobilization_fee,
              f4:that.data.idi[j].average_fee,
              f5:that.data.idi[j].average_single_port,
             }) 
          }
          j=j+1 
        }
        if(that.data.f1=="0"&that.data.f2=="0"&that.data.f4=="0"&that.data.f5=="0"){
          wx.showToast({ 
            icon:"none",
            title:"该组合未存在"
          })
        }
       },
    })
    }
    else{
      wx.showToast({
        icon:"loading",
        title:"请完成所有选项后重试"
      })
    }
  }, 
  calc(){
    setTimeout(()=>{
      let a=0;
      a=(Number(this.data.f1)+Number(this.data.f2)+Number(this.data.f3)+Number(this.data.f_part2))*Number(this.data.num2)+Number(this.data.f_part1)*Number(this.data.num1)
    this.setData({
      f_total_ex:a.toFixed(2)
    })
    },1000)
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that =this
    //查看传递数据 是否成功
    console.log(options)
    //更新此页面的data数据
    that.setData({
      f_part1:options.f_part1,
      f_part2:options.f_part2,
      type:options.type,
      year:options.year,
      num1:options.num1,
      num2:options.num2,
      count:options.count,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})

Page({
  data: {
    id:[],
    idi:[],
    id1:'',
    id2:'',
    f:"",//总表价格预览
    f1:"",//接受上一页数据，设备费
    f2:"",//服务费
    f3:"",//装机费（PON才有，其他默认等于0）
    f_total:"",//预计总价
    f_next:"",
    f_part1:"",//新组网单个总点费
    f_part2:"",//新组网单个分点维护费
    year:"",
    hiddenName:true
  },
  click:function(e){
    this.setData({
        hiddenName:!this.data.hiddenName
    })
},
  setYear(e){
    console.log(e.detail.value)
    this.setData({
      year:e.detail.value
    })
  },
  pro2(e){
    this.setData({
      id2:e.detail.value
    })
  },
  pro1(e){
    this.setData({
      id1:e.detail.value
    })
  },
  
  link(){
    if(this.data.id1!=""&this.data.id2!=""){
      this.setData({                          //给用户选择的id赋值
        id:this.data.id1
      })
      let that=this
      wx.cloud.callFunction({               //调用云函数查询数据库，
      name:"getData_Fee",
      success(res){
        that.setData({
          idi : res.result.data
        })
        let i=that.data.idi.length         //获取数据库长度
        let j=0
        while(j<i){                        //遍历，选择相同id的数据，并取出
          if(that.data.id==that.data.idi[j].id){
             if(that.data.id2=="a"){
               that.setData({
                 f:that.data.idi[j].PON
               })
             }
             if(that.data.id2=="b"){
              that.setData({
                f:that.data.idi[j].PTN_SPN
              })
            }
            if(that.data.id2=="c"){
              that.setData({
                f:that.data.idi[j].skynet
              })
            }
            if(that.data.id2=="d"){
              that.setData({
                f:that.data.idi[j].other
              })
            }
          }
          j=j+1 
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
  increase(){
    let a=0;
    a=Number(this.data.f1)+Number(this.data.f2)+Number(this.data.f3)+0.04*this.data.year
    this.setData({
      f_total:a.toFixed(2)
    })
  },
  new(){
    let a=0;
    let b=0;
    a=Number(this.data.f1)+Number(this.data.f2)
    b=0.04*this.data.year
    this.setData({
      f_part1:a.toFixed(2),
      f_part2:b.toFixed(2)
    })
  },
  php(){
    let a=0;
    a=(Number(this.data.f1)+Number(this.data.f2))*2+0.04*this.data.year
    this.setData({
      f_total:a.toFixed(2)
    })
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
      f1:options.f1,
      f2:options.f2,
      f3:options.f3,
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
    
    
    
    
    // 点击加入购物车验证用户是否登录

    
    // 用户个人信息查询
    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        dataType:'json',
        success:function (info) {
            console.log(info);
            if (info.error === 400) {
                location.href ='login.html?strUrl='+location.href
            }
        }
    })
    


    $(function () {
        // 拿到地址栏传过来商品的id 
     var id =change( 'product' )
    //  console.log(id);
    //  获取产品详情动态渲染
     $.ajax({
         type:'get',
         url:'/product/queryProductDetail',
         dataType:'json',
         data:{
             id:id
         },
         success:function (info) {
             console.log(info);
        var htmlstr = template('bigprod',info)
            $('.scroll').html(htmlstr)
    //    初始化轮播图
      // 获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
    //   初始化数字框
    mui('.mui-numbox').numbox()

         }
     })

    //  添加尺码可选功能
    $('.scroll').on('click','.item_box span',function () {
      
        $(this).addClass('current').siblings().removeClass('current')
        

    })
    // 获取数量 却获取不到因为渲染时间晚于获取时间
    // var ipt = $('.mui-numbox-input').val()
    // console.log(ipt);
//   点击加入购物车上传
$('#addCart').click(function () {
      // 获取尺码
      var size = $('.item_box span.current').text()
      console.log(size);
      if(!size){
          mui.toast("请选择尺码")
          return
      }
       // 获取数量
       var ipt = $('.mui-numbox-input').val()
      console.log(ipt);

     $.ajax({
         type:'post',
         url:'/cart/addCart',
         dataType:'json',
         data:{
          productId:id,
          num:ipt,
          size:size,
         },
         success:function (info) {
          console.log(info);
          if(info.success){
              mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function (e) {
                  if(e.index === 0){
                      location.href ="shopping.html"
                  }
              })
          }
             
         }
     })
    })
    })
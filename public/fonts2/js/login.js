$(function () {
    // 用户登录部分
    $('[type="button"]').click(function () {
        // 获取密码和用户名
     var username=$('#username').val().trim()
      var password=$('#password').val().trim()
      if ( username===""  || password==="" ) {
        mui.toast('用户名或密码不能为空')
        return
      }
       $.ajax({
           type:'post',
           url:'/user/login',
           dataType:'json',
           data:{
            username:username,
            password:password
           },
           success:function (info) {
               console.log(info);
               if (info.error === 403) {
                   mui.toast('用户名或密码错误')
               }
               if (info.success) {
                var urls = change( "strUrl" ) 
               // 成功
          // (1) 如果有参数传递, 需要跳转回去
          // (2) 如果没有参数传递, 正常跳转用户中心

          if ( location.search.indexOf('strUrl') != -1 ) {
            // 有参数, 获取地址, 进行跳转
            // console.log(location.search);
            
            var strUrl = location.search.replace("?strUrl=", "");
            location.href = strUrl;
          }
          else {
            // 没有参数
            location.href = "user.html";
          }





               }
               
           }
           

       })

    }) 
   



})
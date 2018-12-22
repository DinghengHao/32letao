$(function () {
        // 用户个人信息查询
        $.ajax({
            type:'get',
            url:'/user/queryUserMessage',
            dataType:'json',
            success:function (info) {
                console.log(info);
                if (info.error === 400) {
                    location.href ='login.html'
                }
                var htmlstr = template('userpass',info)
                $('.mui-media-body').html(htmlstr)
                
            }
        })
    // 点击退出退出当前页 跳转到登录页
   $('#logout').click(function () {
    $.ajax({
        type:'get',
        url:'/user/logout',
        dataType:'json',
        success:function (info) {
            console.log(info);
           if (info.success) {
            location.href ='login.html'
           }
            
        }
    })
   })
    
})
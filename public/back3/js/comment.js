// 加载条
$(document).ajaxStart(function() {
  // 开启进度条
  NProgress.start()
})
$(document).ajaxStop(function() {
  //关闭进度条
  setInterval(function () {
      NProgress.done()
      
  },500)
})

// 判断是否登录
$.ajax({
  url: '/employee/checkRootLogin',
  type: 'get',
  dataType: 'json',
  success: function(info) {
    console.log(info)
    if (info.error === 400) {
      location.href = 'login.html'
    }
  }
})

$(function() {
  // 点击滑动
  $('.glyphicon-align-justify').click(function() {
    $('.lefts').toggleClass('sports')
    $('.tops').toggleClass('sport')
    $('.bottoms').toggleClass('sport')
  })
  // 点击top栏展开
  $('.lis > a').click(function() {
    $('.lefts .topp')
      .stop()
      .slideToggle()
  })
  // 点击弹出遮罩层

  $('.glyphicon-log-out').click(function() {
    $('#myModal').modal('show')
  })
  // 点击退出
  $('.dele').click(function() {
    $.ajax({
      url: '/employee/employeeLogout',
      type: 'get',
      dataType: 'json',
      success: function(info) {
        if (info.success) {
          location.href = 'login.html'
        }
      }
    })
  })
})

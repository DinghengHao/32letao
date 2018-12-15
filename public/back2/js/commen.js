//进度条效果
/*
 * 需求: 在第一个ajax发送的时候, 开启进度条
 *       在全部的ajax回来的时候, 关闭进度条
 *
 * ajax全局事件
 *    .ajaxComplete()  当每个ajax完成时,调用     (不管成功还是失败)
 *    .ajaxSuccess()   当ajax返回成功时调用
 *    .ajaxError()     当ajax返回失败时调用
 *    .ajaxSend()      当ajax发送前调用
 *
 *    .ajaxStart()     当第一个ajax发送时调用
 *    .ajaxStop()      当全部的ajax请求完成时调用
 * */

$(document).ajaxStart(function() {
  // 第一个ajax 发送时, 开启进度条
  NProgress.start()
})

$(document).ajaxStop(function() {
  // 模拟网络延迟
  setTimeout(function() {
    // 当全部的ajax请求完成时, 关闭进度条
    NProgress.done()
  }, 500)
})

$(function() {
  // 点击按钮侧边栏滑动
  $('.fl').click(function() {
    $('.aside').toggleClass('slide')
    $('.nav').toggleClass('xuan')
    $('.text').toggleClass('xuan')
  })
  //   teb栏

  $('.list').click(function() {
    console.log(12)

    $('.fei').slideToggle()
  })

  // 模态框

  $('.glyphicon-log-out').click(function() {
    $('#myModal').modal('show')
  })

  // 点击确定退出 发送ajax
  $('.sure').click(function() {
    $.ajax({
      url: '/employee/employeeLogout',
      type: 'get',
      dataType: 'json',
      success: function(info) {
        console.log(info)
        if (info.success) {
          location.href = 'login.html'
        }
      }
    })
  })
})

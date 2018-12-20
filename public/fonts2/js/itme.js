$(function() {
    
  // 发送ajax 动态获取数据
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function(info) {
      console.log();
      var htmlstr = template('first-itme', info)
      $('.ul-first').html(htmlstr)
      item(info.rows[0].id)
    }
  })

  // 注册点击事件
  $('.ul-first').on('click', 'a', function() {
    // console.log(this);
    $('.ul-first li a').removeClass('curren')
    $(this).addClass('curren')
    // 获取对应id
  var id = $(this).data('id')
     item(id) 
    })
    
    // <!-- 动态渲染二级页面 -->
  function item(id) {
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      dataType: "json",
      data:{
          id:id
      },
      success: function(inf) {
        console.log(inf)
        var htmlstr = template('second-itme',inf)
        $('.second').html(htmlstr)
      }
    })
  }











})

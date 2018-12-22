// 用户个人信息查询
$.ajax({
  type: 'get',
  url: '/user/queryUserMessage',
  dataType: 'json',
  success: function(info) {
    console.log(info)
    if (info.error === 400) {
      location.href = 'login.html'
    }
  }
})

$(function() {
    render()
function render() {
      //  查询购物车
  $.ajax({
    type: 'get',
    url: '/cart/queryCart',
    dataType: 'json',
    success: function(info) {
      console.log(info)
      var htmlstr = template('shoppingnew', { list: info })
      $('.mui-table-view').html(htmlstr)
    }
  })
}

  // 点击删除
  $('.mui-table-view').on('click', '.btn_delete', function() {
      var id =$(this).data('id')
   
    $.ajax({
      type: 'get',
      url: '/cart/deleteCart',
      dataType: 'json',
      data:{ id : [ id ]},
      success: function(info) {
        console.log(info)
        if (info.success) {
            render()  
        }
      
      }
    })
  })
})

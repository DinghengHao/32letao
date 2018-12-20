$(function() {
  // 对应id
  var userid
  // 判断对应状态
  var flag
  // 每页条数
  var size = 5
  // 第几页
  var pg = 1

  rander()
  function rander() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      dataType: 'json',
      data: {
        page: pg,
        pageSize: size
      },
      success: function(info) {
        // console.log(info)
        var htmlstr = template('usertmp', info)
        $('tbody').html(htmlstr)

        //   分页
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: pg, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: 'small', //设置控件的大小，mini, small, normal,large
          onPageClicked: function(a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            // console.log(page)
            pg = page
            rander()
          }
        })
      }
    })
  }

  //    注册事件委托
  $('tbody').on('click', 'button', function() {
    // 点击弹出模态框
    $('#userModal').modal('show')

    userid = $(this)
      .parent()
      .data('userid')
    //   判断启停
    flag = $(this).hasClass('btn-success') ? 1 : 0
    // console.log(flag)
  })

  // 点击确定发送ajax
  $('.users').click(function() {
    // console.log(123)
    // 发送ajax
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      dataType: 'json',
      data: {
        id: userid,
        isDelete: flag
      },
      success: function(info) {
        // console.log(info)
        // 关闭弹框
        $('#userModal').modal('hide')
        // 刷新页面
        rander()
      }
    })
  })
})

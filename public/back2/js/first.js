$(function() {
  //发送ajax数据动态渲染
  var pg = 1
  var size = 5
  rander()
  function rander() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      dataType: 'json',
      data: {
        page: pg,
        pageSize: size
      },
      success: function(info) {
        // console.log(info)
        var htmlstr = template('firsttmp', info)
        $('tbody').html(htmlstr)

        // 添加分页
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

  //   点击弹出添加框
  $('.add').click(function() {
    $('#firstModal').modal('show')
  })

  //使用表单校验插件
  $('#form').bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          }
        }
      }
    }
  })

  $('#form').on('success.form.bv', function(e) {
    e.preventDefault()
    //使用ajax提交逻辑
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function(info) {
        console.log(info)
        $('#firstModal').modal('hide')
        rander()
        // 清空输入框
        $('#form')
          .data('bootstrapValidator')
          .resetForm(true)
      }
    })
  })
})

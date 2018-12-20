$(function() {
  var pg = 1
  var size = 5
  rander()
  function rander() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      dataType: 'json',
      data: {
        page: pg,
        pageSize: size
      },
      success: function(info) {
        // console.log(info)
        var htmlstr = template('second', info)
        $('tbody').html(htmlstr)

        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: pg, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: 'small', //设置控件的大小，mini, small, normal,large
          onPageClicked: function(event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            pg = page
            rander()
          }
        })
      }
    })
  }
  // 添加分类事件
  $('.add').click(function() {
    $('#secondModal').modal('show')
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function(info) {
        // console.log(info)
        var htmlstr = template('secondall', info)
        $('.dropdown-menu').html(htmlstr)
      }
    })
  })
  // 注册事件委托事件
  $('.dropdown-menu').on('click', 'a', function() {
    var txt = $(this).text()
    $('.did').text(txt)
    // 获取对应id
    var id = $(this).data('cateid')
    $('#nones').val(id)
     // 参数3: 配置规则, 来配置我们的提示文本
     $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })

  // 上传文件
  $('#fileupload').fileupload({
    dataType: 'json',
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function(e, data) {
      // console.log(data)
      var img = data.result
      var url = img.picAddr
      // console.log(url)
      $('#imgs').attr('src', url)
      $('#pload').val(url)
      // 重置校验状态
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
    }
  })

  // 5. 配置表单校验
  $('#form').bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 校验的字段
    fields: {
      // 品牌名称
      brandName: {
        //校验规则
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      // 一级分类的id
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      // 图片的地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      }
    }
  })

  //点击确定发送ajax
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault()
    //使用ajax提交逻辑
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function(info) {
        console.log(info)
        $('#secondModal').modal('hide')
        rander()
        //  重置图片
        $('#imgs').attr('src', "./images/none.png")
        // 重置下拉框
        $('.did').text("请选择一级分类")
         $("#form").data('bootstrapValidator').resetForm(true);  //获取表单校验实例
      }
    })
  })
  // $('.seconds').click(function () {
  // console.log(123);

  // })
})

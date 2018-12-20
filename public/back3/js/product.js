$(function() {
  // 发送ajax获取数据
  var pages = 1
  var size = 4
  //  用于存图片地址的数组
  var arr = []
  rander()
  function rander() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      dataType: 'json',
      data: {
        page: pages,
        pageSize: size
      },
      success: function(info) {
        // console.log(info)
        var htmlstr = template('tables', info)
        $('tbody').html(htmlstr)
        // 添加分页
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: pages, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: 'small', //设置控件的大小，mini, small, normal,large
          onPageClicked: function(a, b, c, page) {
            // console.log(page)
            //为按钮绑定点击事件 page:当前点击的按钮值
            pages = page
            rander()
          }
        })
      }
    })
  }

  // 模态框部分
  $('.mb_20').click(function() {
    $('#product').modal('show')
    //   动态渲染模态框
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function(info) {
        // console.log(info)
        var htmlstr = template('option', info)
        $('.dropdown-menu').html(htmlstr)
      }
    })
  })

  // id
  $('.dropdown-menu').on('click', 'a', function() {
    // console.log(this);
    var txt = $(this).text()
    // console.log(txt);
    $('.pp').text(txt)
    // 更新字段状态
    $('#form')
      .data('bootstrapValidator')
      .updateStatus('brandId', 'VALID')

    var id = $(this).data('id')
    $('#ids').val(id)
  })
  // 图片上传部分
  $('.fileupload').fileupload({
    dataType: 'json',
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function(e, data) {
      // console.log(data);
      var img = data.result
      arr.unshift(img)
      var imgs = img.picAddr
      //  console.log(imgs);
      $('.arrimg').prepend('<img src="' + imgs + '" alt="" width="100px">')
      if (arr.length > 3) {
        //  删除最后一个
        arr.pop(arr.length - 1)
        $('.arrimg img:last-of-type').remove()
      }
      if (arr.length === 3) {
        // 更新字段状态
        $('#form')
          .data('bootstrapValidator')
          .updateStatus('picStatus', 'VALID')
      }
    }
  })

  // 校验表单
  //使用表单校验插件初始化
  $('#form').bootstrapValidator({
    // 配置排除项, 对隐藏域也进行校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },

    // 配置校验规则
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      // 商品库存必须是非零开头的数字
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          // 正则校验
          // \d 表示 0-9 的数字
          // *  表示出现 0 次 或者 多次
          // +  表示出现 1 次 或者 多次
          // ?  表示出现 0 次 或者 1次
          // {n} 表示出现 n 次
          // {n,m} 出现n次到m次
          regexp: {
            regexp: /^[1-9]\d*$/, // 1   11    121
            message: '商品库存必须是非零开头的数字'
          }
        }
      },

      // 尺码: 要求必须是 xx-xx 的格式, xx为两位数字
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          // 正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码要求必须是 xx-xx 的格式, xx为两位数字'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },

      // 标记图片是否上传满 3 张
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传 3 张图片'
          }
        }
      }
    }
  })

  $('#form').on('success.form.bv', function(e) {
    e.preventDefault()
    //使用ajax提交逻辑
    // 获取数据上传

    var str = $('#form').serialize() + '&picArr=' + JSON.stringify(arr)
    // console.log(str);

    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      dataType: 'json',
      data: str,
      success: function(info) {
        // console.log(info);
        $('#product').modal('hide')
        rander()
        // 重置表单
        $('#form')
          .data('bootstrapValidator')
          .resetForm(true)
        arr = []
        $('.pp').text('请输入二级分类')
        $('.arrimg img').remove()
      }
    })
  })
})

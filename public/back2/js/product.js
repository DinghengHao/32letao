$(function() {
  //  发送ajax渲染页面
  var pg = 1
  var Size = 3
  // 用于存图片的地址的数组
  var arr = []
  rander()
  function rander() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      dataType: 'json',
      data: {
        page: pg,
        pageSize: 3
      },
      success: function(info) {
        // console.log(info)
        var htmlstr = template('products', info)
        // console.log(htmlstr);
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

  // 点击按钮改变状态
  // $('tbody').on('click', 'button',function () {
  // var id = $(this).parent().data('id')
  //  $.ajax({
  //    type:'get',
  //    url:'/product/queryProductDetailList',
  //    data: id,
  //    dataType:'json',
  //    success:function (info) {
  //      console.log(info);

  //    }

  //  })

  // })

  // 点击弹出模态框
  $('.prds').click(function() {
    $('#prdModal').modal('show')
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function(info) {
        console.log(info)
        var htmlstr = template('produc', info)
        $('.dropdown-menu').html(htmlstr)
      }
    })
  })
  // 点击赋值
  $('.dropdown-menu').on('click', 'a', function() {
    var txt = $(this).text()
    $('#dropdownText').text(txt)
    //  赋值id
    var id = $(this).data('cateid')
    $('#newid').val(id)
    // 更新图片校验状态
    $('#form')
      .data('bootstrapValidator')
      .updateStatus('brandId', 'VALID')
  })

  //  表单校验
  // 5. 表单校验插件初始化
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

  // 图片部分处理
  $('#fileupload').fileupload({
    dataType: 'json',
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function(e, data) {
      // console.log(data);
      var img = data.result
      console.log(img)
      arr.unshift(img)
      var imgs = img.picAddr
      $('#imgBox').prepend(
        '<img src=" ' + imgs + '" style="width: 100px" alt="">'
      )
      if (arr.length > 3) {
        arr.pop(arr.length - 1)
        $('#imgBox img:last-of-type').remove()
      }
      if (arr.length === 3) {
        // 更新图片校验状态
        $('#form')
          .data('bootstrapValidator')
          .updateStatus('picStatus', 'VALID')
      }
      console.log(arr)
      console.log(JSON.stringify(arr))
    }
  })

  $('#form').on('success.form.bv', function(e) {
    e.preventDefault()
    //使用ajax提交逻辑
    var str = JSON.stringify(arr)
    console.log(str)

    var total = $('#form').serialize() + '&picArr=' + str
    console.log(total)

    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      dataType: 'json',
      data: total,
      success: function(info) {
        console.log(info)
        rander()
        // 隐藏覆盖框
        $('#prdModal').modal('hide')
        // 重置表单内容和状态
        $('#form')
          .data('bootstrapValidator')
          .resetForm(true)
        //重置下拉框
        $('#dropdownText').text('请选择二级分类')
        //  清空数组
        arr = []
      }
    })
  })
})

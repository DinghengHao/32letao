/**
 * Created by 54721 on 2018/12/14.
 */

$(function() {
  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    // 配置校验字段    需要先给input框配置 name
    fields: {
      username: {
        // 配置校验规则
        validators: {
          // 配置一个非空
          notEmpty: {
            message: '用户名不能为空'
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须是2-6位'
          },
          // 错误时回调函数
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            message: '密码不能为空'
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须是6-12位'
          },
          // 错误时回调函数
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  })

  // 验证登录
  // 表单验证成功事件
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault()
    // console.log(e);

    //使用ajax提交逻辑
    $(function() {
      $.ajax({
        url: '/employee/employeeLogin',
        type: 'post',
        data: $('#form').serialize(),
        dataType: 'json',
        success: function(info) {
          // console.log(info)
          if (info.success) {
            location.href = 'index.html'
          }
          if (info.error === 1000) {
            // alert('用户名不存在')
            $('#form')
              .data('bootstrapValidator')
              .updateStatus('username', 'INVALID', 'callback')
          }
          if (info.error === 1001) {
            // alert('密码错误')
            $('#form')
              .data('bootstrapValidator')
              .updateStatus('password', 'INVALID', 'callback')
          }
        }
      })
    })
  })
  // 点击重置
  $('[type = "reset"]').click(function() {
    $('#form')
      .data('bootstrapValidator')
      .resetForm() //重置表单，并且会隐藏所有的错误提示和图标
    //  console.log(123);
  })
})

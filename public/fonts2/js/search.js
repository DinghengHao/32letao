$(function() {
  //    存入数据
    // var arr = ['匡威', '阿迪王', '匡威王', '特步王']
    // var str = JSON.stringify(arr)
    // localStorage.setItem('item', str)
  // 获取数据转成数组

  function item() {
    var str = localStorage.getItem('item') || '[]'
    var arr = JSON.parse(str)
    return arr
  }
  // console.log({arrs:arr});

  // 动态渲染数据
  rander()
  function rander() {
    var arr = item()
    var htmlstr = template('itmess', { arrs: arr })
    $('.history').html(htmlstr)
  }

  //    点击全部删除
  $('.history').on('click', '.del', function() {
    localStorage.removeItem('item')
    rander()
    // console.log(123)
  })
  //点击删除单个
  $('.history').on('click', '.btn_delete', function() {
    var id = $(this).data('id')
    var arr = item()
    //    console.log(arr);
    //    处理数据
    arr.splice(id, 1)
    //    console.log(arr);
    // 存入
    var str = JSON.stringify(arr)
    localStorage.setItem('item', str)
    rander()
  })

  //   按钮点击添加数据
  $('.sech').click(function() {
    // 获取输入框的值
    var text = $('.scroll input')
      .val()
      .trim()
       // 如果数据为空提示输入关键字
    if (text === "") {
        mui.toast( "请输入搜索关键字" )
        return;
    }
    //   console.log(text);
    var arradd = item()
    //   判断输入的内容是否与数组中重合
    if (arradd.indexOf(text) !== -1) {
      //    获取对应的下标
      var ids = arradd.indexOf(text)
      //    console.log(ids);
      //   删除对应的值
      arradd.splice(ids, 1)
    }

    //   处理数据
    var arr = arradd.unshift(text)
    //    如果内容大于10删除最后一个值
    if (arradd.length > 10) {
      arradd.pop(arradd.length - 1)
    }
    // 存入localStorage
    var str = JSON.stringify(arradd)
    localStorage.setItem('item', str)
    // 清空输入框
    $('.scroll input').val('')
    // 刷新
    rander()
  })
})

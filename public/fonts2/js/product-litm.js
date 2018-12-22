$(function () {
// 方法一通过获取数据localStorage
// var str =  localStorage.getItem('item')
// 转数组
// var arr = JSON.parse(str)
// var txt = arr[0]
// console.log(txt);
// $('input').val(txt)

// 方法二 获取地址栏编码
 var text= change("key")
//  console.log(text);
 $('input').val(text)



$('.nav a').click(function () {
      // 4. 点击排序, 切换的高亮按钮
//    (1) )如果有 current 类, 切换箭头方向 (改变箭头类名
//    (2) 如果没有 current 类, 就给自己加上, 移除其他的
    // 点击哪个给哪个变色
    if (!$(this).hasClass('curren')) {
        $(this).addClass('curren').siblings().removeClass('curren')    
    }else{
        // 切换箭头
        $(this).find('i').toggleClass('fa-angle-up').toggleClass('fa-angle-down')
    }
    render()
})

render()
function render(){
    //  添加加载转动效果
    $('.part').html('<div class="roto"></div>')
    var object ={}
    object.proName =$('.newtxt').val()
    object.page =1
    object.pageSize =100

//    找到a对应的类
    var flag= $('.nav a.curren')
    // console.log(flag);
    if (flag.length === 1) {
        // 说明被点击过 需要排序
        //获得排序的价格或产品库存
        var daaType =flag.data('type')
        // console.log(daaType);
        
       //判断排列顺序
     var sortValue = flag.find('i').hasClass('fa-angle-down')? 2 :1;
    //  console.log(sortValue);
        // 添加排序方法
     object[daaType] = sortValue   
    }
// console.log(object);




setTimeout(function () {
    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        dataType:'json',
        data:object,
        success:function (info) {
            console.log(info);
          //   动态渲染
          var htmlstr =template('spart',info)
            $('.part').html(htmlstr)
        }
    
    })
},2000)

}

// 修改搜索框进行搜索
$('.sechage').click(function () {
    
    render() 
    
})
 


})
 


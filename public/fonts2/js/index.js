mui('.content').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false //是否显示滚动条
  });
  


  // 通过网页头上获取
function change( k ) {
  var str = location.search
// 转成中文
str =decodeURI(str)
//截取
var str =str.slice(1)
// console.log(str);
// 转成数组
var arr = str.split('&')

var obj = {}
// console.log(arr);
arr.forEach( function ( v , i) {
var key =v.split('=')[0]
var value = v.split('=')[1]
// 拼接
obj[key] = value
  
})
return obj[k]
  
}
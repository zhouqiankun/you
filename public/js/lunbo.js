/* 轮播 */
/* 轮播（周期性定时器） */
//定义任务函数
function task(){
  //查找class为show的当前img
  var img=document.getElementsByClassName("show")[0];
  //将当前img的class清除
  var imgs = document.getElementById('banner').children;
for(var item of imgs){
  item.className="";
}
  //若果当前img有下一个兄弟元素
  if(img.nextElementSibling!==null){
    //才设置当前img的下一个兄弟的class为show
    img.nextElementSibling.className="show";
  //否则
  }else{
    //设置当前img的父元素的第一个孩子的class为show
    img.parentNode.children[0].className="show";
  }
}
//启动定时器
var n=setInterval(task,3000);
//停止定时器
//查找id为slider的div容器元素
var div=document.getElementById("banner");
//当鼠标进入div时
div.onmouseover=function(){
  //停止定时器
  clearInterval(n);
}
//当鼠标移出div时
div.onmouseout=function(){
  //重新启动定时器
  n=setInterval(task,3000);
}
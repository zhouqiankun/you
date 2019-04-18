 //获取商品数据
 (function(){
  $.ajax({
    url:"http://127.0.0.1:3000/sy",
    type:"get",
    //data:"",
    dataType:"json" //自动JSON.parse() 自动转换成数组
  }) //return Promise
     //       Open(result)
     //            ↓
  .then(function(result){
    //console.log(result);

    //首页 爆款清单
    var html="";
    for(var i=0;i<result.length;i++){
       var p=result[i];
      html+=` 
      <div class="d1">
        <img src="${p.img_url}">
        <div class="e1">${p.lname}</div>
        <div class="e2">${p.uname}</div>
        <h3>￥ ${p.price.toFixed(2)}</3>
          <h5>￥ ${p.uprice.toFixed(2)}</h5>
      </div>`;
    }
    //console.log(html);

    var dd=document.querySelector("#myicon");
    // console.log(dd);
    dd.innerHTML=html;

  })
})();

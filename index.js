const express = require("express");
const bodyParser = require('body-parser');
const mysql=require('mysql');

var pool=mysql.createPool({
  // host:'127.0.0.1',
  // port:'3306',
  // user:'root',
  // password:'',
	// database:'asus',
	host     : process.env.MYSQL_HOST,
	port     : process.env.MYSQL_PORT,
	user     : process.env.ACCESSKEY,
	password : process.env.SECRETKEY,
	database : 'app_' + process.env.APPNAME,
  connectionLimit:20
});
var server=express();
server.use(bodyParser.urlencoded({extended:false}));
server.listen(5050);

//托管静态文件public
server.use(express.static('./public'));

server.use(bodyParser.urlencoded({
  extended:false
}));


server.get("/sy", (req, res) => {
  var sql = "select lname,uname,price,uprice,img_url from asus_index_bao";
  pool.query(sql, [], (err, result) => {
    if (err) throw err;
    //console.log(result);
    //跨域请求
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*"
    });
    res.write(JSON.stringify(result));
    res.end();
  });
});

server.get("/asus_lunbo",(req,res)=>{
	var sql="select img_url from asus_lunbo";
	pool.query(sql,[],(err,result)=>{
		if(err)throw err;
		res.writeHead(200,{
		  "Access-Control-Allow-Origin": "*"
    });
    res.write(JSON.stringify(result));
    res.end();
	})
})
 
//用户注册
server.post('/asus_user',(req,res)=>{
  var $uname=req.body.uname;
  var $upwd=req.body.upwd;
  var $phone=req.body.phone;
  if($uname.length<6 || $uname.length>15){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if($upwd.length<6 || $upwd.length>20){
		res.send({code:402,msg:'upwd required'});
		return;
  }
  if($phone.length!==11){
		res.send({code:404,msg:'phone required'});
		return;
  }
  var sql='insert into asus_user values(null,?,?,?)';
	pool.query(sql,[$uname,$upwd,$phone],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send('1');
		}
	});
})

//用户登录
server.post('/login',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	console.log($uname);
	console.log($upwd);
	if($uname.length<6 || $uname.length>15){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if($upwd.length<6 || $upwd.length>20){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	//执行SQL语句
	pool.query('select * from asus_user where uname=? and upwd=?',[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.length>0){
			res.send('1');
		}else{
			res.send('0');
		}
		console.log(result)
	})
});





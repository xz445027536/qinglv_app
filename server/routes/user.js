const express=require("express");
const pool=require("../pool");
let router=express.Router();
//创建用户注册路由
router.post("/reg",(req,res)=>{
  //获取用户填入的信息
  var uname=req.body.uname;
  var upwd=req.body.upwd;
  var phone=req.body.phone;
  //执行sql语句
  var sql="inset into user set uname=?,upwd=?,phone=?";
  pool.query(sql,[uname,upwd,phone],(err,result)=>{
    if(err) throw err;
    res.send("1")
  })
})
//创建用户登录路由
router.get("/login/:uname&:upwd",(req,res)=>{
  //获取用户输入的信息
  var uname=req.param.uname;
  var upwd=req.param.upwd;
  //执行sql语句
  var sql="select * from user where uname=? and upwd=?";
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send("登录成功！");
    }else{
      res.send("用户名或密码错误！")
    }
  })
})

module.exports=router;
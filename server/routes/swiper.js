const express=require("express");
const pool=require("../pool");
let router=express.Router();
//创建轮播图路由
router.get('/swiper',(req,res)=>{
  var sql="select * from swiper";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})

module.exports=router;
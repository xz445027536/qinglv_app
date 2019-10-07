//引入express模块
const express=require("express");
//引入中间件body-parser
const bodyParser=require("body-parser");
//引入路由器
const userRouter=require("./routes/user")
const swiperRouter=require('./routes/swiper')
//创建web服务器
var app=express();
const cors=require("cors");
app.use(cors({
  origin:['http://192.168.31.158:8080','http://localhost:8080'],
  credentials:true
}))
//设置监听端口
app.listen(3300);
//设置托管静态页面到public目录下
app.use(express.static("public"));
//使用body-paeser中间件
app.use(bodyParser.urlencoded({
  extended:false
}));

//使用路由器
app.use("/user",userRouter);
app.use("/swiper",swiperRouter)
#设置连接服务器编码
SET NAMES UTF8;
#丢弃数据库
DROP DATABASE IF EXISTS qinglv;
#创建数据库，并设置存储编码
CREATE DATABASE qinglv  CHARSET=UTF8;
#进入数据库
USE qinglv;
#创建用户表
CREATE TABLE qinglv_user(
  uid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd  VARCHAR(32),
  phone VARCHAR(11) NOT NULL UNIQUE,
)
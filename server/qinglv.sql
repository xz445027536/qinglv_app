#设置连接服务器编码
SET NAMES UTF8;
#丢弃数据库
DROP DATABASE IF EXISTS qinglv;
#创建数据库，并设置存储编码
CREATE DATABASE qinglv CHARSET=UTF8;
#进入数据库
USE qinglv;
#创建用户表
CREATE TABLE user(
  uid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  uname VARCHAR(16),
  upwd  VARCHAR(32),
  phone VARCHAR(11) NOT NULL UNIQUE
);
INSERT INTO user VALUE (NULL,"tom123456","123456789","13212345678");
INSERT INTO user VALUE (NULL,"lucy123456","123456789","13312345678");
INSERT INTO user VALUE (NULL,"lily123456","123456789","13412345678");
INSERT INTO user VALUE (NULL,"jeck123456","123456789","13512345678");
#创建轮播图表
CREATE TABLE swiper(
  sid INT PRIMARY KEY NOT NULL, #图片id
  imgUrl VARCHAR(128) #图片地址
);
INSERT INTO swiper VALUE(0001,"https://source.qunarzz.com/site/images/wns/20190926_qunar_dujia_750x192_6_V1.jpg");
INSERT INTO swiper VALUE(0002,"https://source.qunarzz.com/site/images/wns/20190924_dujia_homepage_top_banner_4.jpg");
INSERT INTO swiper VALUE(0003,"https://imgs.qunarzz.com/sight/source/1507/d9/2ddc7652fdba16.jpg_r_640x214_5e62f1a3.jpg");
INSERT INTO swiper VALUE(0004,"https://imgs.qunarzz.com/sight/source/1602/88/bf120edeaea383.jpg_r_640x214_f8591f7b.jpg");
INSERT INTO swiper VALUE(0005,"http://img1.qunarzz.com/sight/p0/1503/f2/f226f4cef39d59fc.water.jpg_600x330_57e37091.jpg");
#创建景点表

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
CREATE TABLE swiperList(
  sid INT PRIMARY KEY NOT NULL, #图片id
  imgUrl VARCHAR(128) #图片地址
);
INSERT INTO swiperList VALUE(0001,"https://source.qunarzz.com/site/images/wns/20190926_qunar_dujia_750x192_6_V1.jpg");
INSERT INTO swiperList VALUE(0002,"https://source.qunarzz.com/site/images/wns/20190924_dujia_homepage_top_banner_4.jpg");
INSERT INTO swiperList VALUE(0003,"http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/87a224d0349d94a11e97f31aa1aba4f5.jpg_750x200_1f78af87.jpg");
INSERT INTO swiperList VALUE(0004,"http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20194/5cfb89bebe41028d9b6732bcbe959cd6.jpg_750x200_4eb23790.jpg");
INSERT INTO swiperList VALUE(0005,"http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20194/fd8c3e553ad9196058853d015bd67d29.jpg_750x200_2c5b094a.jpg");
#创建景点表

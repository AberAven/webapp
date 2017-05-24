/*
Navicat MySQL Data Transfer

Source Server         : ccc
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2017-05-24 23:17:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` varchar(50) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `bookName` varchar(100) NOT NULL,
  `chapterId` varchar(50) NOT NULL,
  `author` varchar(20) NOT NULL,
  `votes` bigint(20) NOT NULL,
  `classification` int(11) NOT NULL,
  `createdAt` bigint(20) NOT NULL,
  `updatedAt` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES ('b-1495265670073', 'g-1495096554787', '围城', 'undefined', '钱钟书', '1012', '5', '1495265670075', '1495265670075', '0');
INSERT INTO `books` VALUES ('b-1495273038702', 'g-1495096554787', '斗破苍穹', 'undefined', '天蚕土豆', '1763', '1', '1495273038705', '1495273038705', '0');
INSERT INTO `books` VALUES ('b-1495374377470', 'g-1495096554787', '围城杀机', 'undefined', '杀机', '525', '1', '1495374377471', '1495374377471', '0');
INSERT INTO `books` VALUES ('b-1495374479839', 'g-1495096554787', '围城杀戮', 'undefined', '杀机', '7665', '1', '1495374479841', '1495374479841', '0');
INSERT INTO `books` VALUES ('b-1495375112521', 'g-1495096554787', '长生门', 'undefined', '不知道', '52', '1', '1495375112523', '1495375112523', '0');
INSERT INTO `books` VALUES ('b-1495427274560', 'g-1495096554787', '雪鹰领主', 'undefined', '我吃西红柿', '7322', '1', '1495427274562', '1495427274562', '0');
INSERT INTO `books` VALUES ('b-1495427849554', 'g-1495096554787', '大主宰', 'undefined', '天蚕土豆', '522', '1', '1495427849555', '1495427849555', '0');
INSERT INTO `books` VALUES ('b-1495427897422', 'g-1495096554787', '圣墟', 'undefined', '辰东', '632', '1', '1495427897422', '1495427897422', '0');
INSERT INTO `books` VALUES ('b-1495427915872', 'g-1495096554787', '择天记', 'undefined', '猫腻', '12', '1', '1495427915873', '1495427915873', '0');
INSERT INTO `books` VALUES ('b-1495427938091', 'g-1495096554787', '全职法师', 'undefined', '乱', '124', '1', '1495427938091', '1495427938091', '0');
INSERT INTO `books` VALUES ('b-1495427986460', 'g-1495096554787', '烂尾鼠', 'undefined', '望潮', '11', '2', '1495427986461', '1495427986461', '0');
INSERT INTO `books` VALUES ('b-1495428062470', 'g-1495096554787', '重生之超凡路', 'undefined', '天青为白', '1', '2', '1495428062470', '1495428062470', '0');

-- ----------------------------
-- Table structure for chapters
-- ----------------------------
DROP TABLE IF EXISTS `chapters`;
CREATE TABLE `chapters` (
  `id` varchar(50) NOT NULL,
  `bid` varchar(50) NOT NULL,
  `chapterNumber` varchar(50) NOT NULL,
  `chapterName` varchar(100) NOT NULL,
  `chapterContent` varchar(500) NOT NULL,
  `createdAt` bigint(20) NOT NULL,
  `updatedAt` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chapters
-- ----------------------------
INSERT INTO `chapters` VALUES ('g-1495299059460', 'b-1495265670073', '1', '黎明', '这是第一章的内容啊很快就会发卡号发咖啡和咖啡哈哈付款了', '1495299059462', '1495299059462', '0');
INSERT INTO `chapters` VALUES ('g-1495299258148', 'b-1495265670073', '2', '黄昏', '据法国发过广告发', '1495299258151', '1495299258151', '0');
INSERT INTO `chapters` VALUES ('g-1495299575506', 'b-1495265670073', '3', '潮水', '131反反复复发发 发', '1495299575508', '1495299575508', '0');
INSERT INTO `chapters` VALUES ('g-1495299727848', 'b-1495265670073', '4', '断崖', '144发发发发烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦', '1495299727850', '1495299727850', '0');
INSERT INTO `chapters` VALUES ('g-1495432651595', 'b-1495265670073', '5', '金卡恢复', '巅峰时刻发挥发挥', '1495432651596', '1495432651596', '0');

-- ----------------------------
-- Table structure for client_orders
-- ----------------------------
DROP TABLE IF EXISTS `client_orders`;
CREATE TABLE `client_orders` (
  `id` varchar(50) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `oid` varchar(50) NOT NULL,
  `createdAt` bigint(20) NOT NULL,
  `updatedAt` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of client_orders
-- ----------------------------
INSERT INTO `client_orders` VALUES ('co-1495530984103', 'g-1495096554787', 'o-1495530984046', '1495530984106', '1495530984106', '0');
INSERT INTO `client_orders` VALUES ('co-1495541085222', 'g-1495267165920', 'o-1495541085151', '1495541085223', '1495541085223', '0');
INSERT INTO `client_orders` VALUES ('co-1495548114936', 'g-1495267165920', 'o-1495548114870', '1495548114937', '1495548114937', '0');

-- ----------------------------
-- Table structure for collects
-- ----------------------------
DROP TABLE IF EXISTS `collects`;
CREATE TABLE `collects` (
  `id` varchar(50) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `bid` varchar(50) NOT NULL,
  `createdAt` bigint(20) NOT NULL,
  `updatedAt` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collects
-- ----------------------------
INSERT INTO `collects` VALUES ('c-1495369109537', 'g-1495096554787', 'b-1495265670073', '1495369109538', '1495369109538', '0');
INSERT INTO `collects` VALUES ('c-1495369534407', 'g-1495096554787', 'b-1495273038702', '1495369534408', '1495369534408', '0');
INSERT INTO `collects` VALUES ('c-1495432738445', 'g-1495432704391', 'b-1495265670073', '1495432738446', '1495432738446', '0');
INSERT INTO `collects` VALUES ('c-1495541068297', 'g-1495267165920', 'b-1495273038702', '1495541068299', '1495541068299', '0');
INSERT INTO `collects` VALUES ('c-1495541072412', 'g-1495267165920', 'b-1495374479839', '1495541072413', '1495541072413', '0');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` varchar(50) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `paytype` varchar(20) NOT NULL,
  `createdAt` bigint(20) NOT NULL,
  `updatedAt` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('o-1495529131094', 'g-1495096554787', '100', '银联', '1495529131106', '1495529131106', '0');
INSERT INTO `orders` VALUES ('o-1495529698323', 'g-1495096554787', '100', '支付宝', '1495529698327', '1495529698327', '0');
INSERT INTO `orders` VALUES ('o-1495529698347', 'g-1495096554787', '100', '支付宝', '1495529698353', '1495529698353', '0');
INSERT INTO `orders` VALUES ('o-1495529698352', 'g-1495096554787', '100', '支付宝', '1495529698354', '1495529698354', '0');
INSERT INTO `orders` VALUES ('o-1495530141309', 'g-1495096554787', '100', '银联', '1495530141312', '1495530141312', '0');
INSERT INTO `orders` VALUES ('o-1495530221852', 'g-1495096554787', '100', '银联', '1495530221853', '1495530221853', '0');
INSERT INTO `orders` VALUES ('o-1495530228708', 'g-1495096554787', '11', '支付宝', '1495530228709', '1495530228709', '0');
INSERT INTO `orders` VALUES ('o-1495530984046', 'g-1495096554787', '100', '银联', '1495530984047', '1495530984047', '0');
INSERT INTO `orders` VALUES ('o-1495541085151', 'g-1495267165920', '100', '银联', '1495541085162', '1495541085162', '0');
INSERT INTO `orders` VALUES ('o-1495548114870', 'g-1495267165920', '5', '银联', '1495548114873', '1495548114873', '0');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `birth` varchar(10) NOT NULL,
  `author` tinyint(1) NOT NULL,
  `account` bigint(20) NOT NULL,
  `createdAt` bigint(20) NOT NULL,
  `updatedAt` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('g-1495096554787', 'admin@example.com', '123456', 'jane', '0', '2007-07-07', '1', '571', '1495096554792', '1495530984213', '0');
INSERT INTO `users` VALUES ('g-1495267165920', '123@qq.com', '123', '123@qq.com', '0', '2007-07-07', '0', '5', '1495267165922', '1495548114968', '0');
INSERT INTO `users` VALUES ('g-1495432704391', '1@q.q', '123', '1@q.q', '0', '2007-07-07', '0', '0', '1495432704393', '1495432704393', '0');

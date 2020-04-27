var express = require('express');
/* import Sowing from '../models/Sowing'
import config from '../src/config'
import { basename } from 'path' */

import HotController from '../controller/hot'
const router = express.Router();

/*
  往数据库中插入一条新纪录
*/
router.post('/api/add/:name', HotController.insertOne);
/*
  获取所有的轮播图列表
*/
router.get('/api/list/:name', HotController.getList);
/*
  获取一条轮播图 (id)
*/
router.get('/api/getSingle/:id/:name',HotController.getSingle);
/*
  根据id去修改一条轮播图
*/
router.post('/api/edit/:id/:name',HotController.edit);
/**
 * 根据id删除一条记录
 */
router.get('/api/delete/:id/:name',HotController.delete );

module.exports = router

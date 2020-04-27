var express = require('express');
import Sowing from '../models/Sowing'
import config from '../src/config'
import { basename } from 'path'

import formidable from 'formidable'
import SowingController from '../controller/sowing/SowingController'
const router = express.Router();


/*
  往数据库中插入一条新纪录
*/
router.post('/api/add', SowingController.insertOneSowing);

/*
  获取所有的轮播图列表
*/
router.get('/api/list',  (req, res, next)=>{
    Sowing.find({}, "_id parentId key title description imgURL", (err, docs)=>{
        if(err){
            return next(err);
        }
        // 数据返回
        
        res.json({
            status: 200,
            result: docs
        })
    });
});

/*
  获取一条轮播图 (id)
*/
router.get('/api/getonesowing/:sowingId', (req, res, next)=>{
   Sowing.findById(req.params.sowingId, "_id key parentId title description imgURL", (err, docs)=>{
       if(err){
           return next(err);
       }
       // 数据返回
       res.json({
           status: 200,
           result: docs
       })
   })
});

/*
  根据id去修改一条轮播图
*/
router.post('/api/edit', (req, res, next)=>{
    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadPath;  // 上传图片放置的文件夹
    form.keepExtensions = true; // 保持文件的原始扩展名
    form.parse(req, (err, fields, files)=>{
        if(err){
            return next(err);
        }
        // 1. 取出普通字段
        let body = fields;
        const flag = files.file || ''
        if (flag) {
            body.imgURL = `http://localhost:3000/images/${basename(files.file.path)}`;
        }
        console.log(body.parentId);
        // 2. 根据id查询文档
        Sowing.findById(body.id, (err, sowing)=>{
            if(err){
                return next(err);
            }
            
            // 2.1 修改文档的内容
            // console.log(sowing);
            sowing.title = body.title;
            sowing.description = body.description;
            sowing.imgURL = body.imgURL;
            // sowing.imgURL = config.imgBaseURL + basename(files.file.path);

            // 2.2 保存
            sowing.save((err, result)=>{
                if (err) {
                    return next(err);
                }
                res.json({
                    status: 200,
                    result: '修改轮播图成功!'
                })
            });
        });
    });
});


/**
 * 根据id删除一条记录
 */
router.get('/api/delete/:sowingId', (req, res, next)=>{
    Sowing.deleteOne({_id: req.params.sowingId}, (err, result)=>{
        if(err){
            return next(err);
        }
        // console.log(result);
        // 数据返回
        res.json({
            status: 200,
            result: '成功删除轮播图!'
        })
    })
});

module.exports = router

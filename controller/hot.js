import formidable from "formidable";
import config from "../src/config";
import {basename} from "path";
import {
  HotOne,
  HotTwo,
  HotThree,
  HotFour,
  HotFive
} from "../models/hot";

const names = { HotOne,
  HotTwo,
  HotThree,
  HotFour,
  HotFive}
class HotController {
  constructor() { 
  }

    // 1.往数据库中插入一条新纪录
  async insertOne(req, res, next) {
        const name = req.params.name
        const form = new formidable.IncomingForm();
        form.uploadDir = config.uploadPath;  // 上传图片放置的文件夹
        form.keepExtensions = true; // 保持文件的原始扩展名
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return next(err);
            }
            // 1. 取出普通字段
            let body = fields;
            //  console.log(body.parentId);
              console.log(req.body);
              
            // 2. 解析上传的文件路径, 取出文件名保存到数据库
            // console.log(fields,files);
            // body.imgURL = basename(files.file.path);
            body.imgURL = `http://localhost:3000/images/${basename(files.file.path)}`;
            // body.imgURL = config.imgBaseURL + basename(files.file.path);
            // 3. 操作数据库
          
            try {
                // 操作数据库
                const hot = new names[name]({
                    key: new Date().getTime().toString(),
                    parentId: name,
                    title: body.title,
                    description: body.description,
                    imgURL: body.imgURL,
                });
                hot.save((err, result) => {
                    if (err) {
                        res.json({
                            status: 400,
                            message:'添加失败'
                        })
                    } else {
                        res.json({
                            status: 200,
                            message:'添加成功'
                        })
                    }
                })
            }catch (e) {
                return next(e);
            }
        });
  }
 
  // 2.获取list
  getList(req, res, next) {
    const name = req.params.name
    names[name].find({}, "_id parentId key title description imgURL", (err, docs) => {
      if (err) {
        return next(err);
      }
      // 数据返回
      res.json({
        status: 200,
        result: docs
      })
    });
  }
  
  //  3.获取一条
  getSingle(req, res, next) {
    const name = req.params.name
    names[name].findById(req.params.id, "_id key parentId title description imgURL", (err, docs)=>{
       if(err){
           return next(err);
     }
     console.log(docs);
     
       // 数据返回
       res.json({
           status: 200,
           result: docs
       })
   })
  }
  // 4.修改
   edit(req, res, next){
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
        const name = req.params.name
        names[name].findById(req.params.id, (err, hot)=>{
            if(err){
                return next(err);
            }
            
            // 2.1 修改文档的内容
            // console.log(sowing);
            hot.title = body.title;
            hot.description = body.description;
            hot.imgURL = body.imgURL;
            // sowing.imgURL = config.imgBaseURL + basename(files.file.path);

            // 2.2 保存
            hot.save((err, result)=>{
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
  }
  // 5.删除
  delete(req, res, next) {
    const name = req.params.name
    names[name].deleteOne({_id: req.params.id}, (err, result)=>{
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
  }

}
export default new HotController();
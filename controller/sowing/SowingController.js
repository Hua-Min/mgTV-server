import formidable from "formidable";
import config from "../../src/config";
import {basename} from "path";
import Sowing from "../../models/Sowing";

class SowingController {
    constructor(){}
    // 1.往数据库中插入一条新纪录
    async insertOneSowing(req, res, next) {
        const form = new formidable.IncomingForm();
        form.uploadDir = config.uploadPath;  // 上传图片放置的文件夹
        form.keepExtensions = true; // 保持文件的原始扩展名
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return next(err);
            }
            // 1. 取出普通字段
            let body = fields;
        console.log(body.parentId);

            // 2. 解析上传的文件路径, 取出文件名保存到数据库
            // console.log(fields,files);
            // body.imgURL = basename(files.file.path);
            body.imgURL = `http://localhost:3000/images/${basename(files.file.path)}`;
            // body.imgURL = config.imgBaseURL + basename(files.file.path);
            // 3. 操作数据库
            try {
                // 操作数据库
                
                const sowing = new Sowing({
                    key: new Date().getTime().toString(),
                    parentId: 'sowing',
                    title: body.title,
                    description: body.description,
                    imgURL: body.imgURL,
                });
                sowing.save((err, result) => {
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
}
export default new SowingController();
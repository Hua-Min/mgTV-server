import mongoose from 'mongoose'

// 创建轮播图的模式对象
const sowingSchema = mongoose.Schema({
    id: { type: String,default:'0000000001'},
    key: {type:String,default: Math.random().toString()},
    
    parentId:{type:String},
    // 标题
    title:{type:String},
    // 描述
    description: { type: String, required: true },
    // 图片地址
    imgURL: { type: String, required: true },
   
});

const Sowing = mongoose.model('Sowing', sowingSchema);
export default Sowing;



import mongoose from 'mongoose'

// 创建轮播图的模式对象
const HotSchema = mongoose.Schema({
    id: { type: String,default:'00000000022'},
    key: {type:String,default: Math.random().toString()},
    
    parentId:{type:String},
    // 标题
    title:{type:String},
    // 描述
    description: { type: String, required: true },
    // 图片地址
    imgURL: { type: String, required: true },
   
});

export const HotOne = mongoose.model('HotOne', HotSchema);
export const HotTwo = mongoose.model('HotTwo', HotSchema);
export const HotThree = mongoose.model('HotThree', HotSchema);
export const HotFour = mongoose.model('HotFour', HotSchema);
export const HotFive = mongoose.model('HotFive', HotSchema);




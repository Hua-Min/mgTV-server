import mongoose from 'mongoose'

// 创建管理员(用户)的模式对象
const userSchema = mongoose.Schema({
    // 用户名
    account: {type: String, required: true},
    // 密码
    password: {type: String, required: true},
});

const User = mongoose.model('user', userSchema);
export default User;
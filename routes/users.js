var express = require('express');
var router = express.Router();
import User  from "./../models/User";



router.post('/api/login', (req, res, next) => {
    // 1. 获取数据
    const account = req.body.account;
    const password = req.body.password;


    console.log('----------------------------');
    console.log(req.body, account, password);
    console.log('----------------------------');

    

    // 2. 查询数据
    User.findOne({account: account}, (err, user)=>{
        if(err){
            return next(err);
        }
        // 2.1 如果用户存在
        if(user !== null){
            // 2.2 判断密码
            if(user.password === password){ // 密码匹配成功
                console.log(req.session);
                // session中存token
                req.session.token =  user._id;

                // 2.3 登录成功
                res.json({
                    status: 200,
                    result: {
                        token: user._id,
                        message: '登录成功'
                    }
                });
            }else {
                res.json({
                    status: 1,
                    result: '输入密码有误!'
                });
            }
        }else{
            res.json({
                status: 1,
                result: '输入口令不存在!'
            });
        }
    });
});
/*
  退出登录
*/
router.get('/api/logout', (req, res, next)=>{
    // 销毁session
    req.session.cookie.maxAge = 0;
   /* req.session.destroy((err)=>{
        return next(err);
    });*/
    // 提示用户
    res.json({
       status: 200,
       result: '退出登录成功!'
    });

});
module.exports = router;

import querystring from 'querystring'

// 处理post请求
export default (req, res, next)=>{
    // 1. 过滤get请求
    if(req.method.toLowerCase() === 'get'){
        return next();
    }

    console.log(req.headers['content-type']);

   
    // 如果有文件(图片,音视频, ...), 不要处理,  multipart/form-data
    if(req.headers['content-type'].startsWith('multipart/form-data')){
        return next();
    }
    console.log(req.headers['content-type']);

    // 3. 数据流的拼接
    let data = '';
    req.on('data', (chunk)=>{
        data += chunk;
    console.log(data);

    });
    
    req.on('end', ()=>{
        // console.log(data);
        req.body = querystring.parse(data);
        next();
    });
}
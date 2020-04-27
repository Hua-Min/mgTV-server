import {join} from 'path';
export default {
    viewsPath: join(__dirname, '../views'),
    publicPath: join(__dirname, '../public'),
    uploadPath: join(__dirname, '../public/images'),
    imgBaseURL:'http://loaclhost:3000/images/',
    port: parseInt(process.env.PORT, 10) || 5200,
    secret: 'huazai',
    name: 'huazai',
    maxAge:  1000*60*60*24,
    db_url:'mongodb://localhost:27017/tvdata'
}
//body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体
const bodyParser = require('body-parser');
// 引入 express 模块
const express = require('express');

// 引入路由
const  routes  = require('./routes')
const app = express();


app.use(bodyParser.json());//解析json 数据格式
app.use(bodyParser.urlencoded({extended:true})); //解析form表单提交的数据application/x-www-form-urlencoded
app.use('/',routes)

app.listen(3000,()=>{
    console.log('server start...')
})
const express = require('express')

// 注册路由
const router = express.Router();
const userRouter = require('./user');
// 自定义异常处理中间模块
router.use('/api',userRouter);
router.use((err,req,res,next) =>{

    if(err){
        const {status=401,messages} = err;
        res.status(status).json({
            code:status,
            msg:'请求异常13123',
            data:null
        })
    }else{
        const  {output} = err||{};
        const errCode = (output && output.statusCode) || 500;
        const errMsg = (output && output.payload && output.payload.error) || err.messages;
        res.status(errCode).json({
            code:errCode,
            msg:errMsg
        })
    }
})

module.exports = router


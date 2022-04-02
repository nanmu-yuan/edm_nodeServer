const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
// 引入 参数请求参数校验
const {body} = require('express-validator');

// 引入请求逻辑函数
const service = require('../serviecs/userService')

//登录/注册校验
const vaildator = [
    body('username').isString().withMessage('用户名类型错误'),
    body('password').isString().withMessage('密码类型错误')
]


router.post('/register',vaildator,service.register)
router.post('/login',vaildator,service.login)
module.exports = router
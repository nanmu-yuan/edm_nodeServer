const {querySql,queryOne} = require('../utils/index')
const {body,validationResult} = require('express-validator')
const md5 = require('../utils/md5')

function register(req,res,next){
    //校验请求
    const err = validationResult(req)
    if(!err.isEmpty()){
        next({msg:'121323'})
    }else{
        let {username,password} = req.body;
        password = md5(username)
        findUser(username).then(data =>{
            if(data){
                res.json({
                    code:'501',
                    msg:'用户已存在',
                    data:null
                })
            }else{
                const query = `insert into user (username,password) values('${username}','${password}')`;
                querySql(query).then(result =>{
                    if(!result || result.length==0){
                        res.json({
                            code:'200',
                            msg:'注册失败',
                            data:null
                        })
                    }else{
                        const query = `select * from user where username='${username}' and password='${password}'`;
                        querySql(query).then(user =>{
                            let userData = {
                                id:user[0].id,
                                username:user[0].username,
                            }
                            res.json({
                                code:'200',
                                msg:'注册成功',
                                data:{
                                    userData
                                }
                            })
                        })
                    }
                })
            }
        }).catch(err =>{
        })
    }
}
function login(req,res,next){
    const err = validationResult(req)
    if(!err.isEmpty()){
        next({msg:'456'})
    }else{
        let {username,password} = req.body;
        password = md5(username)
        const query = `select * from user where username='${username}' and password='${password}'`;
        querySql(query).then(user =>{
            if(!user || user.length === 0){
                res.json({
                    code:'200',
                    msg:'用户名或密码错误',
                    data:null
                })
            }else{
                let userData = {
                    username:user[0].username,
                }
                res.json({
                    code:'200',
                    msg:'登录成功',
                    data:{
                        userData
                    }
                })
            }
        })
    }
}
// 通过用户名查询用户信息
function findUser(username){
    const query = `select username from user where username='${username}'`;
    return queryOne(query)
}
module.exports = {
    register,
    login
}
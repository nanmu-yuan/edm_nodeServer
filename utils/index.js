/**
 * 链接数据库模块
 * 
 */
const mysql = require('mysql');
const config = require('../db/dbConfig')


//连接mysql
function connect(){
    const {host,user,password,port,database} = config;
    return mysql.createConnection({
        host,
        user,
        port,
        password,
        database
    })
}

// 新建查询链接
function querySql(sql){
    const conn =  connect();
    return new Promise((reslove,reject)=>{
        try{
            conn.query(sql,(err,res) =>{
                if(err){
                    reject(err)
                }else{
                    reslove(res)
                }
            })
        } catch (e){
            reject(e)
        } finally{
            conn.end()
        }
    })
}
// 查询一条语句
function queryOne(sql){
    return new Promise((reslove,reject)=>{
        querySql(sql).then(res =>{
            if(res && res.length>0){
                reslove(res[0])
            }else{
                reslove(null)
            }
        }).catch(err =>{
            reject(err)
        })
    })
}
module.exports = {
    queryOne,
    querySql,
}
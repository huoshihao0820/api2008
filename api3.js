/**
 * Created by 霍世豪 on 2021/4/15.
 */
const express=require('express')
const  app=express();
const  port=8082;

    //连接数据库
    const mysql=require('mysql')
    const connection=mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'root',
        database:'2008'
    })
    //建立连接
    connection.connect();
    //解决跨域
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

    //get访问list
    app.get('/list',(err,res)=>{
        sql="select * from user limit 10"
        connection.query(sql,function (req,result) {
            res.send(result)
        })
    })
    //add添加数据
    app.get('/add',(err,res)=>{
        let name=err.query.name;
        let pwd=err.query.password;
        sql=`insert into user (name,password) values (${name},${pwd})`
        connection.query(sql,function (req,result) {
           if(req){
               data={code:'202',msg:'添加失败'};
           }else{
               data={code:'200',msg:'添加成功'};
           }
            res.send(data)


        })
    });
    //del删除数据
    app.get('/del',(err,res)=>{
        let id=err.query.id;
        sql=`delete from user where id=${id}`;
        connection.query(sql,function (req,result) {
            if (req) {
                data = {code: '202', msg: '删除失败'};
            } else {
                data = {code: '200', msg: '删除成功'};
            }
            res.send(data)
        })
    });

    //监听
    app.listen((port),()=>{
    console.log(`有人访问了8082端口`)
    })

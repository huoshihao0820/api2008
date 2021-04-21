/**
 * Created by 霍世豪 on 2021/4/14.
 */
// const  express=require('express');
// const  app=express();
// const port=8080
//
//
// app.get('/',(req,res)=>{
//     res.send('hell world')
// })
//
// app.listen(port,()=>{
//     console.log(`Example app listening at http://localhost:${port}`)
// })

const  express=require('express');
const  app=express();
const  port=8080;

let mysql=require('mysql');
let connection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'2008'
})
connection.connect();

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });


    app.get('/list',(req,res)=>{
       let sql=`select * from p_goods limit 10`;
       // console.log(sql)
        connection.query(sql,function (error,result) {
        // console.log(error)
        // console.log(result)
        res.send(result)

    })

    })


app.listen((port),()=>{
    console.log(`http://localhost:${port}`)
})

let mysql=require('mysql');
let connection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'2008'
})
connection.connect();
// sql="select * from p_goods limit 10"
// sql="insert into user(name,password) values('zhangsan','123')"//添加
// sql="delete from  user where id=1"
// sql ="update user set name='lisi'"
connection.query(sql,function (error,res) {
        console.log(res);
    })
connection.end();

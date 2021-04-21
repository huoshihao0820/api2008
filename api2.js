var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
var mysql = require('mysql');
var connection = mysql.createPool({
    connectionLimit : 10,
    host   : 'localhost',
    user   : 'root',　　//数据库登陆就名
    password : 'root', //数据库登陆密码
    database : '2008' //数据库名
});
app.use(cors()); //跨域处理
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//查询goods
app.get('/list', function (req, res) {
    connection.query('select * from `p_goods`where is_delete=0 limit 10 ', function(err, rows, fields) {
        if (err) throw err;
        var data = {code:'200',code_decoration:'查询成功'};
        data.order = rows;
        res.send(data.order);
    })
});
//增加goods
app.post('/adduser', function(req, res){
    console.log(req.body);
    var param = req.body || req.params;
    connection.query('insert into p_goods(id, name, password, email) values(0,?,?,?)', [param.name,param.password,param.email], function(err, result) {
        if (err){
            throw err;
        }else{
            var data = {code:'200',code_decoration:'添加成功'};
            res.send(data);
        }
    });
});
//删出goodsgoods
app.post('/delUser', function (req, res) {
    var name = req.body.name || req.params.name;
    console.log(name);
    connection.query("delete from userone where name=" + name, function (err, rows) {
        if (err) {
            res.send('删除失败：' + err);

        } else {
            var data = {code:'200',code_decoration:'删除成功'};
            res.send(data);
        }
    });
});
//查询一条数据 goods
app.get('/findgoods', function (req, res) {
    var id = req.body.id || req.query.id;
    sql=`select * from p_goods where id=${id}`
    connection.query("select * from p_goods where goods_id=" + id, function (err, rows) {

        res.send(rows);

    });
});
//update goods
app.post('/updgoods', function (req, res) {
    var param = req.body || req.params;
    sql=    `update p_goods set goods_name=${param.goods_name} ,shop_price=${param.shop_price},goods_number=${param.goods_number} where goods_id=${param.goods_id}`
    connection.query(sql, function (err, rows) {

        res.send(rows);

    });
});
//del goods
app.post('/delgoods', function (req, res) {
    var name = req.body.name || req.params.name;
    var id = req.body.goods_id || req.params.goods_id;
    console.log(id);
    connection.query("update p_goods set is_delete=1 where goods_id=" + id, function (err, rows) {
        if (err) {
            res.send('删除失败：' + err);

        } else {
            var data = {code:'200',code_decoration:'删除成功'};
            res.send(data);
        }
    });
});
//login user
app.post('/login',(req,res)=>{
    let name=req.body.name
    let password=req.body.password
    sql=`select id from user where name='${name}' and password='${password}'`
    connection.query(sql,function (req,result) {
        if(result.length){
            var data = {code:'200',code_decoration:'登录成功'};
        }else{
            var data = {code:'202',code_decoration:'账户密码错误'};

        }
        res.send(data);
    })
})
//list  user
app.get('/userlist',(err,res)=>{
    sql=`select * from user limit 10`
    connection.query(sql,function (req,result) {
        res.send(result);
    })
})
//del user
app.get('/userdel',(err,res)=>{
    let id=err.query.u_id
    sql=`delete from user where id=${id}`
    connection.query(sql,function (req,result) {
        var data = {code:'200',code_decoration:'删除成功'};
        res.send(data);
    })
})
//add user
app.get('/useradd',(err,res)=>{
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
//lsit   cat
app.get('/catlist',(err,res)=>{
    sql=`select * from cat limit 10`
    connection.query(sql,function (req,result) {
        res.send(result);
    })
})
//del cat
app.get('/catdel',(err,res)=>{
    let id=err.query.id
    sql=`delete from cat where id=${id}`
    connection.query(sql,function (req,result) {
        var data = {code:'200',code_decoration:'删除成功'};
        res.send(data);
    })
})
//min cat
app.get('/catmin',(err,res)=>{
    let id=err.query.id
    let num=err.query.num
    number=parseInt(num-1)
    sql=`update cat set number='${number}' where id=${id}`
    connection.query(sql,function (req,result) {
        var data = {code:'200',code_decoration:'成功'};
        res.send(data);
    })
})
//max cat
app.get('/catmax',(err,res)=>{
    let id=err.query.id
    let num=err.query.num
    number=parseInt(parseInt(num)+parseInt(1))
    sql=`update cat set number='${number}' where id=${id}`
    connection.query(sql,function (req,result) {
        var data = {code:'200',code_decoration:'成功'};
        res.send(data);
    })
})
//lsit   order
app.get('/orderlist',(err,res)=>{
    sql=`select * from p_order_info limit 10`
    connection.query(sql,function (req,result) {
        res.send(result);
    })
})
var server = app.listen(8081, function () {

    console.log("服务启动成功！");

})
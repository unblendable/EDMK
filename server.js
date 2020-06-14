const express = require('express')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const http = require('http')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3010

const db = mysql.createConnection({
    host : 'us-cdbr-east-05.cleardb.net',
    user : 'b2b3c96ab60eb5',
    password : '2ba913b8',
    database : 'heroku_5a5fbfc4d0690fb'
})


db.connect((err)=>{
    if(err) throw err
    console.log('connected to database')
})
const app = express()
app.use(function(req, res, next) {
    // req.setTimeout(0) // no timeout
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-forwarded-for"
    );
    // res.set('Content-Type', 'application/json')
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use(bodyParser.raw())
app.use(bodyParser.json({ limit: "100mb", parameterLimit: 1000000 }))
app.use(bodyParser.urlencoded({ limit: "100mb",  extended: true, parameterLimit: 1000000 }))

const server = http.createServer(app)
server.on('clientError', (err,socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.on('error', (e)=>{
    if(e.code === 'EADDRINUSE'){
        console.log('Address in use, retrying...');
        setTimeout(()=>{
            server.close();
            server.listen(port)
        }, 1000)
    }
})
server.listen(port, function(){
    global.sql = db
    // var sqtext = `SELECT table_schema AS "Database", SUM(data_length + index_length) / 1024 / 1024 AS "Size (MB)" FROM information_schema.TABLES GROUP BY table_schema `
    // var sqtext = `ALTER TABLE user_member CHANGE 'id' 'user_id' INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY`
    // var sqtext = `CREATE TABLE user_detail (
    //                 user_detail_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    //                 user_member_id INT(6) UNSIGNED UNIQUE NOT NULL,
    //                 title_id INT(6) UNSIGNED,
    //                 firstname VARCHAR(50) NOT NULL,
    //                 lastname VARCHAR(50) NOT NULL,
    //                 email VARCHAR(50),
    //                 tel VARCHAR(12),
    //                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    //                 )`
    // var sqtext = `DESCRIBE user_type`

    // sql.query(sqtext, function(err, result){
    //     if(err) throw err
    //     console.log(result)
    // })

    global.jsonres = function(res, status ,data, message){
        res.set('Content-type', 'application/json')
        res.status(200).send({
            message : message,
            data: data,
            status: status
        })
    }
    console.log('Webserver is ready and listening on port '+port);
    console.log('opened server on', server.address());
})


require('./src/routes/index')(app)

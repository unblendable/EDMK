const express = require('express')
const mysql = require('mysql')
// const pool = require('generic-pool')
const jwt = require('jsonwebtoken')
const http = require('http')
const bodyParser = require('body-parser')
// const db = mysql.createConnection({
//     host : 'us-cdbr-east-05.cleardb.net',
//     user : 'b2b3c96ab60eb5',
//     password : '2ba913b8',
//     database : 'heroku_5a5fbfc4d0690fb',
//     multipleStatements :  true
// })


// db.connect((err)=>{
//     if(err) throw err
//     console.log('connected to database')
// })

const pool = mysql.createPool({
    host : 'us-cdbr-east-05.cleardb.net',
    user : 'b2b3c96ab60eb5',
    password : '2ba913b8',
    database : 'heroku_5a5fbfc4d0690fb',
    multipleStatements :  true
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

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/public/'))
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}
const port = process.env.PORT || 3010
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
    global.sql_query = function(sqtxt, binding){
        return new Promise((resolve)=>{
            pool.query(sqtxt, binding, function(err, result){
                if(err) throw err
                resolve(result)
            })
            // pool.getConnection(function(err, connection) {
            //     if (err) throw err;
            //     console.log(connection.state)
            //     connection.query(sqtxt, binding,  function (error, result) {
            //         resolve(result)
            //         connection.release();
            //         if (error) throw error;
            //     });
            // });
        })
    }

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

const express = require('express')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const http = require('http')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3010
// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : '',
//     database : 'edmk'
// })

// db.connect((err)=>{
//     if(err) throw err
// })
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

//HANDLE PRODUCTION
if(process.env.NODE_ENV === 'production'){
    // STATIC FOLDER
    app.use(express.static(__dirname + '/public/'))

    //handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}
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
    // global.sql = db
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

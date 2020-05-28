const express = require('express')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'edmk'
})

db.connect((err)=>{
    if(err) throw err
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

require('./src/routes/index')(app)


app.listen('3010', ()=>{
    global.sql = db
    console.log('Server is listening to 3010')
})


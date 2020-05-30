
const moment = require('moment')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const randomstring = require('randomstring')
exports.login = async function(req, res){
    var username = req.body.username
    var password = req.body.password
    let result = await userModel.getUserByUsername(username)
    if(result.length){
        bcrypt.compare(password, result[0].password, (err, match)=>{
            var status = match ? 200 : err ? 500 : 300
            return jsonres(res, status, result)
        })
    }else{
        return jsonres(res, 300, 'Invalid username or password')
    }
}

exports.register = async function(req, res){
    let userinfo = req.body
    var hashedPassword = await bcrypt.hash(userinfo.password, 15)
    var token = randomstring.generate(15)
    let permission = {
        Manage_admin : ['add','edit','delete']
    }
    permission = JSON.stringify(permission)
    let result = await userModel.addUserMember(userinfo.username, hashedPassword, token, 'admin', permission)
    console.log(result)
}
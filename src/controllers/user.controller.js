
const moment = require('moment')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const randomstring = require('randomstring')

exports.login = async function(req, res){
    var username = req.body.username
    var password = req.body.password
    console.log(req.body)
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
    let form = req.body
    var hashedPassword = await bcrypt.hash(form.password, 10)
    var token = randomstring.generate(15)
    let result = await userModel.addUserMember(form.username, hashedPassword, token, form.user_type_id, form.title_id, form.firstname, form.lastname, form.email, form.tel)
    return jsonres(res, 200, result)
}

exports.getUserMemberList = async function(req, res){
    let body = req.body
    let result = await userModel.getUserMemberList()
    return jsonres(res, 200, result)
}

exports.deleteUserMember = async function(req, res){
    let body = req.body
    let result = await userModel.deleteUserMember(body.user_member_id)
    return jsonres(res, 200, result)
}

exports.getUserTypeList = async function(req, res){
    let result = await userModel.getUserTypeList()
    return jsonres(res, 200, result)
}

exports.getTitleNameList = async function(req, res){
    let result = await userModel.getTitleNameList()
    return jsonres(res, 200, result)
}
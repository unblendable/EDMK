const router = require('express').Router()
const userController = require('../controllers/user.controller')
router
    .post('/login', userController.login)
    .post('/register', userController.register)
    .post('/getUserMemberList', userController.getUserMemberList)
    .post('/getUserTypeList', userController.getUserTypeList)
    .post('/getTitleNameList', userController.getTitleNameList)
    .post('/deleteUserMember', userController.deleteUserMember)
module.exports = router
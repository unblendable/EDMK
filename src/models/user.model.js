exports.getUserByUsername = function(username){
    return new Promise((resolve)=>{
        var sqtext = ` SELECT * FROM user_member WHERE username = ? `
        var binding = [username]
        sql.query(sqtext, binding, function(err, result){
            if(err) throw err
            resolve(result)
        })
    })
}

exports.addUserMember = function(username, password, token, type, permission){
    return new Promise((resolve)=>{
        var sqtext = `INSERT INTO user_member(username, password, token, type, permission) VALUES(?,?,?,?,?)`
        var binding = [username, password, token, type, permission]
        sql.query(sqtext, binding, function(err, result){
            if(err) throw err
            resolve(result)
        })
    })
}
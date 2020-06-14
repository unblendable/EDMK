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

exports.addUserMember = function(username, password, token, type_id, title_id, firstname, lastname, email, tel){
    return new Promise((resolve, reject)=>{
        var sqtext = `INSERT INTO user_member(username, password, token, user_type_id) VALUES(?,?,?,?)`
        var binding = [username, password, token, type_id]
        sql.query(sqtext, binding, function(err, result){
            if(err) reject(err)
            var user_member_id = result.insertId
            sqtext = `INSERT INTO user_detail(user_member_id, title_id, firstname, lastname, email, tel)
                        VALUES(?,?,?,?,?,?) `
            binding = [user_member_id, title_id, firstname, lastname, email, tel]
            sql.query(sqtext, binding, function(err, result){
                if(err) reject(err)
                resolve(result)
            })
        })
    })
}

exports.deleteUserMember = function(user_member_id){
    return new Promise((resolve, reject)=>{
        var sqtext = ` START TRANSACTIONS;
                        DELETE FROM user_member WHERE id = ? ;
                        DELETE FROM user_detail WHERE user_member_id = ? ;
                        COMMIT; `
        var binding = [user_member_id, user_member_id]
        sql.query(sqtext, binding ,function(err, result){
            if(err) reject(err)
            resolve(result)
        })
    })
}

exports.getUserMemberList = function(start, limit){
    return new Promise((resolve, reject)=>{
        var sqtext = `SELECT * FROM user_member 
                        INNER JOIN user_detail ON user_detail.user_member_id = user_member.id
                        INNER JOIN title_name USING(title_id)
                        INNER JOIN user_type USING(user_type_id) `
        if(start && start >= 0 && limit && limit > 0) sqtext += ` LIMIT ${start},${limit} `
        sql.query(sqtext, function(err, result){
            if(err) reject(err)
            resolve(result)
        })
    })
}

exports.getUserTypeList = function(){
    return new Promise((resolve)=>{
        sql.query(`SELECT * FROM user_type`, function(err, result){
            if(err) throw err
            resolve(result)
        })
    })
}

exports.getTitleNameList = function(){
    return new Promise((resolve)=>{
        sql.query(`SELECT * FROM title_name`, function(err, result){
            if(err) throw err
            resolve(result)
        })
    })
}
const model = require('../models/userModel.js')

module.exports.login = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send("Error: username or password is undefined")
        return;
    }
    const data = {
        username: req.body.username,
        password: res.locals.hash
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    message: "User not found"
                })
            } else {
                res.locals.hash = results[0].password
                res.locals.userId = results[0].user_id
                next()
            }
        }
    }
    model.login(data, callback)
};
module.exports.register = (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).send("Error: username, email or password is undefined")
        return
    }
    const data = {
        username: req.body.username, 
        email: req.body.email, 
        password: res.locals.hash
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register: ", error)
            res.status(500).json()
        } else {
            res.locals.message = `User ${data.username} created successfully.`
            res.locals.userId = results.insertId;
            next()
        }
    } 
    model.register(data, callback)
}
module.exports.readAllUsers= (req, res, next) => //get all users
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUsers: ", error)
            res.status(500).json(error)
        } 
        else res.status(200).json(results)
    }
    model.selectAll(callback)
}

module.exports.createNewUser = (req, res, next) => { //create new user

    if (!req.body.username || !req.body.email) {
        res.status(400).send("Error: username or email is undefined")
        return
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error creating new user: ", error)
            res.status(500).json(error)
        } else {
            res.status(201).json({
                user_id: results.insertId,
                username: req.body.username,
                email: req.body.email,
                total_points: results.total_points
            })
        }
    }
    model.insertSingle(data, callback)
}
module.exports.checkEmailDuplicate = (req, res, next) => //check for duplicate email
{
    if (!req.body.username || !req.body.email) {
        res.status(400).send("Error: username or email is undefined")
        return
    }
    const data = {
        username: req.body.username,
        email: req.body.email,
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error creating new user: ", error)
           res.status(500).json()
        } else {
            if (results.length>0) {
                res.status(409).json({message: "email is already associated with another user"})
            } else next()
        }
    }
    model.checkEmailDuplicate(data, callback)
}

module.exports.readUserById = (req, res, next) => { //get user by id
    const data = {
        user_id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    message: "User not found"
                })
            } else {
                let totalledPoints = results.reduce((accumulator, currentValue) => {
                    return accumulator + parseInt(currentValue.totalPoints)
                }, 0)
                res.status(200).json({
                    user_id: results[0].user_id,
                    username: results[0].username,
                    email: results[0].email,
                    total_points: totalledPoints || 0
                })

            }
        }
    }
    model.selectById(data, callback)
}
module.exports.checkUserId = (req, res, next) => { //check for valid userId
    const data = {
        user_id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error)
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "UserId not found"
                });
            }
            else next()
        }
    }
    model.checkUserId(data, callback)
}
module.exports.updateUserById = (req, res, next) => {
    if(req.body.username == undefined || req.body.email == undefined)
    {
        res.status(400).json({
            message: "Error: username or email is undefined"
        })
        return
    }
    const data = { 
        user_id: parseInt(req.params.id),
        username: req.body.username,
        email: req.body.email
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById: ", error)
            res.status(500).json()
        } else {
            res.status(200).json(data)
        }
    }
    
    model.updateById(data, callback)
}
module.exports.checkUsernameAndEmailDuplicate = (req, res, next) => //check for both username and email duplicate
{
    if (!req.body.username || !req.body.email) {
        res.status(400).send("Error: username or email is undefined")
        return
    }
    const data = {
        username: req.body.username,
        email: req.body.email,
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error creating new user: ", error)
           res.status(500).json()
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    message: "user not found"
                })
            } else if (results.length>0) {
                res.status(409).json({
                    message: "username or email is already associated with another user"
                })
            } else next()
        }
    }
    model.checkUsernameAndEmailDuplicate(data, callback)
}

module.exports.deleteUserById = (req, res, send) => { //delete user by id
    const data = {
        user_id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error deleteUserById: ', error)
            res.status(500).json(error)
        } else {
            if (results[0].affectedRows === 0) { 
                res.status(404).json({
                    message: "User not found"
                })
            } else {
                res.status(204).send()
            }
        }
    }
    model.deleteById(data, callback)
}

const model = require("../models/messageModel");

module.exports.createMessage = (req, res, next) => {
    if(req.body.message_text === undefined || req.body.message_text === "")
    {
        res.status(400).send("Error: message_text is undefined");
        return;
    }
    else if(req.body.user_id === undefined)
    {
        res.status(400).send("Error: user_id is undefined");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        message_text: req.body.message_text
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(data);
        }
    }

    model.insertSingle(data, callback);
}
module.exports.readMessageById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readMessageById:", error);
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

module.exports.readAllMessage = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
            next()
        }
    }

    model.selectAll(callback);
}

module.exports.updateMessageById = (req, res, next) => {
    if(req.params.id === undefined)
    {
        res.status(400).send("Error: id is undefined");
        return;
    }
    else if(req.body.message_text === undefined || req.body.message_text === "")
    {
        res.status(400).send("Error: message_text is undefined or empty");
        return;
    }
    else if(req.body.user_id === undefined)
    {
        res.status(400).send("Error: userId is undefined");
        return;
    }

    const data = {
        id: req.params.id,
        user_id: req.body.user_id,
        message_text: req.body.message_text
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.updateById(data, callback);
}

module.exports.deleteMessageById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.deleteById(data, callback);
}
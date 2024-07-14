const model = require("../models/taskModel")

module.exports.readAllTasks= (req, res, next) => 
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUsers: ", error)
            res.status(500).json(error);
        } 
        else res.status(200).json(results)
    }
    model.selectAll(callback);
}

module.exports.createNewTask = (req, res, next) =>
{
    if(req.body.title===undefined||req.body.description===undefined||req.body.points===undefined) {
        res.status(400).send("Error: title or description or points is undefined")
        return;
    } 
    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }
    const callback = (error, results, field) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            const task_id = results.insertId //extracts the value of insertId from the results
            res.status(201).json({
                task_id,
                title: req.body.title,
                description: req.body.description,
                points: req.body.points
            });
        }
    }        

    model.insertSingle(data, callback)
}

module.exports.readTaskById = (req, res, next) =>
{
    const data = {
        task_id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error)
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[0])
        }
    }

    model.selectById(data, callback)
}

module.exports.updateTaskById = (req, res, next) => {
    if(req.body.title === undefined || req.body.description === undefined || req.body.points === undefined)
    {
        res.status(400).json({
            message: "Error: title or description or points is undefined"
        })
        return
    }
    const data = { 
        task_id: parseInt(req.params.id),
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById: ", error)
            res.status(500).json(error)
        } else {
            if (results.affectedRows === 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            } else res.status(200).json(data)
        }
    }
    model.updateById(data, callback)
}

module.exports.deleteTaskById = (req, res, send) =>
{
    const data = {
        task_id: req.params.id
    }
    const callback = (error, results, fields) =>
    {
        if (error) {
            console.error('Error deleteTaskById: ', error)
            res.status(500).json(error)
        } else {
            if (results[0].affectedRows === 0) {
                res.status(404).json({
                    message: "Task not found"
                })
            } else res.status(204).send()
        }
    }
    model.deleteById(data, callback)
}

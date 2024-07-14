const model = require("../models/taskProgressModel")

module.exports.readAllTaskProgress = (req, res, next) => 
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTaskProgress: ", error)
            res.status(500).json(error)
        } 
        else res.status(200).json(results)
    }
    model.selectAll(callback)
}
module.exports.checkUsernameOrTaskId = (req, res, next) => {
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checking username or task_id:", error)
            res.status(500).json({ 
                message: "Internal server error" 
            })
        } else {
            if (results && results.length === 0) {
                res.status(404).json({ 
                    message: "Requested user_id or task_id does not exist"
                })
            } else {
                next()
            }
        }
    }
    model.checkUsernameOrTaskId(data, callback)
}

module.exports.createNewTaskProgress = (req, res, next) => { //complete tasks 
    if (req.body.completion_date === undefined) {
        res.status(400).send("Error: completion_date is undefined")
        return;
    } 
    const optionalNotes = req.body.notes === undefined ? null : req.body.notes; 
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: optionalNotes
    }
    const callback = (error, results, field) => {
        if (error) {
            console.error("Error createNewTaskProgress:", error)
            res.status(500).json(error)
        } else if (results) {
            res.status(201).json({
                progress_id: results.insertId,
                user_id: req.body.user_id,
                task_id: req.body.task_id,
                completion_date: req.body.completion_date,
                notes: optionalNotes
            })
            next()
        }
    }
    model.insertSingle(data, callback)
};

module.exports.getTaskPoints = (req, res, next) => { //complete tasks 
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id
    }
    const getTaskPointsCallback = (error, results, field) => { //sum task points from task table callback
        if (error) {
            console.error("Error sumTaskPoints:", error)
            res.status(500).json(error)
        } else {
            let totalPointsInt = parseInt(results[0].points)
            const taskPointsData = {
                user_id: req.body.user_id,
                totalPoints: totalPointsInt || 0
            }
            const insertTaskPointsCallback = (insertError, insertResults, insertField) => { //insert data into taskPoints table
                if (insertError) {
                    console.error("Error insertTaskPointsPoints:", insertError)
                    res.status(500).json(insertError)
                } else {
                    if (insertResults.length === 0) {
                        res.status(404).json({
                            message: "insertIntoTaskPoints error",
                        })
                    }
                }
            }
            model.insertIntoTaskPoints(taskPointsData, insertTaskPointsCallback)
        }
    }
    model.getTaskPoints(data, getTaskPointsCallback);
}

module.exports.readTaskProgressById = (req, res, next) =>
{
    const data = {
        progress_id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskProgressById:", error)
            res.status(500).json(error)
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "Task Progress not found"
                });
            }
            else {
                res.status(200).json(results[0])
            }
        }
    }

    model.selectById(data, callback)
}

module.exports.retrieveTaskProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error retrieveTaskProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "Task Progress not found"
                });
            }
            else {
                req.taskProgressDetails = results[0] //retrieve results
                next()
            }
        }
    }
    model.selectById(data, callback)
}

module.exports.updateTaskProgressById = (req, res, next) => { 
    if(req.body.notes === undefined)
    {
        res.status(400).json({
            message: "notes is undefined"
        });
        return;
    }
    const taskProgressData = req.taskProgressDetails
    const data = {
        progress_id: parseInt(req.params.id), 
        user_id: taskProgressData.user_id,
        task_id: taskProgressData.task_id,
        completion_date: taskProgressData.completion_date,
        notes: req.body.notes
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskProgressById: ", error)
            res.status(500).json(error)
        } else { //no need for error handling here bcuz it's already done in retrieveTaskProgressById
            res.status(200).json(data);
        }
    }
    model.updateById(data, callback);
}

module.exports.deleteTaskProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.id
    }
    const callback = (error, results, fields) =>
    {
        if (error) {
            console.error('Error deleteTaskProgressById: ', error)
            res.status(500).json(error)
        } else {
            if (results[0].affectedRows === 0) {
                res.status(404).json({
                    message: "Task progress not found"
                })
            } else{
                res.status(204).send()
            } 
        }
    }
    model.deleteById(data, callback)
}

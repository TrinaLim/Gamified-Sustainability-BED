const model = require("../models/magicalItemsModel")

module.exports.readAllMagicalItems= (req, res, next) => //read all magical items available
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUsers: ", error)
            res.status(500).json(error)
        } 
        else res.status(200).json(results)
    }
    model.selectAllMagicalItems(callback)
}
module.exports.getAllTaskPoints = (req, res, next) => { //get all taskPoints from taskPoints table
    const data = {
        user_id: req.params.user_id,
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkSufficientPoints: ", error)
            res.status(500).json(error)
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    message: "UserId not found"
                })
            } else {
                let totalledPoints = results.reduce((accumulator, currentValue) => {
                    return accumulator + parseInt(currentValue.totalPoints)
                }, 0)
                res.locals.totalledPoints = totalledPoints;
                next()
            }
        }
    }
    model.getAllTaskPoints(data, callback)
}
module.exports.getMagicalItemPoints = (req, res, next) => { //check whether player has sufficient points to purchase magical item
    const totalledPoints = res.locals.totalledPoints;
    const data = {
        magicalItems_id: req.params.magicalItems_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getMagicalItemPoints: ", error)
            res.status(500).json(error)
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    message: "magicalItemsId not found."
                })
            } else {
                if (totalledPoints >= results[0].pointsNeeded) {
                    next()
                } else {
                    res.status(400).json({
                        message: "Insufficient points to purchase this item."
                    })
                }
            }
        }
    }
    model.getMagicalItemPoints(data, callback)
}
module.exports.buyMagicalItemsById = (req, res, next) => { //buy magicalItem buy POST
    const data = {
        user_id: req.params.user_id,
        magicalItems_id: req.params.magicalItems_id
    }
    const buyCallback = (buyError, buyResults) => { //buy magical item callback
        if (buyError) {
            console.error("Error buyMagicalItemsById: ", buyError)
            res.status(500).json(buyError)
        } else {
            if (buyResults.length === 0) {
                res.status(404).json({
                    message: "Magical item not found",
                })
            } else {
                const Insertitem = {
                    user_id: req.params.user_id,
                    magicalItems_id: req.params.magicalItems_id, 
                    name: buyResults[0].name,
                    abilities: buyResults[0].abilities,
                    damage: buyResults[0].damage,

                }
                const insertCallback = (insertError, insertResults, fields) => { //insert into inventory callback
                    if (insertError) {
                        console.error("Error insertIntoInventory: ", insertError)
                        res.status(500).json(insertError)
                    } else {
                        res.status(200).json({
                            message: "Item purchased successfully. Please check your inventory.",
                        })
                    }
                }
                model.insertIntoInventory(Insertitem, insertCallback)
            }
        }
    }
    model.buyMagicalItemsById(data, buyCallback)
}



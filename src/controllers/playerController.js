const model = require("../models/playerModel")

module.exports.readAllInventory = (req, res, next) => //read Inventory by User Id
{
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllInventoryById: ", error)
            res.status(500).json(error)
        } else {
            const magicalItemsData = []
            const petData = []
            for (i=0;i<results.length;i++) {
                if (results[i].magicalItems_id) {
                    const magicalItem = {
                        inventoryId: results[i].inventory_id,
                        magicalItemId: results[i].magicalItems_id,
                        name: results[i].name,
                        abilities: results[i].abilities,
                        damage: results[i].damage
                    }
                    magicalItemsData.push(magicalItem);
                } else if (results[i].pet_id) {
                    const pet = {
                        inventoryId: results[i].inventory_id,
                        petId: results[i].pet_id,
                        petBreed: results[i].breed,
                        petLevel: results[i].level
                    };
                    petData.push(pet)
                }
            }
            res.status(200).json({
                magicalItemsOwned: magicalItemsData,
                petsOwned: petData
            })
        }
    }
    model.selectAllInventory(data, callback);
}
module.exports.readPetByInventoryId = (req, res, next) => //read Inventory by User Id
{
    const data = {
        user_id: req.params.user_id,
        inventory_id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllInventoryById: ", error)
            res.status(500).json(error)
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    message: "Inventory id not found."
                })
            } else {
                const pet = {
                    id: results[0].inventory_id,
                    pet_id: results[0].pet_id,
                    breed: results[0].breed,
                    abilities: results[0].pet_abilities,
                    hunger: results[0].hunger,
                    groom: results[0].groom,
                    level: results[0].level
                };
                res.status(200).json(pet)
            }
        }
    }
    model.selectPetByInventoryId(data, callback);
}
module.exports.readAllQuests= (req, res, next) => //read all quests available
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllQuests: ", error)
            res.status(500).json(error)
        }else {
            const data = []
            results.forEach(result => {
            const questData = {
                quest_id: result.quest_id,
                name: result.name,
                requirements: { //formatting
                    magicalItemId: result.magicalItems_id,
                    magicalItemName: result.magicalItems_name
                },
                rewards: { //formatting
                    petBreed: result.breed,
                    petAbilities: result.abilities
                }
            }
            data.push(questData)
            })
            res.status(200).json(data)
        }}
        model.selectAllQuests(callback);
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
                res.status(200).json(totalledPoints)
            }
        }
    }
    model.getAllTaskPoints(data, callback)
}
module.exports.checkUserId = (req, res, next) => { //check for valid userId
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserId:", error)
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
module.exports.checkRequirements = (req, res, next) => { //check whether questId exists or requirements have been met
    const data = {
        quest_id: req.params.quest_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkRequirements:", error)
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "questId not found or you did not meet the requirements to complete this quest. Please check again."
                });
            }
            else next()
        }
    }
    model.checkRequirements(data, callback)
}

module.exports.completeQuestsById = (req, res, next) => //complete quest by id
{
    const data = {
        quest_id: req.params.quest_id
    }
    const completeQuestcallback = (completeQuestError, completeQuestResults) => { //complete quest callback
        if (completeQuestError) {
            console.error("Error completeQuestById:", error);
            res.status(500).json(error);
        } else {
            if(completeQuestResults.length === 0) {
                res.status(404).json({
                    message: "questId not found."
                });
            } else {
                const insertInventory = {
                    user_id: req.params.user_id,
                    pet_id: completeQuestResults[0].pet_id,
                    breed: completeQuestResults[0].breed,
                    pet_abilities: completeQuestResults[0].abilities,
                    hunger: completeQuestResults[0].hunger,
                    groom: completeQuestResults[0].groom,
                    level: completeQuestResults[0].level
                }
                const insertInventoryCallback =(insertInventoryError, insertInventoryResults) => { //insert into Inventory table callback
                    if (insertInventoryError) {
                        console.error("Error insertIntoInventory:", insertInventoryError) 
                        res.status(500).json(insertInventoryError)
                    } else{
                        res.status(200).json({
                            message: "Quest completed successfully. New pet unlocked."    
                        });
                    }
                }
                model.insertIntoInventory(insertInventory, insertInventoryCallback) //insert into user inventory
            }
        }
    }        
    model.completeQuestsById(data, completeQuestcallback) //POST quest table 
}

module.exports.updatePetHealthStatus = (req, res, next) => { //update pet health status by pet Id
    const data = {
        user_id: req.params.user_id,
        inventory_id: req.params.inventory_id
    }
    const updatePetCallback = (updateError, updateResults) => {
        if (updateError) {
            console.error("Error updatePetHealthStatus: ", updateError)
            if(updateError.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
                res.status(500).json({
                    message: "You have reached the maximum level for one of the statuses"
                })
            }
        } else {
            if (updateResults.affectedRows === 0) {
                res.status(404).json({
                    message: "Inventory Id not found"
                })
            } else {
                res.status(200).json({
                     message: "Pet health status updated successfully."
                })
            }
        }
    }
    model.updatePetHealthStatus(data, updatePetCallback)
}

module.exports.deleteInventoryItemById = (req, res, send) => //delete Items By Id
{
    const data = {
        user_id: req.params.user_id,
        inventory_id: req.params.inventory_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error deleteInventoryItemById: ', error)
            res.status(500).json(error)
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    message: "inventory Id not found"
                })
            } else res.status(204).send()
        }
    }
    model.deleteInventoryItemById(data, callback)
}

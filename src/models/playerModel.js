const pool = require('../services/db');

module.exports.selectAllInventory = (data,callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM Inventory
        WHERE user_id = ?;
        `;
    const VALUES = [data.user_id]
    pool.query(SQLSTATEMENT, VALUES, callback);
}
module.exports.selectAllQuests = (callback) =>
{
    const SQLSTATEMENT = `
        SELECT * 
        FROM Quests
        JOIN Pets ON Quests.pet_id = Pets.pet_id;
        `;
    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectAllPets = (data, callback) => 
{
    const SQLSTATEMENT = `
        SELECT UsersPets.*, User.*
        FROM UsersPets
        LEFT JOIN User ON UsersPets.user_id = User.user_id
        WHERE UsersPets.user_id = ?;
    `;
    const VALUES = [data.user_id]
    pool.query(SQLSTATEMENT,VALUES, callback)
}
module.exports.selectPetByInventoryId = (data, callback) => 
{
    const SQLSTATEMENT = `
        SELECT * FROM Inventory
        WHERE Inventory.user_id = ? AND Inventory.inventory_id = ?;
    `;
    const VALUES = [data.user_id, data.inventory_id]
    pool.query(SQLSTATEMENT,VALUES, callback)
}
module.exports.getAllTaskPoints = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM TaskPoints 
        WHERE TaskPoints.user_id = ?;
    `;
    const VALUES = [data.user_id]
    pool.query(SQLSTATEMENT, VALUES, callback)
}
module.exports.checkUserId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT *
        FROM User
        WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}
module.exports.checkRequirements = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT *
        FROM Quests
        JOIN Inventory ON Quests.magicalItems_id = Inventory.magicalItems_id
        WHERE Quests.quest_id = ?;
    `;
    const VALUES = [data.quest_id]; 
    pool.query(SQLSTATEMENT, VALUES, callback);
}
module.exports.completeQuestsById = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT Pets.*
        FROM Quests
        JOIN Pets ON Quests.pet_id = Pets.pet_id
        JOIN Inventory ON Quests.magicalItems_id = Inventory.magicalItems_id
        WHERE Quests.quest_id = ?;
    `;
    const VALUES = [data.quest_id]; 
    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.insertIntoUsersPets = (insertItem, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO UsersPets (user_id, pet_id, breed, abilities, hunger, groom, level)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const VALUES = [insertItem.user_id, insertItem.pet_id, insertItem.breed, insertItem.abilities, insertItem.hunger, insertItem.groom, insertItem.level]
    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.insertIntoInventory = (insertInventory, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Inventory (user_id, pet_id, breed, pet_abilities, hunger, groom, level)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const VALUES = [insertInventory.user_id, insertInventory.pet_id, insertInventory.breed, insertInventory.pet_abilities, insertInventory.hunger, insertInventory.groom, insertInventory.level]
    pool.query(SQLSTATEMENT, VALUES, callback)
};

module.exports.deleteQuestsById = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM Quests 
        WHERE quest_id = ?;
    `;
    const VALUES = [data.quest_id]
    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.updatePetHealthStatus = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE Inventory
        SET hunger = hunger + 5, groom = groom + 5, level = level + 1
        WHERE user_id = ? AND inventory_id = ?;
    `;
const VALUES = [data.user_id, data.inventory_id]
pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.deleteInventoryItemById = (data, callback) => { 
    const SQLSTATEMENT = `
        DELETE FROM Inventory
        WHERE inventory_id = ? AND user_id = ?;
        ALTER TABLE Inventory AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.inventory_id, data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

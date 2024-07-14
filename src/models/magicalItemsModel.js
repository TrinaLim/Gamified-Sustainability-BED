const pool = require('../services/db');

module.exports.selectAllMagicalItems = (callback) => 
{
    const SQLSTATEMENT = `
        SELECT * FROM MagicalItems;
        `;
    pool.query(SQLSTATEMENT, callback);
}
module.exports.getAllTaskPoints = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM TaskPoints 
        WHERE TaskPoints.user_id = ?;
    `;
    const VALUES = [data.user_id]
    pool.query(SQLSTATEMENT, VALUES, callback)
}
module.exports.getMagicalItemPoints = (data, callback) => { //get magicalItem points by id
    const SQLSTATEMENT = `
        SELECT * 
        FROM MagicalItems
        WHERE MagicalItems.magicalItems_id = ?;
    `;
    const VALUES = [data.magicalItems_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}
module.exports.buyMagicalItemsById = (data, callback) => { //purchase magical item
    const SQLSTATEMENT = `
        SELECT *
        FROM MagicalItems
        WHERE MagicalItems.magicalItems_id = ?;
    `;
    const VALUES = [data.magicalItems_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.insertIntoInventory = (insertItem, callback) => { //insert purchased magical item into inventory
    const SQLSTATEMENT = `
        INSERT INTO Inventory (user_id, magicalItems_id, name, abilities, damage)
        VALUES (?, ?, ?, ?, ?);
    `;
    const VALUES = [insertItem.user_id, insertItem.magicalItems_id, insertItem.name, insertItem.abilities, insertItem.damage];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.deleteMagicalItemsById = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM MagicalItems 
        WHERE magicalItems_id = ?;
    `;
    const VALUES = [data.magicalItems_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};
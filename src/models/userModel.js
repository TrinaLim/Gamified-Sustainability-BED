const pool = require('../services/db');
module.exports.register = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO User(username, email, password)
        VALUES(?,?,?);
    `;

    const VALUES = [data.username, data.email, data.password]
    pool.query(SQLSTATEMENT, VALUES, callback)
}
module.exports.login = (data, callback) =>
{
    const SQLSTATEMENT =`
        SELECT * FROM User
        WHERE username = ?;
        `;
    const VALUES = [data.username];
    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.selectAll = (callback) => 
{
    const SQLSTATEMENT = `
        SELECT * FROM User;
        `;
    pool.query(SQLSTATEMENT, callback)
}

module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO User(username, email)
        VALUES (?, ?);
    `;

    const VALUES = [data.username, data.email]
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
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT User.*, TaskPoints.totalPoints AS totalPoints
        FROM User
        LEFT JOIN TaskPoints ON User.user_id = TaskPoints.user_id
        WHERE User.user_id = ?;
    `;
    const VALUES = [data.user_id]
    pool.query(SQLSTATEMENT, VALUES, callback)
}
module.exports.checkEmailDuplicate = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE email = ?
    `;

    const VALUES = [data.email];
    pool.query(SQLSTATEMENT, VALUES, callback)
}
module.exports.checkUsernameAndEmailDuplicate = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE username = ? AND email = ?;
    `;

    const VALUES = [data.username, data.email]
    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.updateById = (data, callback) => 
{
    const SQLSTATEMENT = `
        UPDATE User
        SET username = ?, email = ?
        WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.email, data.user_id]
    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.deleteById = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM User
        WHERE user_id = ?;
        ALTER TABLE User AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.user_id]
    pool.query(SQLSTATEMENT, VALUES, callback)
};

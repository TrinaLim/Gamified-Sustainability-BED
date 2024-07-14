const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM TaskProgress;
        `;
    pool.query(SQLSTATEMENT, callback);
}
module.exports.checkUsernameOrTaskId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT User.*, Task.*
        FROM User, Task
        WHERE User.user_id = ? AND Task.task_id = ?;
    `;
    const VALUES = [data.user_id, data.task_id]
    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
        VALUES (?, ?, ?, ?);
    `;
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.getTaskPoints = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT User.*, TaskProgress.*, Task.*
        FROM TaskProgress
        JOIN User ON TaskProgress.user_id = User.user_id
        JOIN Task ON TaskProgress.task_id = Task.task_id
        WHERE User.user_id = ? AND Task.task_id = ?
    `;
    const VALUES = [data.user_id, data.task_id]
    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.insertIntoTaskPoints = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO TaskPoints (user_id, totalPoints)
        VALUES (?, ?)
    `;
    const VALUES = [data.user_id, data.totalPoints];
    pool.query(SQLSTATEMENT, VALUES, callback)
};

module.exports.selectById = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM TaskProgress
        WHERE progress_id = ?;
        `;
    const VALUES = [data.progress_id];
    pool.query(SQLSTATEMENT, VALUES, callback); 
    
}

module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE TaskProgress
        SET notes = ?
        WHERE progress_id = ?;
    `;
    const VALUES = [data.notes, data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};


module.exports.deleteById = (data, callback) =>
{
    const SQLSTATEMENT = `
        DELETE FROM TaskProgress
        WHERE progress_id = ?;
        ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.progress_id]; 

    pool.query(SQLSTATEMENT, VALUES, callback);
}



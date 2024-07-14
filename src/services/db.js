require('dotenv').config(); //read .env file and set environment variables

const mysql = require('mysql2'); //This line imports the mysql2 library
const setting = {
    connectionLimit : 10, //set limit to 10 connection
    host     : process.env.DB_HOST, //get host from environment variable
    user     : process.env.DB_USER, //get user from environment variable
    password : process.env.DB_PASSWORD, //get password from environment variable
    database : process.env.DB_DATABASE, //get database from environment variable
    multipleStatements: true, //allow multiple sql statements
    dateStrings: true //return date as string instead of Date object
}

const pool = mysql.createPool(setting);
//This line creates a MySQL connection pool using the configuration settings defined above. 
module.exports = pool;
//This exports the created MySQL connection pool (pool) so that it can be imported and used in other parts of your application.
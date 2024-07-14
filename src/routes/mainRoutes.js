const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const taskProgressRoutes = require('./taskProgressRoutes');
const playerRoutes = require('./playerRoutes');
const magicalItemsRoutes = require('./magicalItemsRoutes');
const messageRoutes = require("./messageRoutes")
//registration or login//
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const bcryptMiddleware = require('../middlewares/bcryptMiddleware')
router.post("/login",userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameAndEmailDuplicate, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
///////////////////////////////////////
router.use("/users", userRoutes);
router.use("/message", messageRoutes)
router.use("/tasks", taskRoutes);
router.use("/task_progress", taskProgressRoutes);
router.use("/player", playerRoutes)
router.use("/magicalItems", magicalItemsRoutes)
module.exports = router; //This line exports the configured router so that it can be used in other parts of the application.


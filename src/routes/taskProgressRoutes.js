const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskProgressController')

router.get('/', controller.readAllTaskProgress);
router.post('/', controller.checkUsernameOrTaskId, controller.createNewTaskProgress, controller.getTaskPoints);
router.get('/:id', controller.readTaskProgressById);
router.put('/:id', controller.retrieveTaskProgressById, controller.updateTaskProgressById);
router.delete('/:id', controller.deleteTaskProgressById);

module.exports = router;
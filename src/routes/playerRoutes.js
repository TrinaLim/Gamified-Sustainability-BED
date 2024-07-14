const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController')

router.get('/:user_id/inventory', controller.checkUserId, controller.readAllInventory);
router.get('/quests', controller.readAllQuests);
router.get('/:user_id/taskPoints', controller.getAllTaskPoints)
router.get('/:user_id/inventory/:id', controller.checkUserId, controller.readPetByInventoryId);

router.post('/:user_id/quests/:quest_id/complete', controller.checkUserId, controller.checkRequirements, controller.completeQuestsById);

router.put('/:user_id/:inventory_id/updateHealthStatus', controller.checkUserId, controller.updatePetHealthStatus);

router.delete('/:user_id/inventory/:inventory_id', controller.checkUserId, controller.deleteInventoryItemById);

module.exports = router;
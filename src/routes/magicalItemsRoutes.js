const express = require('express');
const router = express.Router();
const controller = require('../controllers/magicalItemsController')


router.get('/', controller.readAllMagicalItems);
router.post('/:user_id/:magicalItems_id', controller.getAllTaskPoints, controller.getMagicalItemPoints, controller.buyMagicalItemsById);

module.exports = router;
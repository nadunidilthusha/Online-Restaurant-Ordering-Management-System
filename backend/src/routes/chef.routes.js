const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chef.controller');

router.post('/', chefController.createChef);
router.get('/', chefController.getAllChefs);
router.get('/:id', chefController.getChefById);
router.put('/:id', chefController.updateChef);
router.delete('/:id', chefController.deleteChef);

module.exports = router;
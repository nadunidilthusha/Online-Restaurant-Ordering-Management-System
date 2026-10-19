import express from 'express';
import * as chefController from '../controllers/chef.controller.js';

const router = express.Router();

router.post('/', chefController.createChef);
router.get('/', chefController.getAllChefs);
router.get('/:id', chefController.getChefById);
router.put('/:id', chefController.updateChef);
router.delete('/:id', chefController.deleteChef);

export default router;
import express from 'express';
import * as chefController from '../controllers/chef.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { chefSchema } from '../validators/chef.schema.js';

const router = express.Router();

router.get('/', chefController.getAllChefs);
router.get('/:id', chefController.getChefById);

// Apply validation specifically to POST and PUT routes
router.post('/', requireAdmin, validate(chefSchema), chefController.createChef);
router.put('/:id', requireAdmin, validate(chefSchema), chefController.updateChef);
router.delete('/:id', requireAdmin, chefController.deleteChef);

export default router;
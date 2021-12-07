import express from 'express';
import RoleController from '../controllers/role.controller.js';

const router = express.Router();

router.get('/', RoleController.listRoles);
router.get('/:title', RoleController.getRoleByTitle);



export default router;

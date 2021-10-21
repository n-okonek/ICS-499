import express from 'express';
import RomController from '../controllers/rom.controller.js';
import RomValidator from '../validatiors/rom.validators.js';
import { check } from 'express-validator';

const router = express.Router();

router.get('/', RomController.listRoms);
router.get('/:romid', RomController.getRomById);
router.post('/', RomValidator.createRom, RomController.createRom);

export default router;
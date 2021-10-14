import RomService from '../services/rom.service.js';
import { validationResult } from 'express-validator';

const listRoms = async(req, res, next) => {
    const roms = await RomService.getAllRoms();

    res.status(200).json(roms);
}

const createRom = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { body } = req;
    const createdRom = await RomService.createRom(body);

    res.status(200).json(createdRom);
}

export default {
    listRoms,
    createRom
}
import RomService from '../services/rom.service.js';
import { validationResult } from 'express-validator';

const listRoms = async(req, res, next) => {
    const roms = await RomService.getAllRoms();

    res.status(200).json(roms);
}

const getRomById = async(req, res, next) => {
    const { romid } = req.params
    const rom = await RomService.getRomById(romid);

    if (!rom) {
        res.status(404).json({
            message: `ROM with id ${romid} not found.`
        })
    }

    res.status(200).json(rom);
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
    getRomById,
    createRom
}
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
    } else {
        res.status(200).json(rom);
    }

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

const deleteRomById = async(req, res, next) => {
    const { romid } = req.params;
    // Could not find rom
    const fetched_rom = await RomService.getRomById(romid);
    
    if (fetched_rom === null) {
        res.status(404).json({ error: `ROM with id ${romid} does not exist. Cannot be deleted.`})
        return;
    }
    
    const deleted_rom = await RomService.deleteRom(romid);
    
    if (deleted_rom === null) {
        res.status(500).json({ error: `Internal server error while deleting ROM with id ${romid}`});
    }

    res.status(200).json(deleted_rom);
}

const updateRom = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { romid } = req.params;
    const { body } = req;

    const fetched_rom = await RomService.getRomById(romid);
    
    if (fetched_rom === null) {
        res.status(404).json({ error: `ROM with id ${romid} does not exist. Cannot be updated.`})
        return;
    }
    
    const updatedRom = await RomService.updateRom(romid, body);
    
    res.status(200).json(updatedRom);
    
}

export default {
    listRoms,
    getRomById,
    createRom,
    deleteRomById,
    updateRom
}
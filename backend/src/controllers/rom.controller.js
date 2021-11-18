import RomService from '../services/rom.service.js';
import UserService from '../services/user.service.js';
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

const associateRomToUser = async(req, res, next) => {
    const {romid, userid} = req.params; 
    
    const rom = await RomService.getRomById(romid);
    const user = await UserService.getUserById(userid);
    
    if (!rom) {
        res.status(403).json({ message: `No rom with id ${romid} exists`});
        return;
    }

    if (!user) {
        res.status(403).json({ message: `No user with id ${userid} exists`});
        return;
    }
    
    try {
        const association = await RomService.associateRom(romid, userid);
        res.status(200).json(association);
        return;
    } catch (error) {
        if ('name' in error && error.name === 'SequelizeUniqueConstraintError') {
            res.status(403).json({ message: 'Association already exists.'});
        } else {
            res.status(500).json({ message: 'Unable to create association.'})
        }
        return;
    }
    
}

export default {
    listRoms,
    getRomById,
    createRom,
    deleteRomById,
    updateRom,
    associateRomToUser
}
import db from '../config/db.js';

const { rom } = db;

const getAllRoms = async() => {
    return await rom.findAll();
}

const getRomById = async romid => {
    return await rom.findByPk(romid);
}

const createRom = async(body) => {
    const data = { name: body.name, romdata: body.romdata }
    return await rom.create(data);
}

const deleteRom = async romid => {
    const fetched_rom = await getRomById(romid);
    
    if (fetched_rom === null) return null;

    return await fetched_rom.destroy({
        where: {
            romid: romid 
        }
    })
}

const updateRom = async(romid, newBodyValues) => {
    const fetched_rom = await getRomById(romid);
    
    if (fetched_rom === null) return null;

    fetched_rom.set(newBodyValues);
    await fetched_rom.save();
    return fetched_rom;
}

export default {
    getAllRoms,
    getRomById,
    createRom,
    deleteRom,
    updateRom
}
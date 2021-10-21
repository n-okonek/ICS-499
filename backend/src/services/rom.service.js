import rom from '../models/rom.js';

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

export default {
    getAllRoms,
    getRomById,
    createRom
}
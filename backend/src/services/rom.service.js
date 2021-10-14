import rom from '../models/rom.js';

const getAllRoms = async() => {
    return await rom.findAll();
}

const createRom = async(body) => {
    const data = { name: body.name, romdata: body.romdata }
    return await rom.create(data);
}

export default {
    getAllRoms,
    createRom
}
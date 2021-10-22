import rom from '../models/rom.js';

// Import all of the models here so that they actually get used and populate the
// database. As other services get written they'll get moved.
import role from '../models/role.js';

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

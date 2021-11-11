import db from '../config/db.js';

const { role } = db;

const getAllRoles = async() => {
    return await role.findAll();
}

const getRoleById = async role_id => {
    return await role.findByPk(role_id);
}

const createRole = async title => {
    return await role.create({ title: title });
}

const deleteRole = async role_id => {
    const oldRole = await role.findByPk(role_id);
    return await oldRole.destroy();
}

export default {
    getAllRoles,
    getRoleById,
    createRole,
    deleteRole
}
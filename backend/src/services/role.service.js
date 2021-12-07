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

const setUpRoles = async() => {
    await role.findOrCreate({
        where: { title: 'User'}
    });
    await role.findOrCreate({
        where: { title: 'Admin'}
    });
    await role.findOrCreate({
        where: { title: 'Banned'}
    });
    await role.findOrCreate({
        where: { title: 'Warned'}
    });
    return;
}

const getRoleByTitle = async title => {
    await setUpRoles();
    return await role.findOne({
        where: {
            title: title
        }
    })
}

const existingRole = async body => {
    return null !== await getRoleByTitle(body.title);
}

export default {
    getAllRoles,
    getRoleById,
    createRole,
    deleteRole,
    setUpRoles,
    getRoleByTitle,
    existingRole
}
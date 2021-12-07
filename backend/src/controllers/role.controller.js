import RoleService from '../services/role.service.js';

const listRoles = async(req, res, next) => {
    const roles = await RoleService.getAllRoles();

    res.status(200).json(roles);
}
const getRoleByTitle = async(req, res, next) => {
    const { title } = req.params
    const role = await RoleService.getRoleByTitle(title);

    if (!role) {
        res.status(404).json({
            message: `Role with title ${title} not found.`
        })
    } else {
        res.status(200).json(role);
    }
}

const getRoleByID = async(req, res, next) => {
    const { role_id } = req.params
    const role = await RoleService.getRoleById(role_id);

    if (!role) {
        res.status(404).json({
            message: `Role with id ${role_id} not found.`
        })
    } else {
        res.status(200).json(role);
    }
}

export default {
    listRoles,
    getRoleByTitle,
    getRoleByID
}
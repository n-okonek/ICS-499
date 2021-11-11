import UserService from '../services/user.service.js';
import { validationResult } from 'express-validator';

const signup = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { body } = req;
    
    const existingAccount = await UserService.existingAccount(body);
    
    if (existingAccount) {
        return res.status(422).json({ error: `A user account with that email already exists.`})
    }

    const user = await UserService.signup(body);
    
    if (user === null) {
        return res.status(422).json({ error: "User signup failed."});
    }
    
    return res.status(200).send();
}

const login = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { body } = req;
    const login_session = await UserService.login(body);
    
    if (login_session === null) {
        return res.status(422).json({ message: "Invalid email or password"});
    }

    return res.status(200).json(login_session);
}

const getAllUsers = async(req, res, next) => {
    const users = await UserService.getAllUsers();

    res.status(200).json(users);
}

const updateUserRole = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { role_id } = req.params;
    const { body } = req;

    const existingRole = await RoleService.getRoleById(role_id);
    
    if (existingRole === null) {
        res.status(404).json({ error: `Role with id ${role_id} does not exist. Cannot update user.`})
        return;
    }
    
    const updatedUser = await UserService.updateUserRole(body, role_id);

    if (existingRole === null) {
        res.status(404).json({ error: `Invalid User id. Cannot update user.`})
        return;
    }
    
    res.status(200).json(updatedRom);
}

export default {
    signup,
    login,
    getAllUsers,
    updateUserRole
}
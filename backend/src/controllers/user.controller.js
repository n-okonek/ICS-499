import UserService from '../services/user.service.js';
import RoleService from '../services/role.service.js';
import { validationResult } from 'express-validator';

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { body } = req;

    const existingAccount = await UserService.existingAccount(body);

    if (existingAccount) {
        return res.status(422).json({ error: `A user account with that email already exists.` })
    }

    const user = await UserService.signup(body);

    if (user === null) {
        return res.status(422).json({ error: "User signup failed." });
    }

    return res.status(200).send();
}

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { body } = req;
    const login_session = await UserService.login(body);

    if (login_session === null) {
        return res.status(422).json({ message: "Invalid email or password" });
    }

    res.cookie('session', JSON.stringify(login_session));
    return res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Credentials": "true"
    }).send();
}

const logout = async (req, res, next) => {
    if (req.cookies.session) {
        const session = JSON.parse(req.cookies.session);
        if (session !== req.cookies.session) {
            UserService.logout(session);
        }
    }
    return res.clearCookie('session').send();
}

const validateSession = async (req, res, next) => {
    if (!req.cookies.session) {
        // No session cookie is present.
        return next();
    }

    const session = JSON.parse(req.cookies.session);
    if (session === req.cookies.session) {
        // The session cookie isn't properly encoded using JSON format.
        return next();
    }

    const user = await UserService.getUserBySession(session);
    if (!user) {
        // The session in the cookie is invalid.
        return next();
    }

    // Success!
    req.user = user;
    next();
}

const getInfo = async (req, res, next) => {
    if (!req.user) {
        return res.status(200).json({ message: "no user logged in" });
    }

    return res.status(200).json({
        email: req.user.email,
        role: req.user.role_id
    });
}

const getAllUsers = async (req, res, next) => {
    const users = await UserService.getAllUsers();

    res.status(200).json(users);
}

const updateUserRole = async (req, res, next) => {
    const { body } = req;

    const existingRole = await RoleService.getRoleByTitle(body.title);

    if (existingRole === null) {
        res.status(404).json({ error: `Role with title ${ body.title } does not exist. Cannot update user.` })
        return;
    }

    const updatedUser = await UserService.updateUserRole(body.user_id, existingRole.role_id);

    if (updatedUser === null) {
        res.status(404).json({ error: `Invalid User id. Cannot update user.` })
        return;
    }

    res.status(200).json(updatedUser);
}

const getUserRoms = async (req, res, next) => {
    const roms = await UserService.getUserRoms(req.user.user_id);

    res.status(200).json(roms);
}

const changeEmail = async (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({
            message: "no user logged in"
        });
    }

    if (!req.body.email) {
        return res.status(400).json({
            message: "no email was provided"
        });
    }
    req.user.email = req.body.email;
    await req.user.save();
}

const changePassword = async (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({
            message: "no user logged in"
        });
    }

    if (!req.body.password) {
        return res.status(400).json({
            message: "no password was provided"
        });
    }
    req.user.password = req.body.password;
    await req.user.save();
}


export default {
    signup,
    validateSession,
    getInfo,
    login,
    logout,
    updateUserRole,
    getAllUsers,
    changePassword,
    changeEmail,
    getUserRoms
}

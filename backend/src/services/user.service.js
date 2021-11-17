import crypto from 'crypto';

import db from '../config/db.js';
const { user, session } = db;


const getUserByEmail = async email => {
    return await user.findOne({
        where: {
            email: email
        }
    })
}

const getUserBySession = async sessionCookie => {
    // Get the session
    const userSession = await session.findOne({
        where: {
            session_id: sessionCookie.session_id
        }
    });

    // Return false if the session's invalid.
    if (!userSession) {
        return false;
    }

    return await user.findOne({
        where: {
            user_id: userSession.user_id
        }
    });
}

const existingAccount = async body => {
    return null !== await getUserByEmail(body.email);
}

const signup = async body => {
    const {email, password} = body;
    
    const sha = crypto.createHash('sha256');
    sha.update(password);
    const hashed_password = sha.digest('hex');
    
    const created_user = await user.create({
        email,
        password: hashed_password
    });
    
    return created_user;
}

const verifyCredentials = async (email, password) => {
    const sha = crypto.createHash('sha256');
    sha.update(password);
    const hashed_password = sha.digest('hex');

    const user = await getUserByEmail(email);

    // Email does not belong to a valid user
    if (user === null) {
        return null;
    }
    
    if (user.password !== hashed_password) {
        return null;
    }
    
    return user;
}

const getSessionElseCreate = async user_id => {
    const existingSession = await session.findOne({
        where: {
            user_id
        }
    });
    
    if (existingSession) {
        return existingSession;
    }
    
    // create a new session id
    const new_session_id = Date.now().toString();

    return await session.create({
        session_id: new_session_id,
        user_id
    })
}

const login = async body => {
    const {email, password} = body;

    const verifiedUser = await verifyCredentials(email, password);

    // Verification failed. Email or password is wrong
    if (verifiedUser === null) {
        return null;
    }
    
    // Get an active session or create one. Send the session object to caller
    return await getSessionElseCreate(verifiedUser.user_id);
    
}

const getAllUsers = async() => {
    return await user.findAll();
}

const updateUserRole = async(user_id, newRoleId) => {
    const userToUpdate = await user.findByPk(user_id);

    if(userToUpdate === null) return null;

    userToUpdate.role_id = newRoleId;
    await userToUpdate.save();
    return userToUpdate;
}

export default {
    signup,
    login,
    getUserByEmail,
    getUserBySession,
    existingAccount,
    getAllUsers,
    updateUserRole
}

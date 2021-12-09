import express from 'express';
import UserController from '../controllers/user.controller.js';
import UserValidator from '../validatiors/user.validators.js';

const router = express.Router();

router.post('/signup', UserValidator.signup, UserController.signup);
router.post('/login', UserValidator.login, UserController.login);
router.post('/logout', UserController.logout);
router.get('/info', UserController.getInfo);
router.get('/', UserController.getAllUsers);
router.get('/roms', UserController.getUserRoms);
router.post('/change-role', UserController.updateUserRole);
router.post('/change-email', UserController.changeEmail);
router.post('/change-password', UserController.changePassword);

export default router;

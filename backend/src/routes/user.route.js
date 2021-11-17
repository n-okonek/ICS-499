import express from 'express';
import UserController from '../controllers/user.controller.js';
import UserValidator from '../validatiors/user.validators.js';

const router = express.Router();

router.post('/signup', UserValidator.signup, UserController.signup);
router.post('/login', UserValidator.login, UserController.login);
router.get('/info', UserController.getInfo);

export default router;

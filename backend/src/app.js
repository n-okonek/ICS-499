import './config/environment.js';
import express from 'express';
import logger from 'morgan'
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import UserController from './controllers/user.controller.js';
//Routers
import RomRouter from './routes/rom.route.js';
import UserRouter from './routes/user.route.js';
import RoleRouter from './routes/role.route.js';

const app = express();

const corsOptions = {
	origin: process.env.CORS_ORIGIN,
	credentials: true,
	optionsSuccessStatus: 200
}

//app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(bodyParser.json({limit: '5mb'}));

// Always 'req.user' to the currently logged in user.
app.use(UserController.validateSession);

// Add routes to express instance
app.use('/rom', RomRouter);
app.use('/user', UserRouter);
app.use('/role', RoleRouter);

// 404. This should always be the last route.
app.use((req, res, next) => {
    res.status(404).json({
        message: "Invalid route"
    });
});
const port = process.env.PORT || 9002;
const server = app.listen(port, () => {
    console.debug(`Server listening on port ${port}`);
})

export { app, server }

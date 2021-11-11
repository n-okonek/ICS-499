import './config/environment.js';
import express from 'express';
import logger from 'morgan'
import cookieParser from 'cookie-parser';
//Routers
import RomRouter from './routes/rom.routes.js';
import UserRouter from './routes/user.route.js';

const app = express();

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());


// Add routes to express instance
app.use('/rom', RomRouter);
app.use('/user', UserRouter);

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

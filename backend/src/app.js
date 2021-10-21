import './config/environment.js';
import express from 'express';
import logger from 'morgan'
//Routers
import RomRouter from './routes/rom.routes.js';
import { createRomHashTrigger } from './config/dbtriggers.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Initialize DB connection 
import db from './config/db.js';

if (process.env.DBSYNC === '1') {
    console.log('Force syncing models into database.')
    db.sync({ force: true }).then(() => {
        createRomHashTrigger();
    });
}

// Add routes to express instance
app.use('/rom', RomRouter);

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
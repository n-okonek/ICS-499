require('./config/environment');
const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Connect to MySQL Database Here

// Add routes to express instance

// 404. This should always be the last route.
app.use((req, res, next) => {
    res.status(404).json({
        message: "Invalid route"
    });
});

const port = process.env.PORT || 9002;
app.listen(port, () => {
    console.debug(`Server listening on port ${port}`);
})
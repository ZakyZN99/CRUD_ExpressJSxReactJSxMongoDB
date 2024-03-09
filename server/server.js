const express = require('express');
require('./config/mongoose');
const logger = require('morgan');
const path = require('path');
// const bodyParser = require('body-parser');
const itemsRouter = require('./api/routes');
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));
// Routes
// app.use(bodyParser.json());
app.use('/api', itemsRouter);
app.use((req, res, next)=> {
    res.status(404);
    res.send({
        status: "Gagal",
        message: 'Resource' +req.originalUrl+'Not Found'
    })
})

// Start server
app.listen(3000, () => console.log(`Server running on port ${3000}`));
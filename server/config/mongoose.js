const mongoose = require('mongoose');

mongoose.connect('mongodb://ZakyZN1:123456@localhost:27017/productMongoose?authSource=admin');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', ()=>console.log('server db connected'));
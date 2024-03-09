const mongoose = require('mongoose');

const productScheme = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Field nama tidak boleh kosong'],
        minlength: 3,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: true,
        min: 1000,
        max: 1000000000
    },
    stock: Number,
    status: {
        type: Boolean
    },
    image_url: {
        type: String
    }
});

const Product = mongoose.model('Products', productScheme);
module.exports = Product;
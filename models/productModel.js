let mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    proId: {
        type: Number,
        required: true,
    },
    proName: {
        type: String,
        required: true,
    },
    proBrand: {
        type: String,
        required: true,
    },
    proStock: {
        type: Number,
        required: true,
    },
    proImage: {
        type: String,
        required: true,
    },
    proPrice: {
        type: Number,
        required: true,
    },
    proDescription: {
        type: String,
        required: true,
    },
    proReviews: {
        type:[],
        required: false,
    }
},{timestamps: true});

const productModel = mongoose.model('product',productSchema) 

module.exports = productModel;

const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: String,
    description: String,
    price: String,
    category: String,
    image:
    {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);

//The Product model is very simple. 

//Mongoose uses this option to automatically add two new fields - createdAt and updatedAt to the schema.
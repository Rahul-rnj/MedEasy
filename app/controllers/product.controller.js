

var fs = require('fs');
var path = require('path');
var constant = require('../constants/contant.js');
const Product = require('../models/product.model.js');



// image uploading



//



// Create and Save a new Product
exports.create = (req, res, next) => {
    // Validate request
    console.log("inside creates")
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.body.price);
    console.log(req.body.category);

    console.log(constant.UPLOAD_PROD_IMG_DIR)

    //TODO validate request body
    // if (!req.body.title) {
    //     return res.status(400).send({
    //         message: "Product title can not be empty"
    //     });
    // }

    // Create a Product

    var obj = {
        title: req.body.title ,
        description: req.body.description || "No descrition",
        price: req.body.price,
        category: req.body.category,
        image: {
            data: fs.readFileSync(path.join(constant.UPLOAD_PROD_IMG_DIR +'/'+ req.file.filename)),
            contentType: 'image/png'
        }
    }
    Product.create(obj)
       .then(_ => {
                res.status(201).send('Product saved successfully.');
            }).catch(err => {
                res.send(500).send({
                    message: err.message || "Something went wrong!"
                });
            });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong!"
            });
        });

};

// // Find a single product with a product id
exports.findOne = (req, res) => {

    Product.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Error while retrieving products!"
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    //TODO validate request body
    //Validate Request
    // if (!req.body.title) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }

    // Find product and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        title: req.body.title ,
        description: req.body.description || "No descrition",
        price: req.body.price,
        category: req.body.category
    }, { new: true }) //The {new: true} option in the findByIdAndUpdate() method is used to return the modified document to the then() function instead of the original.
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                })
            }

            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Error while updating product!"
            });
        })

};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send({
                message: "Product deleted successfully"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Could not delete note! "
            });
        });
};


var multer = require('multer');
var constant = require('../constants/contant.js');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, constant.UPLOAD_PROD_IMG_DIR)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

module.exports = (app) =>{
    const products = require('../controllers/product.controller.js');

    //Create a new Product

    app.post('/products',  upload.single('image'), products.create);

    //Retrieve all Products
    app.get('/products', products.findAll);

    // Retrieve a single Product with ProductId
    app.get('/products/:productId', products.findOne);

    // Update a Product with ProductId
    app.put('/products/:productId', products.update);

    // Delete a Product with ProductId
    app.delete('/products/:productId', products.delete);
}
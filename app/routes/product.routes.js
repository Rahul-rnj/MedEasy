module.exports = (app) =>{
    const products = require('../controllers/product.controller.js');

    //Create a new Product

    app.post('/products', products.create);

    //Retrieve all Products
    app.get('/products', products.findAll);

    // Retrieve a single Product with ProductId
    app.get('/products/:productId', products.findOne);

    // Update a Product with ProductId
    app.put('/products/:productId', products.update);

    // Delete a Product with ProductId
    app.delete('/products/:productId', products.delete);
}
module.exports = (app) =>{
    const users = require('../controllers/user.controller.js');

    //Create a new USer

    app.post('/users', users.create);

    // Retrieve a single User with UserId
    app.get('/users/:userId', users.findOne);

    // retrieve all users
    app.get('/users', users.findAll);

    // Update a User with UserId
    app.put('/users/:userId', users.update);

    // Delete a User with UserId
    app.delete('/users/:userId', users.delete);
}
var fs = require('fs');
var path = require('path');
const User = require('../models/user.model');


// Create and Save a new User
exports.create = (req, res, next) => {
    // Validate the request body
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send('Name, email, and password are required');
  }

    // Create a User

    var obj = {
        name: req.body.name ,
        email: req.body.email ,
        password: req.body.password,
    }
    User.create(obj)
       .then(_ => {
                res.status(201).send('User saved successfully.');
            }).catch(err => {
                res.send(500).send({
                    message: err.message || "Something went wrong!"
                });
            });

};

// Retrieve and return all user from the database.
exports.findAll = (req, res) => {

    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong!"
            });
        });

};

// Find a user with a userId
exports.findOne = (req, res) => {

    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error while retrieving users!"
            });
        });
};

// Update a user identified by the UserId 
exports.update = (req, res) => {

    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send('Name, email, and password are required');
      }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name ,
        email: req.body.email ,
        password: req.body.password,
    }, { new: true }) //The {new: true} option in the findByIdAndUpdate() method is used to return the modified document to the then() function instead of the original.
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                })
            }

            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error while updating user!"
            });
        })

};

// Delete a useer with the specified userId 
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({
                message: "User deleted successfully"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user! "
            });
        });
};
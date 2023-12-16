const express = require('express');
const bodyParser =require('body-parser');
const cors = require("cors");


// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');



mongoose.Promise = global.Promise;

const app = express(); // create express app


// setting cors policy
app.use(cors());

app.use(bodyParser.urlencoded({extended: false})); // parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.json()); // parse requests of content-type - application/json

// Require products routes
require('./app/routes/product.routes.js')(app);

//require user routes
require('./app/routes/user.routes.js')(app);

//creating simple route for get request
app.get('/', (req, res)=>{
    res.json({
        "Message":"Welcome to Medical Store Managementss Service"
    });
})

// Connecting to the database
mongoose.connect(dbConfig.url,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Connected to db");
    }).catch(err=>{
        console.log(err);
        process.exit();
    })

//listen on port 3000
app.listen(3000, ()=>{
    console.log("Listening on port 3000");
});
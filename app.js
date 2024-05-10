const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const colors = require("colors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();



app.use(cors());
app.use(express.json());
app.use(bodyParser.json());



// import routes
const contactsRoute = require('./v1/Routes/contacts.route');






// declare routes
app.use('/api/v1/contacts', contactsRoute);




app.get("/", (req, res) => {
    try {
        res.send("Welcome to Contact Management Server !");
    } catch (error) {
        console.log(error.message);
    };
});

app.all("*", (req, res) => {
    try {
        res.send("No Routes Found");
    } catch (error) {
        console.log(error.message);
    };
});


app.listen(PORT, () => {
    try {
        console.log(`server is successfully running on port ${PORT}!`.red.bold);
    } catch (error) {
        console.log(error.message);
    };
});

exports = app;
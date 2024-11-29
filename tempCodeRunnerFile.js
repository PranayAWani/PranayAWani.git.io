const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loginDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});

// Create Model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Handle POST request to /submit_form
app.post('/submit_form', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });

    newUser.save((err) => {
        if (err) {
            console.log(err);
            res.send("There was an error saving your data.");
        } else {
            res.redirect('/');
        }
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at mongodb://localhost:27017/`);
});

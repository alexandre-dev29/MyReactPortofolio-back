const express = require("express");

const router = express.Router();
const database = require('mongoose');
require('../Models/Users')


/**GET request for the home page */

router.get("/", (req, res) => {
    // const User = database.model('users');
    // const alexandre = new User({user_firstname: 'alexandre', user_lastname: 'patterson'});
    // alexandre.save().then(() => {
    //     User.find((error, result) => {
    //         res.send(result);
    //     }); 
    // });

    res.send("Ceci est la page d'accueil");
       
});

module.exports = router;

const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');


const isAuthorize = require('../Utils/Auth') 
require('../Models/Users')



const router = express.Router();

/**GET request for the home page */

router.get("/", (req, res) => {
  res.send("Voici la page d'accueil");
});

router.post('/login', (req, res) => {
    const email = req.body.user.user_email;
    const password = req.body.user.user_password;

    const user_model = mongoose.model('users');

    user_model.find({user_email: email}, (err, user) => {
       if(user.length == 1){
           var current_user = user[0];
           var matching = bcrypt.compareSync(password, current_user.user_password);
           if(matching){
              res.send(JSON.stringify({response: "success", message: `welcome to you ${current_user.user_firstname}`}))
           }else{
                res.send(JSON.stringify({response: "error", message: "Your password is invalid"}))
           }
           
       }else{
        res.send(JSON.stringify({response: "error", message: "Your email adress is Not Valid"}))
       }
    });
});
router.get('/user_data', (req, res) => {
    const email = req.body.user.user_email;
    
    const user_model = mongoose.model('users');

    user_model.find(
        {user_email : email}, 
        "user_firstname user_lastname user_nickname user_birth user_description user_titles user_email", 
        (error, user) => {
            if(user.length > 0){
                res.send({response: "success", user_data: user[0]})
            }else{
                res.send({response: "error", message: "There is no data for these information"})
            }
        })
})

/*router.post('/newUser', (req, res) => {
    const user_model = mongoose.model('users');

    const newUser = new user_model({
        user_firstname: "Axel",
        user_lastname: "Mwenze",
        user_nickname: "Alexandre",
        user_birth: "29/08/1995",
        user_description: "I am a web developper",
        user_titles: ["Web developper", "graphique designer"],
        user_email: "axel.business29@gmail.com",
        user_password: bcrypt.hashSync("patterson")
    });
    newUser.save().then((error, result) => {
        res.send(JSON.stringify({
            response: "success",
            message: "The user has been succesfully singup"
        }))
    })
});*/

module.exports = router;

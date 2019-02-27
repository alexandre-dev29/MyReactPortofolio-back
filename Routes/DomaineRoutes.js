const express = require("express");
const mongoose = require('mongoose')

const router = express.Router();
const {returnError, returnSuccess, returnCustom} = require('../Utils/respnseUtils')

require('../Models/Domaines');
require('../Models/Users');

const domaine_model = mongoose.model('domaines');
const user_model = mongoose.model('users');


/**GET request for the home page */

router.get("/", (req, res) => {
  res.send("Voici la page d'accueil");
});


/**
 * @param email adress
 * this method returns all domaines for a given user if he is in the database
 */
router.get('/get_domaines', (req, res) => {
    const email = req.body.user.user_email;

    user_model.find({user_email: email}, (error, result) => {
        if(result.length > 0){
            domaine_model.find((error, all_domaines) => {
                res.send(returnCustom("This is all domaines", all_domaines));
            })
        }else{
           res.send( returnError("Invalid Identification"));
        }
    })
});

/**
 * this method add domaines in the database for a given user
 * @param array of domaines you want to add
 * @returns json object with response and message
 */
router.post('/add_domaines', (req, res) => {
    const email = req.body.user.user_email;
    const domaines = req.body.domaines;

    user_model.find({user_email: email}, "user_id", (error, result) => {
        if(result.length > 0){
            domaines.forEach(currentDomaine => {
                const newDomaine = new domaine_model({
                    domaine_name: currentDomaine.domaine_name,
                    domaine_percent: currentDomaine.domaine_percent,
                    domaine_category: currentDomaine.domaine_category
                });
                newDomaine.save();
            });
            res.send(returnSuccess("All your Domaine has been saved successfully"));
        }else{
            res.send(returnError("Invalid Indentification"));
        }
    })
})

/**
 * this method update domaines in the database for a given user
 * @param array of domaines you want to update
 * @returns json object with response and message
 */
router.put('/update_domaines', (req, res) => {
    const email = req.body.user.user_email;
    const domaines = req.body.domaines;

    user_model.find({user_email: email}, "user_id", (error, result) => {
        if(result.length > 0){
            domaines.forEach(currentDomaine => {
                domaine_model.updateOne(
                    {domaine_id: currentDomaine.domaine_id},
                    {
                        domaine_name: currentDomaine.domaine_name,
                        domaine_percent: currentDomaine.domaine_percent,
                        domaine_category: currentDomaine.domaine_category
                    },
                    (error , retour) => {

                    }
                    )
            });
            res.send(returnSuccess("All Your Domaine has been updated successfully"))
        }else{
            res.send(returnError("Invalid Indentification"));
        }
    })
});
/**
 * this method delete domaines in the database for a given user
 * @param array of domaines you want to delete
 * @returns json object with response and message
 */
router.delete('/delete_domaines', (req, res) => {
    const email = req.body.user.user_email;
    const domaines = req.body.domaines;


    user_model.find({user_email: email}, "user_id", (error, result) => {
        if(result.length > 0){
            domaines.forEach(currentDomaine => {
                domaine_model.deleteOne({domaine_id: currentDomaine.domaine_id},
                    (err) => {
                        if(err){
                            res.send(returnError("there was an error"))
                        }
                    })
            })
            res.send(returnSuccess("All these domaines as been succcessfully deleted"))
        }
    })
});
module.exports = router;

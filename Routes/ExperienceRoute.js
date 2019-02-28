const express = require("express");
const mongoose = require("mongoose")

const router = express.Router();
const {returnError, returnSuccess, returnCustom} = require('../Utils/respnseUtils')

require('../Models/Experiences');
require('../Models/Users');

const experiences_model = mongoose.model('experiences');
const user_model = mongoose.model('users');

/**GET request for the home page */

router.get("/", (req, res) => {
  res.send("Voici la page d'accueil");
});

router.get("/get_experiences", (req, res) => {
  const email = req.body.user.user_email;


  user_model.find({user_email: email}, (error, result) => {
    if (result.length > 0) {
      experiences_model.find((err, all_data) => {
        res.send(returnCustom("This is all experiences", all_data));
      })
    }else{
      res.send(returnError("Invalid identification"));
    }
  })
})

router.post("/add_experiences", (req, res) => {
  const email = req.body.user.user_email;
  const experiences = req.body.experiences;


  user_model.find({user_email: email}, (error, result) => {
    if (result.length > 0) {
      experiences.forEach(currentExp => {
        const newExperience = new experiences_model({
          experience_name: currentExp.experience_name,
          experience_percent: currentExp.experience_percent, 
          experience_category: currentExp.experience_category,
          experience_years: currentExp.experience_years,
          experience_description: currentExp.experience_description
        });
        newExperience.save();
      });
      res.send(returnSuccess("All experiences has been saved successfully"))
    }else{
      res.send(returnError("Invalid identification"));
    }
  })
})

router.put("/update_experiences", (req, res) => {
  const email = req.body.user.user_email;
  const experiences = req.body.experiences;


  user_model.find({user_email: email}, (error, result) => {
    if (result.length > 0) {
      experiences.forEach(currentExp => {
        experiences_model.updateOne({_id: currentExp._id}, 
          {
            experience_name: currentExp.experience_name,
            experience_percent: currentExp.experience_percent, 
            experience_category: currentExp.experience_category,
            experience_years: currentExp.experience_years,
            experience_description: currentExp.experience_description
          },(error, result) => {});
      });
      res.send(returnSuccess("All these experiences has been update successfully"));
    }else{
      res.send(returnError("Invalid identification"));
    }
  })
})

router.delete("/delete_experiences", (req, res) => {
  const email = req.body.user.user_email;
  const experiences = req.body.experiences;

  user_model.find({user_email: email}, (error, result) => {
    if (result.length > 0) {
      experiences.forEach(currentExp => {
        experiences_model.deleteOne({_id: currentExp._id},
          (err) => {
              if(err){
                  res.send(returnError("there was an error"));
              }
          });
      });
      res.send(returnSuccess("All these experiences has been succcessfully deleted"));
    }else{
      res.send(returnError("Invalid identification"));
    }
  })
})
module.exports = router;

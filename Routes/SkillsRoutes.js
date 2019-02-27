const express = require("express");
const mongoose = require("mongoose")

const router = express.Router();
const {returnError, returnSuccess, returnCustom} = require('../Utils/respnseUtils')

require('../Models/Skills');
require('../Models/Users');

const skill_model = mongoose.model('skills');
const user_model = mongoose.model('users');

/**GET request for the home page */

router.get("/", (req, res) => {
  res.send("Voici la page d'accueil");
});

router.get("/get_skills", (req, res) => {
  const email = req.body.user.user_email;

  user_model.find({ user_email: email}, (error, result) => {
    if(result.length > 0){
      skill_model.find((error, all_skills) => {
        res.send(returnCustom("This is all Skills", all_skills));
      })
    }else{
      res.send( returnError("Invalid Identification"));
   }
  })

});

router.post("add_skills", (req, res) => {
  const email = req.body.user.user_email;
  const skills = req.body.skills;

  user_model.find({ user_email: email}, (error, result) => {
    if(result.length > 0){
      skills.forEach(currentSkills => {
        const newSkill = new skill_model({
          skill_name: currentSkills.skill_name,
          skill_percent: currentSkills.skill_percent,
          skill_category: currentSkills.skill_category
        });
        newSkill.save();
      });
      res.send(returnSuccess("Your skills as been saved successfully"));
    }else{
      res.send( returnError("Invalid Identification"));
    }
  })

});

router.put("update_skills", (req, res) => {
  const email = req.body.user.user_email;
  const skills = req.body.skills;

  user_model.find({ user_email: email}, (error, result) => {
    if(result.length > 0){
      skills.forEach(currentSkill => {
        skill_model.updateOne({skill_id: currentSkill.skill_id}, 
          {
            skill_name: currentSkill.skill_name,
            skill_percent: currentSkill.skill_percent,
            skill_category: currentSkill.skill_category
          },
          (error, result) => {});
      });
      res.send(returnSuccess("Skills has been updated succefully"));
    }else{
      res.send( returnError("Invalid Identification"));
    }
  })

});

router.delete("delete_skills", (req, res) => {
  const email = req.body.user.user_email;
  const skills = req.body.skills;

  user_model.find({ user_email: email}, (error, result) => {
    if(result.length > 0){
      skills.forEach(currentSkill => {
        skill_model.deleteOne({skill_id: currentSkill.skill_id},
            (err) => {
                if(err){
                    res.send(returnError("there was an error"))
                }
            })
    })
      res.send(returnSuccess("All these skills has been succcessfully deleted"))
    }else{
      res.send(returnError("Invalid Identification"));
    }
  })
});

module.exports = router;

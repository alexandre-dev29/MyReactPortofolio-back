const express = require("express");
const mongoose = require("mongoose");

const {returnError, returnSuccess, returnCustom} = require('../Utils/respnseUtils')

require('../Models/Works');
require('../Models/Users');

const work_model = mongoose.model('works');
const user_model = mongoose.model('users');

const router = express.Router();

/**GET request for the home page */

router.get("/", (req, res) => {
  res.send("Voici la page d'accueil");
});

router.get("/get_works", (req, res) => {
  const email = req.body.user.user_email;

  user_model.find({user_email: email}, (error, result) => {
    if (result.length > 0) {
      work_model.find((err, all_data) => {
        res.send(returnCustom("This is all Works", all_data));
      })
    }else{
      res.send( returnError("Invalid Identification"));
    }
  })
});

router.post("/add_works", (req, res) => {
  const email = req.body.user.user_email;
  const works = req.body.works;

  user_model.find({user_email: email}, (error, result) => {
    if (result.length > 0) {
      works.forEach(currentWork => {
        const newWork = new work_model({
          work_title: currentWork.work_title,
          work_description: currentWork.work_description,
          work_category: currentWork.work_category,
          work_year: currentWork.work_year,
          work_client: currentWork.work_client,
          work_images: currentWork.work_images,
          work_cover: currentWork.work_cover
        });
        newWork.save();
      });
      res.send(returnSuccess("Your work has been saved successfully"));
    }else{
      res.send( returnError("Invalid Identification"));
    }
  });
});

router.put("/update_works", (req, res) => {
  const email = req.body.user.user_email;
  const works = req.body.works;

  user_model.find({user_email: email}, (error, result) => {
    if (result.length > 0) {
      works.forEach(currentWork => {
        work_model.updateOne({_id: currentWork._id}, 
          {
            work_title: currentWork.work_title,
            work_category: currentWork.work_category,
            work_images: currentWork.work_images,
            work_client: currentWork.work_client,
            work_description: currentWork.work_description,
            work_cover: currentWork.work_cover,
            work_year: currentWork.work_year
          },  (error, result) => {}) 
      });
      res.send(returnSuccess("Works has been updated succefully"));
    }else{
      res.send( returnError("Invalid Identification"));
    }
  })
});

router.put("/delete_works", (req, res) => {
  const email = req.body.user.user_email;
  const works = req.body.works;

  user_model.find({user_email: email}, (error, result) => {
    if (result.length > 0) {
      works.forEach(currentWork => {
        work_model.deleteOne({_id: currentWork._id},
            (err) => {
                if(err){
                    res.send(returnError("there was an error"))
                }
            })
     });
     res.send(returnSuccess("All these works has been succcessfully deleted"))
    }else{
      res.send( returnError("Invalid Identification"));
    }
  })
});



module.exports = router;

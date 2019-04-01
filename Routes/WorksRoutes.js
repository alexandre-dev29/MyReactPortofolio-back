const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");


const {returnError, returnSuccess, returnCustom} = require('../Utils/respnseUtils')

require('../Models/Works');
require('../Models/Users');

const work_model = mongoose.model('works');
const user_model = mongoose.model('users');

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})
const uploadpath = multer({storage: storage});

const router = express.Router();

/**GET request for the home page */

router.get("/", (req, res) => {
  res.send("Voici la page d'accueil");
});

router.get("/get_works", (req, res) => {
  const email = req.query.user_email;
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

router.post("/add_works", uploadpath.single("work_image"), (req, res) => {
  const email = req.body.user_email;
  const works = req.body;
  const filepath = req.file;

  user_model.find({user_email: email}, (error, result) => {
    if (result.length > 0) {
      const newWork = new work_model({
          work_title: works.work_title,
          work_category: works.work_category,
          work_year: works.work_year,
          work_client: works.work_client,
          work_images: "images/"+filepath.filename,
          work_lightdesc: works.work_lightdesc,
          work_link: works.work_link,
          work_description: works.work_description
      });
      newWork.save();
      res.send( returnSuccess("This work has been saved successfully"));
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

router.delete("/delete_works", (req, res) => {
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

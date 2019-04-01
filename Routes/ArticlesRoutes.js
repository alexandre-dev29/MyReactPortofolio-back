const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");


const {returnError, returnSuccess, returnCustom} = require('../Utils/respnseUtils');

require('../Models/Articles');
require('../Models/Users');

const articles_model = mongoose.model('articles');
const user_model = mongoose.model('users');

const storage = multer.diskStorage({
    destination: 'public/images',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
});

const uploadpath = multer({storage: storage});

const router = express.Router();

/**GET request for the home page */

router.get("/", (req, res) => {
    res.send("Voici la page d'accueil");
});

router.get("/get_articles", (req, res) => {
    const email = req.query.user_email;
    user_model.find({user_email: email}, (error, result) => {
        if (result.length > 0) {
            articles_model.find((err, all_data) => {
                res.send(returnCustom("This is all Articles", all_data));
            })
        }else{
            res.send( returnError("Invalid Identification"));
        }
    })
});

router.post("/add_article", uploadpath.single("article_image"), (req, res) => {
    const email = req.body.user_email;
    const article = req.body;
    const filepath = req.file;

    user_model.find({user_email: email}, (error, result) => {
        if (result.length > 0) {
            const newArticle = new articles_model({
                article_title: article.article_title,
                article_image: "images/"+filepath.filename,
                article_link: article.article_link,
                article_description: article.article_description
            });
            newArticle.save();
            res.send( returnSuccess("This article has been saved successfully"));
        }else{
            res.send( returnError("Invalid Identification"));
        }
    });
});

router.put("/update_article", (req, res) => {
    const email = req.body.user.user_email;
    const articles = req.body.articles;

    user_model.find({user_email: email}, (error, result) => {
        if (result.length > 0) {
            articles.forEach(currentarticle => {
                articles_model.updateOne({_id: currentarticle._id},
                    {
                        article_title: currentarticle.article_title,
                        article_image: currentarticle.article_image,
                        article_description: currentarticle.article_description,
                        article_link: currentarticle.article_link
                    },  (error, result) => {})
            });
            res.send(returnSuccess("This Article has been updated successfully"));
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

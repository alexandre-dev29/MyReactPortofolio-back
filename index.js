const express = require("express");
const PORT = process.env.PORT || 5002;
const url =process.env.MONGODB_URI ||"mongodb://localhost:27017/portofolio_data";
const fs = require('fs');
const app = express();//creating the express variable
const mongoose = require('mongoose');

//loading authorization check
const isAuthorize = require("./Auth/Auth");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, api_key");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    next();
});

mongoose.connect(url, {useNewUrlParser : true});

//loading all the routes
const userRoute = require("./Routes/UserRoute");
const skillsRoute = require("./Routes/SkillsRoutes");
const worksRoutes = require("./Routes/WorksRoutes");
const mainRoutes = require("./Routes/mainRoute");
const experienceRoutes = require("./Routes/ExperienceRoute");
const domaineRoutes = require("./Routes/DomaineRoutes");

      

app.use("/",mainRoutes);
app.use("/user", isAuthorize,userRoute);
app.use("/works", isAuthorize,worksRoutes);
app.use("/skills", isAuthorize,skillsRoute);
app.use("/experiences", isAuthorize,experienceRoutes);
app.use("/domaines", isAuthorize,domaineRoutes);
app.use('/static', express.static('public'));


app.listen(PORT, () => console.log("listening on port " + PORT));

const express = require("express");
const PORT = process.env.PORT || 5002;
const  MongoClient = require('mongodb').MongoClient;
const url =process.env.MONGODB_URI ||"mongodb://localhost:27017/mydb";


const app = express();

//loading all the routes
//const homeroute = require("./routes/index");

//loading authorization check
//const isAuthorize = require("./Utils/Auth");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, key_auth");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    next();
});
      

app.use("/", homeroute);
//app.use("/login", isAuthorize, Login);

app.listen(PORT, () => console.log("listening on port " + PORT));

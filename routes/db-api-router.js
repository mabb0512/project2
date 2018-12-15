var express = require("express");
var router = express.Router();
var db = require('../models/model');

router.get("/api/users", function(req, res) {

    db.User.findAll({}).then(function(dbUsers) {
        res.json(dbUsers);
    });
});

router.get("/api/usersCategories", function(req, res) {

    db.User.findAll({
        include: [{
            model: db.Category
        }]
    }).then(function(dbUsers) {
        res.json(dbUsers);
    });
});

router.get("/api/usersCountries", function(req, res) {

    db.User.findAll({
        include: [{
            model: db.Country
        }]
    }).then(function(dbUsers) {
        res.json(dbUsers);
    });
});

router.get("/api/categories", function(req, res) {

    db.Category.findAll({}).then(function(dbCategories) {
      res.json(dbCategories);
    });
});

router.get("/api/countries", function(req, res) {

    db.Country.findAll({}).then(function(dbCountries) {
      res.json(dbCountries);
    });
});

router.post("/api/addUser", function(req, res) {

    //has to be modified depending on front end form.
    var user = req.body;
    // var user = {
    //     email: "test2@test.com",
    //     age: 25,
    //     gender: 'M'
    // }

    db.User.create(user).then(function (dbUser) {

        res.json("User added succesfully with id " + dbUser.id);

    }).catch (function(error) {
    
        if (error.toString().indexOf("SequelizeUniqueConstraintError") != -1){
            res.json('The email has already been used. Please try another one');
        }

        else {
            res.json('There was an error adding the user: ' + error);
        }
    });
});

router.post

module.exports = router;
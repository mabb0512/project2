var express = require("express");
var router = express.Router();
var db = require('../models/model');

router.get("/api/usersOnly", function(req, res) {

    db.User.findAll({}).then(function(dbUsers) {
        res.json(dbUsers);
    });
});

router.get("/api/users", function(req, res) {

    db.User.findAll({
        include: [
            {
                model: db.Category
            },
            {
                model: db.Country
            }
        ]
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

    console.log(req.body);

    //has to be modified depending on front end form.
    //var user = req.body.user;
    var category = req.body.category;
    var country = req.body.country;
    var categoryRanking = req.body.ranking;
    var dbUsers = [];

    //for testing purposes only
    var user = {
        email: req.body.email,
        age: req.body.age,
        gender: req.body.age
    };
    var category = 'health';
    var categoryRanking = 4;
    var country = 'United States';

    db.User.create(user).then(function (dbUser) {

        dbUsers.push(dbUser.id);

    }).catch (function(error) {
    
        if (error.toString().indexOf("SequelizeUniqueConstraintError") != -1){
            res.json('The email has already been used. Please try another one');
        }

        else {
            res.json('There was an error adding the user: ' + error);
        }
    }).then(function(){

        db.Category.findOne({ 
            where: {category_name: category} 
        }).then(function(category){

            db.UserCategory.create({

                category_ranking: categoryRanking,
                UserId: dbUsers[0],
                CategoryId: category.id

            })
        })
    }).then(function() {

        db.Country.findOne({
            where: {country_name: country}
        }).then(function(country){

            db.UserCountry.create({

                UserId: dbUsers[0],
                CountryId: country.id
            });
        }).then(function(result){
            res.json("User added succesfully with id " + dbUsers[0]);
        });
    });;
});

router.get("/api/userById/:id", function(req, res) {

    var userid = req.params.id;
    
    db.User.findAll({
        where: {
            id: userid
        },
        include: [
            {
                model: db.Category
            },
            {
                model: db.Country
            }
        ]
    }).then(function(dbUsers) {
        res.json(dbUsers);
    });

});

router.get("/api/userByEmail/:email", function(req, res) {

    var email = req.params.email;
    
    db.User.findAll({
        where: {
            email: email
        },
        include: [
            {
                model: db.Category
            },
            {
                model: db.Country
            }
        ]
    }).then(function(dbUsers) {
        res.json(dbUsers);
    });

});

router.get("/api/randomUsers", function (req, res) {

    function getGender () {

        var gender = Math.floor(Math.random() * 2);
        
        if (gender == 0)
            return 'F';

        else 
            return 'M';
    }
    
    function getAge () {
    
        var age = Math.floor(Math.random() * (56 - 16)) + 16;
        return age;
    }
    
    function getCategory () {
    
        var categoryId = Math.floor(Math.random() * 5) + 1;
        return categoryId;
    }
    
    function getCountry() {
    
        var countryId = Math.floor(Math.random() * 10) + 1;
        return countryId
    }
    
    function getRanking () {
    
        var ranking = Math.floor(Math.random() * 5) + 1;
        return ranking;
    }

    var prefix = 'user';
    var domain = '@testdomain.com';
    var maxUsers = 31;

    for (var i = 1; i < maxUsers; i++) {

       var user = {
           email: prefix+i+domain,
           age: getAge(),
           gender: getGender()
       }
       
       db.User.create(user).then(function (dbUser) {

            var categoryId = getCategory();
            var categoryRanking = getRanking();
            var countryId = getCountry();

           db.UserCategory.create({

                category_ranking: categoryRanking,
                UserId: dbUser.id,
                CategoryId: categoryId
            });

            db.UserCountry.create({

                UserId: dbUser.id,
                CountryId: countryId
            });
        }).then(function () {
            res.json ("user " + i + " created succesfully");
        });
    }
})

module.exports = router;
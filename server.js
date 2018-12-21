// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
// var politicsUrl= "https://newsapi.org/v2/everything?q=politics&apiKey=c774e4cd5e214a22b0ed485d8fd28386" 
// app.get('/', function(req, res) {
        
//         res.render('pages/index', {
//             politicsResponse: politicsResponse,
            
//     res.render('pages/index');
//  });
// });


// politics page
var politicsUrl= "https://newsapi.org/v2/everything?q=politics&apiKey=c774e4cd5e214a22b0ed485d8fd28386"
var request = require('request');
app.get('/politics', function(req, res) {
    var politicsresponse = [
        app.get('/politics', function(req, res) {
            request(politicsUrl, function(error, response, body) {
              const info = JSON.parse(body);
              res.render('pages/politics', { info }); 
            });
        })
      ];
       
    res.render('pages/politics' , {
        politicsresponse: politicsresponse
    });
});





// Requiring our models for syncing
// var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

//Routes
require("./routes/router.js")(app);
var router = require("./routes/db-api-router.js")
app.use(router);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// Syncing our sequelize models and then starting our express app
// db.sequelize.sync({ force: true }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });

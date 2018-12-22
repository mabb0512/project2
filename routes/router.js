module.exports =  function(app) {

    app.get('/', function(req, res) {
        res.render('pages/index');
    });

    app.get('/about', function(req, res) {
        res.render('pages/about');
    })

    app.get('/sports', function(req, res) {
        res.render('pages/sports');
    })

    app.get('/entertainment', function(req, res) {
        res.render('pages/entertainment');
    })

    app.get('/science', function(req, res) {
        res.render('pages/science');
    })

    app.get('/technology', function(req, res) {
        res.render('pages/technology');
    })
};
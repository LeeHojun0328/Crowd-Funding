var express = require('express');
var router = express.Router();
var deploy = require('../../deploy.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("route for / is called in index.js");
	res.render('index');
	//res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
	console.log('route for /about is called in index.js');
    res.render('about');
});

router.get('/funding', function(req, res, next) {
    console.log('route for /funding is called in index.js');
    res.render('funding');
});

router.get('/funding/fundingProject', function(req, res, next) {
    console.log('route for /funding/fundingProejct is called in fundingProject.js');
    res.render('fundingProject');
});

/* Respond post requests. */
router.route('/deploy').post(require('./deploy.js'));

router.route('/checkGoal').post(require('./checkGoal.js'));

module.exports = router;



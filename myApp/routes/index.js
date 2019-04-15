var express = require('express');
var router = express.Router();
var deploy = require('../../deploy.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("router.get('/',...) is called in /router/index.js");
	res.render('index');
	//res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
    res.render('about');
});

router.get('/funding', function(req, res, next) {
    res.render('funding');
});
router.get('/fundingProject', function(req, res, next) {
    res.render('fundingProject');
});

/*
router.get('/deploy', function(req,res){
	console.log('First middleware is called in route("/deploy")');
    deploy.deployContract(function(addr){
        res.send(addr);
    });
    console.log("deploying.. ");	
});
*/

var deploy = require('../../deploy.js');
router.route('/deploy')
.post( function(req, res ) {
	deploy.deployInvestor(0,function(addr){
		res.send(addr);
	});
	console.log("Deploying an investor contract in route.");
});

var goalBalance = require('../../goalBalance.js');
//var goalDate = require('../../goalDate.js');
var balance = require('../../getBalance.js');
var r = "목표 금액은 ";
router.route('/checkGoal')
.post( function(req, res ) {
	goalBalance.goalBalance(req.body.address,function(r1){
		r = r+r1+"입니다.";
		res.send(r);
	});
});

module.exports = router;





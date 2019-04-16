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
	console.log("deploy route is called.");
	deploy.deployInvestor(0,function(addr){
		res.send(addr);
	});
	console.log("Deploying an investor contract in route.");
});

/*
var goalBalance = require('../../goalBalance.js');
//var goalDate = require('../../goalDate.js');
var balance = require('../../getBalance.js');
var r = "목표 금액은 ";  // 사용 후 초기화 필요
router.post('/checkGoal', function(req,res){
//router.route('/checkGoal')
//.post( function(req, res ) {
	//goalBalance.goalBalance(req.body.address,function(r1){
	//	console.log("goalBalance 내부");
	//	r = r+r1+"입니다.";
	//	res.send(r);
	//	return r1;	
	//});
	res.send(r);
	//}).then(function(result){
	//	console.log(result);
	//});

	console.log("test value is "+test);
});
*/
module.exports = router;





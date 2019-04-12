var express = require('express');
var router = express.Router();
var deploy = require('../../deploy.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("router.get('/',...) is called in /router/index.js");
	res.render('index', { title: 'Express' });
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


router.route('/deploy')
.post( function(req, res ) {
	deploy.deployInvestor(0,function(addr){
		res.send(addr);
	});
	console.log("Deploying an investor contract in route.");
});


module.exports = router;

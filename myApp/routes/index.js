var express = require('express');
var router = express.Router();
var deploy = require('../../deploy.js');

var express = require('express');
var router = express.Router();

/* mysql connection */
var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'ProjectDB'
});

db.connect();



/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("route for / is called in index.js");
	res.render('index');
	//res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
    console.log('route for /login is called in index.js');
    res.render('loginPage');
});
router.get('/about', function(req, res, next) {
	console.log('route for /about is called in index.js');
    res.render('about');
});

router.get('/funding', function(req, res, next) {
    console.log('route for /funding is called in index.js');
    res.render('funding');
});

router.get('/register', function(req, res, next) {
    console.log('route for /regiser is called in index.js');
    res.render('register');
});

router.get('/fundingProject', function(req, res, next) {
    console.log('route for /funding/fundingProejct is called in fundingProject.js');
	if(req.session.user){
		//res.json({success: true});
		res.render('fundingProject');
	}else{
	 	//res.json({success: false});
		res.redirect('/login');
	}
});


/* post requests. */
router.route('/deploy').post(require('./deploy.js'));

router.route('/checkGoal').post(require('./checkGoal.js'));

router.route('/loginPost').post(function f (req,res){
	    var paramId = req.body.id;
	    var paramPwd = req.body.pwd;
		db.query('select pwd from user where id =? ;',
            [paramId], function(error,result){
        	if(error){throw error;}
        	console.log('pwd is'+result[0].pwd);

			if(paramPwd == result[0].pwd){	// login success.
				console.log('login success');
				req.session.user={
            		id: paramId,
            		authorized: true
        		};
				res.json({success: true});
			}else{							// login failed.
				console.log('login failed');
				res.json({success: false});
			}
    	});
	}			
);

router.route('/logout').post(function (req,res){
    req.session.destroy(function(err){
        if(err) {
        	console.log(err);
        }
        res.send('/');
    	console.log('session deleted. and redirected.');
    });
});

router.route('/register').post(function(req,res){
	var paramId = req.body.registerId;
    var paramPwd = req.body.registerPwd;
    db.query('insert into user(id,pwd,investContract,companyContract) values( ?,?,null,null);',
			[paramId,paramPwd], function(error,result){
		if(error){
			console.log(error); 
		} 
		console.log(result);
	});
    res.redirect('/');
});


module.exports = router;






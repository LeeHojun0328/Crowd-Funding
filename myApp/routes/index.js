var express = require('express');
var router = express.Router();
var deploy = require('../../deploy.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("route for / is called in index.js");
	res.render('index');
	//res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
    console.log('route for /login is called in index.js');
    res.render('login_page');
});
router.get('/about', function(req, res, next) {
	console.log('route for /about is called in index.js');
    res.render('about');
});

router.get('/funding', function(req, res, next) {
    console.log('route for /funding is called in index.js');
    res.render('funding');
});

router.get('/fundingProject', function(req, res, next) {
    console.log('route for /funding/fundingProejct is called in fundingProject.js');
	if(req.session.user){
		res.render('fundingProject');
	}else{
		res.redirect('/login');
	}
});

/* Respond post requests. */
router.route('/deploy').post(require('./deploy.js'));

router.route('/checkGoal').post(require('./checkGoal.js'));
router.route('/loginPost').post(require('./loginPost.js'));

router.route('/logout').post(function (req,res){
    req.session.destroy(function(err){
        if(err) {
        	console.log(err);
        }
        res.send('/');
    	console.log('session deleted. and redirected.');
    });
	/*
	console.log('logout route is called.');
    if(req.session.user){
        req.session.destroy(function(err){
            if(err) {
				console.log(err);
			}
			res.redirect('/');
            console.log('session deleted. and redirected.');
        });
    }else{
        // 로그인없이 로그아웃하는 경우는 일단 배제
		res.redirect('/');
		console.log('session already deleted. and redirected.');
    }*/
});



module.exports = router;






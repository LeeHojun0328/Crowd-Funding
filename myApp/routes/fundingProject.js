var express = require('express');
var router = express.Router();
var deploy = require('../../deploy.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('route for / is called in fundingProject.js');
	res.render('fundingProject');
});

/*
var goalBalance = require('../../goalBalance.js');
//var goalDate = require('../../goalDate.js');
var balance = require('../../getBalance.js');
var r = "목표 금액은 ";  // 사용 후 초기화 필요
router.post('/', function(req,res){
    console.log("post route /  is called in fundingProejct.js");
//router.route('/checkGoal')
//.post( function(req, res ) {
    //goalBalance.goalBalance(req.body.address,function(r1){
    //  console.log("goalBalance 내부");
    //  r = r+r1+"입니다.";
    //  res.send(r);
    //  return r1;
    //});
    res.send(r);
    //}).then(function(result){
    //  console.log(result);
    //});

});
*/
module.exports = router;


var express = require('express');
var router = express.Router();

var goalBalance = require('../../goalBalance.js');
//var goalDate = require('../../goalDate.js');
var balance = require('../../getBalance.js');
var r = "목표 금액은 ";  // 사용 후 초기화 필요
router.post('/', function(req,res){
	console.log("checkGoal");
//router.route('/checkGoal')
//.post( function(req, res ) {
    goalBalance.goalBalance(req.body.address,function(r1){
      r = r+r1+"wei 입니다.";
      console.log('r1 is '+r1);
	  balance.companyBalance(req.body.address, function(r2){
	  	r = "현재 투자 금액은 "+r2 + "wei 입니다.";
		res.send(r);
	  });
    
	});
    //res.send(r);
    //}).then(function(result){
    //  console.log(result);
    //});

});

module.exports = router;

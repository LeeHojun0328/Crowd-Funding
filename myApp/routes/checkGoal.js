
var express = require('express');
var router = express.Router();

var goalBalance = require('../../goalBalance.js');
//var goalDate = require('../../goalDate.js');
var balance = require('../../getBalance.js');
var json = {};

function f (req,res){
	
    goalBalance.goalBalance(req.body.address,function(r1){
      balance.companyBalance(req.body.address, function(r2){
        r = "목표 금액은 " + r1 +"wei입니다.  현재 투자 금액은 "+r2+"wei입니다.";
        res.send(r);
      });

    });
}



module.exports = f;

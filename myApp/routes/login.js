

var express = require('express');
var router = express.Router();

function f (req,res){
	console.log('login route is called.');
	var paramId = req.body.id;
	var paramPwd = req.body.pwd;

	req.session.user={
		id: paramId,
		authorized: true
	};
	res.redirect('/');
}



module.exports = f;

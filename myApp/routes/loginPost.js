

var express = require('express');
var router = express.Router();

function f (req,res){
	console.log('loginPost is called');
	var paramId = req.body.id;
	var paramPwd = req.body.pwd;
	console.log(req.body);
	
	req.session.user={
		id: paramId,
		authorized: true
	};
	/*
	res.cookie('user',{
		id: paramId,
		authorized: true
	});
	*/
	console.log('cookie is');
	console.log(res.cookie.users);
		
	res.send('/'); // -> This is impossible. Because, client-side uses ajax. so redirect url on client-side. 
}


module.exports = f;


var express = require('express');
var router = express.Router();

function f (req,res){
    console.log('logout route is called.');
	if(req.session.user){
		console.log('destroy session');
		req.session.destroy(function(err){
			if(err) {throw err;}
			res.send(new Buffer('alert("로그아웃됐습니다.")'));
		});
	}else{
		// 로그인없이 로그아웃하는 경우는 일단 배제. 왜냐면 로그인되면 토글할계획
		console.log('session is already deleted.');
		res.send(new Buffer());
	}
}



module.exports = f;

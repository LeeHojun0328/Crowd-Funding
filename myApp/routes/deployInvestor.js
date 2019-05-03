
var deploy = require('../../deploy.js');
var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'ProjectDB',
});

db.connect();

function obj (req, res ) {
    console.log("deploy route is called.");
	if(!req.session.user){
        res.json({data: false});
        //res.render('fundingProject');
    }
    deploy.deployInvestor(req.body.contractName, req.body.investPwd,2000,function(addr){
		var paramId = req.session.user.id;
		var contractName = req.body.contractName;
		db.query('insert into investor(id,contractName, investorContract) values(?,?,?);',
			[paramId,contractName,addr], function(error,result){
				if(error){console.log(error);}
			console.log(result);
		});
			
		res.json({data: addr});
    });
    console.log("Deploying an investor contract in route.");
}


module.exports = obj;

var express = require('express');
var router = express.Router();

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
	res.render('index');
	//res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
    res.render('loginPage');
});
router.get('/about', function(req, res, next) {
    res.render('about');
});

router.get('/funding', function(req, res, next) {
    res.render('funding');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});
router.get('/registerProject', function(req, res, next) {
	if(req.session.user){   
		res.render('registerProject');
	}else{
		res.redirect('/login');
	}
});
router.get('/fundingList', function(req, res, next) {
    if(req.session.user){
		var paramId = req.session.user.id;
		var contractName = [];
		var contractList = [];
		var tnxList =[];
        db.query('select contractName,investorContract from investor where id =? ;',
            [paramId], function(error,result){
            if(error){throw error;}
			for(var i = 0 ; i < result.length ; i++){
				contractName.push(result[i].contractName);
			    contractList.push(result[i].investorContract);
			}
			db.query('select tnxAddress from investor natural join funding;', function(error, result){
            	if(error){throw error;}
                for(var i = 0 ; i < result.length ; i++){
                	tnxList.push(result[i].tnxAddress);
                }
                res.render('fundingListPage',{contractName: contractName,contractList: contractList, tnxList: tnxList});
            }); 
        });
    }else{
        res.redirect('/login');
    }
});
router.get('/fundingProject', function(req, res, next) {
	if(req.session.user){
		var paramId = req.session.user.id;
        var contractName = [];
        var contractList = [];
		db.query('select contractName,investorContract from investor where id =? ;',
            [paramId], function(error,result){
			if(error){throw error;}
            for(var i = 0 ; i < result.length ; i++){
                contractName.push(result[i].contractName);
                contractList.push(result[i].investorContract);
            }
			//res.json({success: true});
        	res.render('fundingProject',{contractName: contractName,contractList: contractList});
			});
	}else{
	 	//res.json({success: false});
		res.redirect('/login');
	}
});
router.get('/project', function(req, res, next) {
    if(req.session.user){
		res.render('projectPage');
	}else{
		res.redirect('/login');
	}
});

/* post requests. */
//router.route('/deploy').post(require('./deploy.js'));

router.route('/checkGoal').post(require('./checkGoal.js'));

router.route('/loginPost').post(function f (req,res){
	    var paramId = req.body.id;
	    var paramPwd = req.body.pwd;
		db.query('select pwd from user where id =? ;',
            [paramId], function(error,result){
        	if(error){throw error;}

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
    db.query('insert into user(id,pwd) values(?,?);',
			[paramId,paramPwd], function(error,result){
		if(error){
			console.log(error); 
		} 
		console.log(result);
	});
    res.redirect('/');
});

var balance = require('../../getBalance.js');
router.route('/investorBalance').post(function(req,res){
	balance.investorBalance(req.body.addr, function(r){
		res.send({'balance':r});
    });
});


/* response to registerPage */

// multer module to receive a img file. 
var multer  = require('multer');
var fs = require('fs');
var storage = multer.diskStorage({
	destination: function(req,file,callback){
		callback(null,'./uploads/')
	},
	filename: function(req,file,callback){
		callback(null,req.session.user.id + Date.now())
	}
});
var upload = multer({storage: storage});

// create and write text file for project description.
function setFile(name,data){
	fs.writeFile("./uploads/"+name+".txt", data, function(err){
		if(err) console.log(err);
	});
	return "uploads\/"+name+".txt";
}

router.route('/registerProject').post(upload.single('photo'),function(req,res){
	try{
		console.log(req.body);
		console.log(req.file);
		var descPath = setFile(req.session.user.id+Date.now(), req.body.projectInfo);
		var reward = req.body.reward;

		db.query('insert into company(id,contractName, companyContract) values(?,?,?);',
            [req.session.user.id,req.body.contractID,req.body.addr], function(error,result){
        	console.log('insert into company');
			console.log(reward);
			console.log(reward.length);
			for(var i = 0 ; i < reward.length ; i++){
				// separate rewardName from 'reward'
				var rewardName = "";
				var words = reward[i].split(' ');
				for (var j = 0 ; j < words.length - 1 ; j++){
					rewardName += words[j]+" ";
				}

				console.log([req.body.projectName,req.body.contractID, req.body.addr, descPath,req.file.path
                    , req.body.goalPrice, req.body.goalDate,rewardName, words[words.length-1].split('wei')[0]]);
				db.query('insert into project(projectName,contractName, companyContract, infoLocation, imgLocation,goalAmount,goalDate, rewardName, rewardPrice) values(?,?,?,?,?,?,?,?,?);',
					[req.body.projectName,req.body.contractID, req.body.addr, descPath,req.file.path
					, req.body.goalPrice, req.body.goalDate,rewardName, parseInt(words[words.length-1].split('wei')[0])],function(error,result){
						console.log('insert into project');
						console.log(result);
						if(error) console.log(error);
						res.send();
					});
			}
			if(error){
            	console.log(error);
        	}
			});
	}catch(err){
		console.log(err);
	}
});

var deploy = require('../../deploy.js');
router.route('/deployCompany').post(function(req,res){
	 if(req.session.user){	
		var goalDate = parseInt(new Date(req.body.goalDate).getTime().toString().substring(0, 10));
		deploy.deployCompany(req.body.contractName, req.body.contractPwd,goalDate,req.body.goalPrice ,function(addr){
			res.send(addr);
		});
	}else{
		res.redirect('/login');
	}
});

router.route('/deployInvest').post(require('./deployInvestor.js'))

module.exports = router;






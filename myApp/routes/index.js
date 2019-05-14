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
    db.query('select distinct projectName, imgLocation, goalAmount, goalDate from project'
		,function(error, result){
			var objArr = [];
			for(var i = 0 ; i < result.length; i++){
				objArr.push(result[i].projectName);
				objArr.push(result[i].imgLocation);
				objArr.push(result[i].goalAmount);
				objArr.push(result[i].goalDate);
			}
			res.render('funding',{lists: objArr});	
		});
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



/*
   funding list page. (=투자관리 페이지)
	
	- deploy investor contract here.
	- check the balance of investor contracts
	- check the funding lists

*/
router.get('/fundingList', function(req, res, next) {
	if(req.session.user){
		var paramId = req.session.user.id;
		var contractName = [];
		var contractList = [];
		var tnxList =[];
		var rewardName = [];
		var rewardPrice = [];
		var rewardCount =[];
        db.query('select contractName,investorContract from investor where id =? ;',
            [paramId], function(error,result){
            if(error){throw error;}
			for(var i = 0 ; i < result.length ; i++){
				contractName.push(result[i].contractName);
			    contractList.push(result[i].investorContract);
			}
			db.query('select tnxAddress,rewardName, rewardPrice, rewardCount from investor natural join funding where id = ?;',[paramId], function(error, result){
            	if(error){throw error;}
                for(var i = 0 ; i < result.length ; i++){
                	tnxList.push(result[i].tnxAddress);
					rewardName.push(result[i].rewardName+"`");
					rewardPrice.push(result[i].rewardPrice);
					rewardCount.push(result[i].rewardCount);
                }
                res.render('fundingListPage',{rewardCount:rewardCount, rewardName:rewardName, rewardPrice: rewardPrice,contractName: contractName,contractList: contractList, tnxList: tnxList});
            }); 
        });
    }else{
        res.redirect('/login');
    }
});


/* 

   Funding project page.

   - You can make an investment on this page
   - Server send information of the project that user wants to see.
 
 */
router.get('/fundingProject', function(req, res, next) {
	if(req.session.user){
		var paramId = req.session.user.id;
        var contractName = [];
        var contractList = [];
		var project = [];
		var projectDesc;
		var rewardName = [];
		var rewardPrice = [];
		db.query('select contractName,investorContract from investor where id =? ;',
            [paramId], function(error,result){
				if(error) console.log(error);
            	for(var i = 0 ; i < result.length ; i++){
            	    contractName.push(result[i].contractName);
            	    contractList.push(result[i].investorContract);
            	}
				db.query('select * from project where projectName = ? ;',
					[req.query.name],function(error, result){
						if(error) console.log(error);
                        project.push(result[0].projectName);
                        project.push(result[0].companyContract);
						project.push(result[0].infoLocation);
                        project.push(result[0].imgLocation);
                        project.push(result[0].goalAmount);
                        project.push(result[0].goalDate);
                        for(var j = 0 ; j < result.length ; j++){
                        	rewardName.push(result[j].rewardName+"`");
							rewardPrice.push(result[j].rewardPrice);
						}
                        res.render('fundingProject',
                                {contractName: contractName,contractList: contractList, project: project, rewardName: rewardName, rewardPrice: rewardPrice});	
					});	
			});
	}else{
		res.redirect('/login');
	}
});

/*
   Project page.
   
   - This page introduces and manages projects.
*/
router.get('/project', function(req, res, next) {
    if(req.session.user){
		db.query('select distinct companyContract from company natural join project where id = ?;',
			[req.session.user.id],function(error, companyContract){
				if(error) console.log(error);
				var objArr = [];
				var count = 0 ;
				if(companyContract.length == 0 ){
					res.render('projectPage');
				}
				for(var i = 0 ; i < companyContract.length; i++){
					db.query('select distinct projectName, imgLocation, goalAmount, goalDate from project where companyContract = ?;'
						,[companyContract[i].companyContract],function(error, result){
							if(error) console.log(error);
							var obj = [];
							obj.push(result[0].projectName);
							obj.push(result[0].imgLocation);
							obj.push(result[0].goalAmount);
							obj.push(result[0].goalDate);
							objArr.push(obj);
							count += 1;
							if(count == companyContract.length){
								console.log('send objArr');
								console.log(objArr);
								res.render('projectPage',{lists: objArr});
							}

						});
				}
			});
	}else{
		res.redirect('/login');
	}
});





/* post requests. */



/* Funding project page  */

router.route('/checkGoal').post(require('./checkGoal.js'));


/* 

   Funding!
   
   - a user funds a project. 
   - First of all, data sent by client-side is prcessed to be saved in database. 
   - then, db qeury and response to cilent work asynchronously.

*/
var funding = require('../../funding.js');
router.route('/funding').post(function(req,res){
	var from = req.body.from;
	var id = req.body.id;
	var pwd = req.body.pwd;
	var selection = req.body['select[]'];
	var totalPrice = 0;
	var rewardName = [];
	var rewardPrice = req.body['rewardPrice[]'];
	
	rewardName[0] = req.body['rewardName[]'][0];
	for (var  i  = 1 ; i < req.body['rewardName[]'].length-1; i++){
		rewardName.push(req.body['rewardName[]'][i].substring(1));
	}
	console.log(rewardName);
	for (var i = 0 ; i < selection.length ; i++){
		totalPrice += Number(selection[i]) * Number(rewardPrice[i]);
	}
	console.log('리우더 이름 길이 '+ rewardName.length);
	funding.funding(from, req.body.to,totalPrice, id, pwd, function(result){
		
		// db qeury and response works asynchronously.
		for (var i = 0 ; i < rewardName.length ; i++){
			 if(Number(selection[i]) != 0 ){
				db.query('insert into funding(investorContract, companyContract,tnxAddress, rewardName, rewardPrice, rewardCount ) values (?,?,?,?,?,?)',[from, req.body.to, result.tx,rewardName[i],Number(rewardPrice[i]),Number(selection[i])],function(err,result2){
					if(err)console.log(err);	
				});
			}
		}
		res.send(result);
	});
});



router.route('/loginPost').post(function f (req,res){
	    var paramId = req.body.id;
	    var paramPwd = req.body.pwd;
		db.query('select id from user where id = ? ;', [paramId],function(error, result){
			if(!result[0]){
				res.json({success: false});
				return false;
			}
			db.query('select pwd from user where id =? ;',
            	[paramId], function(error,result){
        		if(error){throw error;}
				if(paramPwd == result[0].pwd){	// login success.
					req.session.user={
            			id: paramId,
            			authorized: true
        			};
					res.json({success: true});
				}else{							// login failed.
					res.json({success: false});
				}
    		});
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


// multer module to receive a img file from client.
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
	fs.writeFile(name+".txt", data, function(err){
		if(err) console.log(err);
	});
	return name+".txt";
}

// register project
router.route('/registerProject').post(upload.single('photo'),function(req,res){
	try{
		var descPath = setFile(req.session.user.id+Date.now(), req.body.projectInfo);
		var reward = req.body.reward;
		
		// insert into data company table.
		db.query('insert into company(id,contractName, companyContract) values(?,?,?);',
            [req.session.user.id,req.body.contractID,req.body.addr], function(error,result){
			for(var i = 0 ; i < reward.length ; i++){
				
				// separate rewardName from 'reward'
				var rewardName = "";
				var words = reward[i].split(' ');
				for (var j = 0 ; j < words.length - 1 ; j++){
					rewardName += words[j]+" ";
				}

				// separate rewardPrice from 'reward'
				var rewardPrice = parseInt(words[words.length-1].split('wei')[0]);
				
				//insert into data project table.
				db.query('insert into project(projectName,contractName, companyContract, infoLocation, imgLocation,goalAmount,goalDate, rewardName, rewardPrice) values(?,?,?,?,?,?,?,?,?);',
					[req.body.projectName,req.body.contractID, req.body.addr, descPath,req.file.filename
					, req.body.goalPrice, req.body.goalDate,rewardName, rewardPrice],function(error,result){
						console.log(result);
						if(error) console.log(error);
						res.send(); // redirect back page. 
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

// deploy company smart contract to ethereum network. 
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

// Response to http post request.
// and deploy investor smart contract to ethereum network.
router.route('/deployInvest').post(require('./deployInvestor.js'))

module.exports = router;






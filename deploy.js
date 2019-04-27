


// deploy.js 

// "truffle-contract"는 smart contract을 객체로 다룰 수 있게 합니다. 
const contract = require("truffle-contract");     

// 미리 컴파일된 company.json파일을 가져옵니다.
const contractAbs = new contract(require('./build/contracts/company.json'));
const contractAbs2 = new contract(require('./build/contracts/investor.json'));

// infura의 이더리움 노드와 연결하기 위한 truffle 라이브버리
const HDWalletProvider = require('truffle-hdwallet-provider');

// infura 접근을 위한 api key와 지갑 private key를 설정
const provider = new HDWalletProvider("buzz cliff voice tired good ready ripple charge water educate mansion raccoon", 
               "https://rinkeby.infura.io/3c1065bef2f04d61b73442f2d78a3b5a");

// smart contract과 infura 이더리움 노드에 연결
contractAbs.setProvider(provider);
contractAbs2.setProvider(provider);

var deploy = {};

// 0xC74.. 지갑주소에서 새로운 company contract 배포
deploy.deployCompany = function ( callback){
	contractAbs.new("","",0,5000, {from :'0xC745bb9D1d0CBb7C97A888Df70d1b78028979506'})
	.then(function(instance){
		company = instance;
		callback(company.address);
		console.log("company addr is "+company.address);
		return company.getBalance();
	}).then(function(result){
		console.log("Balance: "+result);
	}).catch(function(err){
		console.log(err);
	});
}

deploy.deployInvestor = function (amount, callback){
    contractAbs2.new("","", {from :'0xC745bb9D1d0CBb7C97A888Df70d1b78028979506'})
    .then(function(instance){
        investor = instance;
        callback(investor.address);
		console.log("investor addr is " + investor.address);
        return instance
    }).then(function(result){
		result.send(amount, {from :'0xC745bb9D1d0CBb7C97A888Df70d1b78028979506'});
    }).catch(function(err){
        console.log(err);
    });
}


module.exports = deploy;





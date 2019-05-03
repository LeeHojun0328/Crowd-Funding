
// getBaance.js

const contract = require("truffle-contract");

const contractAbs = new contract(require('./build/contracts/investor.json'));
const contractAbs2 = new contract(require('./build/contracts/company.json'));

// infura의 이더리움 노드와 연결하기 위한 truffle 라이브버리
const HDWalletProvider = require('truffle-hdwallet-provider');

// infura 접근을 위한 api key와 지갑 private key를 설정
const provider = new HDWalletProvider("buzz cliff voice tired good ready ripple charge water educate mansion raccoon",
               "https://rinkeby.infura.io/3c1065bef2f04d61b73442f2d78a3b5a");

// smart contract과 infura 이더리움 노드에 연결
contractAbs.setProvider(provider);
contractAbs2.setProvider(provider);

balance = {}

balance.investorBalance = function (addr,callback){
	contractAbs.at(addr).then(function(instance){
		var ba = instance.getBalance();
		return ba;
	}).then(function(result){
		callback(result.toNumber());
		console.log(result.toNumber());
	});
}

balance.companyBalance = function (addr,callback){
    contractAbs2.at(addr).then(function(instance){
        var ba = instance.getBalance();
		return ba;
    }).then(function(result){
        callback(result.toNumber());
		console.log(result.toNumber());
    });
}

module.exports = balance;




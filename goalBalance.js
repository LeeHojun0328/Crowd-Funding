
// goalBalance.js

const contract = require("truffle-contract");
const contractAbs = new contract(require('./build/contracts/company.json'));

const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider("buzz cliff voice tired good ready ripple charge water educate mansion raccoon",
               "https://rinkeby.infura.io/3c1065bef2f04d61b73442f2d78a3b5a");

// smart contract과 infura 이더리움 노드에 연결
contractAbs.setProvider(provider);

var obj = {};

obj.goalBalance = function (addr){
	contractAbs.at(addr).then(function(instance){
		return instance.getGoalBalance();
	}).then(function(result){
		console.log(result);
	});
}

module.exports = obj;

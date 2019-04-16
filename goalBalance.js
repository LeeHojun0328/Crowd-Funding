
// goalBalance.js

const contract = require("truffle-contract");
const contractAbs = new contract(require('./build/contracts/company.json'));

const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider("buzz cliff voice tired good ready ripple charge water educate mansion raccoon",
               "https://rinkeby.infura.io/3c1065bef2f04d61b73442f2d78a3b5a");

// smart contract과 infura 이더리움 노드에 연결
contractAbs.setProvider(provider);

var obj = {};

obj.goalBalance = function (addr,callback){
	contractAbs.at(addr).then(function(instance){
		var ba = instance.getGoalBalance();
		console.log('goalBalance module -> first f: '+ba);
		return ba;
	}).then(function(result){
		console.log("goalBalance module -> second f: "+result);
		callback(result);
	}).catch(function(err){
        console.log(err);
    });
}

module.exports = obj;

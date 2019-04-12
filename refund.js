
// refund.js
/*
	펀딩 목표 달성을 실패한 기업의 금액은 refund.js코드로 투자자들에게 모두 환불됩니다. 
*/
const contract = require("truffle-contract");

const contractAbs2 = new contract(require('./build/contracts/company.json'));

const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider("buzz cliff voice tired good ready ripple charge water educate mansion raccoon",
               "https://rinkeby.infura.io/3c1065bef2f04d61b73442f2d78a3b5a");

// smart contract과 infura 이더리움 노드에 연결
contractAbs2.setProvider(provider);

obj = {}

obj.refund = function (addr){
	var refund;
    contractAbs2.at(addr).then(function(instance){
        refund = instance;
		return refund.isGoal();
    }).then(function(result){
        if(result==false){
			console.log("refunding success.");
			return refund.refundTo({from :'0xC745bb9D1d0CBb7C97A888Df70d1b78028979506'});
		}else{
			console.log("refunding failed.");
			return false;
		}
    });
}

module.exports = obj;





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
contractAbs2.autoGas = true;
obj = {}
function refund (addr,refundInfo,i,cb){
	var re;
	console.log('i는 '+i);
	if(i != refundInfo.length){
		contractAbs2.at(addr).then(function(instance){
    	    re = instance;
			return re;
    	}).then(function(result){ // 프로젝트 실패  
			console.log('트랜스퍼 실행');
			var refundValue = refundInfo[i].rewardPrice * refundInfo[i].rewardCount;
			return result.transferTo(refundInfo[i].investorContract,refundValue,{from :'0xC745bb9D1d0CBb7C97A888Df70d1b78028979506'});
    	}).then(function(result){
			console.log(result);
			refund(addr,refundInfo,i+1,function(re){});
			return true;
		}).then(function(result){
			cb(true);
		}).catch(function(err){
    	    console.log(err);
    	});
	}else{
		cb(true);
		return true;
	}
}


module.exports = refund;




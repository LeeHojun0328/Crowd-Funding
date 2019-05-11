



// funding.js

// "truffle-contract"는 smart contract을 객체로 다룰 수 있게 합니다.
const contract = require("truffle-contract");

// 미리 컴파일된 company.json파일을 가져옵니다.
const contractAbs = new contract(require('./build/contracts/investor.json'));


// infura의 이더리움 노드와 연결하기 위한 truffle 라이브버리
const HDWalletProvider = require('truffle-hdwallet-provider');

// infura 접근을 위한 api key와 지갑 private key를 설정
const provider = new HDWalletProvider("buzz cliff voice tired good ready ripple charge water educate mansion raccoon",
               "https://rinkeby.infura.io/3c1065bef2f04d61b73442f2d78a3b5a");

// smart contract과 infura 이더리움 노드에 연결
contractAbs.setProvider(provider);

var funding ={};

funding.funding = function (from, to, amount, id, pwd, callback){
	contractAbs.at(from).then(function(instance){
		return instance.transferToC(to,amount, id, pwd,{from :'0xC745bb9D1d0CBb7C97A888Df70d1b78028979506'});
	}).then(function(result){
		callback(result);
		console.log(result);
	});
}

module.exports = funding;



const path = require('path');	// 경로찾기 위한 라이브러리
const fs = require('fs');		// file system 데이터 접근하기 위한 라이브러리 
const solc = require('solc'); 	// 스마트 컨트랙 컴파일을 위한 solidity compiler 

// sol확장자를 갖는 company, investor을 파일 시스템에서 가져옵니다. 
const sourcePath = path.resolve(__dirname,'contracts','company.sol');
const sourcePath2 = path.resolve(__dirname,'contracts','investor.sol');
const source = fs.readFileSync(sourcePath,'utf8');
const source2 = fs.readFileSync(sourcePath2,'utf8');

// solc를 사용하여 컴파일
module.exports = solc.compile(source,1).contracts[':company'];


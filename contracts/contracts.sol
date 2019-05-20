pragma solidity ^0.4.2;

contract company {
    
    //address platForm;
    string  id;
    bytes32 hash;       // hash(pwd)
    uint public goalBalance ;
    uint public goalDate;
    event setInvestorEvent(address investerAddress, uint256 fundValue);
    event transferEvent();
    
    //initializaion
   constructor (string memory _id, string memory _pwd, uint _goalDate,uint _goalBalance) public  {
        //platForm = msg.sender;
        id = _id;
        hash = keccak256(bytes(_pwd));
        goalDate = _goalDate;
        goalBalance = _goalBalance;
        
    }
    function() payable external  {
    }
    function isOwner(string memory _id, string memory _pwd) view private returns (bool){
        return (keccak256(bytes(id)) == keccak256(bytes(_id)) && keccak256(bytes(_pwd)) ==  hash);
    }
    
    function isGoal() view public returns (bool){
        return (goalDate < now && address(this).balance >= goalBalance) ;
    }
    function getGoalBalance() view public returns(uint256){
        return goalBalance;
    }
    function getGoalDate() view public returns(uint){
        return goalDate;
    }
    function transferTo (address receiver, uint256 _amount ) public payable { 
        //require(msg.sender == platForm);
        //require(isOwner(_id, _pwd));
        receiver.transfer(_amount);
        //emit transferEvent();
    }
    function getBalance() view public returns(uint256) {
        return address(this).balance;
    }
    function setInvestor() public payable {
        emit setInvestorEvent(msg.sender, msg.value);
    } 
}
contract investor {
    string public id;
    //address platForm;
    bytes32 hash;
    
    event Funded(address receiver, uint256 _amount);
    event Tranfered(address receiver, uint256 _amount);
    
    //initializaion
    constructor (string memory _id, string memory _pwd) public payable {
        //platForm = msg.sender;
        id = _id;
        hash = keccak256(bytes(_pwd));
    }
    function() payable external {
    }
    function isOwner(string memory _id, string memory _pwd) view public returns (bool){
        return (keccak256(bytes(id)) == keccak256(bytes(_id)) && keccak256(bytes(_pwd)) == hash);
    }
    function transferToC(address receiver, uint256 _amount,string memory _id, string memory _pwd ) public { 
        //require(msg.sender == platForm);
        require(isOwner(_id, _pwd));
        company setAddr = company(receiver);
        setAddr.setInvestor.value(_amount)();
        //emit Funded (receiver, _amount);
    }
    function transferToA(address receiver, uint256 _amount,string memory _id, string memory _pwd ) public { 
        //require(msg.sender == platForm);
        require(isOwner(_id, _pwd));
        receiver.transfer(_amount);
        //emit Tranfered (receiver, _amount);
    }
    function getBalance() view public returns(uint256) {
        return address(this).balance;
    }
    function myAddr() view public returns(address){
        return address(this);
    }
}




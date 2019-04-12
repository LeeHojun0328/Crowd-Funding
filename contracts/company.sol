

// 1546268400
pragma solidity ^0.4.2;

contract company {
    
    address platForm;
    string  id;
    bytes32 hash;       // hash(pwd)
    uint256 public goalBalance ;
    uint public goalDate;
    uint start;
    mapping(address=>uint) Outlog;
    address[] public InvestAddr;
    

    event setInvestorEvent(address investerAddress, uint256 fundValue);
    event refundEvent(address refundAddr, uint256 refundValue);

    //initializaion
   constructor (string _id, string  _pwd, uint _goalDate,uint _goalBalance) public  {
        platForm = msg.sender;
        id = _id;
        hash = keccak256(bytes(_pwd));
        goalDate = _goalDate;
        goalBalance = _goalBalance;
        
    }
    
    function() payable public  {
    }
  
    function isOwner(string _id, string _pwd) view private returns (bool){
        return (keccak256(bytes(id)) == keccak256(bytes(_id)) && keccak256(bytes(_pwd)) ==  hash);
    }
    
    function isGoal() view public returns (bool){
        return (goalDate < now && address(this).balance >= goalBalance) ;
    }

    function transferTo(address receiver, uint256 _amount,string _id, string _pwd ) public  { 
        require(msg.sender == platForm);
        require(isOwner(_id, _pwd));
        require(isGoal());
        
        receiver.transfer(_amount);
        //Outlog[receiver] += _amount;
    }

    
    function getBalance() view public returns(uint256) {
        return address(this).balance;
    }
    function myAddr() view public returns(address){
        return address(this);
    }
   
    // someone must call. 
    function refundTo () public payable{
        //require(!isGoal());
        address localAddr ;
        uint256 localAmount;
        for(uint256 i = 0 ; i < InvestAddr.length ; i++){
            InvestAddr[i].transfer(Outlog[InvestAddr[i]]);
            
            //investor ref = investor(localAddr);
            //ref.getRefund.value(localAmount);
            emit refundEvent(localAddr,localAmount);
        }
    }

    
    function setInvestor() public payable {
        Outlog[msg.sender] += msg.value;
        InvestAddr.push(msg.sender);
        emit setInvestorEvent(msg.sender, msg.value);
        
    }
}

//contract investor{
//    function getRefund() public payable {}
//}





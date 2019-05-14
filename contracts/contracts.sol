pragma solidity ^0.4.2;

contract company {
    
    address platForm;
    string  id;
    bytes32 hash;       // hash(pwd)
    uint public goalBalance ;
    uint public goalDate;
    mapping(address=>uint) public Outlog;
    address[] public InvestAddr;
    
    event setInvestorEvent(address investerAddress, uint256 fundValue);
    event refundEvent(address refundAddr, uint256 refundValue);
    event transferEvent();
    
    //initializaion
   constructor (string memory _id, string memory _pwd, uint _goalDate,uint _goalBalance) public  {
        platForm = msg.sender;
        id = _id;
        hash = keccak256(bytes(_pwd));
        goalDate = _goalDate;
        goalBalance = _goalBalance;
        
    }
    
    function() payable external  {
        refundTo();
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
        require(msg.sender == platForm);
        //require(isOwner(_id, _pwd));
        //require(isGoal());
        receiver.transfer(_amount);
        emit transferEvent();
    }

    
    function getBalance() view public returns(uint256) {
        return address(this).balance;
    }
   
    // someone must call. 
    function refundTo() public payable{
        //require(!isGoal());
        address localAddr ;
        uint256 localAmount;
        for(uint256 i = 0 ; i < InvestAddr.length ; i++){
            //InvestAddr[i].transfer(Outlog[InvestAddr[i]]);
            //investor ref = investor(localAddr);
            //ref.getRefund.value(localAmount);
            
            investor invest = investor(InvestAddr[i]);
            invest.refund.value(Outlog[InvestAddr[i]])();
            emit refundEvent(localAddr,localAmount);
        }
    }
    
    // only investor contract can call this function.  
    function setInvestor() public payable {
        Outlog[msg.sender] += msg.value;
        InvestAddr.push(msg.sender);
        emit setInvestorEvent(msg.sender, msg.value);
        
    } 
}



contract investor {
    
    address platForm;  // platform account address
    string public id;
    bytes32 hash;       // hash(pwd)
    mapping(address=>uint) log; 
    
    event Funded(address receiver, uint256 _amount);
    event Tranfered(address receiver, uint256 _amount);
    event ref(uint256 _amount);
    //initializaion
    constructor (string memory _id, string memory _pwd) public payable {
        platForm = msg.sender;
        id = _id;
        hash = keccak256(bytes(_pwd));
    }
    
    function() payable external {
    }
    
    function isOwner(string memory _id, string memory _pwd) view public returns (bool){
        return (keccak256(bytes(id)) == keccak256(bytes(_id)) && keccak256(bytes(_pwd)) == hash);
    }
  
    function transferToC(address receiver, uint256 _amount,string memory _id, string memory _pwd ) public { 
        require(msg.sender == platForm);
        require(isOwner(_id, _pwd));
        log[receiver] += _amount;
        company setAddr = company(receiver);
        setAddr.setInvestor.value(_amount)();
        emit Funded (receiver, _amount);
    }
    
    function transferToA(address receiver, uint256 _amount,string memory _id, string memory _pwd ) public { 
        require(msg.sender == platForm);
        require(isOwner(_id, _pwd));
        receiver.transfer(_amount);
        log[receiver] += _amount;
        emit Tranfered (receiver, _amount);
        
    }
    
    function getBalance() view public returns(uint256) {
        //require(isOwner(_isOwner));
        return address(this).balance;
    }
    
    function myAddr() view public returns(address){
        return address(this);
    }
    function refund() public payable{
        emit ref(msg.value);
    }
}




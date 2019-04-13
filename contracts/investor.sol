
pragma solidity ^0.4.25;

contract investor {
    
    address platForm;  // platform account address
    string public id;
    bytes32 hash;       // hash(pwd)
    mapping(address=>uint) log; 
    
    event Funded(address receiver, uint256 _amount);
    event Tranfered(address receiver, uint256 _amount);
    
    //initializaion
    constructor (string _id, string  _pwd) public payable {
        platForm = msg.sender;
        id = _id;
        hash = keccak256(bytes(_pwd));
    }
    
    function() public payable {
    }
    
    function isOwner(string _id, string _pwd) view private returns (bool){
        return (keccak256(bytes(id)) == keccak256(bytes(_id)) && keccak256(bytes(_pwd)) == hash);
    }
    function getID() view public returns (string){
        return id ;
    }
  
    function transferToC(address receiver, uint256 _amount,string _id, string memory _pwd ) public { 
        require(msg.sender == platForm);
        require(isOwner(_id, _pwd));
        log[receiver] += _amount;
        company setAddr = company(receiver);
        setAddr.setInvestor.value(_amount)();
        emit Funded (receiver, _amount);
    }
    
    function transferToA(address receiver, uint256 _amount,string _id, string memory _pwd ) public { 
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
}

contract company{
    function setInvestor () public payable{}
}





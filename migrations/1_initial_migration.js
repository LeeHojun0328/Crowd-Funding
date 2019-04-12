const company = artifacts.require("company");
const investor = artifacts.require("investor");
// which returns a "contract abstraction" module that we can use within the rest of our deployment script.

module.exports = function(deployer, accounts) {   // can accept other parameters too. but must accept deployer object.
  deployer.deploy(company,"","",0,0);
  deployer.deploy(investor,"","");

};


var deploy = require('../../deploy.js');


function obj (req, res ) {
    console.log("deploy route is called.");
    deploy.deployInvestor(0,function(addr){
        res.send(addr);
    });
    console.log("Deploying an investor contract in route.");
}


module.exports = obj;

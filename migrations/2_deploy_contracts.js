const TorusCoin = artifacts.require("./TorusCoin.sol");

module.exports = function (deployer, network, accounts) {
    //console.log(arguments)
    if (network === "live") {

        //We are planning to start crowdsale on 'Thu Jun 01 2017 09:00:00 GMT+0900 (JST)'
        let startDatetime = Math.floor(Date.parse('2018-03-16T00:00:00Z') / 1000);
        let founder = '0xf17f52151EbEF6C7334FAD080c5704D77216b732';

        deployer.deploy(TorusCoin, startDatetime, founder);
    } else if (network === "testnet") {

        //We are planning to start crowdsale on 'Thu Jun 01 2017 09:00:00 GMT+0900 (JST)'
        let startDatetime = Math.floor(Date.parse('2018-03-16T00:00:00Z') / 1000);
        let founder = '0xf17f52151EbEF6C7334FAD080c5704D77216b732';

        deployer.deploy(TorusCoin, startDatetime);
    } else {
        let founder = accounts[1];
        //We are planning to start crowdsale on 'Thu Jun 01 2017 09:00:00 GMT+0900 (JST)'
        let startDatetime = Math.floor(Date.parse('2018-03-16T00:00:00Z') / 1000);
        // var startDatetime = Math.floor(Date.now() / 1000);

        deployer.deploy(TorusCoin, startDatetime, founder);
    }

};

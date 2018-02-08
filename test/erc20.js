const TorusCoin = artifacts.require("./TorusCoin.sol");
const utils = require("./utils");
const logger = utils.logger;
const toWei = utils.toWei;
const tokens = utils.tokens;

contract('Test ERC20', function (accounts) {

    console.log(accounts)

    let owner = accounts[0];
    let founder = accounts[1];
    let user1 = accounts[2];
    let user2 = accounts[3];

    const amount = 100000

    //Fetch deployed contracts
    before("fetch deployed instances", function () {
    });

    it("buy by user1 then transfer user2", async function () {
        let dateTime = Math.floor(Date.now() / 1000);

        let instance = await TorusCoin.new(dateTime, founder);
        {
            let result = await instance.sendTransaction({value: toWei(1), from: user1});
            logger.log(result);
            assert.equal(result.logs[0].args.tokens, tokens(utils.firstStageRate));
        }
        {
            let holdCoin = await instance.balanceOf(user1);
            logger.log(holdCoin)
            assert.equal(parseFloat(holdCoin), tokens(utils.firstStageRate));
        }
        // {
        //   let holdEth = await web3.eth.getBalance(founder);
        //   logger.log(holdEth);
        //   assert.equal(parseFloat(holdEth), toWei(1));
        // }
        {
            let result = await instance.transfer(user2, tokens(amount), {from: user1});
            logger.log(result);
            assert.equal(result.logs[0].args.value, tokens(amount));
        }
        {
            let holdCoin = await instance.balanceOf(user1);
            logger.log(holdCoin)
            assert.equal(parseFloat(holdCoin), tokens(utils.firstStageRate-amount));
        }
        {
            let holdCoin = await instance.balanceOf(user2);
            logger.log(holdCoin)
            assert.equal(parseFloat(holdCoin), tokens(amount));
        }
    });


});

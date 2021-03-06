const TorusCoin = artifacts.require("./TorusCoin.sol");
const utils = require("./utils");
const logger = utils.logger;
const toWei = utils.toWei;
const tokens = utils.tokens;

contract('Test Contract Holder', function (accounts) {

    console.log(accounts)

    let owner = accounts[0];
    let founder = accounts[1];
    let user1 = accounts[2];
    let user2 = accounts[3];

    const amount = 100000

    //Fetch deployed contracts
    before("fetch deployed instances", function () {
    });

    it("send some token to contract", async function () {
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
        //console.log(instance)
        {
            let result = await instance.transfer(user2, tokens(amount), {from: user1});
            logger.log(result);
            assert.equal(result.logs[0].args.value, tokens(amount));
        }
        {
            let holdCoin = await instance.balanceOf(user2);
            logger.log(holdCoin)
            assert.equal(parseFloat(holdCoin), tokens(amount));
        }
        {
            let holdCoin = await instance.balanceOf(user1);
            logger.log(holdCoin)
            assert.equal(parseFloat(holdCoin), tokens(utils.firstStageRate - amount));
        }
        {
            let result = await instance.transfer(user1, tokens(amount), {from: user2});
            logger.log(result);
            assert.equal(result.logs[0].args.value, tokens(amount));
        }
        {
            let holdCoin = await instance.balanceOf(user2);
            logger.log(holdCoin)
            assert.equal(parseFloat(holdCoin), tokens(0));
        }
        {
            let holdCoin = await instance.balanceOf(user1);
            logger.log(holdCoin)
            assert.equal(parseFloat(holdCoin), tokens(utils.firstStageRate));
        }

    });


});

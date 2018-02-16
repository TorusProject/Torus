const TorusCoin = artifacts.require("./TorusCoin.sol");
const utils = require("./utils");
const logger = utils.logger;
const toWei = utils.toWei;
const tokens = utils.tokens;

contract('Test Buy TorusCoin', function (accounts) {

    console.log(accounts)

    let founder = accounts[1];

    //Fetch deployed contracts
    before("fetch deployed instances", function () {
    });

    it("buy method", async function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let owner = accounts[0];

        logger.log(owner);

        let ethBalance;
        {
            ethBalance = web3.eth.getBalance(founder);
            logger.info(ethBalance);

        }

        let instance = await TorusCoin.new(dateTime, founder);

        let tokenBalance;
        {
            tokenBalance = await instance.salesVolume();
            logger.info(tokenBalance);

        }

        {
            try {
                let result = await instance.buy(founder, {value: toWei(1), gas: 180000});
                logger.info(result);
                assert.equal(result.logs[0].args.tokens, tokens(utils.firstStageRate));
                {
                    let balance = web3.eth.getBalance(founder);
                    console.info(balance);
                    console.info(ethBalance.plus(toWei(1)), balance)
                    assert.equal(ethBalance.plus(toWei(1)).toString(), balance.toString());

                }
            } catch (e) {
                logger.info(e);
                {
                    let balance = web3.eth.getBalance(founder);
                    logger.info(balance);
                    assert.equal(ethBalance.toString(), balance.toString());

                }

            }

        }
        {
            let balance = await instance.salesVolume();
            logger.info(balance);
            assert.equal(tokenBalance.plus(toWei(1)).toString(), balance.toString());

        }
        {
            let balance = await instance.balanceOf(founder);
            logger.log(balance);
            assert.equal(balance, tokens(utils.firstStageRate));

        }
    });

    it("buy method with decimal", async function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        logger.log(owner);

        let instance = await TorusCoin.new(dateTime, founder);

        {
            let result = await instance.buy(owner, {value: toWei(1.23)});
            logger.log(result);
            assert.equal(result.logs[0].args.tokens, tokens(utils.firstStageRate * 1.23));
        }
        {
            let result = await instance.balanceOf(owner);
            logger.log(result);
            assert.equal(result, tokens(utils.firstStageRate * 1.23));
        }
    });

    it("default function", async function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        logger.log(owner);
        let instance = await TorusCoin.new(dateTime, founder);

        {
            let result = await instance.sendTransaction({value: toWei(1)});
            logger.log(result);
            assert.equal(result.logs[0].args.tokens, tokens(utils.firstStageRate * 1));
        }
        {
            let result = await instance.balanceOf(owner);
            logger.log(result);
            assert.equal(result, tokens(utils.firstStageRate * 1));
        }
    });
    it("buy case 1", async function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        logger.log(owner);
        let instance = await TorusCoin.new(dateTime, founder);

        {
            let result = await instance.buy(owner, {value: toWei(1)});
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.sender, owner);
            assert.equal(log.tokens, tokens(utils.firstStageRate * 1));
        }

        {
            let result = await instance.balanceOf(owner);
            logger.log(result);
            assert.equal(result, tokens(utils.firstStageRate * 1));
        }
    });
    it("buy case 2", async function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        let sendTo = accounts[1];

        logger.log(owner);
        let instance = await TorusCoin.new(dateTime, founder);

        {
            let result = await
                instance.buy(sendTo, {value: toWei(1)});
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.sender, owner);
            assert.equal(log.recipient, sendTo);
            assert.equal(log.tokens, tokens(utils.firstStageRate * 1));
        }

        {
            let result = await instance.balanceOf(sendTo);
            logger.log(result);
            assert.equal(result, tokens(utils.firstStageRate * 1));
        }
    });
    it("buy case 3", async function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        let sendTo = accounts[2];

        logger.log(owner);

        let instance = await TorusCoin.new(dateTime, founder);

        await utils.wait(1000)

        {
            let result = await instance.buy(sendTo, {value: toWei(0.6)});
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.sender, owner);
            assert.equal(log.recipient, sendTo);
            assert.equal(log.tokens, tokens(utils.firstStageRate * 0.6));
        }
        {
            let result = await instance.balanceOf(sendTo);
            logger.log(result);
            assert.equal(result, tokens(utils.firstStageRate * 0.6));
        }
    });

    it("buy case 4", async function () {
        let dateTime = Math.floor(Date.now() / 1000);
        let coin = null;
        let owner = accounts[0];
        let sendTo = accounts[2];

        logger.log(owner);

        let instance = await TorusCoin.new(dateTime, founder);

        await utils.wait(1000)

        {
            let result = await instance.buy(sendTo, {value: toWei(10)});
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.sender, owner);
            assert.equal(log.recipient, sendTo);
            assert.equal(log.tokens, tokens(utils.firstStageRate * 10));
        }
        {
            let result = await instance.balanceOf(sendTo);
            logger.log(result);
            assert.equal(result, tokens(utils.firstStageRate * 10));
        }
    });

    it("buy on second stage", async function () {
        let dateTime = Math.floor(Date.now() / 1000 - (4+1)*24*60*60);
        let coin = null;
        let owner = accounts[0];
        let sendTo = accounts[2];

        logger.log(owner);

        let instance = await TorusCoin.new(dateTime, founder);

        await utils.wait(1000)

        {
            let result = await instance.buy(sendTo, {value: toWei(1)});
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.sender, owner);
            assert.equal(log.recipient, sendTo);
            assert.equal(log.tokens, tokens(utils.secondStageRate * 1));
        }
        {
            let result = await instance.balanceOf(sendTo);
            logger.log(result);
            assert.equal(result, tokens(utils.secondStageRate * 1));
        }
    });

    it("buy on third stage", async function () {
        let dateTime = Math.floor(Date.now() / 1000 - (4+1+5+1)*24*60*60);
        let coin = null;
        let owner = accounts[0];
        let sendTo = accounts[3];

        logger.log(owner);

        let instance = await TorusCoin.new(dateTime, founder);

        await utils.wait(1000)

        {
            let result = await instance.buy(sendTo, {value: toWei(1)});
            logger.log(result);
            let log = result.logs[0].args;
            assert.equal(log.sender, owner);
            assert.equal(log.recipient, sendTo);
            assert.equal(log.tokens, tokens(utils.thirdStageRate * 1));
        }
        {
            let result = await instance.balanceOf(sendTo);
            logger.log(result);
            assert.equal(result, tokens(utils.thirdStageRate * 1));
        }
    });


});

/**
 * Created by lilong on 2017/04/04.
 */
const TorusCoin = artifacts.require('./TorusCoin.sol')
const utils = require('./utils')
const logger = utils.logger
const toWei = utils.toWei
const tokens = utils.tokens

contract('Buy TorusCoin 2', function (accounts) {
    console.log(accounts)
    let founder = accounts[1]

    //Fetch deployed contracts
    before('fetch deployed instances', function () {
    })

    it("buy before ico", async function () {
        let now = new Date();
        let dateTime = Math.floor(Date.now() / 1000) + 1
        let coin = null;
        let owner = accounts[0];
        let sendTo = accounts[1];

        logger.log(owner);
        let instance = await TorusCoin.new(dateTime, founder);

        try {
            let result = await instance.buy(sendTo, {value: toWei(1)});
            logger.log(result);
            assert.isTrue(false, 'at here must raise an exception')
        } catch (e) {
            logger.log(e);
            assert.instanceOf(e, Error);
            assert.equal(e.message, 'VM Exception while processing transaction: revert')

        }
    });

    it('buy token after ico finished', async function () {
        let now = new Date()
        let dateTime = Math.floor(Date.now() / 1000) - (31)*24*60*60 -1
        let coin = null
        let owner = accounts[0]
        let sendTo = accounts[1];

        let instance = await TorusCoin.new(dateTime, founder)

        try {
            let result = await instance.buy(sendTo, {value: toWei(1)});
            logger.log(result);
            assert.isTrue(false, 'at here must raise an exception')
        } catch (e) {
            logger.log(e);
            assert.instanceOf(e, Error);
            assert.equal(e.message, 'VM Exception while processing transaction: revert')
        }
    })

    it('buy token under 0.01eth', async function () {
        let now = new Date()
        let dateTime = Math.floor(Date.now() / 1000)
        let coin = null
        let owner = accounts[0]
        let sendTo = accounts[1];

        let instance = await TorusCoin.new(dateTime, founder)

        try {
            let result = await instance.buy(sendTo, {value: toWei(0.009)});
            logger.log(result);
            assert.isTrue(false, 'at here must raise an exception')
        } catch (e) {
            logger.log(e);
            assert.instanceOf(e, Error);
            assert.equal(e.message, 'VM Exception while processing transaction: revert')
        }
    })

})

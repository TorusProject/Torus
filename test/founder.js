const TorusCoin = artifacts.require('./TorusCoin.sol')
const utils = require('./utils')
const logger = utils.logger
const toWei = utils.toWei
const tokens = utils.tokens

contract('Administrator of TorusCoin', function (accounts) {
    logger.log(accounts)
    let owner = accounts[0]
    let founder = accounts[1]
    let user1 = accounts[2]
    let user2 = accounts[3]

    it('alloc founder token before ico finished ', async function () {
        let dateTime = Math.floor(Date.now() / 1000)

        let instance = await TorusCoin.new(dateTime, founder)
        try {
            let result = await instance.allocateFounderTokens()
            logger.log(result)
            assert.isTrue(false, 'at here must raise an exception')
        } catch (e) {
            logger.log(e)
            assert.instanceOf(e, Error)
            assert.equal(e.message, 'VM Exception while processing transaction: invalid opcode')
        }
    })

    it('alloc founder token after crowsale ', async function () {
        let dateTime = Math.floor(Date.now() / 1000) - (4 + 3 + 7 + 4 + 13) * 24 * 60 * 60 - 1

        let instance = await TorusCoin.new(dateTime, founder)
        let result = await instance.allocateFounderTokens()
        logger.log(result)
        let holdCoin = await  instance.balanceOf(founder)
        logger.log(holdCoin)
        assert.equal(parseFloat(holdCoin), tokens(utils.founderAmount))

    })

    it('double alloc founder token after crowsale ', async function () {
        let dateTime = Math.floor(Date.now() / 1000) - (4 + 3 + 7 + 4 + 13) * 24 * 60 * 60 - 1

        let instance = await TorusCoin.new(dateTime, founder)
        let result = await instance.allocateFounderTokens()
        logger.log(result)
        let holdCoin = await  instance.balanceOf(founder)
        logger.log(holdCoin)
        assert.equal(parseFloat(holdCoin), tokens(utils.founderAmount))

        try {
            let result = await instance.allocateFounderTokens()
            logger.log(result)
            assert.isTrue(false, 'at here must raise an exception')
        } catch (e) {
            logger.log(e)
            assert.instanceOf(e, Error)
            assert.equal(e.message, 'VM Exception while processing transaction: invalid opcode')
        }

    })

    it('alloc founder token after crowsale by user', async function () {
        let dateTime = Math.floor(Date.now() / 1000) - (4 + 3 + 7 + 4 + 13) * 24 * 60 * 60 - 1

        let instance = await TorusCoin.new(dateTime, founder)

        try {
            let result = await instance.allocateFounderTokens({from: user1})
            logger.log(result)
            assert.isTrue(false, 'at here must raise an exception')
        } catch (e) {
            logger.log(e)
            assert.instanceOf(e, Error)
            assert.equal(e.message, 'VM Exception while processing transaction: invalid opcode')
        }

    })

    it('alloc angel tokens ', async function () {
        let dateTime = Math.floor(Date.now() / 1000)

        let angel1 = accounts[1]
        let angel2 = accounts[2]
        let angel3 = accounts[3]

        const amount = 100000

        let instance = await TorusCoin.new(dateTime, founder)
        {

            let result = await instance.allocateAngelTokens(angel1, tokens(amount))
            logger.log(result)
            let holdCoin = await  instance.balanceOf(angel1)
            logger.log(holdCoin)
            assert.equal(parseFloat(holdCoin), tokens(amount))
        }

        {

            let result = await instance.allocateAngelTokens(angel2, tokens(amount))
            logger.log(result)
            let holdCoin = await  instance.balanceOf(angel2)
            logger.log(holdCoin)
            assert.equal(parseFloat(holdCoin), tokens(amount))
        }

        {

            let result = await instance.allocateAngelTokens(angel2, tokens(amount))
            logger.log(result)
            let holdCoin = await  instance.balanceOf(angel2)
            logger.log(holdCoin)
            assert.equal(parseFloat(holdCoin), tokens(amount * 2))
        }
    })

    it('inflate unsold tokens after iCO', async function () {
        let dateTime = Math.floor(Date.now() / 1000) - (4 + 3 + 7 + 4 + 13) * 24 * 60 * 60 - 1

        let holder = accounts[1]

        const amount = 100000

        let instance = await TorusCoin.new(dateTime, founder)

        let result = await instance.inflate(holder, tokens(amount))
        logger.log(result)
        let holdCoin = await  instance.balanceOf(holder)
        logger.log(holdCoin)
        assert.equal(parseFloat(holdCoin), tokens(amount))

    })

    it('inflate unsold tokens during iCO', async function () {
        let dateTime = Math.floor(Date.now() / 1000)

        let holder = accounts[1]

        const amount = 100000

        let instance = await TorusCoin.new(dateTime, founder)

        try {
            let result = await instance.inflate(holder, tokens(amount))
            logger.log(result)
            assert.isTrue(false, 'at here must raise an exception')
        } catch (e) {
            logger.log(e)
            assert.instanceOf(e, Error)
            assert.equal(e.message, 'VM Exception while processing transaction: invalid opcode')
        }

    })

    it('alloc angel tokens by user', async function () {
        let dateTime = Math.floor(Date.now() / 1000) - (120 + 240 + 2040) * 60 * 60 - 1

        try {
            let instance = await TorusCoin.new(dateTime, founder)
            let result = await instance.allocateAngelTokens(user1, tokens(1000), {from: user1})
            assert.isTrue(false, 'at here must raise an exception')
        } catch (e) {
            logger.log(e)
            assert.instanceOf(e, Error)
            assert.equal(e.message, 'VM Exception while processing transaction: invalid opcode')
        }

    })

    it('admin halt', async function () {
        let dateTime = Math.floor(Date.now() / 1000) - 1

        let instance = await TorusCoin.new(dateTime, founder)
        let result = await instance.sendTransaction({value: toWei(1), from: user1})
        logger.log(result)
        try {
            {
                let result = await instance.halt();
                logger.log(result)
            }

            let result = await instance.sendTransaction({value: toWei(1), from: user1})
            assert.isTrue(false, 'at here must raise an exception')

        } catch (e) {
            logger.log(e)
            assert.instanceOf(e, Error)
            assert.equal(e.message, 'VM Exception while processing transaction: invalid opcode')
        }

        {
            let result = await instance.unhalt();
            logger.log(result)
        }

        {
            let result = await instance.sendTransaction({value: toWei(1), from: user1})
            logger.log(result)

        }

    })

})

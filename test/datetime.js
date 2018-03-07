const TorusCoin = artifacts.require("./TorusCoin.sol");
const utils = require("./utils");
const logger = utils.logger;
const toWei = utils.toWei;
const tokens = utils.tokens;

contract('Date Range of TorusCoin', function (accounts) {
    logger.log(accounts);
    let founder = accounts[1];

    it("start time case 1", async function () {
        let wantDate = new Date('2018-03-16T00:00:00Z')

        let instance = await TorusCoin.deployed();
        let startDatetime = await instance.startDatetime();
        logger.log(startDatetime)
        {
            let timestamp = Math.floor(wantDate.valueOf() / 1000);
            logger.log(timestamp)
            assert.equal(startDatetime, timestamp);
        }

        let endDatetime = await instance.endDatetime();
        {
            let timestamp = parseFloat(startDatetime) + 31 * 24 * 60 * 60;
            assert.equal(endDatetime, timestamp);

            const date = new Date(endDatetime*1000)
            console.info(date.toISOString())
        }

    });

    it("start time case 2", async function () {
        let wantDate = Math.floor(Date.now() / 1000);

        let instance = await TorusCoin.new(wantDate, founder);
        let startDatetime = await instance.startDatetime();
        logger.log(startDatetime)
        {
            let timestamp = wantDate.valueOf();
            logger.log(timestamp)
            assert.equal(startDatetime, timestamp);
        }

        let endDatetime = await instance.endDatetime();
        {
            let timestamp = parseFloat(startDatetime) + 31 * 24 * 60 * 60;
            assert.equal(endDatetime, timestamp);
        }


    });
});

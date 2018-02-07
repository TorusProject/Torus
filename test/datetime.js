const TorusCoin = artifacts.require("./TorusCoin.sol");
const utils = require("./utils");
const logger = utils.logger;
const toWei = utils.toWei;
const tokens = utils.tokens;

contract('Date Range of TorusCoin', function (accounts) {
    logger.log(accounts);
    let founder = accounts[1];

    it("start time case 1", async function () {
        let wantDate = new Date('2018-01-01T00:00:00Z')

        let instance = await TorusCoin.deployed();
        let firstStartDatetime = await instance.firstStartDatetime();
        logger.log(firstStartDatetime)
        {
            let timestamp = Math.floor(wantDate.valueOf() / 1000);
            logger.log(timestamp)
            assert.equal(firstStartDatetime, timestamp);
        }

        let firstEndDatetime = await instance.firstEndDatetime();
        {
            let timestamp = parseFloat(firstStartDatetime) + 4 * 24 * 60 * 60;
            assert.equal(firstEndDatetime, timestamp);
        }

        let secondStartDatetime = await instance.secondStartDatetime();
        {
            let timestamp = parseFloat(firstEndDatetime) + 3 * 24 * 60 * 60;
            assert.equal(secondStartDatetime, timestamp);
        }

        let secondEndDatetime = await instance.secondEndDatetime();
        {
            let timestamp = parseFloat(secondStartDatetime) + 7 * 24 * 60 * 60;
            assert.equal(secondEndDatetime, timestamp);
        }

        let thirdStartDatetime = await instance.thirdStartDatetime();
        {
            let timestamp = parseFloat(secondEndDatetime) + 4 * 24 * 60 * 60;
            assert.equal(thirdStartDatetime, timestamp);
        }

        let thirdEndDatetime = await instance.thirdEndDatetime();
        {
            let timestamp = parseFloat(thirdStartDatetime) + 13 * 24 * 60 * 60;
            assert.equal(thirdEndDatetime, timestamp);
        }

        let lastInflationDatetime = await instance.lastInflationDatetime();
        {
            let timestamp = parseFloat(thirdStartDatetime) + 13 * 24 * 60 * 60;
            assert.equal(lastInflationDatetime, timestamp);
        }

    });

    it("start time case 2", async function () {
        let wantDate = Math.floor(Date.now() / 1000);

        let instance = await TorusCoin.new(wantDate, founder);
        let firstStartDatetime = await instance.firstStartDatetime();
        logger.log(wantDate, firstStartDatetime)
        {
            let timestamp = wantDate;
            logger.log(timestamp)
            assert.equal(firstStartDatetime, timestamp);
        }

        let firstEndDatetime = await instance.firstEndDatetime();
        {
            let timestamp = parseFloat(firstStartDatetime) + 4 * 24 * 60 * 60;
            assert.equal(firstEndDatetime, timestamp);
        }

        let secondStartDatetime = await instance.secondStartDatetime();
        {
            let timestamp = parseFloat(firstEndDatetime) + 3 * 24 * 60 * 60;
            assert.equal(secondStartDatetime, timestamp);
        }

        let secondEndDatetime = await instance.secondEndDatetime();
        {
            let timestamp = parseFloat(secondStartDatetime) + 7 * 24 * 60 * 60;
            assert.equal(secondEndDatetime, timestamp);
        }

        let thirdStartDatetime = await instance.thirdStartDatetime();
        {
            let timestamp = parseFloat(secondEndDatetime) + 4 * 24 * 60 * 60;
            assert.equal(thirdStartDatetime, timestamp);
        }

        let thirdEndDatetime = await instance.thirdEndDatetime();
        {
            let timestamp = parseFloat(thirdStartDatetime) + 13 * 24 * 60 * 60;
            assert.equal(thirdEndDatetime, timestamp);
        }

        let lastInflationDatetime = await instance.lastInflationDatetime();
        {
            let timestamp = parseFloat(thirdStartDatetime) + 13 * 24 * 60 * 60;
            assert.equal(lastInflationDatetime, timestamp);
        }
    });
});

/**
 * Created by lilong on 2017/04/04.
 */
const logger = require("tracer").console({
    level: 'log',
    inspectOpt: {
        showHidden: true, //the object's non-enumerable properties will be shown too
        depth: null
    }
});

const toWei = function (amount) {
    return web3.toWei(amount, 'ether');
}

const tokens = function (amount) {
    return amount * 10 ** 18;
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

const founderAmount = 300 * 10**4 * 10**4
const angelStageRate = 40 * 10**4
const firstStageRate = 35 * 10**4


module.exports = {
    logger, toWei, tokens, wait,
    founderAmount,
    angelStageRate, firstStageRate
};

//console.log(global);

<template>
    <div class="am-container">
        <h2>TorusCoin管理</h2>
        <h4 v-if="isTestNetwork">テストネットワーク</h4>

        <div class="am-g">
            <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">コンタラクトアドレス</div>
            <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                <div><code>{{ contractAddress }}</code>
                    <a :href="etherscan + contractAddress"><img src="https://etherscan.io/images/favicon2.ico"
                                                                width="20"></a>
                </div>
                <div class="text-center" id="qrcode" ref="qrCode">
                </div>
            </div>
            <h4>詳細</h4>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Name</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ name }}
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Symbol</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ symbol }}
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Decimals</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ decimals }}
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">売上ETH数量</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ salesVolume }} ETH
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">Tokenの売出し数量</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ totalSupply }} TORUS
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">開始時間</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ startDatetime | format }}
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">終了時間</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ endDatetime | format}}
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">チームワーレットアドレス</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    <a :href="etherscan + founderAddress">{{founderAddress}}</a>
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">管理人アドレス</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    <a :href="etherscan + adminAddress">{{adminAddress}}</a>
                </div>
            </div>
            <hr>
            <div class="am-g">
                <form class="am-form-inline" role="form">

                    <div class="am-form-group">
                        アドレス:<input type="text" class="am-form-field" placeholder="0xABC...XYZ Addresss"
                                    v-model="inputQueryAddress">
                    </div>
                    <!--<div class="am-form-group">-->
                    <!--{{ queryETHBalance }} ETH-->
                    <!--</div>-->
                    <div class="am-form-group">
                        {{ queryTokenBalance }} {{ symbol }}
                    </div>
                    <button type="button" class="am-btn am-btn-default" v-on:click="queryBalance">TOKEN残高確認</button>
                </form>
            </div>
        </div>
        <p></p>
        <div v-if="walletProvider">
            <h4>MetaMask</h4>
            <div class="am-g" v-if="isTestNetwork && network.chain == 'mainnet'">
                <div class="am-panel am-panel-danger">
                    <strong>イーサリアムネットワーク一致ではない</strong>
                </div>
            </div>
            <div class="am-g">
                <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">ネットワーク</div>
                <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                    {{ network.chain }}
                </div>
            </div>
            <div v-if=" accounts.length>0 ">
                <div class="am-g">
                    <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">アカウント</div>
                    <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                        {{ accounts[0] }}
                    </div>
                </div>
                <div class="am-g">
                    <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">ETH残高</div>
                    <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                        {{ balance }} ETH
                    </div>
                </div>
                <div class="am-g">
                    <div class="am-u-sm-6 am-u-md-4 am-u-lg-3">TOKEN残高</div>
                    <div class="am-u-sm-6 am-u-md-8 am-u-lg-9">
                        {{ tokenBalance }} {{ symbol }}
                    </div>
                </div>

                <hr>
                <div class="am-g">
                    <form class="am-form-inline" role="form">
                        <div class="am-form-group">
                            <input type="number" class="am-form-field" placeholder="xx ETH" v-model="inputEth">ETH
                        </div>
                        <button type="button" class="am-btn am-btn-default" v-on:click="buyToken">投資する</button>
                    </form>
                </div>
                <hr>

                <div class="am-g">
                    <form class="am-form-inline" role="form">

                        <div class="am-form-group">
                            発送先アドレス:<input type="text" class="am-form-field" placeholder="0xABC...XYZ Addresss"
                                           v-model="inputTransferAddress">
                        </div>
                        <div class="am-form-group">
                            <input type="number" class="am-form-field" placeholder="xx " v-model="inputToken">{{ symbol }}
                        </div>
                        <button type="button" class="am-btn am-btn-default" v-on:click="transferToken">発送</button>
                    </form>
                </div>
                <hr>

                <div class="am-g">
                    <form class="am-form-inline" role="form">
                        <div class="am-form-group">
                            停止状態:{{ halted }}
                        </div>
                        <button type="button" class="am-btn am-btn-default" v-on:click="startContract" v-if="halted">
                            開始
                        </button>
                        <button type="button" class="am-btn am-btn-default" v-on:click="stopContract" v-else>一時停止
                        </button>
                    </form>
                </div>

                <hr>
                <div class="am-g">
                    <form class="am-form-inline" role="form">
                        <div class="am-form-group">
                            チーム所有の配分状態:{{ founderAllocated }}
                        </div>
                        <button type="button" class="am-btn am-btn-default" v-on:click="allocFounder"
                                v-if="!founderAllocated">配分
                        </button>
                    </form>
                </div>

            </div>
            <div v-else>MetaMaskをアンロックしてください</div>
        </div>
        <div v-else>
            <h4>MetaMask未検出</h4>
        </div>

    </div>
</template>
<style>
    body {
    }
</style>

<script>
    const Web3 = require('web3')
    const moment = require('moment')
    moment.locale('ja')

    const QRCode = require('qrcodejs2')

    const mainnet = 'https://mainnet.infura.io/YhHYu1TQSarPFPYvEQbW'
    const testnet = 'https://ropsten.infura.io/YhHYu1TQSarPFPYvEQbW'
    //使用测试网络
    const network = mainnet

    //
    let web3

    module.exports = {
        data() {
            return {
                isTestNetwork: false,
                contractAddress: '0x1C9F0f414A3e75Ee6dA0b9f060143c9277169473',//'0xc6eba9b4816d7693eb4ec6ca7e03c27010e96da0',
                walletProvider: undefined,
                infuraProvider: '',
                accounts: [],
                balance: 0,
                network: {},
                name: '',
                symbol: '',
                decimals: 0,
                salesVolume: 0,
                startDatetime: null,
                endDatetime: null,
                founderAddress: "",
                adminAddress: "",
                contractInstance: null,
                currentAccount: null,
                tokenBalance: 0,
                totalSupply: 0,
                inputEth: 0.1,
                inputToken: 100,
                inputTransferAddress: '',
                halted: false,
                founderAllocated: false,
                inputQueryAddress: '',
                queryEthBalance: 0,
                queryTokenBalance: 0,
                etherscan: 'https://etherscan.io/address/',
                bonusRate: 0
            }
        },

        filters: {
            format(date) {
                if (date)
                    return date.format('LLLL') + ' ' + date.fromNow()
                else return ''
            }
        },

        components: {},

        methods: {
            wait(ms) {
                let start = new Date().getTime()
                let end = start
                while (end < start + ms) {
                    end = new Date().getTime()
                }
            },

            showQR() {
                const text = this.contractAddress
                console.log(this.$refs)
                this.$refs.qrCode.innerHTML = ''
                new QRCode(this.$refs.qrCode, {
                    text: text,
                    width: 150,
                    height: 150,
                })
            },
            async showContractInfo() {
                let instance = this.contractInstance

                this.name = await instance.methods.name().call()
                this.symbol = await instance.methods.symbol().call()
                let decimals = await instance.methods.decimals().call()
                this.decimals = parseInt(decimals)
                let salesVolume = await instance.methods.salesVolume().call()

                this.salesVolume = parseFloat(web3.utils.fromWei(salesVolume.toString(), 'ether'))

                let totalSupply = await instance.methods.totalSupply().call()
                this.totalSupply = parseFloat(web3.utils.fromWei(totalSupply.toString(), 'ether'))

                let startDatetime = await instance.methods.startDatetime().call()
                this.startDatetime = new moment(startDatetime * 1000)
                let endDatetime = await instance.methods.endDatetime().call()
                this.endDatetime = new moment(endDatetime * 1000)

                this.halted = await instance.methods.halted().call()
                this.founderAllocated = await instance.methods.founderAllocated().call()
                this.founderAddress = await instance.methods.founder().call()
                this.adminAddress = await instance.methods.admin().call()

            },
            async getBalance(account) {
                web3.eth.getBalance(account, (err, balance) => {
                    if (err) {
                        console.log(err, balance)
                        return
                    }
                    this.balance = parseFloat(web3.utils.fromWei(balance.toString(), 'ether'))

                })
                let instance = this.contractInstance
                let tokenBalance = await instance.methods.balanceOf(account).call()
                this.tokenBalance = parseFloat(web3.utils.fromWei(tokenBalance.toString(), 'ether'))

            },
            updateAccount() {

                web3.eth.getAccounts((err, accounts) => {
                    console.log(err, accounts)

                    if (err) {
                        console.log(err, accounts)
                        return
                    }
                    this.accounts = accounts
                    if (accounts.length > 0) {
                        this.currentAccount = accounts[0];
                        this.getBalance(this.currentAccount)
                    }
                })

                web3.eth.getBlock(0, (err, block) => {

                    var data = {}
                    this.network = data
                    if (err) {
                        console.log(err, accounts)
                        return
                    }

                    if (block && block.hash === '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3') {
                        data.chain = 'mainnet'
                        data.etherscan = 'https://etherscan.io'
                    }
                    else if (block && block.hash === '0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d') {
                        data.chain = 'ropsten'
                        data.etherscan = 'https://testnet.etherscan.io'
                    }
                    else if (block && block.hash === '0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9') {
                        data.chain = 'kovan'
                        data.etherscan = 'https://kovan.etherscan.io'
                    }
                    else {
                        data.chain = 'privatenet'
                        data.etherscan = 'https://testnet.etherscan.io'
                    }
                    this.network = data

                })

//        web3.version.getNetwork((err, result) => {
//
//          console.log(err, result)
//        })
            },

            async buyToken() {
                let instance = this.contractInstance
                let result = await instance.sendTransaction({value: web3.toWei(this.inputEth.toString())})
                console.log(result)

            },

            async transferToken() {
                let instance = this.contractInstance
                let result = instance.methods.transfer(this.inputTransferAddress, web3.utils.toWei(this.inputToken.toString())).send({
                    from: this.currentAccount,
                }).on('error', async (err) => {
                    console.error(err)
                })
                console.log(result)

            },

            async startContract() {
                let instance = this.contractInstance
                let result = instance.methods.unhalt().send({
                    from: this.currentAccount,
                }).on('error', async (err) => {
                    console.error(err)
                })
                console.log(result)

            },

            async stopContract() {
                let instance = this.contractInstance
                let result = instance.methods.halt().send({
                    from: this.currentAccount,
                }).on('error', async (err) => {
                    console.error(err)
                })
                console.log(result)

            },

            async allocFounder() {
                let instance = this.contractInstance
                let result = instance.methods.allocateFounderTokens().send({
                    from: this.currentAccount,
                }).on('error', async (err) => {
                    console.error(err)
                })
                console.log(result)

            },

            async queryBalance() {
                web3.eth.getBalance(this.inputQueryAddress, (err, balance) => {
                    if (err) {
                        console.log(err, balance)
                        return
                    }
                    this.queryEthBalance = parseFloat(web3.utils.fromWei(balance.toString(), 'ether'))

                })
                let instance = this.contractInstance
                let tokenBalance = await instance.methods.balanceOf(this.inputQueryAddress).call()
                console.log(tokenBalance)
                this.queryTokenBalance = parseFloat(web3.utils.fromWei(tokenBalance.toString(), 'ether'))

            },


        },

        mounted() {

            //显示二维码
            this.showQR()

            //判断是否有web钱包
            let provider
            if (typeof window.web3 !== 'undefined') {
                provider = this.walletProvider = window.web3.currentProvider
            } else {
                provider = this.infuraProvider = new Web3.providers.HttpProvider(network)
            }

            console.log(web3, window.web3)
            console.log(provider, this.walletProvider, this.infuraProvider)

            web3 = new Web3(provider)

            const ContractSource = require('../contracts/TorusCoin.json')
            const contractInstance = new web3.eth.Contract(ContractSource.abi, this.contractAddress)
            this.contractInstance = contractInstance

            this.showContractInfo()

            this.updateAccount()
            setInterval(() => {
                web3.eth.getAccounts((err, accounts) => {
                    if (err) {
                        console.log(err, accounts)
                        return
                    }

                    if (accounts[0] !== this.accounts[0]) {
                        this.updateAccount()
                    }
                })
            }, 2000)

        }
    }

</script>

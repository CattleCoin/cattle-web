<template>
  <div class="croot">
    <div class="header">
      <div class="header-content">
        <div class="header-content-name">Tortoise markets</div>
        <div class="header-content-btns">
          <el-button type="text" @click="pledgeHandler">Pledge</el-button>
          <el-button type="text" @click="createGame">Create</el-button>
          <el-button type="text" @click="gotoDocument">Document</el-button>
          <!-- <el-button type="info" size="mini">Quick Guide</el-button> -->
          <el-button type="success" icon="el-icon-wallet" @click="connectWallet">{{connectShowAddress}}</el-button>
        </div>
      </div>
    </div>
    <div class="system">
      <div class="system-content">
        <div class="system-title">SYSTEM</div>

      </div>
    </div>
    <div class="main">
      <div class="main-content">
        <div v-for="item in systemItems" :key="item.id" class="main-content-item">
          <BetItem :parentObj=item @clickItemEvent="clickItemHandler"></BetItem>
        </div>
      </div>
    </div>
    <div class="system">
      <div class="system-content">
        <div class="system-title">CUSTOM</div>
        <!-- <div>  <el-button type="info" size="mini">Quick Guide</el-button> </div> -->
      </div>
    </div>
    <div class="main">
      <div class="main-content">
        <div v-for="item in customItems" :key="item.id" class="main-content-item">
          <BetItem :parentObj=item @clickItemEvent="clickItemHandler"></BetItem>
        </div>
      </div>
    </div>
    <div class="footer">footer</div>

    <div>
      <el-dialog
        title="BETTING"
        :visible.sync="centerDialogVisible"
        width="500px"
        custom-class="cdialog"
        center>
        <div class="betdetail">
          <!-- <div class="betdetail-left">
            You need to attach the @Component decorator to a class directly and you will not get anything until you bootstrap your root component

I am assuming you main root component is PonyComponent

Here's a edited version of your code
          </div> -->
          <div class="betdetail-content">
            <div>Name: <span class="betdetail-value">{{gameDetail.name}}</span></div>
            <div>Total Players: <span class="betdetail-value">{{gameDetail.players}}</span></div>
            <div>Small Pool: <span class="betdetail-value">{{gameDetail.big}}</span> <span class="dw">MATIC</span></div>
            <div>Big Pool: <span class="betdetail-value">{{gameDetail.small}} </span><span class="dw">MATIC</span></div>
            <div class="right-select">
              <div>Option:</div>
              <div class="right-select-items">
                <el-radio v-model="bigsmallradio" label="1">Small</el-radio>
                <el-radio v-model="bigsmallradio" label="2">Big</el-radio>
              </div>
            </div>

            <div class="right-select">
              <div>Amount:</div>
              <div class="right-select-items">
                <el-input size="mini" v-model="betAmount" placeholder="INPUT AMOUNT"></el-input>
              </div>
              <div><span class="dw">MATIC</span></div>
            </div>

          </div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="betHandler">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        title="Create Game"
        :visible.sync="createGameDialogVisible"
        width="700px"
        custom-class="cdialog"
        center>
        <div class="createGameDetail">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="name" required>
              <el-input v-model="form.name" maxlength="30" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="cover" required>
              <el-input v-model="form.cover" placeholder="image url" maxlength="120" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="duration" required>
              <el-input v-model="form.duration" placeholder="duration(minutes)" max="10080" min="10"></el-input>
            </el-form-item>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmCreateGame">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog
      title="Pledge"
        :visible.sync="pledgeDialogVisible"
        width="500px"
        custom-class="cdialog"
        center>
        <div class="createGameDetail">
          <el-form ref="pledgeForm" :inline="true" :model="pledgeForm">
            <el-form-item label="amount" required>
              <!-- <el-input v-model="pledgeForm.amount"></el-input> -->
              <el-input-number v-model="pledgeForm.amount" :min="10" :max="1000000" label="描述文字">
              </el-input-number>
              <div class="matic">matic</div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="confirmPledge">确 定</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="pledgeDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmPledge">确 定</el-button>
        </span> -->
      </el-dialog>
    </div>
  </div>

</template>

<script>
import BetItem from './BetItem'
import {post} from '../request/http'
import {pledge, connectWallet, betting} from '../request/ether'

export default {
  components: {
    BetItem
  },
  name: 'HelloWorld',
  data () {
    return {
      betAmount: null,
      bigsmallradio: 0,
      systemItems: [{ id: 1, name: 'game1' }, {id: 2, name: 'game2'}, {id: 3}, {id: 4}],
      customItems: [{ id: 1, name: 'game1' }, {id: 2, name: 'game2'}, {id: 3}, {id: 4}],
      count: 10,
      loading: false,
      testurl: 'https://img1.baidu.com/it/u=3760402741,2870972263&fm=253&fmt=auto&app=138&f=PNG?w=256&h=256',
      msg: 'Welcome to Your Vue.js App',
      connectAddress: '',
      connectShowAddress: 'connect wallet',
      connectStatus: false,
      centerDialogVisible: false,
      createGameDialogVisible: false,
      pledgeDialogVisible: false,
      gameDetail: {
        owner: 'xxxxx',
        players: 111,
        small: 11,
        big: 22,
        name: 'abcd'
      },
      form: {
        name: '',
        cover: '',
        duration: ''
      },
      pledgeForm: {
        amount: 10
      }
    }
  },
  computed: {
  },
  created () {
    post('/tortoises/v1/games', {
      type: 1,
      data: {}
    }).then((res) => {
      // 接口调用成功回调
      console.log('success: ', res)

      this.$data.systemItems = res.data
      this.$data.customItems = res.data
    }).catch((error) => {
      console.log('err: ', error)
    })
  },
  methods: {
    gotoDocument () {
      window.open('https://github.com/tortoisebtc/Document')
    },
    pledgeHandler () {
      this.pledgeDialogVisible = true
    },
    confirmPledge () {
      console.log('test', this.connectAddress)
      let value = parseInt(this.pledgeForm.amount) * 1e18
      pledge(this.connectAddress, value)
        .then(res => {
          this.pledgeDialogVisible = false
        })
        .catch((_error) => {
          this.walletTip()
        })
    },
    walletTip () {
      this.$message({
        showClose: true,
        message: '请先链接钱包',
        type: 'error'
      })
    },
    createGame () {
      this.createGameDialogVisible = true
    },
    confirmCreateGame () {
      this.createGameDialogVisible = false
    },
    betHandler () {
      this.centerDialogVisible = false

      betting(this.connectAddress, '0x8ac7230489e80000')
        .then((txHash) => console.log(txHash))
        .catch((error) => console.log(error))
    },
    clickItemHandler (id) {
      console.log('parent ', id)
      this.centerDialogVisible = true
    },
    connectWallet () {
      console.log('click ', this.connectStatus)
      if (this.connectStatus) {
        this.$data.connectStatus = false
        this.$data.connectAddress = ''
        this.$data.connectShowAddress = 'connect wallet'
        return
      }

      connectWallet().then(res => {
        this.$data.connectAddress = res
        this.$data.connectStatus = true
        this.$data.connectShowAddress = res.substring(0, 7) + '...' + res.substr(-4, 4)
      }).catch(e => {
        alert('请安装metamask钱包')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* <style scoped> */
.croot {
  margin: 0;
  padding: 0;
  /* background-color: #B3C0D1; */
  display: flex;
  flex-direction: column;
  /* background-image: url('https://competitions.mojito.markets/_next/static/media/bg-min.8fd9fd65.png') */

  /* background: linear-gradient(70deg, black, white);
   */
   /* background-image: linear-gradient(to top, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%); */
   /* background-image: linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%); background-blend-mode: normal, lighten, soft-light; */

  }

  .matic {
    font-size: 20;
    color: aliceblue;
    display: inline-block;
  }
  .el-radio__input.is-checked .el-radio__inner {
    background-color: greenyellow;
    background: greenyellow;
  }
  .el-radio {
    color: aliceblue;
    font-size: 14px;

  }
  .el-form-item__content {
    font-size: 18px;
  }
  .el-radio__input.is-checked+.el-radio__label {
    color: greenyellow;
    font-size: 20px;
  }

 .header {
    /* background-color: #292c30; */
    color: rgb(231, 219, 219);
    line-height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: rgb(105, 104, 104);
    position: fixed;
    width: 100%;
    top: 0;
  }

  .header .el-button--text {
    font-size: 16px;
    /* color: hsl(0, 20%, 96%); */
  }

  .header-content {
    width: 80%;
    /* background-color: #5a93dd; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    max-width: 1200px;
  }

  .header-content-name {
    font-size: 20px;
    font-weight: 600;
  }

  .header-content-btns {
    /* align-self: flex-end; */
    /* background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%); */
    display: flex;
    flex-direction: row;
  }

  .system {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    border-bottom: #a6d480;
  }
  .system-content {
    display: flex;
    flex-direction: row;
    width: 80%;
    max-width: 1100px;
    align-items: center;
    justify-content: space-between;
  }
  .system-title {
    font-weight: 600;
    font-size: 30px;
    color: aliceblue;
  }

  .main {
    /* background-color: rgb(212, 188, 155); */
    display: flex;
    justify-content: center;
  }
  .main-content {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1200px;
  }

  .main-content-item {
    margin: 20px;
  }

  .cdialog {
    border-radius: 30px;
    background-color: rgb(106 104 104);
    /* background-color: rgb(31, 29, 29); */
    color: aliceblue;
    border: 1px solid rgb(105, 104, 104);
  }
  .el-form-item__label {
    color: antiquewhite;
  }

  .betdetail {
    display: flex;
    flex-direction: row;

  }
  .el-dialog__title {
    color: aliceblue;
  }
  .betdetail-left {
    /* width: 500px; */
    height: 300px;
    background-color: #B3C0D1;
  }
  .dw {
    font-size: 14px;
  }

  .betdetail-content {
    width: 400px;
    height: 200px;
    font-size: 20px;
    font-weight: 400;
    margin-left: 10px;
    color: rgb(245, 238, 238);
  }

  .betdetail-content > div {
    margin-bottom: 5px;
  }
  .betdetail-value {
    color: #a6d480;
    font-size: 20px;
    margin-left: 10px;
  }
  .right-select {
    margin: 18px 0px;
    display: flex;
    flex-direction: row;
  }
  .right-select-items {
    margin-left: 10px;
  }
  .right-select-items > input {
    width: 150px;
  }
</style>

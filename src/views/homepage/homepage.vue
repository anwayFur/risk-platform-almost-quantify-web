<template>

  <div class="home_container">
    <div class="app-container">

      <div class="main_top">

        <el-container class="">
          <el-row class="sin_data">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div><img src="../../assets/mainPage/word.png" style="width: 100%;height: 100%;"></div>
            </el-col>
          </el-row>
        </el-container>

      </div>

      <div class="main_middle">
        <el-container>
          <Searchbar searchType="homepage" class="home_search_bar"/>
        </el-container>
      </div>

      <div class="home_content main_table">

        <div class="border_div">
          <el-row class="sin_data">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-tabs class="first_tabs" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="热点股票" name="hotspot">
                  <div v-if="currentTab ==='hotspot'">
                    <stockRank></stockRank>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="近期重点研报" name="report">
                  <div v-if="currentTab ==='report'">
                    <FocusReport></FocusReport>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="基金优选(定投)" name="fixedInvestment">
                  <div v-if="currentTab ==='fixedInvestment'">
                    <investStrategyFund></investStrategyFund>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="基金优选(养老)" name="pension">
                  <div v-if="currentTab ==='pension'">
                    <pensionStrategyFund></pensionStrategyFund>
                  </div>
                </el-tab-pane>

              </el-tabs>
            </el-col>

          </el-row>
        </div>


      </div>

    </div>
  </div>

</template>

<script type="es6">
  import Searchbar from '../layout/Searchbar'
  import FocusReport from './content/focusReport.vue'
  import stockRank from './content/stockRank.vue'
  import investStrategyFund from './content/investStrategyFund.vue'
  import pensionStrategyFund from './content/pensionStrategyFund.vue'

  export default {
    name: 'homepage',
    data() {
      return {
        is_login: false,
        activeName: 'hotspot',
        currentTab: 'hotspot', // currentTab 用于标识当前触发的子组件
      };
    },
    components: {
      Searchbar,
      FocusReport,
      stockRank,
      investStrategyFund,
      pensionStrategyFund,
    },
    mounted() {

    },
    methods: {
      //切换统计信息
      handleClick(tab) {
        this.activeName = tab.name;
        this.currentTab = tab.name;
      },
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .home_container {
    background-image: url("../../assets/mainPage/bg.jpg");
    background-size:100% 100%;
    -moz-background-size:100% 100%;

    width:100%;
    height: 93.8%;
    position:absolute;
  }

  .app-container {
    background-color: rgba(255,255,255,.0);
    width: 1200px;
    margin: 0 auto;
    min-height: 720px;
    border-radius: 3px;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .window {
    width: 745px;
    position: absolute;
    margin-left: -380px;
    margin-top: -80px;
    top: 50%;
    left: 50%;
    display: block;
    z-index: 2000;
  }

  .home_search_bar{
    top: 30%;
    padding-top: 30px;
    padding-left: 200px;
    width: 1000px;
  }

  .home_content {
    width: 960px;
    position:absolute;
  }

  .first_tabs {
    min-height: 445px;
  }

  .main_top {
    top: 15%;
    position:absolute;
    margin-left: 320px;
    width: 560px;
  }

  .main_middle {
    top: 23%;
    position:absolute;
  }

  .main_table {
    top: 35%;
    margin-left: 120px;
  }

  .border_div {
    background-color: #f9f9f9;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

</style>

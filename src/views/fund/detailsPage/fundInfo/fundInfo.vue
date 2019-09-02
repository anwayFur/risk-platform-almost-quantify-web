<template>
  <div>
    <div class="stock_info">

      <div class="border_div">
        <div class="tip_title">基本信息</div>
        <el-row class="sin_data">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div>
              <span >管理人：{{administrator}}</span>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div>
              <span >基金经理：
                <span>{{manager}}</span>
              </span>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div>
              <span >基金托管人：{{hosted}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="sin_data">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div>
              <span >成立日期：{{set_up_date}}</span>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div>
              <span>基金规模：{{asset_size}}</span>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">

              <div style="float: left;padding-right: 0">基金评级：</div>
                <el-rate v-model="rating"
                         disabled
                         style="float: left;padding-left: 0">
                </el-rate>
          </el-col>

        </el-row>

      </div>
      <div class="border_div">
        <div class="">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基金认购与赎回" name="first">
              <fundSubRep :fundSr=fundSr v-if="Object.keys(fundSr).length" ></fundSubRep>
            </el-tab-pane>
            <el-tab-pane v-if="fundCal.type!='货币型'&&fundCal.type!='理财型'&&fundCal.net_value" label="基金认购份额计算" name="second">
              <fund-calculation :fundSr=fundSr :fundCal=fundCal v-if="Object.keys(fundSr).length"></fund-calculation>
            </el-tab-pane>
          </el-tabs>

        </div>


      </div>


    </div>
  </div>
</template>


<script type="es6">
  import fundSubRep from './fundSubRep.vue'
  import FundCalculation from "./fundCalculation.vue";
  import {getFundBaseInfo}from '@/api/fund'
  export default {
    name: 'fundInfo',
    components: {
      FundCalculation,
      fundSubRep
    },
    props:['fundCal'],
    data(){
      return {
        activeName: "first",
        code: "",

        //管理人
        administrator: "",
        //托管人
        hosted: "",
        //经理
        manager: '',
        //成立日期
        set_up_date: "",
        //成立规模
        set_up_scale: "",
        // 规模
        asset_size: "",
        // 评级
        rating:0,

        /*基金认购与赎回传递参数用*/
        fundSr: {},

      }
    },
    mounted(){
      this.code = this.$route.params.code;
      this.getFundBalseInfo();//请求数据，传到子组件
    },
    methods: {
      getFundBalseInfo(){
        getFundBaseInfo(this.code).then(response => {

          this.administrator = response['administrator'];
          this.set_up_date = response['set_up_date'];
          this.set_up_scale = response['set_up_scale'];
          this.hosted = response['hosted'];
          this.asset_size = response['asset_size']['num'] + '（' + response['asset_size']['date'] + '）';
          this.rating = parseFloat(response['rating']);

          /*申购状态*/
          this.fundSr['purchase_status']= response['purchase_status'];
          /*赎回状态*/
          this.fundSr['redemption_status']= response['redemption_status'];
          /*最高认购费率*/
          this.fundSr['max_subscription_rate']= response['max_subscription_rate'];
          /*最高赎回费率*/
          this.fundSr['max_redemption_rate']= response['max_redemption_rate'];
          /*最新申购费率*/
          this.fundSr['rate']= response['rate'];
          /*最小认购金额*/
          this.fundSr['min_money']= response['min_money'];
          /*基金管理费率*/
          this.fundSr['management_rate']= response['management_rate'];
          this.manager=response['manager'].join();


        })
      },
      handleClick(tab, event) {
        /*console.log(tab, event);*/
      }
    },

  }
</script>

<style type="text/css" lang="scss" scoped>


  .tab_style {
    min-height: 300px;
  }

  .tip_title {
    background: url("../../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
  }

  .stock_info {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 10px;

    .sin_middle_right {
      padding-top: 30px;
      padding-bottom: 10px;
      text-align: right;
    }

    .sin_data {
      padding-top: 10px;
      padding-bottom: 10px;
      text-align: left;

      div {
        padding-left: 25px;
      }
    }

  }


</style>

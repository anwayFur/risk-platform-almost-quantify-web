<template>
  <div>
    <div class="stock_info">

      <el-row class="sin_data">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div style="padding-left: 0">
            <span v-if="fundCal.flag==='在售基金'">认购金额：</span>
            <span v-else>申购金额：</span>
            <el-input v-model="calculData"   size="small" placeholder="请输入金额" style="width:160px;padding-left: 0 "></el-input>
            <span>元</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="sin_data">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div style="padding-left: 0">
            <span v-if="fundCal.flag==='在售基金'">认购份额：{{subQuota}}</span>
            <span v-else>申购份额：&nbsp;&nbsp;{{bidShare}}</span>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>


<script type="es6">
  export default {
    name: 'fundCalculation',
    props: ['fundSr', 'fundCal'],
    data(){
      return {
        //认购金额
        calculData: "",

      }
    },
    computed: {
      //认购份额
      subQuota(){
        if (this.calculData) {

          let temp = parseFloat(this.calculData);
          /*利息计算*/
          let interest=temp*0.003*1.5/12;
          /*认购费率*/
          let temprate = parseFloat(this.fundSr['max_subscription_rate']) / 100;

          return ((temp - temp / (1 + temprate) * temprate)+interest).toFixed(2);
        }
        return 0
      },
      //申购份额
      bidShare(){
        if (this.calculData) {
          let temp = parseFloat(this.calculData);
          /*管理费率*/
          let temprate = parseFloat(this.fundSr['management_rate']) / 100;

          /*单位净值*/
          let netValue = parseFloat(this.fundCal['net_value']['net_value']);

          return (temp - temp / (1 + temprate) * temprate) / netValue.toFixed(2);
        }
        return 0
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

  .gdGialog {
    margin-top: -7vh;
    margin-left: -15vh;
    margin-right: -15vh;

    .el-table td {
      padding: 3px 0;
    }

    .el-table th {
      padding: 6px 0;
    }
  }


</style>

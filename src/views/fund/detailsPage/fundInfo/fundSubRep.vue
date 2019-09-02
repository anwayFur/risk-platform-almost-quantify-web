<template>
  <div>
    <div class="stock_info" >
      <el-row class="sin_data" >
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div style="padding-left: 0">
              <span>申购状态：
                <span >{{fundSr.purchase_status}}&nbsp/&nbsp{{fundSr.redemption_status}}</span>
              </span>
          </div>
        </el-col>
      </el-row>
      <el-row class="sin_data">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div style="padding-left: 0">
            <span >基金认购/申购费率：{{fundSr.max_subscription_rate}}&nbsp/&nbsp{{fundSr.rate}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="sin_data">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div style="padding-left: 0">
            <span >基金管理费率：{{fundSr.management_rate}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="sin_data">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div style="padding-left: 0">
            <span >基金赎回费率：{{fundSr.max_redemption_rate}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="sin_data">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div style="padding-left: 0">
            <span >基金最低认购金额：{{fundSr.min_money}}</span>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script type="es6">
  export default {
    name: 'fundSubRep',
    props: ['fundSr'],
    mounted(){

    },
    methods: {

    }


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

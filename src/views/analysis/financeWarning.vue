<template>
  <div class="app-container">
    <div class="border_top_div pad_div">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
          <div class="top_tip">
            <span style="color: #999;font-size: 14px;">当前目录:&nbsp;分析工具&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            <span style="color: #657180;">财务预警工具</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
        </el-col>
      </el-row>
    </div>

    <div class="border_div">
      <div class="tip_title">财务预警</div>

      <el-row class="sin_data">
        <el-form :model="listForm" status-icon ref="listForm" label-width="200px"
                 class="demo-ruleForm">
          <el-form-item label="近三年平均分红总和(万元)" prop="threeDividendsSum">
            <el-input v-model="listForm.threeDividendsSum"></el-input>
          </el-form-item>
          <el-form-item label="最后一次分红年" prop="dividendsYear">
            <el-input v-model="listForm.dividendsYear"></el-input>
          </el-form-item>
          <el-form-item label="总资产(万元)" prop="totalAssets">
            <el-input v-model.number="listForm.totalAssets"></el-input>
          </el-form-item>
          <el-form-item label="总负债(万元)" prop="totalLiability">
            <el-input v-model="listForm.totalLiability"></el-input>
          </el-form-item>
          <el-form-item label="销售收入(万元)" prop="salesRevenue">
            <el-input v-model.number="listForm.salesRevenue"></el-input>
          </el-form-item>
          <el-form-item label="净利润(万元)" prop="netProfit">
            <el-input v-model="listForm.netProfit"></el-input>
          </el-form-item>
          <el-form-item label="股东权益(净资产,万元)" prop="shareholdersEquity">
            <el-input v-model="listForm.shareholdersEquity"></el-input>
          </el-form-item>
          <el-form-item label="应收账款(万元)" prop="accountsReceivable">
            <el-input v-model.number="listForm.accountsReceivable"></el-input>
          </el-form-item>
          <el-form-item label="基本每股收益" prop="basicEarningsPerShare">
            <el-input v-model="listForm.basicEarningsPerShare"></el-input>
          </el-form-item>
          <el-form-item label="经营现金流量净额(万元)" prop="netOperatingCashFlow">
            <el-input v-model.number="listForm.netOperatingCashFlow"></el-input>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <div style="">
            <el-form-item>
              <div style="margin-top: 80px;margin-left: -245px;">
                <el-button type="primary" @click="submitForm('listForm')">提交</el-button>
                <el-button type="primary" @click="resetForm('listForm')">重置</el-button>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </el-row>

    </div>
  </div>
</template>

<script type="es6">
  import {submitData} from '@/api/analysis'

  export default {
    name: 'financeWarning',

    data() {

      return {
        tableData: [],
        listForm: {
          threeDividendsSum: 7622,
          dividendsYear: 2016,
          totalAssets: 73434,
          totalLiability: 8732,
          salesRevenue: 9873,
          netProfit: 2376,
          shareholdersEquity: 45362,
          accountsReceivable: 6542,
          basicEarningsPerShare: 1.3,
          netOperatingCashFlow: 9473,
        },
      }
    },
    mounted() {

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            submitData(this.listForm).then(response => {
              if(response === 0){
                this.$message({
                  message: '风险警示！',
                  type: 'warning',
                  duration:1500,
                });
              } else if(response === 1){
                this.$message({
                  message: '没有风险！',
                  type: 'success',
                  duration:1500,
                });
              } else if(response === -1){
                this.$message({
                  message: '数据异常！',
                  type: 'error',
                  duration:1500,
                });
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

    }

  }
</script>

<style type="text/css" lang="scss" scoped>

  .tip_title {
    background: url("../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
    background-size: 100% auto;
  }

  .tip_title {
    padding: 15px 0 40px 50px;
    color: #559bff;
  }

  .filter-container {
    padding-top: 5px;
    padding-bottom: 5px;
    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }

  .el-form-item {
    margin: 10px 0 10px 0px;
    width: 45%;
    float: left;
  }

  .demo-ruleForm {
    margin-top: 70px;
  }


</style>

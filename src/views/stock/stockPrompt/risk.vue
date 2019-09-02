<template>
  <div class="app-container">
    <transition name="el-zoom-in-top">
      <div v-show="true" class="transition-box">
        <div class="div_top">
          <div class="border_div pad_div">
            <el-row>
              <el-col :xs="12" :sm="12" :md="12" :lg="12">
                <span style="color: #999;font-size: 14px;">股票&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                <span style="color: #657180;">风险预警</span>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12">
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </transition>

    <div class="border_div">

      <div class="tip_title">风险预警
        <div style="text-align: right; margin-top: -15px;margin-right: 20px; font-size: 14px;">更新时间:
          {{this.refreshTime}}
        </div>
      </div>
      <el-row class="sin_data">

        <npPushedTable :pushed-datas="this.riskData"></npPushedTable>

      </el-row>

    </div>


  </div>
</template>

<script type="es6">
  import npPushedTable from './npPushedTable.vue'
  import {getRiskData} from '@/api/stocks'

  export default {
    name: 'risk',
    data() {
      return {
        riskData: [],
        refreshTime: '',
      }
    },
    components: {
      npPushedTable,
    },
    mounted() {
      //请求机会、风险数据
      this.getRiskData(this.riskData)
    },
    methods: {

      // 发送请求数据
      getRiskData(types_data) {
        getRiskData().then(response => {
          if(response) {
            let riskData = response
            types_data.splice(0, types_data.length);
            for (let i = 0; i < riskData.length; i++) {
              this.refreshTime = riskData[i]['insert_at'],
              types_data.push(
                {
                  code: riskData[i]['code'],
                  name: riskData[i]['name'],
                  avg_tive: riskData[i]['avg_tive'],
                  report_tive: riskData[i]['report_tive'],
                  notice_tive: riskData[i]['notice_tive'],
                  news_tive: riskData[i]['news_tive'],
                })
            }

          }
        })
      },

    }

  }
</script>

<style type="text/css" lang="scss" scoped>

  .tip_title {
    background: url("../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
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

  .padd_left_20 {
    // padding-left: 20px;
    text-align: center;
  }

  .padd_left_35 {
    padding-left: 35px;
  }


</style>

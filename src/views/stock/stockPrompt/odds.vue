<template>
  <div class="app-container">
    <div class="border_top_div pad_div">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
          <div class="top_tip">
            <span style="color: #999;font-size: 14px;">当前目录:&nbsp;股票&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            <span style="color: #657180;">机会提醒</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
        </el-col>
      </el-row>
    </div>

    <div class="border_div">

      <div class="tip_title">机会提醒
        <div style="text-align: right; margin-top: -15px;margin-right: 20px; font-size: 14px;">更新时间:
          {{this.refreshTime}}
        </div></div>
      <el-row class="sin_data">

        <npPushedTable :pushed-datas="this.oddsData"></npPushedTable>

      </el-row>

    </div>


  </div>
</template>

<script type="es6">
  import npPushedTable from './npPushedTable.vue'
  import {getOddsData} from '@/api/stocks'

  export default {
    name: 'odds',
    data() {
      return {
        oddsData: [],
        refreshTime: '',
      }
    },
    components: {
      npPushedTable
    },
    mounted() {
      //请求机会、风险数据
      this.getOddsData( this.oddsData)
    },
    methods: {
      // 发送请求数据
      getOddsData(types_data) {
        getOddsData().then(response => {
          if(response) {
            let oddsData = response
            types_data.splice(0, types_data.length);
            for (let i = 0; i < oddsData.length; i++) {
              this.refreshTime = oddsData[i]['insert_at'],
              types_data.push(
                {
                  code: oddsData[i]['code'],
                  name: oddsData[i]['name'],
                  avg_tive: oddsData[i]['avg_tive'],
                  report_tive: oddsData[i]['report_tive'],
                  notice_tive: oddsData[i]['notice_tive'],
                  news_tive: oddsData[i]['news_tive'],
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

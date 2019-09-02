<template>
  <div class="app-container">
    <div class="border_top_div pad_div">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
          <div class="top_tip">
            <span style="color: #999;font-size: 14px;">当前目录:&nbsp;分析工具&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            <span style="color: #657180;">研报统计数据</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
        </el-col>
      </el-row>
    </div>

    <div class="border_div">
      <div class="tip_title">历史每月研报评级为 <span style="font-weight:bold;">&lt;买入&gt;</span> 数量最多的十支股票涨跌幅</div>
      <el-row class="sin_data">
        <el-col :xs="10" :sm="10" :md="10" :lg="10">
          <div class="filter-container">
            <span style="padding-right: 15px">选择月份(空为显示全部):</span>
            <el-select v-model="month" filterable clearable @change="handleChange" placeholder="请选择月份">
              <el-option
                v-for="item in monthData"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xs="14" :sm="14" :md="14" :lg="14">
        </el-col>
      </el-row>

      <el-row class="sin_data">
        <el-table :data="tableData" style="width: 100%" class="report_tab">
          <el-table-column prop="index" label="排行" sortable min-width="50" align="center"></el-table-column>
          <el-table-column prop="month" label="月份" sortable min-width="60" align="center"></el-table-column>
          <el-table-column prop="code" label="代码" sortable min-width="120" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.code !== '上证指数  '">
                <a :href="'/#/p/stock/' + scope.row.code" target="_blank">{{scope.row.code}}({{scope.row.name}})</a>
              </span>
              <span v-else>{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="report_num" label="研报数量" min-width="80" align="center"></el-table-column>
          <el-table-column prop="after_5_days" label="5天涨跌幅" min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.after_5_days >= 0" class="color_red">{{scope.row.after_5_days}}%</span>
              <span v-else-if="scope.row.after_5_days < 0" class="color_green">{{scope.row.after_5_days}}%</span>
              <span v-else>{{scope.row.after_5_days}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="after_15_days" label="15天涨跌幅" min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.after_15_days >= 0" class="color_red">{{scope.row.after_15_days}}%</span>
              <span v-else-if="scope.row.after_15_days < 0" class="color_green">{{scope.row.after_15_days}}%</span>
              <span v-else>{{scope.row.after_15_days}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="after_30_days" label="一个月涨跌幅" min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.after_30_days >= 0" class="color_red">{{scope.row.after_30_days}}%</span>
              <span v-else-if="scope.row.after_30_days < 0" class="color_green">{{scope.row.after_30_days}}%</span>
              <span v-else>{{scope.row.after_30_days}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="after_90_days" label="三个月涨跌幅" min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.after_90_days >= 0" class="color_red">{{scope.row.after_90_days}}%</span>
              <span v-else-if="scope.row.after_90_days < 0" class="color_green">{{scope.row.after_90_days}}%</span>
              <span v-else>{{scope.row.after_90_days}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="after_180_days" label="半年涨跌幅" min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.after_180_days >= 0" class="color_red">{{scope.row.after_180_days}}%</span>
              <span v-else-if="scope.row.after_180_days < 0" class="color_green">{{scope.row.after_180_days}}%</span>
              <span v-else>{{scope.row.after_180_days}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <el-row class="sin_data">
      </el-row>
    </div>
  </div>
</template>

<script type="es6">
  import {reportCalcWithMonth, reportMonthList} from '@/api/analysis'

  export default {
    name: 'report-analysis-month',
    data() {
      return {
        tableData: [],
        allData: [],
        monthData: [],
        month: '',
      }
    },
    mounted() {
      // 请求默认数据
      this.getList();
      // 请求月份数据
      this.querySearchMonth()
    },
    methods: {

      handleChange() {
        if(this.month === ''){
          this.tableData = this.allData
        }
        else{
          this.tableData = [];
          for(let i = 0; i < this.allData.length; i++){
            if(this.month === this.allData[i]['month']){
              this.tableData.push(this.allData[i])
            }
          }
        }
      },
      querySearchMonth() {
        reportMonthList().then(response => {
          if (response) {
            for(let i = 0; i < response.length; i++){
              this.monthData.push({
                value: response[i]
              })
            }
          }
        })
      },
      // 发送请求数据
      getList() {
        reportCalcWithMonth().then(response => {
          if (response) {
            let reportInfo = response;
            this.allData = [];
            for (let i = 0; i < reportInfo.length; i++) {
              this.allData.push(
                {
                  index: reportInfo[i]['index'],
                  month: reportInfo[i]['month'],
                  code: reportInfo[i]['code'],
                  after_5_days: reportInfo[i]['after_5_days']?reportInfo[i]['after_5_days']:'- -',
                  after_15_days: reportInfo[i]['after_15_days']?reportInfo[i]['after_15_days']:'- -',
                  after_30_days: reportInfo[i]['after_30_days']?reportInfo[i]['after_30_days']:'- -',
                  after_90_days: reportInfo[i]['after_90_days']?reportInfo[i]['after_90_days']:'- -',
                  after_180_days: reportInfo[i]['after_180_days']?reportInfo[i]['after_180_days']:'- -',
                  avg_posi_per: reportInfo[i]['avg_posi_per'],
                  report_num: reportInfo[i]['report_num']?reportInfo[i]['report_num']:'- -',
                  name: reportInfo[i]['name']
                })
            }
            this.tableData = this.allData
          }
        })
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

  .padd_left_20 {
    // padding-left: 20px;
    text-align: center;
  }

  .padd_left_35 {
    padding-left: 35px;
  }


</style>

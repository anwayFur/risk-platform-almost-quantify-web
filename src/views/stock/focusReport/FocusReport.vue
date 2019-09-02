<template>
  <div class="app-container">
    <div class="border_top_div pad_div">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
          <div class="top_tip">
            <span style="color: #999;font-size: 14px;">当前目录:&nbsp;股票&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            <span style="color: #657180;">重点研报</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
        </el-col>
      </el-row>
    </div>

    <div class="border_div">
      <div class="tip_title">近期重点研报</div>
      <el-row class="sin_data">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div class="filter-container">
            <el-col :xs="6" :sm="6" :md="6" :lg="6">
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row class="sin_data">
        <el-table :data="reportList" style="width: 100%" class="report_tab">
          <el-table-column prop="focus_type" label="类型" width="100" align="center">
            <template slot-scope="scope">
              <el-tag size="medium" v-if="scope.row.focus_type === 'risk'" type="warning">风险</el-tag>
              <el-tag size="medium" v-else-if="scope.row.focus_type === 'odds'" type="success">机会</el-tag>
              <el-tag size="medium" v-else type="info">停牌</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="report_date" label="日期" sortable width="100" align="center"></el-table-column>
          <el-table-column prop="code" label="代码/名称" width="140" align="center">
            <template slot-scope="scope">
              <a :href="'/#/p/stock/' + scope.row.code" target="_blank">
                {{scope.row.name}}({{scope.row.code}})
              </a>
            </template>
          </el-table-column>
          <el-table-column prop="org_name" label="机构" width="100" align="center"></el-table-column>
          <el-table-column prop="title" label="标题" min-width="100">
            <template slot-scope="scope">
              <a @click="showReport(scope.row.id)">{{scope.row.title}}</a>
              <br>
              <div v-for="item in scope.row.keywords" class="showKeywords">
                <el-tag size="mini" class="keyword">{{item}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="change" label="变动" width="80" align="center"></el-table-column>
          <el-table-column prop="rate" label="等级" width="80" align="center"></el-table-column>
          <el-table-column prop="posi_per" label="正负面" width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.posi_per === 100" style="color: red">{{scope.row.posi_per}}</span>
              <span v-else-if="scope.row.posi_per <= 15" style="color: green">{{scope.row.posi_per}}</span>
              <span v-else>{{scope.row.posi_per}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="target_price_min" label="目标价格" width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.target_price_min}}</span>
              <span v-if="scope.row.target_price_max !== '- -'"> -- {{scope.row.target_price_max}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>

    <reportContentDialog
      ref="reportContentDialog">
    </reportContentDialog>

  </div>

</template>

<script type="es6">

  import reportContentDialog from '../detailsPage/stockReport/reportContent.vue'
  import { getReportFocusData } from '@/api/stocks'

  export default {
    name: 'report-recent',
    data() {
      return {
        reportList: []
      }
    },
    components: {
      reportContentDialog
    },
    mounted() {
      this.getReportFocusData()
    },
    methods: {

      // 发送请求数据
      getReportFocusData() {
        getReportFocusData().then(response => {
          if(response) {
            this.reportList.splice(0, this.reportList.length);
            for (let i = 0; i < response.length; i++) {
              this.reportList.push(
                {
                  id: response[i]['id'],
                  change: response[i]['change'],
                  code: response[i]['code'],
                  name: response[i]['name'],
                  org_name: response[i]['org_name'],
                  posi_per: parseFloat(response[i]['posi_per']),
                  rate: response[i]['rate'],
                  report_date: response[i]['report_date'],
                  title: response[i]['title'],
                  target_price_min: response[i]['target_price_min']?response[i]['target_price_min']:'- -',
                  target_price_max: response[i]['target_price_max']?response[i]['target_price_max']:'- -',
                  keywords: this.showKeyWords(response[i]['keywords']),
                  focus_type: response[i]['focus_type']
                })
            }
          }
        })
      },

      //展示报告详情
      showReport: function (id) {
        this.$refs.reportContentDialog.showReportContent(id);
      },
      //
      showKeyWords: function (keywords) {
        let key = [];
        for(let i = 0; i < keywords.length; i++){
          if(keywords[i][0] === "减持"){
            key.push("减持");
            keywords.splice(i,1);
            break;
          }
        }
        if(key.length > 0){
          length = keywords.length > 2 ? 2 : keywords.length;
        } else {
          length = keywords.length > 3 ? 3 : keywords.length;
        }

        for (let i = 0; i < length; i++) {
          key.push(keywords[i][0]);
        }
        return key;
      },
    }

  }
</script>

<style type="text/css" lang="scss" scoped>

  .tip_title {
    background: url("../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
    background-size:100% auto;
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

  .showKeywords{
    .keyword_jian {
      color: red;
      float:left;
      margin-left: 5px;
    }
    .keyword{
      float:left;
      margin-left: 5px;
    }
  }

</style>

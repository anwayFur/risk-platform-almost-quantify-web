<template>
  <div class="stock_info">
    <div class="border_div">

      <div class="tip_title">个股研报统计</div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="近30天" name="third"></el-tab-pane>
        <el-tab-pane label="近7天" name="second"></el-tab-pane>
        <el-tab-pane label="近3天" name="first"></el-tab-pane>
      </el-tabs>

      <div>
        <el-row class="row_style col_style">
          <el-col :xs="12" :sm="12" :md="12" :lg="12">

            <ChangeStsChart :changes="changes"></ChangeStsChart>

            <!--<el-table-->
              <!--:data="changes"-->
              <!--class="stat_style"-->
              <!--style="width: 90%;margin: 0 auto;">-->
              <!--<el-table-column label="变动">-->
                <!--<el-table-column-->
                  <!--prop="维持"-->
                  <!--label="维持"-->
                  <!--&gt;-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="调高"-->
                  <!--label="调高"-->
                  <!--&gt;-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="调低"-->
                  <!--label="调低"-->
                  <!--&gt;-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="首次"-->
                  <!--label="首次"-->
                  <!--&gt;-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="未知"-->
                  <!--label="未知"-->
                  <!--&gt;-->
                <!--</el-table-column>-->
              <!--</el-table-column>-->
            <!--</el-table>-->

          </el-col>

          <el-col :xs="12" :sm="12" :md="12" :lg="12">

            <RateStsChart :rates="rates"></RateStsChart>
            <!--<el-table-->
              <!--:data="rates"-->
              <!--class="stat_style"-->
              <!--style="width: 90%;margin: 0 auto;">-->
              <!--<el-table-column label="评价">-->
                <!--<el-table-column-->
                  <!--prop="买入"-->
                  <!--label="买入"-->
                  <!--width="72">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="增持"-->
                  <!--label="增持"-->
                  <!--width="72">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="中性"-->
                  <!--label="中性"-->
                  <!--width="72">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="减持"-->
                  <!--label="减持"-->
                  <!--width="72">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="zip"-->
                  <!--label="卖出"-->
                  <!--width="72">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="未知"-->
                  <!--label="未知"-->
                  <!--width="72">-->
                <!--</el-table-column>-->
              <!--</el-table-column>-->
            <!--</el-table>-->

          </el-col>
        </el-row>
        <el-row class="row_style col_style statis_style">
          <el-col :xs="7" :sm="7" :md="7" :lg="7">
            <div style="padding-top: 25px;padding-left: 25px;">数量：</div>
            <div style="padding-top: 20px; text-align: center">

              <div style="padding-top: 30px"><span style="color: #3574f1;font-size: 40px">{{num}}</span></div>

            </div>
          </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="1">
            <div><img src="../../../../assets/searchInfo/stock/border_middle.png" style="width: 10px;height: 200px">
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div style="padding-top: 25px;"><span>关键词:</span></div>
            <div style="padding-top: 20px;padding-left: 10px; padding-right: 10px">
              <div v-for="item in keyword">
                <el-tag
                  style="float:left;margin-right:10px;margin-bottom: 10px"><span class="tag_font">{{item}}</span>
                </el-tag>
              </div>
            </div>

          </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="1">
            <div><img src="../../../../assets/searchInfo/stock/border_middle.png" style="width: 10px;height: 200px">
            </div>
          </el-col>
          <el-col :xs="7" :sm="7" :md="7" :lg="7">
            <div style="padding-top: 25px;"><span>正负面:</span></div>
            <div style="padding-top: 20px;text-align: center">

              <StockNpChart :posi_per="posi_per" :nega_per="nega_per" :posi_isNull="posi_isNull"></StockNpChart>

            </div>
          </el-col>
        </el-row>
      </div>

    </div>
    <div class="border_div">
      <div class="tip_title">个股研报列表</div>
      <el-row class="row_style col_style">
        <div id="showReport">
          <el-col :span="24">

            <el-table align="center" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="font-size:12px;">
              <el-table-column prop="date" sortable label="日期" width="100"></el-table-column>
              <el-table-column prop="org" label="机构名称" width="100"></el-table-column>
              <el-table-column prop="type" label="点评类型" width="100"></el-table-column>
              <el-table-column label="标题" min-width="200">
                <template slot-scope="scope">
                  <a @click="changeReportId(scope.row.id)">{{scope.row.title}}</a>
                  <br>
                  <div v-for="item in scope.row.keywords" class="showKeywords">
                    <el-tag size="mini" class="keyword">{{item}}</el-tag>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="change" label="变动" width="70"></el-table-column>
              <el-table-column prop="rate" label="等级" width="70"></el-table-column>

            </el-table>

            <reportContentDialog
              ref="reportContentDialog">
            </reportContentDialog>

            <el-pagination class="pagination"
                           background
                           @current-change="current_change"
                           layout="prev, pager, next"
                           :page-size="10"
                           :total="count">
            </el-pagination>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>


<script type="es6">
  import reportContentDialog from './reportContent.vue'
  import StockNpChart from '../quotationAnalysis/StockNpChart.vue'
  import RateStsChart from './RateStsChart.vue'
  import ChangeStsChart from './ChangeStsChart.vue'
  import {getReport, getReportContent, getStatistics} from '@/api/stock'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'

  export default {
    name: "Report",
    data() {
      return {

        changes:[],
        rates:[],

        activeName: "third",
        day: '30',
        type: "report",
        num: "",
        keyword: [],
        posi_per: 0,
        nega_per: 0,
        posi_isNull: true,

        // 分页参数
        tableData: [],
        count: 0,           //默认数据总数
        pagesize:10,       //每页的数据条数
        currentPage:1     //默认开始页面
      }
    },
    components: {
      reportContentDialog,
      ElCol,
      ElRow,
      StockNpChart,
      RateStsChart,
      ChangeStsChart,
    },
    mounted() {
      this.code = this.$route.params.code;
      this.getReportList();
      //this.showStatistic();
    },
    methods: {
      //整理获取关键词1
      showKeyWords: function (keywords) {
        let key = [];
        length = keywords.length > 3 ? 3 : keywords.length;
        for (let i = 0; i < length; i++) {
          key[i] = keywords[i][0];
        }
        return key;
      },
      //整理关键词2
      pushKeyWord: function (keydata) {
        let key = [];
        for (let i = 0; i < keydata.length; i++) {
          key.push(keydata[i][0]);
        }
        return key;
      },
      //获取报告内容
      getReportList() {
        getReport(this.code, this.day).then(response => {
          if (response) { // 如果返回报告内容

            if (response.analysis) {

              let statisInfo = response.analysis;

              let change = response.analysis.changes;
              this.changes = [];
              if(!(JSON.stringify(change) === "{}"))this.changes.push(change);
              let rate = response.analysis.rates;
              this.rates = [];
              if(!(JSON.stringify(rate) === "{}"))this.rates.push(rate);

              if(response.data.length===0){
                this.keyword="无";
                this.posi_per=0;
                this.nega_per=0;
                this.posi_isNull = true;
              }else{
                this.keyword=this.pushKeyWord(statisInfo['keywords']);
                this.posi_per=parseFloat(parseFloat(statisInfo["posi_per"]).toFixed(0));
                this.nega_per=parseFloat(parseFloat(statisInfo["nega_per"]).toFixed(0));
                this.posi_isNull = false;
              }

            }

            let reportInfo = response.data;
            this.count = reportInfo.length;
            this.num = reportInfo.length;
            this.tableData = [];
            for (let i = 0; i < reportInfo.length; i++) {
              this.tableData.push(
                {
                  org: reportInfo[i]['org'],
                  date: reportInfo[i]['date'],
                  type: reportInfo[i]['type'],
                  title: reportInfo[i]['title'],
                  change: reportInfo[i]['change'],
                  rate: reportInfo[i]['rate'],
                  id: reportInfo[i]['id'],
                  keywords: this.showKeyWords(reportInfo[i]['keywords'])
                })
            }
          }
        })
      },
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },

      //展示报告详情
      changeReportId: function (id) {
        this.$refs.reportContentDialog.showReportContent(id);
      },
      //切换统计信息
      handleClick(tab) {
        this.code = this.$route.params.code;
        switch (tab.name) {
          case "first":
            this.day = '3';
            break;
          case "second":
            this.day = '7';
            break;
          default:
            this.day = '30';
        }
        //获取统计信息
        this.getReportList();
      },


    },

  }
</script>

<style lang="scss">

  .tip_title {
    background: url("../../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
  }

</style>

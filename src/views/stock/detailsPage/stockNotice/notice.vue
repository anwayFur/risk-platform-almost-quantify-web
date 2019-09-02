<template>
  <div class="stock_info">
    <div class="border_div">

      <div class="tip_title">个股公告统计</div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="近30天" name="third"></el-tab-pane>
        <el-tab-pane label="近7天" name="second"></el-tab-pane>
        <el-tab-pane label="近3天" name="first"></el-tab-pane>
      </el-tabs>

      <div>
        <el-row class="row_style col_style statis_style">
          <el-col :xs="7" :sm="7" :md="7" :lg="7">
            <div style="padding-top: 25px;padding-left: 25px;">数量：</div>
            <div style="padding-top: 20px; text-align: center">

              <div style="padding-top: 30px"><span style="color: #3574f1;font-size: 40px">{{num}}</span></div>

            </div>
          </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="1">
            <div><img src="../../../../assets/searchInfo/stock/border_middle.png" style="width: 10px;height: 200px"></div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div style="padding-top: 25px;"><span>关键词:</span></div>
            <div style="padding-top: 20px;padding-left: 10px; padding-right: 10px">
              <div v-for="item in keyword"><el-tag
                style="float:left;margin-right:10px;margin-bottom: 10px"><span class="tag_font" >{{item}}</span></el-tag></div>
            </div>

          </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="1">
            <div><img src="../../../../assets/searchInfo/stock/border_middle.png" style="width: 10px;height: 200px"></div>
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
      <div class="tip_title">个股公告列表</div>
      <el-row class="row_style col_style">
        <div id="showNews">
          <el-col :span="24">
            <el-table align="center" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                      style="font-size:12px;">
              <el-table-column prop="date" sortable label="日期" width="120"></el-table-column>
              <el-table-column label="标题" min-width="180">
                <template slot-scope="scope">
                  <a @click="changeNoticeId(scope.row.id)">{{scope.row.title}}</a>
                  <br>
                  <div v-for="item in scope.row.keywords" class="showKeywords">
                    <el-tag size="mini" class="keyword">{{item}}</el-tag>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="posi_per" label="正负面" sortable width="280">

                <template slot-scope="scope">

                  <span>正面:{{scope.row.posi_per}}%</span>
                  <span style="float: right">负面:{{(100 - scope.row.posi_per).toFixed(0)}}%</span>
                  <span><el-progress class="pro_style_1" :stroke-width="2" :percentage="scope.row.posi_per"
                                     :show-text='false'
                                     status="exception"></el-progress></span>

                </template>

              </el-table-column>
            </el-table>

            <noticeContentDialog
              ref="noticeContentDialog">
            </noticeContentDialog>

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
  import noticeContentDialog from './noticeContent.vue'
  import StockNpChart from '../quotationAnalysis/StockNpChart.vue'
  import { getNotice,getNoticeContent,getStatistics} from '@/api/stock'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'

  export default {
    name:"Notice",
    data () {
      return {

        activeName:"third",
        day:'30',
        type:"notice",
        num:"",
        keyword:[],
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
      noticeContentDialog,
      ElCol,
      ElRow,
      StockNpChart,
    },
    mounted () {

      this.code = this.$route.params.code;
      this.page = 0;
      this.limit = 20;
      this.getNoticeList();
      //this.showStatistic();
    },
    methods: {
      //整理关键词1
      showKeyWords: function (keywords) {
        let key = [];
        length = keywords.length > 3 ? 3 : keywords.length;
        for (let i = 0; i < length; i++) {
          key[i] =  keywords[i][0];
        }
        return key
      },
      //整理关键词2
      pushKeyWord:function (keydata) {
        let key=[];
        for(let i=0;i<keydata.length;i++){
          key.push(keydata[i][0]);
        }
        return key;
      },
      //获取公告内容
      getNoticeList () {
        getNotice(this.code, this.day).then(response => {
          if (response) { // 如果返回报告内容

            if (response.analysis) {

              let statisInfo = response.analysis;

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

            let noticeInfo = response.data;
            this.count = noticeInfo.length;
            this.num = noticeInfo.length;
            this.tableData = [];
            for (let i = 0; i < noticeInfo.length; i++) {
              let posi_per = parseFloat(noticeInfo[i]["posi_per"]).toFixed(0);
              this.tableData.push(
                {
                  date: noticeInfo[i]['date'],
                  posi_per: Number(posi_per),
                  title: noticeInfo[i]['title'],
                  // title: (stockInfo[i]['title'].length < 13 ? stockInfo[i]['title'] : stockInfo[i]['title'].substr(0, 13)),
                  id: noticeInfo[i]['id'],
                  keywords: this.showKeyWords(noticeInfo[i]['keywords'])
                })
            }
          }
        })
      },
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },

      //展示报告详情
      changeNoticeId: function (id) {

          this.$refs.noticeContentDialog.showNoticeContentDialog(id);

      },
      //切换统计信息
      handleClick(tab) {
        this.code = this.$route.params.code;
        switch(tab.name)
        {
          case "first":
            this.day='3';
            break;
          case "second":
            this.day='7';
            break;
          default:
            this.day='30';
        }
        //获取统计信息
        this.getNoticeList();
      },
    },


  }
</script>

<style lang="scss" scoped>

  .tip_title {
    background: url("../../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
  }

</style>

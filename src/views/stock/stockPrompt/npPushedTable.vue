<template>
    <div>
      <el-table :data="this.pushedDatas" :row-key="getRowKeys"
                :expand-row-keys="expands"
                @current-change="toggleRowExpansion"
                @expand-change="rowExpansion"
                style="width: 100%" class="report_tab">
        <el-table-column type="expand">
          <template slot-scope="props">

            <div v-if="event_data.length > 0">
              <el-table align="center" :show-header="false" :data="event_data" style="font-size:12px;">
                <el-table-column
                  prop="type"
                  label="事件类型"
                  min-width="70">
                  <template slot-scope="scope">
                    <div v-if="scope.row.type === '新闻'">
                      <el-tag type="" close-transition>{{scope.row.type}}</el-tag>
                    </div>
                    <div v-else-if="scope.row.type === '公告'">
                      <el-tag type="warning" close-transition>{{scope.row.type}}</el-tag>
                    </div>
                    <div v-else-if="scope.row.type === '研报'">
                      <el-tag type="danger" close-transition>{{scope.row.type}}</el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="标题" min-width="260">
                  <template slot-scope="scope">
                    <a @click="showSelectContent(scope.row.id, scope.row.type)">{{scope.row.title}}</a>
                    <br>
                    <div v-for="item in scope.row.keywords" class="showKeywords">
                      <el-tag size="mini" class="keyword">{{item}}</el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="posi_per" label="正负面" sortable min-width="160">

                  <template slot-scope="scope">

                    <span>正面:{{scope.row.posi_per}}%</span>
                    <span style="float: right">负面:{{(100 - scope.row.posi_per).toFixed(0)}}%</span>
                    <span><el-progress class="pro_style_1" :stroke-width="2" :percentage="scope.row.posi_per"
                                       :show-text='false'
                                       status="exception"></el-progress></span>

                  </template>

                </el-table-column>

              </el-table>
            </div>
            <div v-else>
            </div>

          </template>
        </el-table-column>
        <el-table-column sortable prop="code" label="名称/代码" min-width="100" align="center">
          <template slot-scope="scope">
            <a :href="'/#/p/stock/' + scope.row.code" target="_blank">
              {{scope.row.name}}({{scope.row.code}})
            </a>
          </template>
        </el-table-column>
        <el-table-column sortable prop="avg_tive" label="正负面" min-width="100"
                         align="center"></el-table-column>
        <el-table-column sortable prop="report_tive" label="研报正负面" min-width="100"
                         align="center"></el-table-column>
        <el-table-column sortable prop="notice_tive" label="公告正负面" min-width="100"
                         align="center"></el-table-column>
        <el-table-column sortable prop="news_tive" label="新闻正负面" min-width="100"
                         align="center"></el-table-column>
      </el-table>

      <reportContentDialog
        ref="reportContentDialog">
      </reportContentDialog>

      <noticeContentDialog
        ref="noticeContentDialog">
      </noticeContentDialog>

      <newsContentDialog
        ref="newsContentDialog">
      </newsContentDialog>

    </div>
</template>


<script type="es6">
  import reportContentDialog from '../../stock/detailsPage/stockReport/reportContent.vue'
  import noticeContentDialog from '../../stock/detailsPage/stockNotice/noticeContent.vue'
  import newsContentDialog from '../../stock/detailsPage/stockNews/newsContent.vue'
  import {getNpEventData} from '@/api/stocks'
    export default {
        name: 'np-pushed-table',
        data() {
          return {

            event_data: [],
            // 获取row的key值
            getRowKeys(row) {
              return row.code;
            },
            // 要展开的行，数值的元素是row的key值
            expands: [],
            loadingUsergroupList: true,
            reportNum: 0,
            noticeNum: 0,
            newsNum: 0,
          }
        },
        props:{
          pushedDatas: {
            type: Array
          },
        },
        components: {
          reportContentDialog,
          noticeContentDialog,
          newsContentDialog,
        },
        methods:{
          toggleRowExpansion(row){
            this.expands = [];
            this.event_data = []
            this.expands.push(row.code);
            this.getEventData(row.code)
          },
          rowExpansion(row, expandedRows) {
            if (expandedRows.length === 0){
              this.expands = [];
            }
            else {
              this.toggleRowExpansion(row)
            }
          },
          //展示信息详情
          showSelectContent: function (id, type) {

            if (type === "研报") {
              this.$refs.reportContentDialog.showReportContent(id);
            } else if (type === "公告") {
              this.$refs.noticeContentDialog.showNoticeContentDialog(id);
            } else if (type === "新闻") {
              this.$refs.newsContentDialog.showNewsContentDialog(id);
            }

          },
          getEventData: function(code) {
            getNpEventData(code).then(response => {

              for (let i = 0; i < response.length; i++) {
                this.event_data.push(
                  {
                    id: response[i]['id'],
                    type: response[i]['type'],
                    title: response[i]['title'],
                    posi_per: response[i]['analysis']['posi_per'],
                    keywords: this.showKeyWords(response[i]['analysis']['keywords'])
                  })
              }

            })

          },
          //整理获取关键词1
          showKeyWords: function (keywords) {
            let key = [];
            length = keywords.length > 3 ? 3 : keywords.length;
            for (let i = 0; i < length; i++) {
              key[i] = keywords[i][0];
            }
            return key;
          }
        }

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }

</style>


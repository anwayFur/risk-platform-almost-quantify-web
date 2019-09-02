<template>
  <div>

    <div id="reportKLineChart" class="reportKLineChart" style="width: 960px; height: 360px;"></div>

    <div style="margin-top: 10px;margin-bottom: 10px;font-size: 20px;">

      <span v-if="this.dateTime == ''">{{lastKLineDate}} 相关事件统计:</span>
      <span v-if="this.dateTime != ''">{{dateTime}} 相关事件统计:</span>

    </div>

    <div>
      <el-row class="row_style col_style statis_style">
        <el-col :xs="7" :sm="7" :md="7" :lg="7">
          <div style="padding-top: 25px;padding-left: 25px;">数量:</div>
          <div style="padding-top: 10px;text-align: center">

            <div style="padding-top: 10px">新闻: <span style="color: #3574f1">{{newsNum}}</span></div>
            <div style="padding-top: 10px">公告: <span style="color: #3574f1">{{noticeNum}}</span></div>
            <div style="padding-top: 10px">研报: <span style="color: #3574f1">{{reportNum}}</span></div>

          </div>
        </el-col>
        <el-col :xs="1" :sm="1" :md="1" :lg="1">
          <div><img src="../../../../assets/searchInfo/stock/border_middle.png" style="width: 10px;height: 200px"></div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8">
          <div style="padding-top: 25px;"><span>关键词:</span></div>
          <div style="padding-top: 20px; padding-left: 10px; padding-right: 10px">
            <div v-for="item in keyword">
              <el-tag
                style="float:left;margin-right:10px;margin-bottom: 10px"><span class="tag_font">{{item}}</span></el-tag>
            </div>
          </div>

        </el-col>
        <el-col :xs="1" :sm="1" :md="1" :lg="1">
          <div><img src="../../../../assets/searchInfo/stock/border_middle.png" style="width: 10px;height: 200px"></div>
        </el-col>
        <el-col :xs="7" :sm="7" :md="7" :lg="7">
          <div style="padding-top: 25px;"><span>正负面:</span></div>
          <div style="padding-top: 10px;text-align: center">

            <StockNpChart :posi_per="posi_per" :posi_isNull="posi_isNull"></StockNpChart>

          </div>
        </el-col>

      </el-row>

    </div>

    <div v-show="showReportTable" class="report_table_style">

      <div class="filter-container">
        <el-row class="row_style col_style">
          <el-col :xs="3" :sm="3" :md="3" :lg="3">
            <!--<span style="text-align: right;padding-left: 60px;">-->
              <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
            <!--</span>-->
              <span>事件类型筛选：</span>

          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
              <span>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
              </span>
          </el-col>
        </el-row>
      </div>

      <el-row class="row_style col_style">

        <el-col :span="24">

          <el-table align="center" :data="tableData" style="font-size:12px;">
            <el-table-column prop="date" sortable label="日期" width="120"></el-table-column>

            <el-table-column
              prop="type"
              label="事件类型"
              width="80">
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
            <el-table-column label="标题" min-width="200">
              <template slot-scope="scope">

                <a @click="showSelectContent(scope.row.id,scope.row.type)">{{scope.row.title}}</a>

              </template>
            </el-table-column>
            <el-table-column
              prop="posi_per"
              sortable
              label="正负面"
              width="280">

              <template slot-scope="scope" class="progress_style">

                <span>正面:{{scope.row.posi_per}}%</span>
                <span style="float: right">负面:{{(100 - scope.row.posi_per).toFixed(0)}}%</span>
                <span><el-progress class="pro_style_1" :stroke-width="2" :percentage="scope.row.posi_per"
                                   :show-text='false'
                                   status="exception"></el-progress></span>

              </template>
            </el-table-column>

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

        </el-col>

      </el-row>

    </div>

  </div>
</template>

<script type="es6">
  import reportContentDialog from '../stockReport/reportContent.vue'
  import noticeContentDialog from '../stockNotice/noticeContent.vue'
  import newsContentDialog from '../stockNews/newsContent.vue'
  import StockNpChart from './StockNpChart.vue'
  import {getKLineData, getEventData} from '@/api/stock'
  import {getReportContent} from '@/api/stock'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  var echarts = require('echarts')

  const cityOptions = ['新闻', '公告', '研报'];

  export default {

    data() {
      return {
        code: '',
        dateTime: '',

        tableData: [],
        transData: [],
        showReportTable: true,
        lastKLineDate: '',

        reportVisible: false,

        newsNum: 0,
        noticeNum: 0,
        reportNum: 0,
        keyword: [],
        posi_per: 0,
        posi_isNull: false,

        // 复选框
        checkAll: true,
        checkedCities: ['新闻', '公告', '研报'],
        cities: cityOptions,
        isIndeterminate: false,

      }
    },
    components: {
      reportContentDialog,
      noticeContentDialog,
      newsContentDialog,
      ElCol,
      ElRow,
      StockNpChart,
    },
    mounted() {

      this.code = this.$route.params.code;
      this.getKLineDataMethod()

    },
    methods: {

      //获取报告内容
      getTableContent(code, date) {
        getEventData(code, date).then(response => {
          if (response) { // 如果返回报告内容

            this.newsNum = 0;
            this.noticeNum = 0;
            this.reportNum = 0;

            var tableContent = response.data;
            this.tableData = []
            this.count = response.data.length;
            for (let i = 0; i < tableContent.length; i++) {

              if (tableContent[i].type === '新闻') {
                this.newsNum += 1;
              } else if (tableContent[i].type === '公告') {
                this.noticeNum += 1;
              } else if (tableContent[i].type === '研报') {
                this.reportNum += 1;
              }

              let posi_per = parseFloat(tableContent[i]["posi_per"]).toFixed(0);
              this.tableData.push(
                {
                  date: tableContent[i]["date"],
                  type: tableContent[i]["type"],
                  title: (tableContent[i]["title"].length < 30 ? tableContent[i]["title"] : tableContent[i]["title"].substr(0, 30) + '...'),
                  posi_per: Number(posi_per),
                  id: tableContent[i]["id"]
                })
            }

            this.transData = this.tableData;

            if (response.keywords.length === 0) {
              this.keyword = "无";
            } else {
              this.keyword = this.pushKeyWord(response['keywords']);
            }

            if(response.data.length === 0) {
              this.posi_isNull = true;
              this.posi_per = 0;
            }else{
              this.posi_per = parseFloat(parseFloat(response["posi_per"]).toFixed(0));
              this.posi_isNull = false;
            }


          }
        })
      },
      pushKeyWord: function (keydata) {
        let key = [];
        for (let i = 0; i < keydata.length; i++) {
          key.push(keydata[i][0]);
        }
        return key;
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
      initChartSetMethod(rawData) {

        /*基于准备好的dom，初始化echarts实例*/
        var reportKLineChart = echarts.init(document.getElementById('reportKLineChart'));

        var data0 = splitData(rawData)

        //切割数组，把数组中的日期和数据分离，返回数组中的日期和数据
        function splitData(rawData) {
          var categoryData = [];
          var values = [];

          for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].date);
            values.push([rawData[i].open, rawData[i].close, rawData[i].high, rawData[i].low])
          }
          return {
            categoryData: categoryData, //数组中的日期 x轴对应的日期
            values: values              //数组中的数据 y轴对应的数据
          };
        }

        this.lastKLineDate = data0.categoryData[data0.categoryData.length - 1]
        this.getTableContent(this.code, this.lastKLineDate)

        let start_index = data0.values.length - 30 > 0 ? (data0.values.length - 30) : 0
        let end_index = data0.values.length - 1

        var optionSet = {
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              var res = params[0].seriesName + ' ' + params[0].name;
              res += '<br/>  开盘 : ' + params[0].value[1] + '  最高 : ' + params[0].value[3];
              res += '<br/>  收盘 : ' + params[0].value[2] + '  最低 : ' + params[0].value[4];
              return res;
            }
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '10%',
            containLabel: true
          },
          legend: {
            data: ['日K'],
            orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
            // 'horizontal' ¦ 'vertical'
            x: 'center',               // 水平安放位置，默认为全图居中，可选为：
                                       // 'center' ¦ 'left' ¦ 'right'
                                       // ¦ {number}（x坐标，单位px）
            y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                       // 'top' ¦ 'bottom' ¦ 'center'
                                       // ¦ {number}（y坐标，单位px）
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc',       // 图例边框颜色
            borderWidth: 0,            // 图例边框线宽，单位px，默认为0（无边框）
            padding: 5,                // 图例内边距，单位px，默认各方向内边距为5，
                                       // 接受数组分别设定上右下左边距，同css
            itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
                                       // 横向布局时为水平间隔，纵向布局时为纵向间隔
            itemWidth: 20,             // 图例图形宽度
            itemHeight: 14,            // 图例图形高度
            textStyle: {
              color: '#333'          // 图例文字颜色
            }
          },
          toolbox: {
            show: false,
            feature: {
              mark: {show: true},
              dataZoom: {show: true},
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          dataZoom: {
            show: true,
            realtime: true,
            startValue: start_index,
            endValue: end_index
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              axisTick: {onGap: false},
              splitLine: {show: false},
              data: data0.categoryData
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              boundaryGap: [0.01, 0.01]
            }
          ],
          series: [
            {
              name: '日K',
              type: 'k',
              barMaxWidth: 20,
              // barWidth : null          // 默认自适应
              // barMaxWidth : null       // 默认自适应
              itemStyle: {
                normal: {
                  color: '#ef232a',
                  color0: '#14b143',
                  borderColor: '#ef232a',
                  borderColor0: '#14b143',
                  lineStyle: {
                    width: 1,
                    color: '#ff3200',   // 阳线边框颜色
                    color0: '#00aa11'   // 阴线边框颜色
                  }
                },
                emphasis: {
                  // color: 各异,
                  // color0: 各异
                }
              },
              data: data0.values

            }
          ]
        }

        const that = this

        // 使用刚指定的配置项和数据显示图表
        reportKLineChart.setOption(optionSet);

        reportKLineChart.on('click', function (params) {

          that.dateTime = params.name
          that.tableData = []
          that.getTableContent(that.code, that.dateTime)

        });


      },
      filterType(value, row) {
        return row.type === value;
      },
//      handleCheckAllChange(val) {
//        this.checkedCities = val ? cityOptions : [];
//        this.handleCheckBoxFilter()
//        this.isIndeterminate = false;
//      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.handleCheckBoxFilter()
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleCheckBoxFilter() {

        let data = this.transData
        let typeData = this.checkedCities
        let tData = [];


        for (let i = 0; i < data.length; i++) {
          for(let t = 0; t < typeData.length; t++){
            let posi_per = parseFloat(data[i]["posi_per"]).toFixed(0);
            if(data[i]["type"] == typeData[t]){
              tData.push(
                {
                  date: data[i]["date"],
                  type: data[i]["type"],
                  title: (data[i]["title"].length < 30 ? data[i]["title"] : data[i]["title"].substr(0, 30) + '...'),
                  posi_per: Number(posi_per),
                  id: data[i]["id"]
                })
            }
          }
        }

        this.tableData = tData;

      },
      //获取股票K线图
      getKLineDataMethod() {
        return getKLineData(this.code).then(response => {
          if (response) {
            this.initChartSetMethod(response)
          }
        })

      }
    },
  }
</script>

<style lang="scss" scoped>

  .progress_style {
    display:inline-block;
    float: left;
  }

</style>

<template>

  <div class="app-container">

    <transition name="el-zoom-in-top">
      <div v-show="true" class="transition-box">
        <div class="div_top">

          <div class="border_div pad_div">

            <el-row>

              <el-col :xs="12" :sm="12" :md="12" :lg="12">

                <el-row>
                  <div class="sin_top">
                    {{name}}
                    ({{zjs}}:{{code}})
                  </div>
                </el-row>
                <el-row>
                  <div class="sin_middle_left">

                    <div v-if="realTimeQuotes.change > 0">
                      <span class="value_now color_red">￥{{realTimeQuotes.now}}</span>
                      <div>
                        <span class="value_up color_red">{{realTimeQuotes.change}}</span>
                        <span class="value_up_rate color_red">({{realTimeQuotes.change_perc}})</span>
                      </div>
                    </div>
                    <div v-else-if="realTimeQuotes.change === '0.00'">
                      <span class="value_now color_black">￥{{realTimeQuotes.now}}</span>
                      <div>
                        <span class="value_up color_black">0.00</span>
                        <span class="value_up_rate color_black">({{realTimeQuotes.change_perc}})</span>
                      </div>
                    </div>
                    <div v-else-if="realTimeQuotes.change < 0">
                      <span class="value_now color_green">￥{{realTimeQuotes.now}}</span>
                      <div>
                        <span class="value_up color_green">{{realTimeQuotes.change}}</span>
                        <span class="value_up_rate color_green">({{realTimeQuotes.change_perc}})</span>
                      </div>
                    </div>
                    <div v-else-if="realTimeQuotes.change === '-'">
                      <span class="value_now color_black ting_sty"> 停牌 </span>
                      <div>
                        <span class="value_up color_black">--</span>
                        <span class="value_up_rate color_black">({{realTimeQuotes.change_perc}})</span>
                      </div>
                    </div>

                  </div>
                </el-row>

              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12">
                <el-row>
                  <div class="">&nbsp;</div>
                </el-row>
                <el-row>
                  <div class="sin_middle_right">
                    <span class="update_at">{{update_time}}(北京时间) </span>
                  </div>
                </el-row>
              </el-col>

            </el-row>

          </div>

        </div>
      </div>
    </transition>

    <el-tabs tab-position="left"
             v-model="activeName"
             @tab-click="handleClick" class="tab_pos_style">
      <el-tab-pane label="个股信息"
                   name="BaseInfo">
        <BaseInfo :realTimeQuotes="realTimeQuotes"></BaseInfo>
      </el-tab-pane>
      <el-tab-pane label="行情分析" name="Quotation">
        <div v-if="currentTab ==='Quotation'">
          <Quotation></Quotation>
        </div>
      </el-tab-pane>
      <el-tab-pane label="个股研报" name="Report">
        <div v-if="currentTab ==='Report'">
          <Report></Report>
        </div>
      </el-tab-pane>
      <el-tab-pane label="个股公告" name="notice">
        <div v-if="currentTab ==='notice'">
          <notice></notice>
        </div>
      </el-tab-pane>
      <el-tab-pane label="个股新闻" name="news">
        <div v-if="currentTab ==='news'">
          <news></news>
        </div>
      </el-tab-pane>
      <!--<el-tab-pane label="热词分析">热词分析</el-tab-pane>-->
      <el-tab-pane
        v-if="'600507,002110,600569,600581,000959,600782,000932,000898,603878,000825,000717,000761,600307,600126,002318,600117,600019,600282,600231,600808,000708,900936,000709,600010,002478,600295,200761,600399,600022,002593,000655,601005,000409,002756,000629,600532,002075,601003,002423'.indexOf(this.$route.params.code) >= 0"
        label="产业链分析"
        name="Chain">
        <div v-if="currentTab ==='Chain'">
          <Chain></Chain>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script type="es6">

  import BaseInfo from './stockInfo/BaseInfo.vue'
  import Quotation from './quotationAnalysis/Quotation.vue'
  import Report from './stockReport/report.vue'
  import Notice from './stockNotice/notice.vue'
  import News from './stockNews/news.vue'
  import Chain from './stockIndustryChain/chain.vue'
  import {getStock} from '@/api/stock'
  import {getRealTimeQuotes} from '@/api/realTimeQuotes'

  export default {

    name: 'stock',
    data() {
      return {
        code: '',   //股票代码
        name: '',    //股票名称
        zjs: '',    //证交所

        realTimeQuotes: {}, // 实时行情
        update_time: '',  //实时行情更新时间

        activeName: 'BaseInfo',
        currentTab: 'BaseInfo', // currentTab 用于标识当前触发的子组件
        loading: true,
      }
    },
    components: {
      BaseInfo,
      Quotation,
      Report,
      Notice,
      News,
      Chain
    },
    mounted() {
      // code
      this.code = this.$route.params.code;

      // 获取实时数据信息
      this.getRealTimeQuotesMethod();

      // 获取股票信息
      this.getStockMethod();

      // 加载
      //this.initLoadingTime();
    },
    methods: {
      //获取股票数据信息
      getStockMethod: function () {
        getStock(this.code).then(response => {
          if (response) { // 如果返回有信息
            this.name = response.name;
            this.zjs = response.zjs.toUpperCase()
          }
        })
      },
      // 获取实时行情
      getRealTimeQuotesMethod: function () {
        getRealTimeQuotes(this.code, 'stock').then(response => {
          if (response) {
            this.realTimeQuotes = response.data
            this.update_time = response.update_at
          }
        })
      },


      handleClick(tab, event) {
        this.activeName = tab.name;
        this.currentTab = tab.name;
      },

      // 每隔5分钟刷新数据
      initSetTimeout() {
        //es6中这个this指向的是这些方法，若setInterval(function(){ this.getData(today)})中的this指向的真个windows，
        // 这样写是会报错的，所以最好用es6来调用getData里的方法
        setInterval( () => {
          this.getRealTimeQuotesMethod();
        }, 5 * 60 * 1000)

      },
      // initLoadingTime() {
      //   setTimeout(() => {
      //     this.loading = false;
      //   }, 1000);
      // }
    },
    //页面一进来就获得当前时间，并且调用每隔10秒刷新数据
    created() {
      this.initSetTimeout()
    }


  }
</script>

<style type="text/css" lang="scss" scoped>

  .ting_sty {
    padding-left: 8px;
    font-size: 20px;
  }

</style>

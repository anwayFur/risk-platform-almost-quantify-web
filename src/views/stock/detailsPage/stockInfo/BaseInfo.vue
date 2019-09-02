<template>
  <div>
    <!--<StockInfo></StockInfo>-->
    <!--股票信息-->
    <div class="stock_info">

      <div class="border_div">

        <div class="tip_title">实时行情</div>
        <el-row class="sin_data">

          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="">
              今开：
              <span v-if="this.realTimeQuotes.open > this.realTimeQuotes.yc">
                      <span class="color_red">{{this.realTimeQuotes.open}}</span>
                    </span>
              <span v-else-if="this.realTimeQuotes.open === this.realTimeQuotes.yc">
                      <span class="color_black">{{this.realTimeQuotes.open}}</span>
                    </span>
              <span v-else-if="this.realTimeQuotes.open === '-'">
                      <span class="color_black">{{this.realTimeQuotes.open}}</span>
                    </span>
              <span v-else-if="this.realTimeQuotes.open < this.realTimeQuotes.yc">
                      <span class="color_green">{{this.realTimeQuotes.open}}</span>
                    </span>

            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="">
              昨结：
              {{realTimeQuotes.yc}}
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="">
              最高：
              <span v-if="realTimeQuotes.high > realTimeQuotes.yc">
                      <span class="color_red">{{realTimeQuotes.high}}</span>
                    </span>
              <span v-else-if="realTimeQuotes.high === realTimeQuotes.yc">
                      <span class="color_black">{{realTimeQuotes.high}}</span>
                    </span>
              <span v-else-if="realTimeQuotes.high === '-'">
                      <span class="color_black">{{realTimeQuotes.high}}</span>
                    </span>
              <span v-else="realTimeQuotes.high < realTimeQuotes.yc">
                      <span class="color_green">{{realTimeQuotes.high}}</span>
                    </span>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="">
              最低：
              <span v-if="realTimeQuotes.low > realTimeQuotes.yc">
                      <span class="color_red">{{realTimeQuotes.low}}</span>
                    </span>
              <span v-else-if="realTimeQuotes.low === realTimeQuotes.yc">
                      <span class="color_black">{{realTimeQuotes.low}}</span>
                    </span>
              <span v-else-if="realTimeQuotes.low === '-'">
                      <span class="color_black">{{realTimeQuotes.low}}</span>
                    </span>
              <span v-else="realTimeQuotes.low < realTimeQuotes.yc">
                      <span class="color_green">{{realTimeQuotes.low}}</span>
                    </span>
            </div>
          </el-col>

        </el-row>
        <el-row class="sin_data">

          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class=""> 成交量：{{volume}}</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class=""> 成交额：{{turnover}}</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class=""> 涨跌幅：{{realTimeQuotes.amplitude}}%</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class=""> PE<sup>TTM</sup>：{{PE}}</div>
          </el-col>

        </el-row>

        <el-row class="sin_data">

          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class=""> 总市值：{{zsz}} 亿</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class=""> 流通市值：{{ltsz}} 亿</div>
          </el-col>

        </el-row>

      </div>

      <div class="border_div">
        <div class="tip_title">基本信息</div>

        <el-row class="row_style col_style">

          <el-col :xs="12" :sm="12" :md="12" :lg="12">
            <SdgdChart :sdgd="sdgd" style="width: 90%;margin: 0 auto;"></SdgdChart>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12">
            <ZygcCpChart :zygc_cp="zygc_cp" style="width: 90%;margin: 0 auto;"></ZygcCpChart>
          </el-col>

        </el-row>
        <el-row class="row_style col_style">
          <el-col :xs="12" :sm="12" :md="12" :lg="12">
            <div class="txt_align">
              <a type="text" @click="sdgdDialogVisible = true">查看股东结构详情>></a>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12">
            <div class="txt_align">
              <a type="text" @click="zygcDialogVisible = true">查看产品构成详情>></a>
            </div>
          </el-col>
          <el-dialog class="gdGialog" title="公司股东" :visible.sync="sdgdDialogVisible">

            <!--<div style="text-align: center; font-size: 20px">十大股东</div>-->
            <el-table :data="sdgd" stripe border>
              <el-table-column property="gdmc" label="十大股东名称" width="520px"></el-table-column>
              <el-table-column property="gflx" label="股份类型"></el-table-column>
              <el-table-column property="cgs" label="持股数(股)"></el-table-column>
              <el-table-column property="zltgbcgbl" label="占总股本持股比例"></el-table-column>
            </el-table>
            <!--<div style="padding-top: 10px"></div>-->
            <!--<div style="text-align: center; font-size: 20px">十大流通股东</div>-->
            <el-table :data="sdltgd" stripe border>
              <el-table-column property="gdmc" label="十大流通股东名称" width="520px"></el-table-column>
              <el-table-column property="gflx" label="股份类型"></el-table-column>
              <el-table-column property="cgs" label="持股数(股)"></el-table-column>
              <el-table-column property="zltgbcgbl" label="占总流通股本持股比例"></el-table-column>
            </el-table>

            <div v-if="hasTime != ''" class="tab_footer" style="font-size: 12px;
                        text-align: right;padding-top: 10px;color: #000;">
              更新时间:{{hasTime}}
            </div>

          </el-dialog>
          <el-dialog class="zygcGialog" title="主营构成" :visible.sync="zygcDialogVisible">
            <el-table
              :data="zygc_cp"
              :span-method="cpSpanMethod"
              border
              style="width: 100%; margin-top: 20px">
              <el-table-column
                prop="id"
                label="按产品分类"
                width="100">
              </el-table-column>
              <el-table-column
                prop="zygc"
                label="主营构成"
                width="120">
              </el-table-column>
              <el-table-column
                prop="zysr"
                label="主营收入(元)"
                width="110">
              </el-table-column>
              <el-table-column
                prop="srbl"
                label="收入比例">
              </el-table-column>
              <el-table-column
                prop="zycb"
                label="主营成本(元)"
                width="110">
              </el-table-column>
              <el-table-column
                prop="cbbl"
                label="成本比例">
              </el-table-column>
              <el-table-column
                prop="zylr"
                label="主营利润(元)"
                width="110">
              </el-table-column>
              <el-table-column
                prop="lrbl"
                label="利润比例">
              </el-table-column>
              <el-table-column
                prop="mll"
                label="毛利率">
              </el-table-column>
            </el-table>
            <el-table
              :data="zygc_hy"
              :span-method="hySpanMethod"
              border
              style="width: 100%; margin-top: 20px">
              <el-table-column
                prop="id"
                label="按行业分类"
                width="100">
              </el-table-column>
              <el-table-column
                prop="zygc"
                label="主营构成"
                width="120">
              </el-table-column>
              <el-table-column
                prop="zysr"
                label="主营收入(元)"
                width="110">
              </el-table-column>
              <el-table-column
                prop="srbl"
                label="收入比例">
              </el-table-column>
              <el-table-column
                prop="zycb"
                label="主营成本(元)"
                width="110">
              </el-table-column>
              <el-table-column
                prop="cbbl"
                label="成本比例">
              </el-table-column>
              <el-table-column
                prop="zylr"
                label="主营利润(元)"
                width="110">
              </el-table-column>
              <el-table-column
                prop="lrbl"
                label="利润比例">
              </el-table-column>
              <el-table-column
                prop="mll"
                label="毛利率">
              </el-table-column>
            </el-table>

            <div v-if="zygcUpdateTime != ''" class="tab_footer" style="font-size: 12px;
                        text-align: right;padding-top: 10px;color: #000;">
              更新时间:{{zygcUpdateTime}}
            </div>

          </el-dialog>
        </el-row>

      </div>

      <div class="border_div">

        <div class="tip_title">历史行情</div>

        <el-row class="sin_hq">

          <el-col :xs="24" :sm="24" :md="24" :lg="24">


            <div v-if="currentTab ==='日K'">
              <KLineChart></KLineChart>
            </div>


          </el-col>

        </el-row>
        <el-row>
          <el-col :span="4">
            <div class=""></div>
          </el-col>
          <el-col :span="4">
            <div class=""></div>
          </el-col>
          <el-col :span="4">
            <div class=""></div>
          </el-col>
          <el-col :span="4">
            <div class=""></div>
          </el-col>
          <el-col :span="4">
            <div class=""></div>
          </el-col>
          <el-col :span="4">
            <div class=""></div>
          </el-col>
        </el-row>

      </div>

      <!--<div class="border_div">-->
      <!--<div class="tip_title">个股舆情、研报正负面走势图</div>-->

      <!--<el-row class="sin_hq">-->


      <!--<el-col :xs="24" :sm="24" :md="24" :lg="24">-->

      <!--<StockNpChart></StockNpChart>-->

      <!--</el-col>-->


      <!--</el-row>-->
      <!--<el-row>-->
      <!--<el-col :span="4"><div class=""></div></el-col>-->
      <!--<el-col :span="4"><div class=""></div></el-col>-->
      <!--<el-col :span="4"><div class=""></div></el-col>-->
      <!--<el-col :span="4"><div class=""></div></el-col>-->
      <!--<el-col :span="4"><div class=""></div></el-col>-->
      <!--<el-col :span="4"><div class=""></div></el-col>-->
      <!--</el-row>-->
      <!--</div>-->

    </div>
  </div>
</template>


<script type="es6">


  import KLineChart from './KLineChart.vue'
  import WeekKLineChart from './WeekKLineChart.vue'
  import MonthKLineChart from './MonthKLineChart.vue'
  import StockNpChart from './StockNpChart.vue'
  import SdgdChart from './SdgdChart.vue'
  import ZygcCpChart from './ZygcCpChart.vue'
  import {getStock, getStockBaseInfo} from '@/api/stock'

  var echarts = require('echarts')

  export default {

    name: 'base-info',
    data() {
      return {
        code: '',

        // 需要计算的实时数据
        volume: '', // 成交量
        turnover: '', // 成交额
        PE: '', //PE 市盈率
        zsz: '',  //总市值
        ltsz: '', //流通市值

        //
        //公司股东
        gsgd: '',
        //主营构成前3种
        zygc3: '',

        //股本结构
        gbjg: {},

        mgsy: 0,
        zgb: 0,
        ltgb: 0,

        //十大股东
        sdgd: [],
        //十大流通股东
        sdltgd: [],
        sdgdDialogVisible: false,
        //流通股东更新时间
        hasTime: '',

        //主营构成_产品
        zygc_cp: [],
        //主营构成_行业
        zygc_hy: [],
        //主营构成总数据
        zygc: [],
        //主营构成更新时间
        zygcUpdateTime: '',
        zygcDialogVisible: false,

        activeName: '日K',
        currentTab: '日K', // currentTab 用于标识当前触发的子组件

      }
    },
    props: {
      realTimeQuotes: {}
    },
    watch: {
      // 如果 `realTimeQuotes` 发生改变，这个函数就会运行
      realTimeQuotes: function (newRealTimeQuotes) {

        this.matchRealData(newRealTimeQuotes)

        // PE 市盈率 总市值 流通市值
        if (isNaN(parseFloat(newRealTimeQuotes.now))) {
          this.PE = '-'
          this.zsz = '-'
          this.ltsz = '-'
        } else {
          this.PE = (newRealTimeQuotes.now / this.mgsy).toFixed(2)
          this.zsz = (parseFloat(this.zgb) * parseFloat(newRealTimeQuotes.now) / Math.pow(10, 8)).toFixed(2)
          this.ltsz = (parseFloat(this.ltgb) * parseFloat(newRealTimeQuotes.now) / Math.pow(10, 8)).toFixed(2)
        }

      }
    },
    components: {
      KLineChart,
      WeekKLineChart,
      MonthKLineChart,
      StockNpChart,
      SdgdChart,
      ZygcCpChart,
    },
    created() {
      this.code = this.$route.params.code;
      // 获取股票基本数据信息 包括股本结构、十大股东、 十大流通股东、主营构成_行业、主营构成_产品
      this.getStockBaseInfoMethod();
    },
    methods: {
      //获取股票基本数据信息(stock_base_info)
      //包括股本结构、十大股东、 十大流通股东、主营构成_行业、主营构成_产品
      getStockBaseInfoMethod: function () {
        getStockBaseInfo(this.code).then(response => {
          if (response) {

            // 股本结构
            this.gbjg = response.gbjg;
            this.mgsy = this.gbjg.mgsy;
            this.zgb = this.gbjg.zgb;
            this.ltgb = this.gbjg.ltgb;

            // PE 市盈率 总市值 流通市值
            if (isNaN(parseFloat(this.realTimeQuotes.now))) {
              this.PE = '-'
              this.zsz = '-'
              this.ltsz = '-'
            } else {
              this.PE = (this.realTimeQuotes.now / this.mgsy).toFixed(2)
              this.zsz = (parseFloat(this.zgb) * parseFloat(this.realTimeQuotes.now) / Math.pow(10, 8)).toFixed(2)
              this.ltsz = (parseFloat(this.ltgb) * parseFloat(this.realTimeQuotes.now) / Math.pow(10, 8)).toFixed(2)
            }

            // 十大股东信息
            this.sdgd = response.sdgd;

            // 十大流通股东
            this.sdltgd = response.sdltgd;

            if(typeof (this.sdgd) == "undefined" || this.sdgd == null){
            }else{
              if(this.sdgd.length > 0) {
                this.hasTime = this.sdgd[0].rq;
              }
            }

            if(typeof (this.sdltgd) == "undefined" || this.sdltgd == null){
            }else{
              if(this.sdgd.length > 0) {
                this.hasTime = this.sdltgd[0].rq;
              }
            }

            //十大股东信息 展示前三
//            this.gsgd = this.sdgd[0].gdmc + '(' + this.sdgd[0].zltgbcgbl + ')' + '、'
//              + this.sdgd[1].gdmc + '(' + this.sdgd[1].zltgbcgbl + ')' + '、'
//              + this.sdgd[2].gdmc + '(' + this.sdgd[2].zltgbcgbl + ')'


            // 处理主营构成数据信息
            this.zygc_cp = response.zygc_cp

            for (let i = 0; i < this.zygc_cp.length; i++) {
              //给数组中的json添加属性
              this.zygc_cp[i]["id"] = '按产品分类'
            }

            this.zygc_hy = response.zygc_hy

            for (let i = 0; i < this.zygc_hy.length; i++) {
              this.zygc_hy[i]["id"] = '按行业分类'
            }

            if (this.zygc_cp.length > 0) {
              this.zygcUpdateTime = this.zygc_cp[0].rq
//              for (var i = 0; i < this.zygc_cp.length; i++) {
//                this.zygc3 += this.zygc_cp[i].zygc + '(' + this.zygc_cp[i].srbl + ')'
//                if (i === 2 || i === this.zygc_cp.length - 1) break
//                if (i < this.zygc_cp.length) {
//                  this.zygc3 += '、'
//                }
//              }
            } else if (this.zygc_hy.length > 0) {
              this.zygcUpdateTime = this.zygc_hy[0].rq
//              for (var i = 0; i < this.zygc_hy.length; i++) {
//                this.zygc3 += this.zygc_hy[i].zygc + '(' + this.zygc_hy[i].srbl + ')'
//                if (i === 2 || i === this.zygc_hy.length - 1) break
//                if (i < this.zygc_hy.length) {
//                  this.zygc3 += '、'
//                }
//              }
            } else {
              this.zygcUpdateTime = '-'
            }


          }
        })
      },
      handleClick(tab) {
        this.activeName = tab.name;
        this.currentTab = tab.name;
      },
      //主营构成产品表格合并
      cpSpanMethod({row, column, rowIndex, columnIndex}) {

        if (columnIndex === 0) {
          if (rowIndex === 0) {
            return {
              rowspan: this.zygc_cp.length,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }

      },
      //主营构成行业表格合并
      hySpanMethod({row, column, rowIndex, columnIndex}) {

        if (columnIndex === 0) {
          if (rowIndex === 0) {
            return {
              rowspan: this.zygc_hy.length,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }

      },
      matchRealData(newRealTimeQuotes) {

        // 计算 成交量 成交额
        if (isNaN(parseFloat(newRealTimeQuotes.volume)) || isNaN(parseFloat(newRealTimeQuotes.turnover))) {
          this.volume = '-'
          this.turnover = '-'
        } else {
          if (newRealTimeQuotes.volume > Math.pow(10, 8)) {
            this.volume = (parseFloat(newRealTimeQuotes.volume) / Math.pow(10, 8)).toFixed(2) + ' 亿'
          } else if (newRealTimeQuotes.volume > Math.pow(10, 4)) {
            this.volume = (parseFloat(newRealTimeQuotes.volume) / Math.pow(10, 4)).toFixed(2) + ' 万'
          } else {
            this.volume = parseFloat(newRealTimeQuotes.volume)
          }

          if (newRealTimeQuotes.turnover > Math.pow(10, 8)) {
            this.turnover = (parseFloat(newRealTimeQuotes.turnover) / Math.pow(10, 8)).toFixed(2) + ' 亿'
          } else if (newRealTimeQuotes.turnover > Math.pow(10, 4)) {
            this.turnover = (parseFloat(newRealTimeQuotes.turnover) / Math.pow(10, 4)).toFixed(2) + ' 万'
          } else {
            this.turnover = parseFloat(newRealTimeQuotes.turnover)
          }
        }

      }
    }


  }
</script>

<style type="text/css" lang="scss" scoped>

  .tip_title {
    background: url("../../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
  }

  .txt_align {
    text-align: right;
    padding-right: 50px;
  }

</style>

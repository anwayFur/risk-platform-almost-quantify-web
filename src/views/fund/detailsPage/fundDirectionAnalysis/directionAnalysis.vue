<template>
  <div>
    <div class="stock_info">

      <div class="border_div">
        <div class="tip_title">投向分析</div>
        <el-row class="sin_data">
          <el-col :xs="12" :sm="12" :md="12" :lg="12">
            <div v-if="maxDataName==='股票占净比'">
              <span>重点配置: {{key_distribution}}</span><br>
            </div>
            <div v-else-if="maxDataName==='现金占净比'">
              <span>重点配置: 货币</span><br>
            </div>
            <div v-else>
              <span>重点配置: 债券</span><br>
            </div>
          </el-col>

        </el-row>
        <el-row class="sin_data" v-if="etf_vs_lof_target">
          <el-col :xs="12" :sm="12" :md="12" :lg="12">
            <div>
              <span>ETF与LOF:{{etf_vs_lof_target}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="sin_data">
          <el-col :xs="10" :sm="10" :md="10" :lg="10">
            <div id="myChartPie" style="width:500px;height: 500px;padding-left: 0;margin-left: 0">
            </div>
          </el-col>
          <el-col :xs="14" :sm="14" :md="14" :lg="14">
            <div id="myChartBar" style="width:500px;height: 500px">
            </div>
          </el-col>
        </el-row>
        <!-- <el-row class="sin_data">
           <el-col :xs="12" :sm="12" :md="12" :lg="12">
             <div>
               <el-button type="primary" @click="showPrice">价格调整公告</el-button>
               <fund-price ref="fundPrice"></fund-price>
             </div>
           </el-col>
           <el-col :xs="12" :sm="12" :md="12" :lg="12">
             <div>
               <el-button type="primary" @click="showMarket">市场调整预估</el-button>
               <fund-market ref="fundMarket"></fund-market>
             </div>
           </el-col>
         </el-row>
         <el-row class="sin_data">
           <el-col :xs="24" :sm="24" :md="24" :lg="24">
             <div style="float:right">
               <span style="font-size: 20px">结论:买买买买</span>
             </div>
           </el-col>

         </el-row>-->
      </div>


    </div>
  </div>
</template>


<script type="es6">
  import fundPrice from './fundPrice.vue'
  import fundMarket from './fundMarket.vue'
  import {getDataAnalysis} from '@/api/fund'

  let echarts = require('echarts');
  export default {
    name: 'directionAnalysis',
    components: {
      fundPrice,
      fundMarket
    },
    data() {
      return {
        code: "",
        /*重点配置*/
        key_distribution: '',
        /*ETF 与LOF*/
        etf_vs_lof_target: '',
        data: '',
        maxDataName: ''
      }
    },
    mounted() {
      this.code = this.$route.params.code;
      this.getDataAnalysis();


    },
    methods: {
      getDataAnalysis() {
        getDataAnalysis(this.code).then(response => {
          if (response) {
            this.data = response;
            this.key_distribution = response['key_distribution'];
            this.etf_vs_lof_target = response['etf_vs_lof_target'];

            let pieLegend = [];
            /*饼图图例*/
            let pieData = [];
            /*饼图数据*/
            let maxRatio = {'value': -1, 'name': ""};
            /*获取占比最大的数据*/
            if (!(JSON.stringify(response['asset_allocation']) === "{}")) {
              for (let value of response['asset_allocation']['data']) {
                if (maxRatio['value'] < parseFloat(value[1])) {
                  maxRatio = {'value': parseFloat(value[1]), 'name': value[0]};
                }
                let tempPie = {};
                pieLegend.push(value[0]);
                tempPie = {'value': parseFloat(value[1]), 'name': value[0]};
                pieData.push(tempPie);
              }
            }
            this.showPie(pieLegend, pieData);
            this.maxDataName = maxRatio['name'];

            /*展示占比最大的柱状图*/
            this.changeBarShow(maxRatio['name']);

          }
        })
      },
      showPrice() {
        this.$refs.fundPrice.showPricetContent();
      },
      showMarket() {
        this.$refs.fundMarket.showMarketContent();
      },
      showPie(pieLegend = [], piedata = []) {
        let thispie = this;
        let myChart = document.getElementById('myChartPie');
        let mainChart = echarts.init(myChart);
        let option = {
          title: {
            text: '资产配置',
            x: 'center',
            top: '20'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: pieLegend
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: piedata,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        mainChart.setOption(option);
        mainChart.on('click', function (param) {
          thispie.changeBarShow(param.name)
        })
      },
      showBar(bartitle = '', ydata = [], sdata = []) {
        let myChart = document.getElementById('myChartBar');
        let mainChart = echarts.init(myChart);
        let option = {
          title: {
            text: bartitle,
            x: 'center',
            top: '20'
          },
          tooltip: {
            trigger: 'axis',
            formatter: "{a} <br/>{b} : {c}%",
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: ['比例']
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '20%',
            containLabel: true
          },
          xAxis: {
            name: "",
            nameGap: 5,
            type: 'value',

          },
          yAxis: {
            name: '',
            nameGap: 5,
            type: 'category',
            data: ydata,
            axisLabel: {
              interval: 0,//标签设置为全部显示
              formatter: function (params) {
                let newParamsName = "";// 最终拼接成的字符串
                let paramsNameNumber = params.length;// 实际标签的个数
                let provideNumber = 8;// 每行能显示的字的个数
                let rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (let p = 0; p < rowNumber; p++) {
                    let tempStr = "";// 表示每一次截取的字符串
                    let start = p * provideNumber;// 开始截取的位置
                    let end = start + provideNumber;// 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p === rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;// 最终拼成的字符串
                  }

                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName

                //粘贴以下function内未注释的代码
              }
            }
          },
          series: [
            {
              name: '比例',
              type: 'bar',
              barMaxWidth: 30,
              itemStyle: {

                normal: {
                  color: "#d48265",
                  label: {
                    show: true,
                    color: "#080608",
                    position: 'right',//数据在中间显示
                    formatter: '{c}%'//百分比显示
                  }
                }
              },
              data: sdata
            },

          ]
        };
        mainChart.setOption(option)
      },
      changeBarShow(name) {
        let bartitle, ydata = [], sdata = [];

        if (name === "股票占净比") {
          bartitle = '股票占净比';
          for (let value of this.data['stock_hold']['data']) {
            ydata.push(value['name']);
            sdata.push(parseFloat(value['new_value_per']));
          }
          ydata = ydata.reverse();
          sdata = sdata.reverse();
          this.showBar(bartitle, ydata, sdata);
        }
        else {
          bartitle = '债券占净比';
          for (let value of this.data['bonds_hold']['data']) {
            ydata.push(value['name']);
            sdata.push(parseFloat(value['new_value_per']));
          }
          ydata = ydata.reverse();
          sdata = sdata.reverse();
          this.showBar(bartitle, ydata, sdata);
        }
      }
    }
  }


</script>

<style type="text/css" lang="scss" scoped>

  .tab_style {
    min-height: 300px;
  }

  .tip_title {
    background: url("../../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
  }

  .stock_info {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 10px;

    .sin_middle_right {
      padding-top: 30px;
      padding-bottom: 10px;
      text-align: right;
    }

    .sin_data {
      padding-top: 10px;
      padding-bottom: 10px;
      text-align: left;

      div {
        padding-left: 25px;
      }
    }

  }


</style>

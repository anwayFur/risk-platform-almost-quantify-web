<template>
    <div>

      <div id="monthKLineChart" class="monthKLineChart" style="width: 960px;height: 360px"></div>

    </div>
</template>

<script type="es6">

    import {getKLineData} from '@/api/stock'

    var echarts = require('echarts')

    export default {

      data() {
          return {
            dateTime: '',
            rawData: [],
          }
      },
      mounted() {
        this.code = this.$route.params.code;
        this.getKLineDataMethod()
      },
      methods: {
        initChartSetMethod(rawData) {
          /*基于准备好的dom，初始化echarts实例*/
          let monthKLineChart = echarts.init(document.getElementById('monthKLineChart'));


          let data0 = splitData(rawData)

          //切割数组，把数组中的日期和数据分离，返回数组中的日期和数据
          function splitData(rawData) {
            let categoryData = [];
            let values = [];

            for (let i = 0; i < rawData.length; i++) {
              categoryData.push(rawData[i].day);
              values.push([rawData[i].open, rawData[i].close, rawData[i].high, rawData[i].low])
            }
            return {
              categoryData: categoryData, //数组中的日期 x轴对应的日期
              values: values              //数组中的数据 y轴对应的数据
            };
          }

          let start_index = data0.values.length - 30 > 0 ? (data0.values.length - 30):0
          let end_index = data0.values.length - 1

          let optionMonthKLine = {
            title: {
              left: 0
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              },
              formatter: function (params) {
                let res = params[0].seriesName + ' ' + params[0].name;
                res += '<br/>  开盘 : ' + params[0].value[1] + '  最高 : ' + params[0].value[4];
                res += '<br/>  收盘 : ' + params[0].value[2] + '  最低 : ' + params[0].value[3];
                return res;
              }
            },
            legend: {
              data: ['月K'],
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '20%'
            },
            xAxis: {
              type: 'category',
              data: data0.categoryData,
              min: 'dataMin',
              max: 'dataMax'
            },
            yAxis: {
              scale: true,
              splitArea: {
                show: true
              },
              boundaryGap: [0.05, 0.05]
            },
            dataZoom : {
              show : true,
              realtime: true,
              startValue : start_index,
              endValue : end_index
            },
            series: [
              {
                name: '月K',
                type: 'candlestick',
                data: data0.values,
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
                },
                markPoint: {
                  symbolSize: 1,
                  label: {
                    normal: {
                      formatter: function (param) {
                        return param != null ? param.value : '';
                      }
                    }
                  },
                  data: [
                    {
                      name: 'highest value',
                      type: 'max',
                      valueDim: 'lowest',
                      label: {
                        color: 'red',
                        position:'top',
                        distance:'5',
                      }
                    },
                    {
                      name: 'lowest value',
                      type: 'min',
                      valueDim: 'highest',
                      label:{
                        color: 'green',
                        position:'bottom',
                      }
                    }
                  ],
                  tooltip: {
                    formatter: function (param) {
                      return param.name + '<br>' + (param.data.coord || '');
                    }
                  }
                },

              },

            ]
          };

          // 使用刚指定的配置项和数据显示图表
          monthKLineChart.setOption(optionMonthKLine);

        },

        //获取股票K线图
        getKLineDataMethod() {
          return getKLineData(this.code, 'month').then(response => {
            if (response) { // 如果返回有信息
              this.initChartSetMethod(response)
            }
          })

        }
      },
    }
</script>

<style lang="scss" scoped>



</style>

<template>
  <div>

    <div id="kLineChart" class="kLineChart" style="width: 960px;height: 360px"></div>

  </div>
</template>

<script type="es6">

  import {getKLineData} from '@/api/stock'

  let echarts = require('echarts');

  export default {

    data() {
      return {
        dateTime: '',
        nowData: [],
        categoryData: [],
        values: [],
        isRegistrationIssu: false
      }
    },
    mounted() {
      this.code = this.$route.params.code;
      this.getKLineDataMethod(this.code, 'day')
    },
    methods: {
      initChartSetMethod() {
        /*基于准备好的dom，初始化echarts实例*/
        let kLineChart = echarts.init(document.getElementById('kLineChart'));

        let start_index = this.values.length - 30 > 0 ? (this.values.length - 30) : 0;
        let end_index = this.values.length - 1;

        let optionKLine = {
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
              res += '<br/>  开盘 : ' + params[0].value[1] + '  最高 : ' + params[0].value[3];
              res += '<br/>  收盘 : ' + params[0].value[2] + '  最低 : ' + params[0].value[4];
              return res;
            }
          },
          legend: {
            data: ['日K', '周K', '月K'],
            selectedMode: 'single'
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '20%'
          },
          xAxis: {
            type: 'category',
            data: this.categoryData,
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
          dataZoom: {
            show: true,
            realtime: true,
            startValue: start_index,
            endValue: end_index
          },
          series: [
            {
              name: '日K',
              type: 'candlestick',
              data: this.values,
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
                      position: 'top',
                      distance: '5',
                    }
                  },
                  {
                    name: 'lowest value',
                    type: 'min',
                    valueDim: 'highest',
                    label: {
                      color: 'green',
                      position: 'bottom',
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
            {
              name: '周K',
              type: 'candlestick',
              data: this.values,
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
                      position: 'top',
                      distance: '5',
                    }
                  },
                  {
                    name: 'lowest value',
                    type: 'min',
                    valueDim: 'highest',
                    label: {
                      color: 'green',
                      position: 'bottom',
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
            {
              name: '月K',
              type: 'candlestick',
              data: this.values,
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
                      position: 'top',
                      distance: '5',
                    }
                  },
                  {
                    name: 'lowest value',
                    type: 'min',
                    valueDim: 'highest',
                    label: {
                      color: 'green',
                      position: 'bottom',
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
        kLineChart.setOption(optionKLine);

        const that = this;

        if (!this.isRegistrationIssu) {
          kLineChart.on('legendselectchanged', function (params) {
            if (params.name === '月K') {
              that.getKLineDataMethod(that.code, 'month')
            } else if (params.name === '周K') {
              that.getKLineDataMethod(that.code, 'week')
            } else {
              that.getKLineDataMethod(that.code, 'day')
            }
          });
        }
        this.isRegistrationIssu = true
      },

      //获取股票K线图
      getKLineDataMethod(code, type) {
        return getKLineData(code, type).then(response => {
          if (response) { // 如果返回有信息
            let categoryData = [];
            let values = [];
            for (let i = 0; i < response.length; i++) {
              categoryData.push(response[i].date);
              values.push([response[i].open, response[i].close, response[i].high, response[i].low])
            }
            this.categoryData = categoryData;
            this.values = values;
            this.initChartSetMethod();
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>


</style>

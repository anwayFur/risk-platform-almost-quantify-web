<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div id="steelChart" class="steelChart" style="width: 900px; height: 500px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="es6">

  import { getSteelData } from '@/api/stock'

  let echarts = require('echarts');

  export default {

    data () {
      return {
        code: '',
      }
    },
    mounted () {
      this.code = this.$route.params.code
      this.getSteelDataMethod()
    },
    methods: {
      initChartSetMethod (raw, rawData, dataName) {

        var steelChart = echarts.init(document.getElementById('steelChart'))

        var raw0 = splitRawData(rawData.res0)
        var raw1 = splitRawData(rawData.res1)
        var raw2 = splitRawData(rawData.res2)
        var raw3 = splitRawData(rawData.res3)
        var raw4 = splitRawData(rawData.res4)

        function splitRawData (raw) {
          var values = []

          for (var i = 0; i < raw.length; i++) {
            values.push(raw[i].slice(1))
          }
          return {
            values: values              //数组中的数据 y轴对应的数据
          }
        }

        var optionSteel = {
          title: {
            subtext : '点击上方图例筛选图表',
            left:'center',
            top:'3%',
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              return '日期：' + params.data[0] + '<br/>'
                + '价格：' + params.data[1]
            }
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          dataZoom: {
            show: true,
            start: 0
          },
          legend: {
            data: ['焦炭', '炼焦煤', '螺纹钢', '动力煤', '铁矿石'],
            selected : {
              '炼焦煤' : false,
              '螺纹钢' : false,
              '动力煤' : false,
              '铁矿石' : false
            },
            //selectedMode : 'single'
          },
          grid: {
            y2: 80
          },
          xAxis: [
            {
              type: 'time',
              splitNumber: 10
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale:true,
              boundaryGap: [0.01, 0.01]
            }
          ],
          series: [
            {
              name: '焦炭',
              type: 'line',
              showAllSymbol: true,
              data: raw0.values
            },
            {
              name: '炼焦煤',
              type: 'line',
              showAllSymbol: true,
              data: raw1.values
            },
            {
              name: '螺纹钢',
              type: 'line',
              showAllSymbol: true,
              data: raw2.values
            },
            {
              name: '动力煤',
              type: 'line',
              showAllSymbol: true,
              data: raw3.values
            },
            {
              name: '铁矿石',
              type: 'line',
              showAllSymbol: true,
              data: raw4.values
            }
          ]
        }

        // 使用刚指定的配置项和数据显示图表
        steelChart.setOption(optionSteel)

      },

      //获取股票K线图
      getSteelDataMethod () {

        return getSteelData().then(response => {
          if (response) { // 如果返回有信息

            var steelData = response.steelData
            var rawData = response.steelData
            var dataName = response.dataName

            this.initChartSetMethod(rawData, steelData, dataName)

          }
        })

      }
    },
  }
</script>

<style lang="scss" scoped>



</style>

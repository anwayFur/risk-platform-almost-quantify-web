<template>
    <div>

      <div id="rateChart" class="rateChart" style="width: 380px;height: 200px; margin: 0 auto;"></div>

    </div>
</template>

<script type="es6">

    let echarts = require('echarts')

    export default {

      data() {
          return {

          }
      },
      props: {
        rates:{},
      },
      watch: {
        // 如果 `realTimeQuotes` 发生改变，这个函数就会运行
        rates: function (newRates) {
          this.initChartSetMethod(newRates)
        }
      },
      methods: {
        initChartSetMethod(rawData) {

          /*基于准备好的dom，初始化echarts实例*/
          let rateChart = echarts.init(document.getElementById('rateChart'));

          let dataInit = operateData(rawData)

          //切割数组，把数组中的日期和数据分离，返回数组中的日期和数据
          function operateData(rawData) {

            let seriesData = [0, 0, 0, 0, 0, 0];

            for (let i = 0; i < rawData.length; i++) {

              if(rawData[i]['买入']) seriesData[0] = rawData[i]['买入'];
              if(rawData[i]['增持']) seriesData[1] = rawData[i]['增持'];
              if(rawData[i]['中性']) seriesData[2] = rawData[i]['中性'];
              if(rawData[i]['减持']) seriesData[3] = rawData[i]['减持'];
              if(rawData[i]['卖出']) seriesData[4] = rawData[i]['卖出'];
              if(rawData[i]['未知']) seriesData[5] = rawData[i]['未知'];
            }

            return {
              seriesData: seriesData
            };
          }

          let optionRate = {
            title: {
              text: '个股研报等级统计',
            },
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: function (params) {
                let tar = params[1];
                return tar.seriesName + '<br/>' + tar.name + ' : ' + tar.value;
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type : 'category',
              splitLine: {show:false},
              data : ['买入','增持','中性','减持','卖出','未知']
            },
            yAxis: {
              type : 'value'
            },
            series: [
              {
                name: '辅助',
                type: 'bar',
                stack:  '总量',
                itemStyle: {
                  normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                  },
                  emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                  }
                },
                data: [0, 0, 0, 0, 0, 0]
              },
              {
                name: '等级',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'inside',
                    formatter:function (params) {
                      if(params.data===0){
                        return ""
                      }
                    }
                  }
                },
                data: dataInit.seriesData,
              }
            ]
          };

          // 使用刚指定的配置项和数据显示图表
          rateChart.setOption(optionRate);

        },
      },
    }
</script>

<style lang="scss" scoped>



</style>

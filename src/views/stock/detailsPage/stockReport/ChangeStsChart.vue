<template>
    <div>

      <div id="changeChart" class="changeChart" style="width: 380px;height: 200px;margin: 0 auto;"></div>

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
        changes:{},
      },
      watch: {
        // 如果 `realTimeQuotes` 发生改变，这个函数就会运行
        changes: function (newChanges) {
          this.initChartSetMethod(newChanges)
        }
      },
      methods: {
        initChartSetMethod(rawData) {

          /*基于准备好的dom，初始化echarts实例*/
          let changeChart = echarts.init(document.getElementById('changeChart'));

          let dataInit = operateData(rawData)

          //切割数组，把数组中的日期和数据分离，返回数组中的日期和数据
          function operateData(rawData) {

            let seriesData = [0, 0, 0, 0, 0];

            for (let i = 0; i < rawData.length; i++) {
              if(rawData[i]['维持']) seriesData[0] = rawData[i]['维持'];
              if(rawData[i]['调高']) seriesData[1] = rawData[i]['调高'];
              if(rawData[i]['调低']) seriesData[2] = rawData[i]['调低'];
              if(rawData[i]['首次']) seriesData[3] = rawData[i]['首次'];
              if(rawData[i]['未知']) seriesData[4] = rawData[i]['未知'];
            }

            return {
              seriesData: seriesData
            };
          }

          let optionChange = {
            title: {
              text: '个股研报变动统计',
            },
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: function (params) {
                var tar = params[1];
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
              data : ['维持','调高','调低','首次','未知']
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
                name: '变动',
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
          changeChart.setOption(optionChange);


        },
      },
    }
</script>

<style lang="scss" scoped>



</style>

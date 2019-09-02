<template>
  <div>

    <div id="zygcCpChart" class="zygcCpChart" style="width: 580px;height: 320px"></div>

  </div>
</template>

<script type="es6">

  let echarts = require('echarts')

  export default {

    data() {
      return {
        dateTime: '',
        rawData: [],
      }
    },
    props: {
      zygc_cp:{},
    },
    watch: {
      // 如果 `realTimeQuotes` 发生改变，这个函数就会运行
      zygc_cp: function (newData) {
        if(typeof (newData) == "undefined" || newData == null){
        }else{
          if(newData.length > 0) {
            this.initChartSetMethod(newData)
          }
        }
      }
    },
    methods: {
      initChartSetMethod(rawData) {

        /*基于准备好的dom，初始化echarts实例*/
        let zygcCpChart = echarts.init(document.getElementById('zygcCpChart'));

        let dataInit = operateData(rawData)

        //切割数组，把数组中的日期和数据分离，返回数组中的日期和数据
        function operateData(rawData) {
          let legendData = [];
          let seriesData = [];
          let valueSum = 0;

          for (let i = 0; i < rawData.length; i++) {
            legendData.push(rawData[i].zygc);

            let values = parseFloat(rawData[i]['srbl'].replace(/%/g,""));
            if(values <= 0) continue;
            valueSum += values;
            seriesData.push({
              value: values,
              name: rawData[i]['zygc']
            })
          }

          if((100 - valueSum).toFixed(2) > 0 && rawData.length > 0) {
            legendData.push("其他");
            seriesData.push({
              value: (100 - valueSum).toFixed(2),
              name: '其他'
            })
          }

          return {
            legendData: legendData, //数组中的日期 x轴对应的日期
            seriesData: seriesData              //数组中的数据 y轴对应的数据
          };
        }

//          console.log(dataInit.legendData)
//          console.log(dataInit.seriesData)

        let optionZygcCp = {
          title : {
            text: '个股主营产品构成',
            x:'left',
            left:'8%',
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            show:true,
            orient: 'vertical',
            left: 'right',
            type: 'scroll',
            itemHeight: 10,
            fontSize: 8,
            data: dataInit.legendData.splice(0,3),
            top: '15%',
            left:'50%',
          },
          series : [
            {
              name: '主营产品占比详情',
              type: 'pie',
              radius : '60%',
              center: ['35%', '65%'],
              data: dataInit.seriesData,
              label: {
                normal: {
                  //position: 'inner', //内置文本标签
                  show: false,
                }
              },
              labelLine: {
                normal: {
                  show: false     //不需要设置引导线
                }
              },
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


        // 使用刚指定的配置项和数据显示图表
        zygcCpChart.setOption(optionZygcCp);


      },
    },
  }
</script>

<style lang="scss" scoped>



</style>

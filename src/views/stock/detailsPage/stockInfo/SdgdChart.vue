<template>
    <div>

      <div id="sdgdChart" class="sdgdChart" style="width: 580px;height: 320px"></div>

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
        sdgd:{},
      },
      watch: {
        // 如果 `realTimeQuotes` 发生改变，这个函数就会运行
        sdgd: function (newSdgd) {
          if(typeof (newSdgd) == "undefined" || newSdgd == null){
          }else{
            if(newSdgd.length > 0) {
              this.initChartSetMethod(newSdgd)
            }
          }
        }
      },
      methods: {
        initChartSetMethod(rawData) {

          /*基于准备好的dom，初始化echarts实例*/
          let sdgdChart = echarts.init(document.getElementById('sdgdChart'));

          let dataInit = operateData(rawData)

          //切割数组，把数组中的日期和数据分离，返回数组中的日期和数据
          function operateData(rawData) {
            let legendData = [];
            let seriesData = [];
            let valueSum = 0;

            for (let i = 0; i < rawData.length; i++) {
              legendData.push(rawData[i].gdmc);

              let values = parseFloat(rawData[i]['zltgbcgbl'].replace(/%/g,""));
              valueSum += values;
              seriesData.push({
                value: values,
                name: rawData[i]['gdmc']
              })
            }

            legendData.push("其他");
            seriesData.push({
              value: (100 - valueSum).toFixed(2),
              name: '其他'
            })

            return {
              legendData: legendData,
              seriesData: seriesData
            };
          }

//          console.log(dataInit.legendData)
//          console.log(dataInit.seriesData)

          let optionSdgd = {
            title : {
              text: '个股十大股东结构',
              x:'left',
              left:'8%',
              top:'0%',
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)",
              position: ['40%', '20%']
            },
            legend: {
              show:true,
              orient: 'vertical',
              left: 'right',
              type: 'scroll',
              itemHeight: 10,
              fontSize:8,
              data: dataInit.legendData.splice(0,3),
              top: '15%',
              left:'0%',
            },
            series : [
              {
                name: '个股股东占比详情',
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
          sdgdChart.setOption(optionSdgd);


        },
      },
    }
</script>

<style lang="scss" scoped>



</style>

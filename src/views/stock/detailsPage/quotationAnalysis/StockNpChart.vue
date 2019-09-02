<template>
    <div>

        <div id="stockNpChart" class="stockNpChart" style="width: 240px;height: 140px;"></div>

    </div>
</template>

<script type="es6">

    let echarts = require('echarts')

    export default {

      data() {
          return {
            dateTime: '',
            rawData: [],
            isHide:false,
          }
      },
      props: {
        posi_per:0,
        nega_per:0,
        posi_isNull:false,
      },
      watch: {
        // 如果 `realTimeQuotes` 发生改变，这个函数就会运行
        nega_per: function (newNega_per) {
          this.initChartSetMethod(newNega_per)
        },
        posi_per: function (newPosi_per) {
          this.initChartSetMethod(newPosi_per)
        },
      },
      methods: {
        initChartSetMethod(rawData) {

          /*基于准备好的dom，初始化echarts实例*/
          let stockNpChart = echarts.init(document.getElementById('stockNpChart'));

          let initData = [
            {value: parseFloat(rawData).toFixed(0), name:'正面占比'},
            {value:parseFloat(100 - rawData).toFixed(0), name:'负面占比'}
          ];

          if(this.posi_isNull) {
            initData = []
          }

          let optionStockNp = {
            color:['#ff0000','#00cd00'],  //手动设置每个图例的颜色
            title : {
              x:'left'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: {
              show: false,
              orient: 'vertical',
              left: 'right',
              type: 'scroll',
              itemHeight: 10,
              fontSize:8,
              data: ['正面占比','负面占比'],
            },
            series : [
              {
                name: '个股正负面',
                type: 'pie',
                radius : '60%',
                center: ['50%', '50%'],
                data: initData,
                label: {
                  normal: {
                    formatter: '{b}\n {d}%',
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
          stockNpChart.setOption(optionStockNp);


        },
      },
    }
</script>

<style lang="scss" scoped>



</style>

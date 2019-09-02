<template>
  <div>
    <div class="stock_info">

      <div class=""  >
        <el-row>
          <el-col :span="24">
            <div v-if="dividendData">
              <div id="showDividend" style="width: 900px; height: 500px"></div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="" >
        <el-row>
          <el-col :span="24">
            <div v-if="splits">
            <div id="showSplit"  style="width: 900px; height: 500px"></div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class=""  >
        <el-row>
          <el-col :span="24">
            <div v-if="fatherRes">
              <div><span>无分红数据</span></div>
            </div>
          </el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>


<script type="es6">
  import {getDividendData}from '@/api/fund'
  let echarts = require('echarts');
  export default {
    name: 'fundDividend',
    components: {},
    data(){
      return {
        code: "",
        dividendData:true,
        splits:true,
        fatherRes:true
      }
    },
    computed:{

    },
    mounted() {
      this.code = this.$route.params.code;
      this.getDividendData();

    },
    methods: {
      getDividendData(){
        getDividendData(this.code).then(response => {

            if(response['dividends']||response['splits']){
              this.fatherRes=false;
            }
          this.dividendData=response['dividends']!==null;
          this.splits=response['splits']!==null;

            if(response['dividends']){

              let temp = response['dividends'];
              let  ybar = [];
              for (let value of temp) {
                let data=[];
                data.push(value['year']);
                data.push(value['num']);
                data.push(parseFloat(value['type_avg']).toFixed(2));
                data.push((parseFloat(value['per'])*100).toFixed(2)+"%");
                ybar.push(data);
              }
              /*展示分红柱状图*/
              this.showDividendChart( ybar);
            }
            if(response['splits']){

              let temp = response['splits'];
              let  ybar = [];

              for (let value of temp) {
                 let data={"year":value['year'],'每年拆分次数':value['num'],'每年拆分比例':parseFloat(value['per']).toFixed(3)};
                ybar.push(data);
              }
              /*展示拆分柱状图*/
              this.showSplitChart( ybar);
            }

        })
      },
      showDividendChart (ybar = []) {

        let myChart = echarts.init(document.getElementById('showDividend'));
        let option={
          title: {
            text: '上市以来基金分红状况',
            left: 'center',
          },
          grid:{
             top:100
          },
          legend: {
              top:40
          },
          tooltip: {
              formatter:function (params) {

                let year=params.data[0];
                let num=params.data[1];
                let avnum=params.data[2];
                let per=params.data[3];
                return `${year}年基金分红次数${num}次，<br>
                同类基金平均分红次数${avnum}次，<br>分红金额占单位净值比${per}`
              }
          },
          dataset: {
              dimensions:['year','每年的分红次数','同类基金的平均分红次数','当年分红金额占单位净值比'],
              source: ybar
          },

          xAxis: {type: 'category'},
          yAxis: {},

          series: [
            {type: 'bar',
              barMaxWidth : 30,
            },
            {type:'line'}

          ]
        };
        myChart.setOption(option)

      },
      showSplitChart (ybar=[]) {

        let myChart = echarts.init(document.getElementById('showSplit'));
        let option={
          title: {
            text: '上市以来基金拆分状况',
            left: 'center',
          },
          grid:{
            top:100
          },
          legend: {
            top:40
          },
          tooltip: {
            formatter:function (params) {

              let year=params.data['year'];
              let num=params.data['每年拆分次数'];
              let per=params.data['每年拆分比例'];
              return `${year}年基金拆分次数${num}次，<br>
               拆分比例${per}`
            }
          },
          dataset: {
            source: ybar
          },

          xAxis: {type: 'category'},
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            {type: 'bar',
              barMaxWidth : 30,
              label:{
                show:true,
                position:'top',
                formatter:function(params){

                  return params['data']['每年拆分比例']
                }
              },
            },

          ]
        };
        myChart.setOption(option)

      },
    },

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

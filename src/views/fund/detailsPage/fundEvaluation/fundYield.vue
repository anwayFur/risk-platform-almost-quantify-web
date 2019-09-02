<template>
  <div>
    <div class="stock_info">

      <div class="">
        <el-row>
          <div style="margin-right: 100px;">
            <el-col :span="24">
              <div ><h4 style="text-align: center"> 累计收益率走势</h4></div>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <div style="margin-right: 100px;">
          <el-col :span="7">
            <div style="float:right;margin-right: 15px;margin-top: 5px"><span >选择时间</span></div>
          </el-col>
          <el-col :span="2">
            <el-button size="mini" @click="changeTime('month')" :class="{oneMonth:oneMonth}" >1月</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="mini" @click="changeTime('three_month')" :class="{threeMonth:threeMonth}">3月</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="mini" @click="changeTime('six_month')" :class="{sixMonth:sixMonth}">6月</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="mini" @click="changeTime('year')" :class="{oneYear:oneYear}">1年</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="mini" @click="changeTime('three_year')" :class="{threeYear:threeYear}">3年</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="mini" @click="changeTime('this_year')" :class="{nowYear:nowYear}">今年</el-button>
          </el-col>
          <el-col :span="2" >
            <el-button size="mini" @click="changeTime('all')" :class="{Max:Max}">最大</el-button>
          </el-col>
          </div>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div id="showEva" style="width: 900px; height: 500px"></div>
          </el-col>
        </el-row>

      </div>
      <div class="">
        <el-row>
          <div style="margin-right: 100px;">
            <el-col :span="24">
              <div ><h4 style="text-indent: 2em "> 收益表现</h4></div>
            </el-col>
          </div>
        </el-row>
        <el-row class="sin_data">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div>
              跑赢大盘：<span :class="{changeRedColor:contrast_hs300>0,changeGreenColor:contrast_hs300<0}">{{contrast_hs300}}%</span>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div>
              <span >同类基金排名：{{rank}}/{{total}}</span>
            </div>
          </el-col>
        </el-row>


      </div>

    </div>
  </div>
</template>


<script type="es6">

  import {getReturnRate} from "@/api/fund"
  let echarts = require('echarts');

  export default {
    name: 'fundYield',
    components: {},
    data(){
      return {
        code: "",
        total:"",
        rank:"",
        contrast_hs300:"",
        oneMonth:true,
        threeMonth:false,
        sixMonth:false,
        oneYear:false,
        threeYear:false,
        nowYear:false,
        Max:false
      }
    },
    mounted() {
      this.code = this.$route.params.code;
      this.getReturnRate();

    },
    methods: {
      getReturnRate(){
        getReturnRate(this.code,'month').then(response => {
            if(response){
              let showData =this.orderResult(response);
              if(response['rank']){
                this.total=JSON.parse(response['rank'])['total'];
                this.rank=JSON.parse(response['rank'])['ranking'];
              }
              else {
                this.total=' - ';
                this.rank=' - ';
              }
             if(response['contrast_hs300']){
               this.contrast_hs300=parseFloat(response['contrast_hs300']).toFixed(3);

             }

              this.initChartSetMethod(showData)
            }

        })
      },
      changeTime(type){
        this.oneMonth=type==='month';
        this.threeMonth=type==='three_month';
        this.sixMonth=type==='six_month';
        this.oneYear=type==='year';
        this.threeYear=type==='three_year';
        this.nowYear=type==='this_year';
        this.Max=type==='all';
        getReturnRate(this.code, type).then(response => {
            if(response){
              let showData =this.orderResult(response);
              if(response['rank']){
                this.total=JSON.parse(response['rank'])['total'];
                this.rank=JSON.parse(response['rank'])['ranking'];
              }
              else {
                this.total=' - ';
                this.rank=' - ';
              }
              if(response['contrast_hs300']){
                this.contrast_hs300=parseFloat(response['contrast_hs300']).toFixed(3);
              }
              this.initChartSetMethod(showData)
            }
        })
      },

      initChartSetMethod (showData) {
        let steelChart = echarts.init(document.getElementById('showEva'));
        let option = {
          title: {
            text: '',
            left: 'center',
          },
          grid: {
            top: 100
          },
          legend: {
            top: 40
          },
          tooltip: {
            trigger:'axis'
          },
          dataset: {
            source: showData
          },

          xAxis: {type: 'category',
            boundaryGap :false},
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            {type: 'line',
              connectNulls:true },
            {type: 'line',
              connectNulls:true},
            {type: 'line',
              connectNulls:true},

          ]
        };

        if(showData.length > 0){
          steelChart.setOption(option)
        }

      },
      orderResult(response){

          let showData=[];
          if( response['returnRate']['fund']){
            for (let value of response['returnRate']['fund']) {
              let tempfund = {'fundDate': value[0], '本基金收益率': value[1]};
              showData.push(tempfund);
            }
          }

        if(showData.length > 0){

          for(let value of showData){

            for(let val of response['returnRate']['hs300']){
              if(val[0]===value['fundDate']){
                value['沪深300']=val[1];
                break;
              }else{
                value['沪深300'] = "";
              }
            }
          }
          for(let value of showData){
            for(let val of response['returnRate']['same_type']){
              if(val[0]===value['fundDate']){
                value['同类型收益率']=val[1];
                break;
              }else{
                value['同类型收益率'] = "";
              }
            }
          }

        }
        return showData;
      }

    },

  }
</script>

<style type="text/css" lang="scss" scoped>
  .oneMonth {
    background-color:rgba(64,158,255,.1);
    color:#409EFF;
    border:1px solid rgba(64,158,255,.2)
  }
  .threeMonth {
    background-color:rgba(64,158,255,.1);
    color:#409EFF;
    border:1px solid rgba(64,158,255,.2)
  }
  .sixMonth {
    background-color:rgba(64,158,255,.1);
    color:#409EFF;
    border:1px solid rgba(64,158,255,.2)
  }
   .oneYear {
    background-color:rgba(64,158,255,.1);
    color:#409EFF;
    border:1px solid rgba(64,158,255,.2)
  }
   .threeYear  {
    background-color:rgba(64,158,255,.1);
    color:#409EFF;
    border:1px solid rgba(64,158,255,.2)
  }
  .nowYear {
    background-color:rgba(64,158,255,.1);
    color:#409EFF;
    border:1px solid rgba(64,158,255,.2)
  }
.Max{
    background-color:rgba(64,158,255,.1);
    color:#409EFF;
    border:1px solid rgba(64,158,255,.2)
  }
  .changeRedColor{
    color:red;
  }
  .changeGreenColor{
    color:green;
  }
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

    }

  }


</style>

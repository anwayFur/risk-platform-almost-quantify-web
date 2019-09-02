<template>
  <div class="app-container">
    <transition name="el-zoom-in-top">
      <div v-show="true" class="transition-box">
        <div class="div_top">

          <div class="border_div pad_div">
            <el-row style="margin-bottom: 10px">
              <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <div>
                  <span style="font-size: 25px">{{name}}({{code}})</span>&nbsp;&nbsp;&nbsp
                  <span style="font-size: 15px">类型：
                    <el-tag size="small">{{flag}}</el-tag>
                    <el-tag size="small">{{type}}</el-tag>
                    <el-tag size="small">{{trading_places}}</el-tag>
                  </span>
                </div>
              </el-col>
            </el-row>
            <div v-if="income_type==='million-gains'">
              <el-row style="margin-bottom: 10px">
                <div style="font-size: 20px"  >
                  <el-col :xs="8" :sm="8" :md="8" :lg="8">
                    <span> 万份收益<span style="font-size: 15px"> ({{netValue.date}})</span></span>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8">
                    <span> 七日年化</span>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8">
                    <span> 35日年化</span>
                  </el-col>
                </div>
              </el-row>
              <el-row style="margin-bottom: 10px">
                <!--展示万份收益-->
                <el-col :xs="8" :sm="8" :md="8" :lg="8">
                    <span class="value_now">{{netValue.million_gains }}</span>
                </el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8">
                  <span class="value_now">{{netValue.days_income_7 }}%</span>
                </el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8">
                  <span class="value_now">{{netValue.days_income_35}}%</span>
                </el-col>
              </el-row>
            </div>
            <div v-else>
            <el-row style="margin-bottom: 10px">
              <div style="font-size: 20px"  >
                <el-col :xs="8" :sm="8" :md="8" :lg="8">
                  <span> 净值估算<span style="font-size: 15px"> ({{update_date}})</span></span>
                </el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8">
                  <span> 单位净值(<span v-if="netValue" style="font-size: 15px">{{netValue.date}}</span>)</span>
                </el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8">
                  <span> 累计净值</span>
                </el-col>
              </div>
            </el-row>
            <el-row style="margin-bottom: 10px">
              <!--展示净值估算-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8">
                <div v-if="change>0">
                  <span class="value_now color_red">￥{{estimated_value}}</span>
                  <span class="value_up color_red">+{{estimated_rate}}</span>
                  <span class="value_up color_red"></span>

                </div>
                <div v-else-if="change===0">
                  <span class="value_now color_black">￥{{estimated_value}}</span>
                  <span class="value_up color_black">{{estimated_rate}}</span>
                  <span class="value_up color_black"></span>
                </div>
                <div v-else-if="change<0">
                  <span class="value_now color_green">￥{{estimated_value}}</span>
                  <span class="value_up color_green">{{estimated_rate}}</span>
                  <span class="value_up color_green"></span>
                </div>
              </el-col>

              <!--展示单位净值-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8">
                <div v-if="netValue">
                  <div v-if="netValue.day_growth_rate>0">
                    <span class="value_now color_red">￥{{netValue.net_value}}</span>
                    <span class="value_up color_red">+{{netValue.day_growth_rate}}%</span>
                  </div>
                  <div v-else-if="netValue.day_growth_rate===0">
                    <span class="value_now color_black">￥{{netValue.net_value}}</span>
                    <span class="value_up color_black">{{netValue.day_growth_rate}}%</span>

                  </div>
                  <div v-else-if="netValue.day_growth_rate<0">
                    <span class="value_now color_green">￥{{netValue.net_value}}</span>
                    <span class="value_up color_green">{{netValue.day_growth_rate}}%</span>

                  </div>
                </div>
              </el-col>
              <!--展示类累计净值-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8">
                <div v-if="netValue">
                  <span style="font-size: 42px">￥{{netValue.accumulated_net_value}}</span>
                </div>
              </el-col>
            </el-row>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <el-tabs tab-position="left"   v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="baseInfo">
        <fundInfo :fundCal=fundCal v-if="Object.keys(fundCal).length"></fundInfo>
      </el-tab-pane>
      <el-tab-pane label="投向分析" name="directionData">
        <directionAnalysis v-if="currentTab ==='directionData'"></directionAnalysis>
      </el-tab-pane>
      <el-tab-pane label="基金评价" name="commentData">
        <fundEva v-if="currentTab ==='commentData'"></fundEva>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script type="es6">

  import fundInfo from './fundInfo/fundInfo.vue'
  import directionAnalysis from './fundDirectionAnalysis/directionAnalysis.vue'
  import fundEva from './fundEvaluation/fundEva.vue'
  import {getRealTimeQuotes, getFundData}from '@/api/fund'
  export default {
    components: {
      fundInfo,
      directionAnalysis,
      fundEva
    },
    name: 'fund',
    data(){
      return {
        code: "",
        name: "",
        change: "",
        estimated_rate: "",
        estimated_value: "",
        update_date: "",
        netValue: {},
        flag: "",
        type: "",
        income_type:"",
        trading_places: '',
        /*基金认购份额计算传参用*/
        fundCal: {},
        interval:'',
        activeName: 'baseInfo',
        currentTab:'baseInfo'

      }
    },
    mounted(){
      this.code = this.$route.params.code;

      this.getFundData();
    },
    methods: {
      handleClick(tab, event){
        /*  console.log(tab, event);*/

        this.activeName = tab.name;
        this.currentTab = tab.name;
      },
      getFundData(){
        getFundData(this.code).then(response => {
          if (response) {

            this.fundCal = response;
            this.netValue = response['net_value'];
            this.flag = response['flag'];
            this.name = response['name'];
            this.type = response['type'];
            this.trading_places = response['trading_places'];
            this.income_type=response['income_type'];
          }
          if(response['income_type']==='million-gains'){
              clearInterval(this.interval);
          }else{
            this.getFundInfo();
            this.initSetTimeout()
          }
        })
      },
      getFundInfo(){
        getRealTimeQuotes('fund', this.code).then(response => {
          if (response) {
            let fundData = response.data;

            this.update_date = response['update_at'];
            this.estimated_value = fundData['estimated_value'];
            this.change = parseFloat(fundData['estimated_rate']);
            this.estimated_rate = fundData['estimated_rate'];
          }

        })
      },
      // 每隔5分钟刷新数据
      initSetTimeout() {
        //es6中这个this指向的是这些方法，若setInterval(function(){ this.getData(today)})中的this指向的真个windows，
        // 这样写是会报错的，所以最好用es6来调用getData里的方法
        this.interval=setInterval(() => {
          this.getFundInfo();
        }, 5*60*1000)

      },
    },


  }
</script>

<style type="text/css" lang="scss" scoped>

  .div_top {
    padding-left: 10px;
    padding-right: 10px;
    margin-left: -10px;
    margin-right: -10px;

    .pad_div {
      padding-left: 50px;
      padding-right: 50px;
      //border-radius: 0 0 15px 15px;
    }

    .sin_top {
      font-size: 24px;
    }

    .value_now {
      font-size: 42px;
    }

    .value_up {
      padding-left: 12px;
      font-size: 20px;
    }

    .update_at {
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .sin_middle_right {
      padding-top: 50px;
      text-align: right;
      margin-top: 10px;
    }
  }

</style>
<style scoped>

</style>
<!--<div class="app-container">
    &lt;!&ndash;指数信息&ndash;&gt;
    基金代码：{{$route.params.code}}
    基金名称: {{$route.name}}
  </div>-->

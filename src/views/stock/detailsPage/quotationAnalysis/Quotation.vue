<template>
  <!--行情分析-->
  <div class="stock_info">

    <div class="border_div">

      <div class="tip_title">行情分析</div>
      <EventKLineChart></EventKLineChart>

    </div>

    <!--<div class="border_div">-->
      <!--<div class="tip_title">个股研报统计列表</div>-->
      <!--<el-row>-->
        <!--<el-col :xs="24" :sm="24" :md="24" :lg="24">-->
          <!--<el-tabs type="border-card" class="active_tab">-->
            <!--<el-tab-pane>-->
              <!--<span slot="label"><i class="el-icon-date"></i> 我的行程</span>-->
              <!--我的行程-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="消息中心">消息中心</el-tab-pane>-->
            <!--<el-tab-pane label="角色管理">角色管理</el-tab-pane>-->
            <!--<el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>-->
          <!--</el-tabs>-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</div>-->

    <!--<div class="border_div">-->
      <!--<div class="tip_title">研报关键词展示，分每次、每周、每月的关键词变动情况</div>-->
      <!--<el-row class="sin_hq">-->
        <!--<el-col :span="24">-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</div>-->

    <!--<div class="border_div">-->
      <!--<div class="tip_title">个股舆情、研报正负面走势图</div>-->
      <!--<el-row class="sin_hq">-->
        <!--<el-col :span="24">-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</div>-->

    <!--<div class="border_div">-->
      <!--<div class="tip_title">最近5-10篇研报展示</div>-->
      <!--<el-row class="sin_hq">-->
        <!--<el-col :span="24">-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</div>-->
  </div>
</template>


<script type="es6">

  import EventKLineChart from './EventKLineChart.vue'

  export default {
    data () {
      return {}
    },
    components: {
      EventKLineChart,
    },
    mounted () {
    },
    methods: {}

  }
</script>

<style type="text/css" lang="scss" scoped>

  .tip_title {
    background: url("../../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
  }

</style>

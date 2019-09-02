<template>
  <div>
    <!--产业链分析-->
    <div class="stock_info">
      <div class="border_div">
        <div class="tip_title">期货、现货价格走势</div>
        <el-row class="sin_hq">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <SteelChart></SteelChart>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script type="es6">
  import SteelChart from './SteelChart.vue'

  export default {
    components: {
      SteelChart,
    },
  }
</script>

<style type="text/css" lang="scss" scoped>

  .tip_title {
    background: url("../../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
  }

</style>

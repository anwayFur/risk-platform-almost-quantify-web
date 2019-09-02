<template>
  <div class="app-container">
    <div class="border_top_div pad_div">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
          <div class="top_tip">
            <span style="color: #999;font-size: 14px;">当前目录:&nbsp;股票&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            <span style="color: #657180;">股票热点</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
        </el-col>
      </el-row>
    </div>

    <div class="border_div">

      <el-row class="sin_data back_style">
        <el-col :xs="8" :sm="8" :md="8" :lg="8">
          <div class="tip_title">近期股票热度排行</div>
          <stockHotRank></stockHotRank>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8">
          <div class="tip_title">近期买入评级的研报数量排行</div>
          <reportCountRank></reportCountRank>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8">
          <div class="tip_title">研报发行机构的收益率排行</div>
          <orgRank></orgRank>
        </el-col>
      </el-row>

      <el-row class="sin_data">
        <el-col :xs="8" :sm="8" :md="8" :lg="8">
        </el-col>
      </el-row>
      <el-row class="sin_data">
        <el-col :xs="16" :sm="16" :md="16" :lg="16">
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script type="es6">
  import orgRank from './rankTable/orgRank.vue'
  import reportCountRank from './rankTable/reportCountRank.vue'
  import stockHotRank from './rankTable/stockHotRank.vue'

  export default {
    components: {
      orgRank,
      reportCountRank,
      stockHotRank
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .tip_title {
    background: url("../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
  }

  .tip_title {
    padding: 11px 0px 40px 40px;
    color: #559bff;
    margin-left: 10px;
    margin-right: 10px;
  }

</style>

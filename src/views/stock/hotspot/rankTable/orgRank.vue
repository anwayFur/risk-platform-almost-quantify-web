<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" class="el_tab_rank"
             style="width: 366px">
      <el-tab-pane label="一天" name="now">
        <div v-if="currentTab ==='now'">
          <orgRankDay :days="days"></orgRankDay>
        </div>
      </el-tab-pane>
      <el-tab-pane label="五天" name="five">
        <div v-if="currentTab ==='five'">
          <orgRankDay :days="days"></orgRankDay>
        </div>
      </el-tab-pane>
      <el-tab-pane label="十五天" name="fifth">
        <div v-if="currentTab ==='fifth'">
          <orgRankDay :days="days"></orgRankDay>
        </div>
      </el-tab-pane>
      <el-tab-pane label="一个月" name="month">
        <div v-if="currentTab ==='month'">
          <orgRankDay :days="days"></orgRankDay>
        </div>
      </el-tab-pane>
      <el-tab-pane label="三个月" name="ninety">
        <div v-if="currentTab ==='ninety'">
          <orgRankDay :days="days"></orgRankDay>
        </div>
      </el-tab-pane>
      <el-tab-pane label="半年" name="halfYear">
        <div v-if="currentTab ==='halfYear'">
          <orgRankDay :days="days"></orgRankDay>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script type="es6">
  import orgRankDay from './orgRankDay.vue'

  export default {
    data() {
      return {
        days: 1,
        activeName: 'now',
        currentTab: 'now', // currentTab 用于标识当前触发的子组件
      }
    },
    components: {
      orgRankDay,
    },
    mounted() {
    },
    methods: {
      //切换统计信息
      handleClick(tab) {
        this.activeName = tab.name;
        this.currentTab = tab.name;
        switch (tab.name) {
          case "five":
            this.days = 5;
            break;
          case "fifth":
            this.days = 15;
            break;
          case "month":
            this.days = 30;
            break;
          case "ninety":
            this.days = 90;
            break;
          case "halfYear":
            this.days = 180;
            break;
          default:
            this.days = 1;
        }

      },


    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .tip_title {
    background: url("../../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
  }

  .tip_title {
    padding: 11px 0px 40px 40px;
    color: #559bff;
    margin-left: 10px;
    margin-right: 10px;
  }

  .el_tab_rank.el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6;
  }

</style>

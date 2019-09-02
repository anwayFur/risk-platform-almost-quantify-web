<template>
  <div>
    <el-card class="box-card box_card_sty">
      <div slot="header" class="clearfix" style="padding-top: 3px;padding-bottom: 3px;">
        <span>一个月</span>
      </div>
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column
          type="index"
          label="排行"
          width="243">
          <template slot-scope="scope">
          <span v-if="scope.row.index === 1" style="background-color: #f54545;color: white;">
            &nbsp;&nbsp;{{scope.row.index}}&nbsp;
          </span>
            <span v-else-if="scope.row.index === 2" style="background-color: #ff8547;color: white;">
            &nbsp;&nbsp;{{scope.row.index}}&nbsp;
          </span>
            <span v-else-if="scope.row.index === 3" style="background-color: #ffac38;color: white;">
            &nbsp;&nbsp;{{scope.row.index}}&nbsp;
          </span>
            <span v-else-if="scope.row.index === 10" style="background-color: #8eb9f5;color: white;">
            &nbsp;{{scope.row.index}}
          </span>
            <span v-else style="background-color: #8eb9f5;color: white;">
            &nbsp;&nbsp;{{scope.row.index}}&nbsp;
          </span>
            <span>&nbsp;&nbsp;</span>
            <a :href="'/#/p/stock/' + scope.row.code" target="_blank">{{scope.row.code}}</a>
            <span>({{scope.row.name}})</span>
          </template>
        </el-table-column>
        <el-table-column
          property="num"
          label="热度"
          width="80"
          align="center"
          style="text-align: right">
          <template slot-scope="scope">
            <span>{{scope.row.score}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding-bottom: 23px;">
        <el-button style="float: right; padding-bottom: 10px;" type="text">

        </el-button>
      </div>
    </el-card>
  </div>
</template>


<script type="es6">
  import { getStockScoreRank } from '@/api/stocks'

  export default {
    data() {
      return {
        tableData: [],
      }
    },
    components: {

    },
    mounted() {
      // 加载请求
      this.getStockScoreRankData()
    },
    methods: {

      getStockScoreRankData() {
        getStockScoreRank().then(response => {
          if (response) {
            this.tableData = response
          }
        })
      }

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

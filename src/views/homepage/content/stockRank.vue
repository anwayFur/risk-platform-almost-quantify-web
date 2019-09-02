<template>
  <div class="row_table">
    <el-table :data="tableData" style="width: 100%" class="tab_row">
      <el-table-column type="index" label="排行" min-width="60" align="center">
        <template slot-scope="scope">
            <span v-if="scope.row.index === 1" style="background-color: #f54545;color: white;">
              &nbsp;&nbsp;{{scope.row.index}}&nbsp;&nbsp;
            </span>
          <span v-else-if="scope.row.index === 2" style="background-color: #ff8547;color: white;">
              &nbsp;&nbsp;{{scope.row.index}}&nbsp;&nbsp;
            </span>
          <span v-else-if="scope.row.index === 3" style="background-color: #ffac38;color: white;">
              &nbsp;&nbsp;{{scope.row.index}}&nbsp;&nbsp;
            </span>
          <span v-else-if="scope.row.index === 10" style="background-color: #8eb9f5;color: white;">
              &nbsp;{{scope.row.index}}&nbsp;
            </span>
          <span v-else style="background-color: #8eb9f5;color: white;">
              &nbsp;&nbsp;{{scope.row.index}}&nbsp;&nbsp;
            </span>
        </template>
      </el-table-column>
      <el-table-column property="code" label="名称/代码" min-width="130">
        <template slot-scope="scope">
          <a :href="'/#/p/stock/' + scope.row.code" target="_blank">
            {{scope.row.name}}&nbsp;(&nbsp;{{scope.row.code}}&nbsp;)</a>
        </template>
      </el-table-column>
      <el-table-column property="buy_report_num" label="研报<买入>" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.buy_report_num}}</span>
        </template>
      </el-table-column>
      <el-table-column property="report_num" label="研报" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.report_num}}</span>
        </template>
      </el-table-column>
      <el-table-column property="notice_num" label="公告" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.notice_num}}</span>
        </template>
      </el-table-column>
      <el-table-column property="news_num" label="新闻" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.news_num}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="main_tip">
      <div>依据近一个月的研报、公告、新闻进行排行</div>
      <div class="tip_right">
        <router-link :to="'stocks/stockHotspot'" style="font-size: 12px;">
          更多热点股票 >>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script type="es6">
  import { getMainStockRank } from '@/api/homePage'

  export default {
    data() {
      return {
        tableData: [],
      }
    },
    components: {},
    mounted() {
      // 加载请求
      this.getMainStockRankData()
    },
    methods: {
      getMainStockRankData() {
        getMainStockRank().then(response => {
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
    padding: 11px 0px 40px 40px;
    color: #559bff;
    margin-left: 10px;
    margin-right: 10px;
  }

  .el_tab_rank.el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6;
  }

  .box_card_sty {
    width: 100%;
  }

  .box_card_sty table {
    width: 100%;
  }

  .main_tip {
    text-align: center;
    font-size: 12px;
    padding-top: 10px;
    color: #9d9d9d;
  }

  .main_tip .tip_right{
    text-align: right;
    margin-top: -15px;
    margin-right: 25px;
  }

</style>

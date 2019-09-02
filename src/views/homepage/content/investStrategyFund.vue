<template>
  <div class="row_table">
    <el-table :data="tableData" style="width: 100%" max-height="380" class="tab_row">
      <el-table-column prop="code" label="代码" width="80" align="center">
        <template slot-scope="scope">
          <a :href="'/#/p/fund/' + scope.row.code" target="_blank">{{scope.row.code}}</a>
        </template>
      </el-table-column>
      <el-table-column label="基金名称" prop="name" min-width="120">
        <template slot-scope="scope">
          {{scope.row.name}}
          <el-tag size="mini" v-if="scope.row.is_preferred">优选</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="setup_date" width="100" label="成立日期"></el-table-column>
      <el-table-column prop="income_rate_for_year" width="100" label="年均收益率" align="center"></el-table-column>
      <el-table-column prop="max_retrace" width="120" label="年均最大回撤" align="center"></el-table-column>
      <el-table-column prop="purchase_rate" width="70" label="总费率" align="center">
        <template slot-scope="scope">
          {{scope.row.purchase_rate + scope.row.return_rate}}
        </template>
      </el-table-column>
      <el-table-column prop="manager" min-width="120" label="基金经理" align="center"></el-table-column>
    </el-table>
    <div class="main_tip">
      <div style="text-align: right;padding-top: 12px;margin-right: 25px">
        <router-link :to="'funds/fixedInvestment'" style="font-size: 12px;">
          更多定投优选 >>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {getMainInvestStrategyFundData} from '@/api/homePage';

  export default {
    name: 'main-fixed',
    data() {
      return {
        tableData: [],
      }
    },
    mounted() {
      // 请求默认数据
      this.getInvestData();
    },
    methods: {
      // 发送请求数据
      getInvestData() {
        getMainInvestStrategyFundData().then(response => {
          this.tableData = [];
          for (let val of response) {
            this.tableData.push({
              'name': val['name'], 'code': val['code'], 'setup_date': val['setup_date'],
              'income_rate_for_year': val['income_rate_for_year'], 'max_retrace': val['max_retrace'],
              'purchase_rate': val['purchase_rate'], 'return_rate': val['return_rate'],
              'manager': val['manager'],
              'is_preferred': val['is_preferred'], 'tracking_target': val['tracking_target']
            })
          }
        })
      },

    }

  }
</script>

<style type="text/css" lang="scss" scoped>

  .tip_title {
    padding: 15px 0 40px 50px;
    color: #559bff;
  }

  .filter-container {
    padding-top: 5px;
    padding-bottom: 5px;
    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }

</style>

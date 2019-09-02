<template>
  <div>

    <el-table :data="tableData"
              style="width: 100%" class="tab_style_org">
      <el-table-column
        type="index"
        label="排行"
        width="255">
        <template slot-scope="scope">
          <span v-if="scope.row.order === 1" style="background-color: #f54545;color: white;">
            &nbsp;&nbsp;{{scope.row.order}}&nbsp;
          </span>
          <span v-else-if="scope.row.order === 2" style="background-color: #ff8547;color: white;">
            &nbsp;&nbsp;{{scope.row.order}}&nbsp;
          </span>
          <span v-else-if="scope.row.order === 3" style="background-color: #ffac38;color: white;">
            &nbsp;&nbsp;{{scope.row.order}}&nbsp;
          </span>
          <span v-else-if="scope.row.order === 10" style="background-color: #8eb9f5;color: white;">
            &nbsp;{{scope.row.order}}
          </span>
          <span v-else style="background-color: #8eb9f5;color: white;">
            &nbsp;&nbsp;{{scope.row.order}}&nbsp;
          </span>
          <span>&nbsp;&nbsp;</span>
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="income_rate"
        label="收益率"
        width="68"
        style="text-align: right">
        <template slot-scope="scope">
          <span v-if="scope.row.income_rate >= 0">
            <span>{{scope.row.income_rate}}</span>
          </span>
          <span v-else-if="scope.row.income_rate < 0">
            <span>{{scope.row.income_rate}}</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button style="float: right;" type="text">

      </el-button>
    </div>

  </div>
</template>


<script type="es6">
  import { getOrgRankWithIncome } from '@/api/stocks'

  export default {
    data() {
      return {
        tableData: [],
      }
    },
    props: {
      days: null,
    },
    watch: {
      // 如果 `day` 发生改变，这个函数就会运行
      days: function (newDays) {
        this.getReportOrg(newDays)
      },
    },
    mounted() {
      // 加载请求
      this.getReportOrg(this.days)
    },
    methods: {
      // 按天数获取排行
      getReportOrg: function (newDays) {
        getOrgRankWithIncome(newDays).then(response => {
          if (response) {
            this.tableData = response
          }
        })
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

<template>
  <div class="app-container">
    <div class="border_top_div pad_div">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
          <div class="top_tip">
            <span style="color: #999;font-size: 14px;">当前目录:&nbsp;分析工具&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            <span style="color: #657180;">财报统计分析</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
        </el-col>
      </el-row>
    </div>

    <div class="border_div">

      <div class="tip_title">财报统计分析</div>

      <div class="filter-container">


        <el-row class="sin_data">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <span>请选择查找的行业:&nbsp;&nbsp;</span>
            <el-select class="search_query" v-model="listQuery.hy" @change="changeHy" placeholder="请选择"
                       size="small">
              <el-option v-for="item in hy_data" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>

          <el-col :xs="8" :sm="8" :md="8" :lg="8">

            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选择财报期间:&nbsp;&nbsp;</span>
            <el-select class="search_query" v-model="listQuery.fr_date" filterable clearable placeholder="请选择发行时期"
                       size="small">
              <el-option
                v-for="item in financialReportDate"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>

          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选择股票:&nbsp;&nbsp;</span>
            <el-select class="search_query" v-model="listQuery.code" filterable
                       clearable
                       placeholder="请选择股票" size="small">
              <el-option
                v-for="item in stockData"
                :key="item.code"
                :label="item.value"
                :value="item.code">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row class="sin_data">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <span>加权净资产收益率:&nbsp;&nbsp;</span>
            <el-select class="search_query" v-model="listQuery.jqjzcsyl" clearable placeholder="请选择" size="small">
              <el-option v-for="item in jqjzcsyl_data" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存货周转次数:&nbsp;&nbsp;</span>
            <el-select class="search_query" v-model="listQuery.chzzts" clearable placeholder="请选择" size="small">
              <el-option v-for="item in chzzts_data" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;毛利率:&nbsp;&nbsp;</span>
            <el-select class="search_query" style="width: 173px;" v-model="listQuery.mll" clearable placeholder="请选择"
                       size="small">
              <el-option v-for="item in mll_data" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>

        </el-row>

        <el-row class="sin_data">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <span>应收账款周转次数:&nbsp;&nbsp;</span>
            <el-select class="search_query" v-model="listQuery.yszkzzts" clearable placeholder="请选择" size="small">
              <el-option v-for="item in yszkzzts_data" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;营业总收入同比增长:&nbsp;&nbsp;</span>
            <el-select class="search_query" style="width: 118px;" v-model="listQuery.yyzsrtbzz" clearable
                       placeholder="请选择"
                       size="small">
              <el-option v-for="item in yyzsrtbzz_data" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4">
            <div class="filter-container" style="margin-left: -60px; margin-top: 5px;">
              <el-button class type="primary" icon="el-icon-search" @click="handleFilter" size="small">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-row class="sin_data">

        <div id="preferred_data">
          <el-table :data="tableData" @sort-change="sortableChange" style="width: 100%">
            <el-table-column type="expand" min-width="30">
              <template slot-scope="props">
                <el-form label-position="left" inline class="finance-table-expand">
                  <el-form-item label="加权净资产收益率与市场平均的对比: ">
                    <div v-if="props.row.rate_of_return_on_net_assets_with_market > 0">
                      + {{ props.row.rate_of_return_on_net_assets_with_market }}%</div>
                    <div v-else-if="props.row.rate_of_return_on_net_assets_with_market">
                      {{ props.row.rate_of_return_on_net_assets_with_market }}%
                    </div>
                  </el-form-item>
                  <el-form-item label="加权净资产收益率与行业平均的对比: ">
                    <div v-if="props.row.rate_of_return_on_net_assets_with_industry > 0">
                      + {{ props.row.rate_of_return_on_net_assets_with_industry }}%</div>
                    <div v-else-if="props.row.rate_of_return_on_net_assets_with_industry">
                      {{ props.row.rate_of_return_on_net_assets_with_industry }}%
                    </div>
                  </el-form-item>
                  <el-form-item label="毛利率与市场平均的对比:          ">
                    <span v-if="props.row.gross_margin_with_market > 0">
                      + {{ props.row.gross_margin_with_market }}%</span>
                    <span v-else-if="props.row.gross_margin_with_market">
                      {{ props.row.gross_margin_with_market }}%
                    </span>
                  </el-form-item>
                  <el-form-item label="毛利率与行业平均的对比:          ">
                    <span v-if="props.row.gross_margin_with_industry > 0" style="text-align: center">
                      + {{ props.row.gross_margin_with_industry }}%</span>
                    <span v-else-if="props.row.gross_margin_with_industry">
                      {{ props.row.gross_margin_with_industry }}%
                    </span>
                  </el-form-item>
                  <el-form-item label="应收账款周转次数与市场平均的对比: ">
                    <span v-if="props.row.accounts_receivable_turnover_with_market > 0">
                      + {{ props.row.accounts_receivable_turnover_with_market }}%</span>
                    <span v-else-if="props.row.accounts_receivable_turnover_with_market">
                      {{ props.row.accounts_receivable_turnover_with_market }}%
                    </span>
                  </el-form-item>
                  <el-form-item label="应收账款周转次数与行业平均的对比: ">
                    <span v-if="props.row.accounts_receivable_turnover_with_industry > 0">
                      + {{ props.row.accounts_receivable_turnover_with_industry }}%</span>
                    <span v-else-if="props.row.accounts_receivable_turnover_with_industry">
                      {{ props.row.accounts_receivable_turnover_with_industry }}%
                    </span>
                  </el-form-item>
                  <el-form-item label="存货周转次数与市场平均的对比: ">
                    <span v-if="props.row.inventory_turnover_days_with_market > 0">
                      + {{ props.row.inventory_turnover_days_with_market }}%</span>
                    <span v-else-if="props.row.inventory_turnover_days_with_market">
                      {{ props.row.inventory_turnover_days_with_market }}%
                    </span>
                  </el-form-item>
                  <el-form-item label="存货周转次数与行业平均的对比: ">
                    <span v-if="props.row.inventory_turnover_days_with_industry > 0">
                      + {{ props.row.inventory_turnover_days_with_industry }}%</span>
                    <span v-else-if="props.row.inventory_turnover_days_with_industry">
                      {{ props.row.inventory_turnover_days_with_industry }}%
                    </span>
                  </el-form-item>
                  <el-form-item label="营业总收入同比增长与市场平均的对比:">
                    <span v-if="props.row.revenue_growth_with_market > 0">
                      + {{ props.row.revenue_growth_with_market }}%</span>
                    <span v-else-if="props.row.revenue_growth_with_market">
                      {{ props.row.revenue_growth_with_market }}%
                    </span>
                  </el-form-item>
                  <el-form-item label="营业总收入同比增长与行业平均的对比:">
                    <span v-if="props.row.revenue_growth_with_industry > 0">
                      + {{ props.row.revenue_growth_with_industry }}%
                    </span>
                    <span v-else-if="props.row.revenue_growth_with_industry">
                      {{ props.row.revenue_growth_with_industry }}%
                    </span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="code" min-width="100" sortable="custom" label="代码/名称" align="center">
              <template slot-scope="scope">
                <a :href="'/#/p/stock/' + scope.row.code" target="_blank">{{scope.row.code}}({{scope.row.name}})</a>
              </template>
            </el-table-column>
            <el-table-column prop="hy" min-width="60" label="行业" align="center"></el-table-column>
            <el-table-column prop="fr_date" min-width="70" sortable="custom" label="日期" align="center"></el-table-column>
            <el-table-column prop="jqjzcsyl" min-width="110" sortable="custom" label="加权净资产收益率"
                             align="center"></el-table-column>
            <el-table-column prop="mll" min-width="60" sortable="custom" label="毛利率" align="center"></el-table-column>
            <el-table-column prop="yszkzzts" min-width="120" sortable="custom" label="应收账款周转次数"
                             align="center"></el-table-column>
            <el-table-column prop="chzzts" min-width="100" sortable="custom" label="存货周转次数" align="center"></el-table-column>
            <el-table-column prop="yyzsrtbzz" min-width="120" sortable="custom" label="营业总收入同比增长"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.yyzsrtbzz > 0">
                    + {{ scope.row.yyzsrtbzz }}%
                    <img src="../../assets/mainPage/up.png" style="width: 7px;height: 11px;">
                </span>
                <span v-else-if="scope.row.yyzsrtbzz">
                    {{ scope.row.yyzsrtbzz }}%
                    <img src="../../assets/mainPage/down.png" style="width: 7px;height: 11px;">
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div v-show="!listLoading" class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>

      </el-row>

      <el-row class="sin_data">


      </el-row>

    </div>

  </div>

</template>

<script type="es6">
  import {getFinanceReportStatisticData, selectStockList, getIndustryStockListData} from '@/api/analysis'

  export default {
    name: 'finance-analysis',
    data() {
      return {
        // 股票列表
        stockDataAll: [],
        stockData: [],
        stockDataDict: [],
        // 财报期间
        financialReportDate: [],

        hy_data: [
          {value: '', label: '市场整体'},
          {value: '农林牧渔', label: '农林牧渔'},
          {value: '制造业', label: '工业制造'},
          {value: '公共设施', label: '公共设施'},
          {value: '信息技术', label: '信息技术'},
          {value: '地产建筑业', label: '地产建筑'},
          {value: '服务业', label: '服务业'},
          {value: '综合', label: '综合'}
        ],

        // 加权净资产收益率
        jqjzcsyl_data: [
          {value: 'null~-10', label: '-10%以下'},
          {value: '-10~0', label: '-10% ~ 0%'},
          {value: '0~5', label: '0% ~ 5%'},
          {value: '5~10', label: '5% ~ 10%'},
          {value: '10~20', label: '10% ~ 20%'},
          {value: '20~null', label: '20%以上'},
        ],

        mll_data: [
          {value: 'null~0', label: '0%以下'},
          {value: '0~10', label: '0% ~ 10%'},
          {value: '10~20', label: '10% ~ 20%'},
          {value: '20~30', label: '20% ~ 30%'},
          {value: '30~50', label: '30% ~ 50%'},
          {value: '50~null', label: '50%以上'},
        ],

        yszkzzts_data: [
          {value: 'null~1', label: '1%以下'},
          {value: '1~3', label: '1% ~ 3%'},
          {value: '3~5', label: '3% ~ 5%'},
          {value: '5~7', label: '5% ~ 7%'},
          {value: '7~10', label: '7% ~ 10%'},
          {value: '10~null', label: '10%以上'},
        ],

        chzzts_data: [
          {value: 'null~1', label: '1%以下'},
          {value: '1~3', label: '1% ~ 3%'},
          {value: '3~5', label: '3% ~ 5%'},
          {value: '5~7', label: '5% ~ 7%'},
          {value: '7~10', label: '7% ~ 10%'},
          {value: '10~null', label: '10%以上'},
        ],

        yyzsrtbzz_data: [
          {value: 'null~-20', label: '-20%以下'},
          {value: '-20~0', label: '-20% ~ 0%'},
          {value: '0~10', label: '0% ~ 10%'},
          {value: '10~20', label: '10% ~ 20%'},
          {value: '20~35', label: '20% ~ 35%'},
          {value: '35~null', label: '35%以上'},
        ],

        total: null,
        listLoading: true,
        listQuery: {
          page: 1,      //分页
          limit: 20,
          code: '',     //股票代码
          hy: '',    //市场或行业
          fr_date: '',   // 财报期间

          jqjzcsyl: '',  //加权净资产收益率
          mll: '',       //毛利率
          yszkzzts: '',       //应收账款周转天数
          chzzts: '',       //存货周转天数
          yyzsrtbzz: '',       //营业总收入同比增长

          order_by: 'jqjzcsyl',
          is_reverse: true,
        },

        tableData: [],

      }
    },
    mounted() {
      // 请求股票代码
      this.queryStockList();
      // 制作财报区间
      this.makePeriodDataList();
      // 请求默认数据
      this.getList();
    },
    methods: {
      // 请求股票代码
      queryStockList() {
        selectStockList().then(response => {
          if (response) {
            this.stockDataAll = response;
            this.stockData = this.stockDataAll;
            for (let i = 0; i < response.length; i++) {
              this.stockDataDict[response[i].code] = response[i].value;
            }
          }
        })
      },
      // 制作财报期间
      makePeriodDataList() {
        const before_15_days_date = new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000);
        const now_year = before_15_days_date.getFullYear();
        const mds = [
          [11, 31, '12', '31', '年报'],
          [8, 30, '09', '30', '三季报'],
          [5, 30, '06', '30', '中报'],
          [2, 31, '03', '31', '一季报']
        ];
        for (let year = now_year; year >= 2013; year--) {
          for (let i = 0; i < mds.length; i++) {
            let d = new Date(year, mds[i][0], mds[i][1]);
            if (d < before_15_days_date) {
              this.financialReportDate.push({
                value: year + '-' + mds[i][2] + '-' + mds[i][3],
                label: year + '年' + mds[i][4]
              })
            }
          }
        }
        this.listQuery.fr_date = this.financialReportDate[0].value
      },
      changeHy(val) {
        //过滤数据
        if (val !== '') {
          getIndustryStockListData(val).then(response => {
            this.stockData = [];
            for (let i = 0; i < response.length; i++) {
              this.stockData.push({'code': response[i], 'value': this.stockDataDict[response[i]]})
            }
          })
        }
        else {
          this.stockData = this.stockDataAll;
        }
      },
      // 发送请求数据
      getList() {
        this.listLoading = true;
        getFinanceReportStatisticData(this.listQuery).then(response => {
          let responseData = response.data;
          this.tableData = [];
          for (let i = 0; i < responseData.length; i++) {
            this.tableData.push(
              {
                code: responseData[i]['code'],
                name: responseData[i]['name'],
                hy: responseData[i]['hy'],
                fr_date: responseData[i]['fr_date'],
                jqjzcsyl:
                  responseData[i]['rate_of_return_on_net_assets'] ? responseData[i]['rate_of_return_on_net_assets'].toFixed(2) : null,
                rate_of_return_on_net_assets_with_market:
                  responseData[i]['rate_of_return_on_net_assets_with_market'] ? responseData[i]['rate_of_return_on_net_assets_with_market'].toFixed(2) : null,
                rate_of_return_on_net_assets_with_industry:
                  responseData[i]['rate_of_return_on_net_assets_with_industry'] ? responseData[i]['rate_of_return_on_net_assets_with_industry'].toFixed(2) : null,
                mll:
                  responseData[i]['gross_margin'] ? responseData[i]['gross_margin'].toFixed(2) : null,
                gross_margin_with_market:
                  responseData[i]['gross_margin_with_market'] ? responseData[i]['gross_margin_with_market'].toFixed(2) : null,
                gross_margin_with_industry:
                  responseData[i]['gross_margin_with_industry'] ? responseData[i]['gross_margin_with_industry'].toFixed(2) : null,
                yszkzzts:
                  responseData[i]['accounts_receivable_turnover'] ? responseData[i]['accounts_receivable_turnover'].toFixed(2) : null,
                accounts_receivable_turnover_with_market:
                  responseData[i]['accounts_receivable_turnover_with_market'] ? responseData[i]['accounts_receivable_turnover_with_market'].toFixed(2) : null,
                accounts_receivable_turnover_with_industry:
                  responseData[i]['accounts_receivable_turnover_with_industry'] ? responseData[i]['accounts_receivable_turnover_with_industry'].toFixed(2) : null,
                chzzts:
                  responseData[i]['inventory_turnover_days'] ? responseData[i]['inventory_turnover_days'].toFixed(2) : null,
                inventory_turnover_days_with_market:
                  responseData[i]['inventory_turnover_days_with_market'] ? responseData[i]['inventory_turnover_days_with_market'].toFixed(2) : null,
                inventory_turnover_days_with_industry:
                  responseData[i]['inventory_turnover_days_with_industry'] ? responseData[i]['inventory_turnover_days_with_industry'].toFixed(2) : null,
                yyzsrtbzz:
                  responseData[i]['revenue_growth'] ? responseData[i]['revenue_growth'].toFixed(2) : null,
                revenue_growth_with_market:
                  responseData[i]['revenue_growth_with_market'] ? responseData[i]['revenue_growth_with_market'].toFixed(2) : null,
                revenue_growth_with_industry:
                  responseData[i]['revenue_growth_with_industry'] ? responseData[i]['revenue_growth_with_industry'].toFixed(2) : null,
              }
            )
          }
          this.total = response.count;
          this.listLoading = false
        })
      },
      // sortableChange 请求排序
      sortableChange(event) {
        this.listQuery.order_by = event.prop;
        if (event.order === 'descending') {
          this.listQuery.is_reverse = true
        } else {
          this.listQuery.is_reverse = ''
        }
        this.getList()
      },

      // 默认请求第一页
      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
      },
      // 每页条数请求
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList()
      },
      // 页变化请求
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList()
      },

    }

  }
</script>

<style type="text/css" lang="scss" scoped>

  .tip_title {
    background: url("../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
    background-size: 100% auto;
  }

  .tip_title {
    padding: 15px 0 40px 50px;
    color: #559bff;
  }

  .item_style {
    margin-left: 27px;
    color: #0b8be6;
  }

  .search_query {
    width: 160px;
    margin-top: 12px;
  }

</style>

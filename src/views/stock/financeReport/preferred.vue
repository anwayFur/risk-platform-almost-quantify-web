<template>
  <div class="app-container">
    <div class="border_top_div pad_div">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
          <div class="top_tip">
            <span style="color: #999;font-size: 14px;">当前目录:&nbsp;股票&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            <span style="color: #657180;">{{title}}</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
        </el-col>
      </el-row>
    </div>

    <div class="border_div">
      <div class="tip_title">{{title}}</div>

      <el-row>
        <div class="filter-container">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <span style="padding-left: 5px;padding-right: 5px;">选择行业：</span>
            <el-select v-model="listQuery.range" @change="changeRange" placeholder="请选择" size="small">
              <el-option v-for="item in range_data" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
        </div>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div id="preferred_data">
            <el-table :data="preferred_data" @sort-change="sortableChange" style="width: 100%">
              <el-table-column prop="code" min-width="100" sortable="custom" label="代码/名称" align="center">
                <template slot-scope="scope">
                  <a v-if="scope.row.code !== ''"
                     :href="'/#/p/stock/' + scope.row.code" target="_blank">{{scope.row.code}}({{scope.row.name}})</a>
                  <span v-else>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="hy" min-width="60" label="行业" align="center"></el-table-column>
              <el-table-column prop="notice_date" min-width="80" sortable="custom" label="报告日期"
                               align="center"></el-table-column>
              <el-table-column prop="jqjzcsyl" min-width="110" sortable="custom" label="加权净资产收益率"
                               align="center"></el-table-column>
              <el-table-column prop="mll" min-width="60" sortable="custom" label="毛利率" align="center"></el-table-column>
              <el-table-column prop="yszkzzts" min-width="100" sortable="custom" label="应收账款周转次数"
                               align="center"></el-table-column>
              <el-table-column prop="chzzts" min-width="100" sortable="custom" label="存货周转次数"
                               align="center"></el-table-column>
              <el-table-column prop="yyzsrtbzz" min-width="100" sortable="custom" label="营收同比增长"
                               align="center">
                <template slot-scope="scope">
                <span v-if="scope.row.yyzsrtbzz > 0">
                    + {{ scope.row.yyzsrtbzz }}%
                    <img src="../../../assets/mainPage/up.png" style="width: 7px;height: 11px;">
                </span>
                  <span v-else-if="scope.row.yyzsrtbzz">
                    {{ scope.row.yyzsrtbzz }}%
                    <img src="../../../assets/mainPage/down.png" style="width: 7px;height: 11px;">
                </span>
                </template>
              </el-table-column>
            </el-table>

            <div v-show="!listLoading" class="pagination-container">
              <el-pagination background @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page.sync="listQuery.page"
                             :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                             layout="total, sizes, prev, pager, next, jumper" :total="stock_num">
              </el-pagination>
            </div>

          </div>
        </el-col>
      </el-row>
    </div>

    <el-row class="sin_data">
    </el-row>
  </div>


</template>

<script type="es6">
  import {getPreferredData, getAvgDataByHy} from '@/api/stocks';

  export default {
    data() {
      return {
        listQuery: {
          range: '市场整体',  //市场或行业范围
          page: 1,
          limit: 20,
          order_by: 'jqjzcsyl',
          is_reverse: true,
        },

        title: '财报优选',

        range_data: [
          {value: '市场整体', label: '市场整体'},
          {value: '农林牧渔', label: '农林牧渔'},
          {value: '制造业', label: '工业制造'},
          {value: '公共设施', label: '公共设施'},
          {value: '信息技术', label: '信息技术'},
          {value: '地产建筑业', label: '地产建筑'},
          {value: '服务业', label: '服务业'},
          {value: '综合', label: '综合'}
        ],

        stock_num: null,
        listLoading: true,
        preferred_data: [],
      }
    },
    mounted() {
      // 获取财报优选数据
      this.getData();
    },
    methods: {
      getData() {
        this.listLoading = true;

        // 清空表格列表
        this.preferred_data = [];

        // 获取行业信息
        getAvgDataByHy(this.listQuery.range).then(response => {
          if (response.length > 0) {
            this.preferred_data.push({
              code: '',
              name: this.listQuery.range === '市场整体' ? '市场均值' : '行业均值',
              hy: this.listQuery.range,
              notice_date: '- -',
              jqjzcsyl: response[0]['rate_of_return_on_net_assets'],
              mll: response[0]['gross_margin'],
              yszkzzts: response[0]['accounts_receivable_turnover'],
              chzzts: response[0]['inventory_turnover_days'],
              yyzsrtbzz: response[0]['revenue_growth'],
            });
          }

          // 获取列表数据
          getPreferredData(this.listQuery).then(response => {
            let responseData = response.data;
            for (let i = 0; i < responseData.length; i++) {
              this.preferred_data.push({
                  code: responseData[i]['code'],
                  name: responseData[i]['name'],
                  hy: responseData[i]['hy'],
                  notice_date: responseData[i]['notice_date'],
                  jqjzcsyl: responseData[i]['rate_of_return_on_net_assets'],
                  mll: responseData[i]['gross_margin'],
                  yszkzzts: responseData[i]['accounts_receivable_turnover'],
                  chzzts: responseData[i]['inventory_turnover_days'],
                  yyzsrtbzz: responseData[i]['revenue_growth'],
                }
              )
            }

            // 标题
            let fr_date = response.fr_date;
            this.title = fr_date.slice(0, 4) + '年';
            if (fr_date.slice(5, 7) === '03') {
              this.title += '一季报'
            }
            else if (fr_date.slice(5, 7) === '06') {
              this.title += '中报'
            }
            else if (fr_date.slice(5, 7) === '09') {
              this.title += '三季报'
            }
            else {
              this.title += '年报'
            }
            this.title += '优选';

            // 总数
            this.stock_num = response.count;

            this.listLoading = false
          })
        });
      },
      // 每页条数请求
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getData()
      },
      // 页变化请求
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getData()
      },
      // sortableChange 请求排序
      sortableChange(event) {
        this.listQuery.order_by = event.prop;
        this.listQuery.is_reverse = event.order === 'descending';
        if (this.listQuery.page !== 1){
          this.listQuery.page = 1
        }
        else {
          this.getData();
        }
        this.getData()
      },
      // 选择市场或行业范围
      changeRange(val) {
        this.listQuery.range = val;
        if (this.listQuery.page !== 1){
          this.listQuery.page = 1
        }
        else {
          this.getData();
        }
      }
    }
  }

</script>

<style type="text/css" lang="scss" scoped>
  .tip_title {
    background: url("../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
    background-size: 100% auto;
  }

  .tip_title {
    padding: 15px 0 40px 50px;
    color: #559bff;
  }

  .choice_button {
    margin-left: 120px;
    margin-top: -5px;
  }

</style>



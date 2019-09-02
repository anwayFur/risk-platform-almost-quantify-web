<template>
  <div class="app-container">
    <div class="border_top_div pad_div">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
          <div class="top_tip">
            <span style="color: #999;font-size: 14px;">当前目录:&nbsp;分析工具&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            <span style="color: #657180;">研报深度分析</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
        </el-col>
      </el-row>
    </div>

    <div class="border_div">

      <div class="tip_title">研报深度分析</div>

      <el-row class="sin_data height_search">

        <el-col :xs="24" :sm="24" :md="24" :lg="24">

          <div class="filter-container">
            <span>股票代码:&nbsp;&nbsp;&nbsp;</span>
            <el-select v-model="listQuery.code" filterable clearable placeholder="请选择股票">
              <el-option
                v-for="item in stockData"
                :key="item.code"
                :label="item.value"
                :value="item.code">
              </el-option>
            </el-select>

            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机构:&nbsp;&nbsp;&nbsp;</span>
            <el-select v-model="listQuery.org_name" filterable clearable placeholder="请选择机构">
              <el-option
                v-for="item in orgNameData"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;变动情况:&nbsp;&nbsp;&nbsp;</span>
            <el-select clearable style="width: 120px;margin-top: 6px;" class="filter-item"
                       v-model="listQuery.change" placeholder="变动情况">
              <el-option v-for="item in changeOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;等级划分:&nbsp;&nbsp;&nbsp;</span>
            <el-select clearable style="width: 120px;margin-top: 6px;" class="filter-item" v-model="listQuery.rate"
                       placeholder="等级划分">
              <el-option v-for="item in rateOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </div>

        </el-col>

      </el-row>

      <el-row class="sin_data">

        <el-col :xs="10" :sm="10" :md="10" :lg="10">
            <el-row class="sin_data">
              <el-col :xs="5" :sm="5" :md="5" :lg="5">
                <p style="height: 34px;">正负面范围:&nbsp;&nbsp;&nbsp;</p>
              </el-col>
              <el-col :xs="18" :sm="18" :md="18" :lg="18">
                <el-slider style="width: 90%"
                           v-model="init_posi"
                           range
                           :max="100">
                </el-slider>
              </el-col>
            </el-row>
        </el-col>

        <el-col :xs="14" :sm="14" :md="14" :lg="14">
          <div class="filter-container time_style">
            <span>开始日期:&nbsp;&nbsp;&nbsp;</span>
            <el-date-picker
              id = "begin_date"
              v-model="listQuery.begin_date"
              :default-value="valueInit1"
              type="date"
              placeholder="开始日期"
              :picker-options="pickerOptions0"
              style="width: 150px;">
            </el-date-picker>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;结束日期:&nbsp;&nbsp;&nbsp;</span>
            <el-date-picker
              id = "end_date"
              v-model="listQuery.end_date"
              :default-value="valueInit2"
              type="date"
              placeholder="结束日期"
              :picker-options="pickerOptions1"
              style="width: 150px;">
            </el-date-picker>
          </div>
        </el-col>

      </el-row>

      <el-row class="sin_data">

        <div class="filter-container checkbox_top">
          <el-col :xs="18" :sm="18" :md="18" :lg="18">
            <el-checkbox v-model="listQuery.has_target" style="padding-top: 18px">筛选有目标价格的数据</el-checkbox>
          </el-col>
        </div>

      </el-row>
      <el-row class="sin_data">

        <el-col :xs="24" :sm="24" :md="24" :lg="24">

          <div class="filter-container">
            <el-col :xs="6" :sm="6" :md="6" :lg="6">
              <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
            </el-col>
          </div>

        </el-col>

      </el-row>

      <el-row class="sin_data">

        <el-table
          :data="tableData"
          @sort-change="sortableChange"
          style="width: 100%"
          class="report_tab">
          <el-table-column type="expand" width="30">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="预测目标价格范围:">
                  <span>&nbsp;</span>
                  <span v-if="props.row.target_price_min >= 0">
                      {{props.row.target_price_min}}
                    </span>
                  <span v-if="props.row.target_price_min != null">
                      <span v-if="props.row.target_price_max != null">
                         ---
                      </span>
                    </span>
                  <span v-if="props.row.target_price_max >= 0">
                      {{ props.row.target_price_max }}
                    </span>
                </el-form-item>
                <el-form-item label="研报发行时价格及日期:">
                  <span>&nbsp;{{ props.row.datum_price }}&nbsp;&nbsp;&nbsp;({{ props.row.datum_date }})</span>
                </el-form-item>
                <hr>
                <span v-if="props.row.after_day_data != null">
                    <span v-if="props.row.after_day_data.after_1_days != null">
                    <el-form-item label="1天后数据:">
                      <span>&nbsp;价格：{{ props.row.after_day_data.after_1_days.c }}</span>
                      <span>&nbsp;最高：{{ props.row.after_day_data.after_1_days.h }}</span>
                      <span>&nbsp;最低：{{ props.row.after_day_data.after_1_days.l }}</span>
                      <span v-if="props.row.after_day_data.after_1_days.income_rate > 0">
                        &nbsp;涨跌：
                        <span class="color_red">{{
                          parseFloat(props.row.after_day_data.after_1_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      <span v-if="props.row.after_day_data.after_1_days.income_rate < 0">
                        &nbsp;涨跌：
                        <span class="color_green">{{
                          parseFloat(props.row.after_day_data.after_1_days.income_rate).toFixed(2) }}%</span>
                      </span>
                    </el-form-item>
                  </span>
                    <span v-if="props.row.after_day_data.after_5_days != null">
                      <el-form-item label="5天后数据:">
                        <span>&nbsp;价格：{{ props.row.after_day_data.after_5_days.c }}</span>
                        <span>&nbsp;最高：{{ props.row.after_day_data.after_5_days.h }}</span>
                        <span>&nbsp;最低：{{ props.row.after_day_data.after_5_days.l }}</span>
                        <span v-if="props.row.after_day_data.after_5_days.income_rate > 0">
                        &nbsp;涨跌：
                        <span class="color_red">{{
                          parseFloat(props.row.after_day_data.after_5_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      <span v-if="props.row.after_day_data.after_5_days.income_rate < 0">
                        &nbsp;涨跌：
                        <span class="color_green">{{
                          parseFloat(props.row.after_day_data.after_5_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      </el-form-item>
                    </span>
                    <span v-if="props.row.after_day_data.after_10_days != null">
                      <el-form-item label="10天后数据:">
                        <span>&nbsp;价格：{{ props.row.after_day_data.after_10_days.c }}</span>
                        <span>&nbsp;最高：{{ props.row.after_day_data.after_10_days.h }}</span>
                        <span>&nbsp;最低：{{ props.row.after_day_data.after_10_days.l }}</span>
                        <span v-if="props.row.after_day_data.after_10_days.income_rate > 0">
                        &nbsp;涨跌：
                        <span class="color_red">{{
                          parseFloat(props.row.after_day_data.after_10_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      <span v-if="props.row.after_day_data.after_10_days.income_rate < 0">
                        &nbsp;涨跌：
                        <span class="color_green">{{
                          parseFloat(props.row.after_day_data.after_10_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      </el-form-item>
                    </span>
                    <span v-if="props.row.after_day_data.after_15_days != null">
                      <el-form-item label="15天后数据:">
                        <span>&nbsp;价格：{{ props.row.after_day_data.after_15_days.c }}</span>
                        <span>&nbsp;最高：{{ props.row.after_day_data.after_15_days.h }}</span>
                        <span>&nbsp;最低：{{ props.row.after_day_data.after_15_days.l }}</span>
                        <span v-if="props.row.after_day_data.after_15_days.income_rate > 0">
                        &nbsp;涨跌：
                        <span class="color_red">{{
                          parseFloat(props.row.after_day_data.after_15_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      <span v-if="props.row.after_day_data.after_15_days.income_rate < 0">
                        &nbsp;涨跌：
                        <span class="color_green">{{
                          parseFloat(props.row.after_day_data.after_15_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      </el-form-item>
                    </span>
                    <span v-if="props.row.after_day_data.after_30_days != null">
                      <el-form-item label="一个月后数据:">
                        <span>&nbsp;价格：{{ props.row.after_day_data.after_30_days.c }}</span>
                        <span>&nbsp;最高：{{ props.row.after_day_data.after_30_days.h }}</span>
                        <span>&nbsp;最低：{{ props.row.after_day_data.after_30_days.l }}</span>
                        <span v-if="props.row.after_day_data.after_30_days.income_rate > 0">
                        &nbsp;涨跌：
                        <span class="color_red">{{
                          parseFloat(props.row.after_day_data.after_30_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      <span v-if="props.row.after_day_data.after_30_days.income_rate < 0">
                        &nbsp;涨跌：
                        <span class="color_green">{{
                          parseFloat(props.row.after_day_data.after_30_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      </el-form-item>
                    </span>
                    <span v-if="props.row.after_day_data.after_90_days != null">
                      <el-form-item label="三个月后数据:">
                        <span>&nbsp;价格：{{ props.row.after_day_data.after_90_days.c }}</span>
                        <span>&nbsp;最高：{{ props.row.after_day_data.after_90_days.h }}</span>
                        <span>&nbsp;最低：{{ props.row.after_day_data.after_90_days.l }}</span>
                        <span v-if="props.row.after_day_data.after_90_days.income_rate > 0">
                        &nbsp;涨跌：
                        <span class="color_red">{{
                          parseFloat(props.row.after_day_data.after_90_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      <span v-if="props.row.after_day_data.after_90_days.income_rate < 0">
                        &nbsp;涨跌：
                        <span class="color_green">{{
                          parseFloat(props.row.after_day_data.after_90_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      </el-form-item>
                    </span>
                    <span v-if="props.row.after_day_data.after_180_days != null">
                      <el-form-item label="半年后数据:">
                        <span>&nbsp;价格：{{ props.row.after_day_data.after_180_days.c }}</span>
                        <span>&nbsp;最高：{{ props.row.after_day_data.after_180_days.h }}</span>
                        <span>&nbsp;最低：{{ props.row.after_day_data.after_180_days.l }}</span>
                        <span v-if="props.row.after_day_data.after_180_days.income_rate > 0">
                        &nbsp;涨跌：
                        <span class="color_red">{{
                          parseFloat(props.row.after_day_data.after_180_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      <span v-if="props.row.after_day_data.after_180_days.income_rate < 0">
                        &nbsp;涨跌：
                        <span class="color_green">{{
                          parseFloat(props.row.after_day_data.after_180_days.income_rate).toFixed(2) }}%</span>
                      </span>
                      </el-form-item>
                    </span>
                  </span>
                <hr>
                <span v-if="props.row.achieve_target_days_data != null ">

                      <el-form-item>
                        <span class="item_style">&nbsp;&nbsp;达到目标价格<span
                          style="color: red;">10%</span>用时:&nbsp;&nbsp;</span>
                        <span v-if="props.row.per_10_days != null">
                          <span class="color_red">{{props.row.per_10_days}}</span> 天
                        </span>
                        <span v-else> --天</span>
                      </el-form-item>
                      <el-form-item>
                        <span class="item_style">&nbsp;&nbsp;达到目标价格<span
                          style="color: red;">30%</span>用时:&nbsp;&nbsp;</span>
                        <span v-if="props.row.per_30_days != null">
                          <span class="color_red">{{props.row.per_30_days}}</span> 天
                        </span>
                        <span v-else> --天</span>
                      </el-form-item>
                      <el-form-item>
                        <span class="item_style">&nbsp;&nbsp;达到目标价格<span
                          style="color: red;">50%</span>用时:&nbsp;&nbsp;</span>
                        <span v-if="props.row.per_50_days != null">
                          <span class="color_red">{{props.row.per_50_days}}</span> 天
                        </span>
                        <span v-else> --天</span>
                      </el-form-item>
                      <el-form-item>
                        <span class="item_style">&nbsp;&nbsp;达到目标价格<span
                          style="color: red;">80%</span>用时:&nbsp;&nbsp;</span>
                        <span v-if="props.row.per_80_days != null">
                          <span class="color_red">{{props.row.per_80_days}}</span> 天
                        </span>
                        <span v-else> --天</span>
                      </el-form-item>
                      <el-form-item>
                        <span class="item_style">&nbsp;&nbsp;达到目标价格<span
                          style="color: red;">90%</span>用时:&nbsp;&nbsp;</span>
                        <span v-if="props.row.per_90_days != null">
                          <span class="color_red">{{props.row.per_90_days}}</span> 天
                        </span>
                        <span v-else> --天</span>
                      </el-form-item>
                      <el-form-item>
                        <span class="item_style">&nbsp;&nbsp;达到目标价格<span style="color: red;">100%</span>用时:&nbsp;&nbsp;</span>
                        <span v-if="props.row.per_100_days != null">
                          <span class="color_red">{{props.row.per_100_days}}</span> 天
                        </span>
                        <span v-else> --天</span>
                      </el-form-item>
                  </span>
                <span v-else>
                    <el-form-item label="达到目标价格10%用时:">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span></span>
                    </el-form-item>
                    <el-form-item label="达到目标价格30%用时:">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span></span>
                    </el-form-item>
                    <el-form-item label="达到目标价格50%用时:">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span></span>
                    </el-form-item>
                    <el-form-item label="达到目标价格80%用时:">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span></span>
                    </el-form-item>
                    <el-form-item label="达到目标价格90%用时:">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span></span>
                    </el-form-item>
                    <el-form-item label="达到目标价格100%用时:">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span></span>
                    </el-form-item>
                  </span>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="report_date"
            label="日期"
            sortable="custom"
            width="100">
          </el-table-column>
          <el-table-column
            prop="code"
            label="名称/代码"
            sortable="custom"
            width="160">
            <template slot-scope="scope">
              <a :href="'/#/p/stock/' + scope.row.code" target="_blank">
                {{scope.row.name}}({{scope.row.code}})
              </a>
            </template>
          </el-table-column>
          <el-table-column
            prop="org_name"
            label="机构"
            sortable="custom"
            width="120">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            sortable="custom"
            min-width="400">
            <template slot-scope="scope">
              <a @click="changeReportId(scope.row.id)">{{scope.row.title}}</a>
              <br>
              <div v-for="item in scope.row.keywords" class="showKeywords">
                <el-tag size="mini" class="keyword">{{item}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="change"
            label="变动"
            sortable="custom"
            width="100">
          </el-table-column>
          <el-table-column
            prop="rate"
            label="等级"
            sortable="custom"
            width="100">
          </el-table-column>
          <el-table-column
            prop="posi_per"
            label="正负面"
            sortable="custom"
            width="100">
          </el-table-column>
        </el-table>

        <reportContentDialog
          ref="reportContentDialog">
        </reportContentDialog>

        <div v-show="!listLoading" class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page"
                         :page-sizes="[10,15,30, 50]" :page-size="listQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>

      </el-row>

      <el-row class="sin_data">


      </el-row>

    </div>

  </div>

</template>

<script type="es6">
  import reportContentDialog from '../stock/detailsPage/stockReport/reportContent.vue'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button';
  import ElRadio from "../../../node_modules/element-ui/packages/radio/src/radio";
  import ElRadioGroup from "../../../node_modules/element-ui/packages/radio/src/radio-group";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import {fetchList, selectGroupByOrgName, selectStockList} from '@/api/analysis'

  const orderByOptions = [
    {key: 'code', display_name: '代码'},
    {key: 'org_name', display_name: '组织'},
    {key: 'report_date', display_name: '日期'},
    {key: 'change', display_name: '变动情况'},
    {key: 'rate', display_name: '等级划分'},
    {key: 'posi_per', display_name: '正负面'},
  ]

  export default {
    name: 'report-analysis',
    data() {
      return {
        // 股票列表
        stockData: [],
        //机构名称列表
        orgNameData: [],
        // code 和 code 模糊查询匹配
        codeSelect: '',
        nameSelect: '',
        like: [],

        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          code: '',
          org_name: '',
          begin_date: null,
          end_date: null,
          change: '',
          rate: '',
          min_posi: '',
          max_posi: '',
          order_by: 'report_date',
          is_reverse: true,
          has_target: false,
        },

        //正负面选择范围
        //最小值的最大值
        minNum: 100,
        //最大值的最小值
        maxNum: 0,

        init_posi: [0, 100],


        changeOptions: ['维持', '调高', '调低', '首次', '未知'],
        rateOptions: ['买入', '增持', '中性', '减持', '卖出', '未知'],

        //进度条型范围初始值
        posiValue: [70, 90],

        // 两个时间框
        value1: null,
        value2: null,
        valueInit1: new Date(new Date().getTime() - 60 * 24 * 3600 * 1000),
        valueInit2: new Date(new Date().getTime() - 30 * 24 * 3600 * 1000),
        pickerOptions0: {
          disabledDate: (time) => {
            this.value1 = this.listQuery.begin_date;
            this.value2 = this.listQuery.end_date;
            if (this.value2 !== "") {
              return time.getTime() > Date.now() || time.getTime() > this.value2;
            } else {
              return time.getTime() > Date.now();
            }

          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            this.value1 = this.listQuery.begin_date;
            this.value2 = this.listQuery.end_date;
            return time.getTime() < this.value1 || time.getTime() > Date.now();
          }
        },

        orderByOptions,
        reverseOptions: [{label: '升序排列', key: ''}, {label: '降序排列', key: true}],
        tableData: [],

        dialogFormVisible: false,
        formLabelWidth: '120px',

      }
    },
    components: {
      reportContentDialog,
    },
    mounted() {
      // 初始化时间
      this.listQuery.begin_date = this.valueInit1;
      this.listQuery.end_date = this.valueInit2;
      this.value1 = this.listQuery.begin_date;
      this.value2 = this.listQuery.end_date;

      // 请求默认数据
      this.getList();
      // 请求机构名称
      this.querySearchName();
      this.queryStockList()
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      // 模糊查询机构名称
      queryStockList() {
        selectStockList().then(response => {
          if (response) {
            this.stockData = response;
          }
        })
      },
      // 模糊查询机构名称
      querySearchName() {
        selectGroupByOrgName().then(response => {
          if (response) {
            this.orgNameData = response;
          }
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
      // 发送请求数据
      getList() {
        this.listLoading = true;
        this.listQuery.min_posi = this.init_posi[0];
        this.listQuery.max_posi = this.init_posi[0];
        for(let i = 0; i < this.init_posi.length; i++){
          if (this.listQuery.min_posi > this.init_posi[i]){
            this.listQuery.min_posi = this.init_posi[i]
          }
          if (this.listQuery.max_posi < this.init_posi[i]){
            this.listQuery.max_posi = this.init_posi[i]
          }
        }
        if (this.listQuery.has_target === false) {
          this.listQuery.has_target = ''
        }
        fetchList(this.listQuery).then(response => {

          let reportInfo = response.data;
          this.tableData = [];
          for (let i = 0; i < reportInfo.length; i++) {

            if (reportInfo[i]['achieve_target_days_data'] != null
              && !(JSON.stringify(reportInfo[i]['achieve_target_days_data']) === "{}")) {
              this.tableData.push(
                {
                  id: reportInfo[i]['id'],
                  change: reportInfo[i]['change'],
                  code: reportInfo[i]['code'],
                  name: reportInfo[i]['name'],
                  org_name: reportInfo[i]['org_name'],
                  posi_per: reportInfo[i]['posi_per'],
                  rate: reportInfo[i]['rate'],
                  report_date: reportInfo[i]['report_date'],
                  title: reportInfo[i]['title'],
                  datum_date: reportInfo[i]['datum_date'],
                  datum_price: reportInfo[i]['datum_price'],
                  achieve_target_days_data: reportInfo[i]['achieve_target_days_data'],
                  per_10_days: reportInfo[i]['achieve_target_days_data']['per_10_days'],
                  per_30_days: reportInfo[i]['achieve_target_days_data']['per_30_days'],
                  per_50_days: reportInfo[i]['achieve_target_days_data']['per_50_days'],
                  per_80_days: reportInfo[i]['achieve_target_days_data']['per_80_days'],
                  per_90_days: reportInfo[i]['achieve_target_days_data']['per_90_days'],
                  per_100_days: reportInfo[i]['achieve_target_days_data']['per_100_days'],
                  after_1_data: reportInfo[i]['after_day_data'],
                  after_5_data: reportInfo[i]['after_day_data'],
                  after_10_data: reportInfo[i]['after_day_data'],
                  after_15_data: reportInfo[i]['after_day_data'],
                  after_30_data: reportInfo[i]['after_day_data'],
                  target_price_min: reportInfo[i]['target_price_min'],
                  target_price_max: reportInfo[i]['target_price_max'],
                  after_day_data: reportInfo[i]['after_day_data'],
                  keywords: this.showKeyWords(reportInfo[i]['keywords'])
                })
            } else {
              this.tableData.push(
                {
                  id: reportInfo[i]['id'],
                  change: reportInfo[i]['change'],
                  code: reportInfo[i]['code'],
                  name: reportInfo[i]['name'],
                  org_name: reportInfo[i]['org_name'],
                  posi_per: reportInfo[i]['posi_per'],
                  rate: reportInfo[i]['rate'],
                  report_date: reportInfo[i]['report_date'],
                  title: reportInfo[i]['title'],
                  datum_date: reportInfo[i]['datum_date'],
                  datum_price: reportInfo[i]['datum_price'],
                  achieve_target_days_data: reportInfo[i]['achieve_target_days_data'],
                  target_price_min: reportInfo[i]['target_price_min'],
                  target_price_max: reportInfo[i]['target_price_max'],
                  after_day_data: reportInfo[i]['after_day_data'],
                  keywords: this.showKeyWords(reportInfo[i]['keywords'])
                })
            }


          }
          this.total = response.num;
          this.listLoading = false
        })
      },
      //展示报告详情
      changeReportId: function (id) {
        this.$refs.reportContentDialog.showReportContent(id);
      },
      showKeyWords: function (keywords) {
        let key = [];
        length = keywords.length > 3 ? 3 : keywords.length;
        for (let i = 0; i < length; i++) {
          key[i] = keywords[i][0];
        }
        return key;
      },
      // 默认请求第一页
      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
        this.dialogFormVisible = false
      },
      resetFilter() {
        this.listQuery = {
          page: 1,
          limit: 10,
          code: '',
          org_name: '',
          begin_date: null,
          end_date: null,
          change: '',
          rate: '',
          min_posi: '',
          max_posi: '',
          order_by: 'report_date',
          is_reverse: true,
          has_target: false,
        };
        this.listQuery.begin_date = this.valueInit1;
        this.listQuery.end_date = this.valueInit2;
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
      // 选择时间格式
      tsfDate: function (date, number) {
        if (typeof date !== 'undefined' && date !== null && date !== '') {
          switch (number) {
            case 1:
              return this.dateFormat(date, 'yyyy-MM-dd hh:mm');
            case 0:
              return this.dateFormat(date, 'yyyy-MM-dd');
            default:
              return this.dateFormat(date, 'yyyy-MM-dd hh:mm:ss')

          }
        } else {
          return null;
        }
      },
      // 时间日期格式化
      dateFormat: function (date, fmt) {
        let o = {
          "M+": date.getMonth() + 1,                 //月份
          "d+": date.getDate(),                    //日
          "h+": date.getHours(),                   //小时
          "m+": date.getMinutes(),                 //分
          "s+": date.getSeconds(),                 //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
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

  .pagination-container {
    text-align: center;
    padding-top: 10px;
  }

  .item_style {
    margin-left: 27px;
    color: #0b8be6;
  }

</style>

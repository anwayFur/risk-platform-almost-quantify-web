<template>
  <div class="app-container">
    <div class="border_top_div pad_div">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
          <div class="top_tip">
            <span style="color: #999;font-size: 14px;">当前目录:&nbsp;基金&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            <span style="color: #657180;">定投优选</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
        </el-col>
      </el-row>
    </div>

    <div class="border_div">
      <div class="tip_title">定投基金优选</div>

      <el-row>
        <div class="filter-container">
          <el-col :xs="7" :sm="7" :md="7" :lg="7">
            <span style="padding-left: 5px;padding-right: 5px;">年化收益率：</span>
            <el-select v-model="year_rate" @change="changeRate" clearable placeholder="请选择" size="small">
              <el-option v-for="item in rate_data" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :xs="7" :sm="7" :md="7" :lg="7">
            <span style="padding-left: 5px;padding-right: 5px;">最大回撤：</span>
            <el-select v-model="retrace_value" @change="changeRetrace" clearable placeholder="请选择" size="small">
              <el-option v-for="item in retrace_data" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :xs="10" :sm="10" :md="10" :lg="10">
          <span style="padding-left: 5px;padding-right: 5px;">是否优选
            <el-tooltip placement="top-end" effect="light">
              <div slot="content">优选规则: <br/>
                <span style="padding-left: 10px">1、申购赎回费率相对较低</span><br/>
                <span style="padding-left: 10px">2、指数型基金</span><br/>
                <span style="padding-left: 10px">3、非指数型基金要求成立2年以上、历史年化收益率30%以上</span><br/>
              </div>
              <sup style="background-color: #b3d8ff;border-radius: 30px;color: white;">&nbsp;?&nbsp;</sup>
            </el-tooltip>
            ：
          </span>
            <el-select v-model="element_value" @change="changeElement" clearable placeholder="请选择" size="small">
              <el-option
                v-for="item in element_data" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </div>
      </el-row>

      <el-row>
        <div style="margin: 20px 0px">
          <el-col :xs="19" :sm="19" :md="19" :lg="19">
            <span style="font-size: 22px">总数量：{{sum}}支</span>
          </el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5">
            <el-badge :value="selectedData.length" class="item">
              <el-button type="primary" class="choice_button" plain @click="dialogTableVisible = true">
                已关注
                <i class="el-icon-goods el-icon--right"></i>
              </el-button>
            </el-badge>
          </el-col>

        </div>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div id="invest_choose_data">
            <el-table :data="tableData" @sort-change="sortableChange" style="width: 100%">
              <el-table-column prop="code" label="代码" sortable width="80" align="center">
                <template slot-scope="scope">
                  <a :href="'/#/p/fund/' + scope.row.code" target="_blank">{{scope.row.code}}</a>
                </template>
              </el-table-column>
              <el-table-column label="基金名称" prop="name" sortable min-width="120">
                <template slot-scope="scope">
                  {{scope.row.name}}
                  <el-tag size="mini" v-if="scope.row.is_preferred">优选</el-tag>

                </template>
              </el-table-column>
              <el-table-column prop="setup_date" width="100" sortable label="成立日期"></el-table-column>
              <el-table-column prop="income_rate_for_year" width="120" sortable label="年均收益率" align="center"></el-table-column>
              <el-table-column prop="max_retrace" width="140" sortable label="年均最大回撤" align="center"></el-table-column>
              <el-table-column prop="purchase_rate" width="100" sortable label="申购费率" align="center"></el-table-column>
              <el-table-column prop="return_rate" width="100" sortable label="赎回费率" align="center"></el-table-column>
              <el-table-column prop="manager" width="120" sortable label="基金经理" align="center"></el-table-column>
              <el-table-column prop="tracking_target" width="120" label="跟踪标的"></el-table-column>
              <el-table-column label="操作" width="60" align="center">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="addFund(scope.row)" type="text" size="small">
                    关注
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style=" text-align: center;padding: 10px;">
            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                           :page-size="20" :total='num'>
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>


    <el-dialog title="已关注基金" class="choice_fund" :visible.sync="dialogTableVisible">
      <div>
        <el-table :data="selectedData" style="width: 100%">
          <el-table-column prop="code" label="代码" sortable width="100" align="center">
            <template slot-scope="scope">
              <a :href="'/#/p/fund/' + scope.row.code" target="_blank">{{scope.row.code}}</a>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="name" sortable min-width="100">
            <template slot-scope="scope">
              {{scope.row.name}}
              <el-tag size="mini" v-if="scope.row.is_preferred">优选</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="setup_date" label="成立日期" sortable width="100"></el-table-column>
          <el-table-column prop="income_rate_for_year" width="80" sortable label="年均收益率" align="center"></el-table-column>
          <el-table-column prop="max_retrace" width="80" sortable label="年均最大回撤" align="center"></el-table-column>
          <el-table-column prop="purchase_rate" width="80" sortable label="申购费率" align="center"></el-table-column>
          <el-table-column prop="return_rate" width="80" sortable label="赎回费率" align="center"></el-table-column>
          <el-table-column prop="manager" width="100" sortable label="基金经理" align="center"></el-table-column>
          <el-table-column prop="tracking_target" width="100" label="跟踪标的"></el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button @click.native.prevent="removeFund(scope.$index, selectedData)" type="text" size="small">
                取消关注
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-row class="sin_data">
    </el-row>
  </div>


</template>

<script type="es6">
  import {getInvestData} from '@/api/fund';

  export default {
    data() {
      return {
        dialogTableVisible: false,
        min_income_rate_for_year: null,
        max_max_retrace: null,
        is_preferred: null,
        selected_code: null,
        order_by: null,
        is_reverse: null,
        page: null,
        limit: 20,
        num: 0,
        selectedNum: 0,
        pagesize: 20,//选择的数据分页用
        currentPage: 1,//选择的数据分页用
        rate_data: [
          {value: 20, label: '年化收益率在20%以上'},
          {value: 15, label: '年化收益率15%以上'},
          {value: 10, label: '年化收益率10%以上'}
          ],
        year_rate: '',
        retrace_data: [
          {value: 30, label: '最大回撤在30%以内'},
          {value: 20, label: '最大回撤在20%以内'},
          {value: 15, label: '最大回撤在15%以内'},
          {value: 10, label: '最大回撤在10%以内'},
        ],
        retrace_value: "",
        element_data: [
          {value: 'true', label: '是'},
          {value: 'false', label: '否'}
        ],
        element_value: "",
        tableData: [],
        sum: "",
        selectedData: [],
      }
    },
    mounted() {
      this.page = 0;
      this.getInvestData();
    },
    methods: {
       getInvestData() {
        getInvestData(this.min_income_rate_for_year, this.max_max_retrace, this.is_preferred, this.selected_code,
          this.order_by, this.is_reverse, this.page, this.limit).then(response => {
          let temp = response['data'];
          this.num = response['num'];
          this.tableData = [];
          for (let val of temp) {
            this.tableData.push({
              'name': val['name'], 'code': val['code'], 'setup_date': val['setup_date'],
              'income_rate_for_year': val['income_rate_for_year'], 'max_retrace': val['max_retrace'],
              'purchase_rate': val['purchase_rate'], 'return_rate': val['return_rate'], 'manager': val['manager'],
              'is_preferred': val['is_preferred'], 'tracking_target': val['tracking_target']
            })
          }
          this.sum = response['num'];
        })
      },
      //初始分页功能
      handleCurrentChange(val) {
        this.page = val - 1;
        this.getInvestData();

      },
      //选出的基金分页功能
      handleSelectedChange(val) {
        this.currentPage = val;
      },
      // sortableChange 请求排序
      sortableChange(event) {
        this.order_by = event.prop;
        if (event.order === 'descending') {
          this.is_reverse = true
        } else {
          this.is_reverse = false
        }
        this.getInvestData()
      },
      //按最收益率筛选
      changeRate(val) {
        this.min_income_rate_for_year = val;
        this.getInvestData()
      },
      //按回撤筛选
      changeRetrace(val) {
        this.max_max_retrace = val;
        this.getInvestData()

      },
      //是否优选
      changeElement(val) {
        this.is_preferred = val;
        this.getInvestData()
      },
      //添加选出的基金
      addFund(val) {
        // 先判断是否已被选进来
        if (this.selectedData.indexOf(val) === -1){
          let temp = [];
          this.selectedData.push(val);
          this.selectedNum = this.selectedData.length;
          for (let sel of this.selectedData) {
            temp.push(sel['code'])
          }
          this.selected_code = temp.join();
          this.getInvestData();
        }
      },
      removeFund(index, val) {
        let temp = [];
        val.splice(index, 1);
        this.selectedData = val
        for (let sel of this.selectedData) {
          temp.push(sel['code'])
        }
        this.selected_code = temp.join();
        this.getInvestData();
      }
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

  .choice_button {
    margin-left: 120px;
    margin-top: -5px;
  }

</style>



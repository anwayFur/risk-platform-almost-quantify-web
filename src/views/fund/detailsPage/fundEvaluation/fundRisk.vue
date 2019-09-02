<template>
  <div>
    <div class="stock_info">

      <div class="">
        <div>
          <el-row class="sin_data">
            <el-col :xs="12" :sm="12" :md="12" :lg="12">
              <div class="riskTitle">在所有基金中的风险等级</div>
              <div class="elTextPosition">
                <el-tag size="small" class="tagTextPosition miniRisk" :class="{riskText:riskAll===0}">低</el-tag>
                <el-tag size="small" class="tagTextPosition lowRisk" :class="{riskText:riskAll===1}">中低</el-tag>
                <el-tag size="small" class="tagTextPosition midRisk " :class="{riskText:riskAll===2}">中</el-tag>
                <el-tag size="small" class="tagTextPosition richRisk" :class="{riskText:riskAll===3}">中高</el-tag>
                <el-tag size="small" class="tagTextPosition highRisk" :class="{riskText:riskAll===4}">高</el-tag>
              </div>
              <div>
                <span class='fundRiskPer' :class="{riskArrow:riskAll===0}">&nbsp;</span>
                <span class='fundRiskPer' :class="{riskArrow:riskAll===1}">&nbsp;</span>
                <span class='fundRiskPer' :class="{riskArrow:riskAll===2}">&nbsp;</span>
                <span class='fundRiskPer' :class="{riskArrow:riskAll===3}">&nbsp;</span>
                <span class='fundRiskPer' :class="{riskArrow:riskAll===4}">&nbsp;</span>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12">
              <div class="riskTitle">在同类基金中的风险等级</div>
              <div class="elTextPosition">
                <el-tag size="small" class="tagTextPosition miniRisk" :class="{riskText:riskSimillar===0}">低</el-tag>
                <el-tag size="small" class="tagTextPosition lowRisk" :class="{riskText:riskSimillar===1}">中低</el-tag>
                <el-tag size="small" class="tagTextPosition midRisk" :class="{riskText:riskSimillar===2}">中</el-tag>
                <el-tag size="small" class="tagTextPosition richRisk" :class="{riskText:riskSimillar===3}">中高</el-tag>
                <el-tag size="small" class="tagTextPosition highRisk" :class="{riskText:riskSimillar===4}">高</el-tag>
              </div>
              <div>
                <span class='fundRiskPer' :class="{riskArrow:riskSimillar===0}">&nbsp;</span>
                <span class='fundRiskPer' :class="{riskArrow:riskSimillar===1}">&nbsp;</span>
                <span class='fundRiskPer' :class="{riskArrow:riskSimillar===2}">&nbsp;</span>
                <span class='fundRiskPer' :class="{riskArrow:riskSimillar===3}">&nbsp;</span>
                <span class='fundRiskPer' :class="{riskArrow:riskSimillar===4}">&nbsp;</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="sin_data">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="riskInfoPer">
                <el-table
                  :data="tableData"
                  style="width:100%;padding-left: 0">
                  <el-table-column
                    prop="index"
                    label="风险评价指标"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="one"
                    label="近1年"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="two"
                    label="近2年"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="three"
                    label="近3年"
                    width="200"
                  >
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
          <el-row class="sin_data">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div style="padding-bottom: 15px">
                <span>标准差：反映基金收益率的波动程度。标准差越小，基金的历史阶段收益越稳定。</span>
                <br>
              </div>

              <div style="padding-bottom: 15px">
                <span>夏普比率：反映基金承担单位风险，所能获得的超过无风险收益的超额收益。夏普比率越大，基金的历史阶段绩效表现越佳。</span>
                <br>
              </div>

              <div style="padding-bottom: 15px">
                <span>信息比率：表示单位主动风险所带来的超额收益，比率高说明超额收益高。</span>
              </div>

            </el-col>
          </el-row>
        </div>
      </div>


    </div>
  </div>
</template>


<script type="es6">

  import {getRiskData} from '@/api/fund'

  export default {
    name: 'fundRisk',

    data() {
      return {
        code: "",
        tableData: [],
        riskAll: '',
        riskSimillar: ''
      }
    },
    mounted() {
      this.code = this.$route.params.code;
      this.getRiskData();
    },

    methods: {
      getRiskData() {
        getRiskData(this.code).then(response => {
          let temprisk = response['risk_indicators'];
          let key1 = Object.keys(temprisk)[0], key2 = Object.keys(temprisk)[1];
          let tableRow1 = {
            'index': key1,
            'one': temprisk[key1][0],
            'two': temprisk[key1][1],
            'three': temprisk[key1][2]
          };
          let tableRow2 = {
            'index': key2,
            'one': temprisk[key2][0],
            'two': temprisk[key2][1],
            'three': temprisk[key2][2]
          };
          this.tableData.push(tableRow1);
          this.tableData.push(tableRow2);
          this.riskAll = response['risk_level']['all'];
          this.riskSimillar = response['risk_level']['similar'];


        })
      }
    }

  }
</script>

<style type="text/css" lang="scss" scoped>
  .riskTitle {
    margin-bottom: 20px;
    text-indent: 60px;
    font-weight: bold;
  }

  .elTextPosition .tagTextPosition {
    width: 60px;
    text-align: center;
    color: white;
  }

  .miniRisk {
    background: #ffcc00;
  }

  .lowRisk {
    background: #ffaa00
  }

  .midRisk {
    background: #ff7700
  }

  .richRisk {
    background: #ff6600
  }

  .highRisk {
    background: #ff0000
  }

  .fundRiskPer {
    display: inline-block;
    width: 60px;
    text-align: center;
  }

  .riskArrow {
    background: url("../../../../assets/searchInfo/stock/fundrisk.png") no-repeat transparent center;
  }

  .riskText {
    font-weight: bold;
  }

  .tab_style {
    min-height: 300px;
  }

  .tip_title {
    background: url("../../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
  }

  .stock_info {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 10px;

    .sin_middle_right {
      padding-top: 30px;
      padding-bottom: 10px;
      text-align: right;
    }

    .sin_data {
      padding-top: 10px;
      padding-bottom: 10px;
      text-align: left;

    }

  }


</style>

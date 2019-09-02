<template>
  <!--展示报告的窗口-->
  <el-dialog :visible.sync="dialogVisible" style="padding-top: 50px">
    <div style="width:90%;margin: auto">
      <el-row>
        <h2 style="text-indent:2em">《复盘后13个跌停，四家基金又下调》</h2>
      </el-row>
      <el-row class="sin_data">
        <el-col :span="24">
          <div><span>link:</span><a style="font-size: 20px">baidu.com</a></div>
        </el-col>
      </el-row>
      <el-row class="sin_data">
        <el-col :span="24">
          <div><span>日期:2011</span></div>
        </el-col>
      </el-row>
      <el-row class="sin_data">
        <el-col :span="24">
          <div><span>目标价:55</span></div>
        </el-col>
      </el-row>

    </div>
  </el-dialog>
  <!--展示报告的窗口-->
</template>


<script type="es6">



  export default {
    name: 'fundMarket',
    data(){
        return{
          reportContent:"",
          dialogVisible:false
        }
    },
    components: {

    },
  methods:{
      showMarketContent: function (id) {
      this.dialogVisible=true;

     }
    }
  }
</script>

<style lang="scss" scoped>
  .pagination {
    text-align: center
  }

  .tab_style {
    min-height: 300px;
  }

  .tip_title {
    background: url("../../../../assets/searchInfo/stock/tip_bg.png") no-repeat transparent;
    height: 41px;
    overflow: hidden;
    padding: 11px 0 42px 40px;
    font-size: 18px;
    color: #80b1ff;
    margin-left: -10px;
    margin-right: -10px;
  }

  .stock_info {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 10px;

    .row_style {
      padding-bottom: 10px;
      padding-top: 10px;
    }

    .col_style {
      text-align: left;
    }

    .sin_middle_right {
      padding-top: 30px;
      padding-bottom: 10px;
      text-align: right;
    }

    .sin_data {
      padding-top: 10px;
      padding-bottom: 10px;
      text-align: left;

      div {
        padding-left: 25px;
      }
    }

  }

</style>

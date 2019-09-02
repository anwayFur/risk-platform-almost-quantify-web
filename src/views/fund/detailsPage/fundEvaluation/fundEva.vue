<template>
  <div>
    <div class="stock_info">

      <div class="border_div">
        <div class="">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基金收益率" name="first">
              <fund-yield></fund-yield>
            </el-tab-pane>

            <el-tab-pane label="基金风险" name="third">
            <fund-risk></fund-risk>
            </el-tab-pane>
            <el-tab-pane label="基金分红" name="second"  >
              <fund-dividend ref="fundDividend"  ></fund-dividend>
            </el-tab-pane>


          </el-tabs>
        </div>
      </div>


    </div>
  </div>
</template>


<script type="es6">
  import fundYield from './fundYield.vue'
  import fundDividend from './fundDividend.vue'
  import fundRisk from './fundRisk.vue'
  export default {
    name: 'fundEva',
    components: {
      fundYield,
      fundDividend,
      fundRisk
    },
    data(){
      return {
        activeName: "first",
        switchDividend:true

      }
    },
    mounted(){

    },
    computed:{

    },
    methods: {
      handleClick(tab, event) {

        /*console.log(tab, event);*/
      },
      getFromChild(msg){

        this.switchDividend=msg;
      }
    }

  }
</script>

<style type="text/css" lang="scss" scoped>

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

      div {
        padding-left: 10px;
        padding-right: 10px;
      }
    }

  }




</style>

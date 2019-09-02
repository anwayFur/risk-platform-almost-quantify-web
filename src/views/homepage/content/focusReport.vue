<template>
  <div class="row_table">
    <el-table :data="tableDatas" style="width: 100%" max-height="380" class="tab_row">
      <el-table-column prop="report_date" label="日期" width="100"></el-table-column>
      <el-table-column prop="code" label="代码/名称" width="140">
        <template slot-scope="scope">
          <a :href="'/#/p/stock/' + scope.row.code" target="_blank">
            {{scope.row.name}}({{scope.row.code}})
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="100"></el-table-column>
      <el-table-column prop="change" label="变动" width="60"></el-table-column>
      <el-table-column prop="rate" label="等级" width="60"></el-table-column>
      <el-table-column prop="posi_per" label="正面值" align="center" width="79">
        <template slot-scope="scope">
          <span v-if="scope.row.posi_per === 100" style="color: red">{{scope.row.posi_per}}</span>
          <span v-else-if="scope.row.posi_per <= 15" style="color: green">{{scope.row.posi_per}}</span>
          <span v-else>{{scope.row.posi_per}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="main_tip">
      <div style="text-align: right;padding-top: 12px;margin-right: 25px">
        <router-link :to="'stocks/focusReport'" style="font-size: 12px;">
          更多重点研报 >>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import { getFocusReportList } from '@/api/homePage'

  export default {
    name: 'FocusReport',
    data() {
      return {
        tableDatas:[],
      }
    },
    mounted() {
      // 请求默认数据
      this.getList();
    },
    methods: {
      // 发送请求数据
      getList() {
        getFocusReportList().then(response => {
          if(response) {
            for (let i = 0; i < response.length; i++) {
              this.tableDatas.push(
                {
                  id: response[i]['id'],
                  change: response[i]['change'],
                  code: response[i]['code'],
                  name: response[i]['name'],
                  org_name: response[i]['org_name'],
                  posi_per: parseFloat(response[i]['posi_per']),
                  rate: response[i]['rate'],
                  report_date: response[i]['report_date'],
                  title: response[i]['title'],
                  target_price_min: response[i]['target_price_min']?response[i]['target_price_min']:'- -',
                  target_price_max: response[i]['target_price_max']?response[i]['target_price_max']:'- -',
                  keywords: this.showKeyWords(response[i]['keywords'])
                })
            }
          }
        })
      },
      showKeyWords: function (keywords) {
        let key = [];
        for(let i = 0; i < keywords.length; i++){
          if(keywords[i][0] === "减持"){
            key.push("减持");
            keywords.splice(i,1);
            break;
          }
        }
        if(key.length > 0){
          length = keywords.length > 2 ? 2 : keywords.length;
        } else {
          length = keywords.length > 3 ? 3 : keywords.length;
        }

        for (let i = 0; i < length; i++) {
          key.push(keywords[i][0]);
        }
        return key;
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

  .report_tab {
    max-height: 360px;
  }


</style>

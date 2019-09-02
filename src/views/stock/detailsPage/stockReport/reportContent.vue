<template>
  <!--展示报告的窗口-->
  <el-dialog class="dialog_style" :visible.sync="dialogVisible" style="padding-top: 50px" append-to-body>
    <div style="width:90%;margin: auto">
      <el-row>
        <h2 style="text-indent: 1.25em;">{{reportContent.title}}</h2>
      </el-row>
      <el-row class="sin_data">
        <el-col :span="24">
          <p style="text-indent: 2em;">
            日期：{{reportContent.date}}&nbsp;&nbsp;&nbsp
            证券机构：{{reportContent.org}}&nbsp;&nbsp;&nbsp
            类型：{{reportContent.type}}&nbsp;&nbsp;&nbsp
            变化：{{reportContent.change}}&nbsp;&nbsp;&nbsp
            比率：{{reportContent.rate}}
          </p>
        </el-col>
      </el-row>
      <el-row class="sin_data">
        <div style="width: 820px;" v-html="reportContent.text"></div>
      </el-row>
    </div>
  </el-dialog>
  <!--展示报告的窗口-->
</template>


<script type="es6">
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import {  getReportContent } from '@/api/stock'

  export default {
    name: 'reportContentDialog',
    data(){
        return{
          reportContent:"",
          dialogVisible:false
        }
    },
    components: {
      ElCol,
      ElRow,
    },
  methods:{
    showReportContent: function (id) {
     getReportContent(id).then(response => {
         if (response) {
           response.text = response.text.replace('<p style="text-indent: 2em">', '').replace('</p>', '')
           let text = '<p class="p_report">' + response.text + '</p>'
           text = text.replace(/[\n\r]+/g,'</p><p class="p_report">')
           text = text.replace(/\s+/g, ' ')
           response.text = text
          this.reportContent=response;
          this.dialogVisible = true
        }
      }
    )
  }}
  }
</script>

<style lang="scss" scoped>



</style>

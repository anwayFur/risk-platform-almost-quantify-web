<template>
  <!--展示报告的窗口-->
  <el-dialog class="dialog_style" :visible.sync="dialogVisible" style="padding-top: 50px" append-to-body>
    <div style="width:90%;margin: auto">
      <el-row>
        <h2 style="text-indent: 1.25em">{{noticeContent.title}}</h2>
      </el-row>
      <el-row class="sin_data">
        <el-col :span="24">
          <p style="text-indent: 2em">
            日期：{{noticeContent.date}}&nbsp;&nbsp;&nbsp
          </p>
        </el-col>
      </el-row>
      <el-row class="sin_data">
        <el-col :span="24" style="width: 820px;" v-html="noticeContent.text">
        </el-col>
      <!--  <el-col :span="24"  >
          <p v-html="noticeContent.text" ></p>
          <el-table :data="reportContent"   max-height="500"    style="width: 100%">
            <el-table-column fixed property="report"  >
              <template slot-scope="scope">
                <p v-html="scope.row.report" ></p>
              </template>
            </el-table-column>
          </el-table>

        </el-col>-->
      </el-row>
    </div>
  </el-dialog>
  <!--展示报告的窗口-->
</template>


<script type="es6">
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import { getNotice,getNoticeContent} from '@/api/stock'

  export default {
    name: 'noticeContentDialog',
   data(){
        return{
          dialogVisible:false,
          noticeContent:"",
          reportContent:""
        }
   },
    components: {

      ElCol,
      ElRow,
    },
    methods:{
      showNoticeContentDialog: function (id) {
        getNoticeContent(id).then(response => {
            if (response) {
              let text = '<p class="p_sty_notice">' + response.text + '</p>'
              text=text.replace(/(<br>)+/g,'</p><p class="p_sty_notice">')
              text = text.replace(/[\n\r]+/g,'</p><p class="p_report">')
              text = text.replace(/\s+/g, ' ')
              response.text = text
              this.noticeContent = response;
              this.dialogVisible = true;
              this.reportContent=[{report:this.noticeContent.text}]
            }
          }
        )
      }
    }

  }
</script>

<style lang="scss" scoped>



</style>

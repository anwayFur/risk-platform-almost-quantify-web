<template>
  <!--展示报告的窗口-->
  <el-dialog class="dialog_style" :visible.sync="newsVisible" style="padding-top: 50px" append-to-body>
    <div style="width:90%;margin: auto">
      <el-row>
        <h2 style="text-indent:1.25em">{{newsContent.title}}</h2>
      </el-row>
      <el-row class="sin_data">
        <el-col :span="24">
          <p style="text-indent: 2em">
            日期：{{newsContent.date}}&nbsp;&nbsp;&nbsp
            媒体名称：{{newsContent.media_name}}&nbsp;&nbsp;&nbsp
            正负面：{{newsContent.posi_per}}&nbsp;&nbsp;&nbsp
          </p>
        </el-col>
      </el-row>
      <el-row class="sin_data">
        <el-col :span="24" style="width: 820px;" v-html="newsContent.text">
        </el-col>
      </el-row>
    </div>
  </el-dialog>
  <!--展示报告的窗口-->
</template>


<script type="es6">
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import { getNews,getNewsContent} from '@/api/stock'

  export default {
    name: 'newsContentDialog',
    data(){
        return {
          newsContent: '',
          newsVisible: false
        }
    },
    components: {
      ElCol,
      ElRow,
    },
    methods:{
      showNewsContentDialog: function (id) {
        getNewsContent(id).then(response => {
            if (response) {
              let text = '<p class="p_sty_new">' + response.text + '</p>'
              text=text.replace(/(<br>)+/g,'</p><p class="p_sty_new">')
              response.text = text
              this.newsContent = response;
              this.newsVisible = true;
            }
          }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>

  .p_sty_new {
    text-indent: 2em;
  }

</style>

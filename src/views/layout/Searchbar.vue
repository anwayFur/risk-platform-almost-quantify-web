<template>
  <div :class=searchClass>
    <el-autocomplete
      :popper-class=dropDownListClass
      :class=autocompleteClass
      v-model="queryText"
      :fetch-suggestions="handleFetch"
      :trigger-on-focus="false"
      placeholder="输入股票/基金，支持代码、首拼..."
      :select-when-unmatched="true"
      @select="handleSelect"
    >

      <i
        class="el-icon-search el-input__icon"
        slot="suffix">
      </i>

      <template slot-scope="props" id="scope" :showPopper="closeTest">
        <div v-if="props.item.type === 'NoData'" aria-disabled="true" class="noData_style">
          <a class="">没有检索到对应的数据，请重新输入！</a>
        </div>
        <div v-else-if="props.item.type === 'dividingLine'" class="type_style">
          <a class="a_on" href="">{{ props.item.name }}</a>
        </div>
        <div class="data_style" v-else>
          {{ props.item.code }} > <span class="name">{{ props.item.name }}</span>
        </div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script type="es6">
  import {querySearch} from '@/api/search'

  export default {
    name: 'search',
    data() {
      return {
        queryResult: [],  // 查询结果
        queriedKey: '',   // 当前查询结果是用那个关键词检索的
        queryText: '',    // 绑定要搜索框，当前要检索的数据
        firstItem: null,
        closeTest: false
      }
    },
    props: {
      searchType: ''
    },
    computed: {
      searchClass() {
        return this.searchType + '-search-style'
      },
      autocompleteClass() {
        return this.searchType + '-style'
      },
      dropDownListClass() {
        return this.searchType + '-drop-down-list-style'
      }
    },
    methods: {
      // 返回输入建议的方法属性
      handleFetch(queryString, cb) {
        // 如果输入不符合要求，则不进行下面的操作
        // 要求：包含一个汉字 或者2个以上的字符和数字
        const reg = new RegExp('[\\u4E00-\\u9FFF]+|[A-Z|a-z|0-9]{2,}', 'g');
        const regRes = reg.test(queryString);
        if (regRes) {
          // 如果没有查询过 或者输入的词中不包含上次查询的关键词 即当前输入的值不是在上次结果上添加字符组成的
          if (this.queriedKey === '' || this.queryText.indexOf(this.queriedKey) === -1) {
            // 从服务器请求数据
            querySearch(queryString).then(response => {
              if (response) {
                this.queriedKey = queryString;       // 请求的字符串
                this.queryResult = response.lists;   // 返回的结果
                this.showResult(queryString, cb)    // 显示结果
              }
            })
          } else {
            // 如果不要请求数据 直接展示结果
            this.showResult(queryString, cb)
          }
        }
      },

      // 显示搜索到的结果
      showResult(queryString, cb) {
        // 从queryResult 过滤出别名里面有 queryString 的记录
        let result = this.queryResult.filter((record) => {
          return (record.alias.indexOf(queryString) !== -1)
        });

        // 如果过滤出来的记录条数大于0 显示数据
        if (result.length > 0) {
          // 将结果数组进行排序 先按类型进行，如果类型一样按照code
          result.sort((a, b) => {
            if (a.type === b.type) {
              return Number(a.code) - Number(b.code)
            }
            else if (a.type > b.type) {
              return 1
            }
            else {
              return -1
            }
          });

          // 检索出所有的类型 和类型开始的索引位置 不是开始位置的删除掉type属性
          let type_array = [];
          let type_index = [];
          for (let i = 0; i < result.length; i++) {
            if (type_array.indexOf(result[i].type) === -1) {
              type_array.push(result[i].type);
              type_index.push(i)
            }
          }

          const type_dic = {'stock': '股 票', 'indices': '指 数', 'fund': '基 金'};

          // 在返回数组中 插入分割线元素
          for (let i = 0; i < type_array.length; i++) {
            result.splice(i + type_index[i], 0, {type: 'dividingLine', name: type_dic[type_array[i]]})
          }

        } else {
          // 显示没有数据
          result = [{'type': 'NoData'}] // 必须给回掉的函数返回一个有一条记录的数组
        }

        // 第一个选项 默认回车时 跳转
        if (result.length >= 2) {
          this.firstItem = result[1]
        }

        // 调用 callback 返回建议列表的数据
        cb(result)
      },
      // 点击选中建议时触发
      handleSelect(item) {
        // 在没有选中的情况下 按下回车键时 item 传来的是 {value: 文本框内所输入的值}
        if (item.value !== undefined) {
          if (this.firstItem !== null) {
            this.queryText = '';
            this.$router.push('/p/' + this.firstItem.type + '/' + this.firstItem.code)
          }
        }
        else if (item.type !== 'dividingLine' && item.type !== 'NoData') {
          // 跳转页面
          this.$router.push('/p/' + item.type + '/' + item.code)
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .navbar-search-style {
    height: 80px;
    width: 100%;

    .navbar-style {
      width: 100%;
    }
  }

  .noData_style {
    height: 30px;
    padding-top: 3px;
    padding-left: 10px;
    margin: -6px;
    font-size: 14px;
    background-color: white;
    pointer-events: none;
  }

  .type_style {
    height: 30px;
    //padding-top: 3px;
    padding-left: 10px;
    margin: -6px;

    border-bottom: 1px solid blue;
    background-color: white;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .a_on {
    pointer-events: none;
    font-size: 16px;
    font-weight: bolder;
  }

  template div {
    pointer-events: none;
  }

  /*.el-autocomplete-suggestion li {*/
  /*cursor: none !important;*/
  /*}*/

  .data_style {
    height: 30px;
    padding-top: 5px;
    padding-left: 10px;
    font-size: 14px;
    margin: -5px;
    cursor: pointer;
  }

  .navbar-drop-down-list-style {
    /*.el-scrollbar{*/
    /*width: 600px;*/
    /*}*/
    li {
      line-height: normal;
      padding: 6px;

      .code {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .name {
        font-size: 14px;
        color: #898989;
        padding-left: 3px;
      }

      .highlighted .name {
        color: #b0b0b0;
      }
    }
  }

  .homepage-search-style {
    height: 87px;
    width: 100%;
    text-align: center;

    .homepage-style {
      width: 80%;
    }

    .el-input__inner {
      height: 50px;
      border: 2px solid #ff7400;
    }

  }

  .homepage-drop-down-list-style {
    .el-scrollbar {
      width: 100%;
    }
    li {
      line-height: normal;
      padding: 6px;

      .code {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .name {
        font-size: 14px;
        color: #898989;
        padding-left: 3px;
      }

      .highlighted .name {
        color: #b0b0b0;
      }
    }
  }

  .homepage-text-style {
    font-size: 18px;
    text-align: left;
    color: #69aaff;
    padding-bottom: 10px;
    padding-left: 10%;
  }

  .navbar-text-style {
    line-height: 0;
    font-size: 0;
    overflow: hidden;
  }
</style>

<template>
  <div class="page-content">
    <div class="page-title">用户账号</div>
    <div class="search">
      <div class="select">
        <div class="title">状态 :</div>
        <el-select v-model="value" @change="selectStatus" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <div class="block select">
        <p class="title">创建时间 :</p>
        <el-date-picker
          v-model="time"
          type="daterange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="selectTime"
        ></el-date-picker>
      </div>

      <div class="select">
        <el-input
          placeholder="请输入姓名/用户名/手机"
          v-model="key"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search()"
          ></el-button>
        </el-input>
      </div>

      <div class="select addBtn">
        <el-button type="primary" @click="addAndEdit('add')"
          >添加账号</el-button
        >
      </div>
    </div>
    <p>步骤条</p>
    <common-step :stepList="stepList"></common-step>

    <p>进度条</p>
    <common-progress :dataList="processList"></common-progress>

    <p>进度图表</p>
    <gradient-progress :data="gradientData"></gradient-progress>
    <p>css-横向无缝滚动</p>
    <seamless-scrolling></seamless-scrolling>

    <p> 无缝滚动——vue-seamless-scroll </p>
    <vueSeamlessScroll
          :data="xDataList"
          :class-option="defaultOption"
          class="seamless-warp"
        >
        <div class="slider-x-wrap2">
      <ul class="slider-x">
       <li :key="index" v-for="(item,index) in xDataList"  class="slider-x-item">
          {{item.name}}{{index+1}}
       </li>
      </ul>
    </div>
      </vueSeamlessScroll>

    <hr>
    <el-table :data="tableData" style="100%" :span-method="objectSpanMethod" :header-cell-style="headerMerge">
      <el-table-column prop="id" label="用水类型" width="200" align="left"></el-table-column>
      <el-table-column prop="name" label="姓名" width="350"></el-table-column>
      <el-table-column
        prop="amount2"
        label="价格"
        width="150"
      ></el-table-column>
    </el-table>

    <el-table :data="tableData1" :span-method="objectGasSpanMethod">
      <el-table-column prop="id" label="气量" width="300" align="left"></el-table-column>
      <el-table-column prop="name" label="价格" width="350"></el-table-column>
    </el-table>

    <el-table
      :data="listData"
      :span-method="objectSpanMethodNew"
      border
      class="tableArea"
      style="width: 40%;"
    >
      <el-table-column label="商品类别" prop="productType" align="center" width="200"></el-table-column>
      <el-table-column label="商品数量" prop="productTypeSecond" align="center"></el-table-column>
      <el-table-column label="商品价格" prop="amount" align="center"></el-table-column>
      <el-table-column label="商品名称" prop="productName" width="200px" align="center"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center"></el-table-column>
    </el-table>
    <!-- 表单对话框 -->
    <el-dialog :title="titleName" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll';
import SeamlessScrolling from '@/components/common/seamlessScrolling.vue';
import tableJsonData from './tableData.json';// 引入本地数据
import CommonStep from '@/components/common/commonStep';
import CommonProgress from '@/components/common/commonProgress';
import GradientProgress from '@/components/common/bg-gradient/yellow-gradient';
import { tableList, listData, tableData2, tableData, tableData1 } from '@/components/common/tool.js';
export default {
  name: 'UserAccount',
  components: { vueSeamlessScroll, CommonStep, CommonProgress, GradientProgress, SeamlessScrolling },
  computed: {
    defaultOption () {
      return {
        step: 0.8,
        direction: 2, // 0向下 1向上 2向左 3向右
        // limitMoveNum: this.dataList.length,// 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true,
        openTouch: false
      };
    }
  },
  data () {
    return {
      gradientData: {
        targetValue: 50,
        nowValue: 10,
        rate: '10%'
      },
      xDataList: [
        {
          name: '数据'
        },
        {
          name: '数据'
        },
        {
          name: '数据'
        },
        {
          name: '数据'
        },
        {
          name: '数据'
        }
      ],
      stepList: [
        {
          num: 1,
          desc: '填写申报材料',
          highlight: true
        },
        {
          num: 2,
          desc: '等待审核',
          highlight: false
        },
        {
          num: 3,
          desc: '具备领取资格',
          highlight: false
        }
      ],
      processList: [
        {
          name: '数据1',
          time: '2022-10-25'
        },
        {
          name: '数据2',
          time: ''
        },
        {
          name: '数据3',
          time: '2022-10-25'
        }
      ],
      dataList: [],
      value: '',
      key: '',
      time: '',
      status: '', // 状态
      startTime: '', // 创建时间 开始时间
      endTime: '', // 结束时间
      dialogFormVisible: false,
      titleName: '',
      formLabelWidth: '120px',
      tableData: tableData,
      tableData1: tableData1,
      tableData2: tableData2,
      options: [
        {
          value: '1',
          label: '停用'
        },
        {
          value: '2',
          label: '启用'
        }
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      list: tableList,
      listData: [],
      testArr1: [],
      testArr2: [],
      testArr3: [],
      testArrCols: [],
      testPosition1: 0,
      testPosition2: 0,
      testPosition3: 0,
      testPosition4: 0
    };
  },
  created () {
    this.tableList = tableJsonData;
    // this.createNewArr(this.list);
  },
  mounted () {
    this.queryData();
  },
  methods: {
    // 获取数据
    queryData () {
      this.listData = listData;

      this.rowspan(this.testArr1, this.testPosition1, 'productType');
      this.rowspan(this.testArr2, this.testPosition2, 'productTypeSecond');
      this.rowspan(this.testArr3, this.testPosition3, 'amount');
      this.colspan(this.testArrCols, this.testPosition4, 'productTypeSecond', 'amount');
    },
    /**
     * rowspan（）这个函数就是用来返回 spanArr 数组的，定义每一行的 rowspan

if( index === 0)，第一行，直接先给数组 push 进一个1，表示自己先占一行，position 是数组元素的位置
（此时是从数组元素的第一个开始，所以position 为 0）， position为 0 意思表示的就是数组的第一个元素。

当到了 index 为 2 的时候，if(this.listData[index][spanName] === this.listData[index-1][spanName])，
让第二行与第一行作比较：
（1）如果第二行与第一行相等的话，position 就 +1，当有 n 行第一行相同，position 就为 n，表示向下合并 n 行；
第二行自己就 spanArr.push(0)，表示第二行“消失”，因为第一行和第二行合并了；
（2）如果第二行与第一行不相等的话，那么 spanArr.push(1);就让第二行自己独占一行；

position = index ：把指针拿到 index 这行来，表示设置数组 spanArr[position] 的元素值，然后定义从此行开始向下合并几行
（可以根据示例研究下，当 index 为 2 时，position 为 2，当 index 为 3 时，第四行与第三行需要合并，
那么在数组的 position 元素就要 +1 了，也就是 spanArr[position] += 1）

:span-method="objectSpanMethod"

这个是官方给定的绑定属性和对应的方法，objectSpanMethod 传入了 { row, column, rowIndex, columnIndex }
row: 当前行
column: 当前列
rowIndex：当前行号
columnIndex ：当前列号

该函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表 colspan。
也可以返回一个键名为 rowspan 和 colspan 的对象。

const _col = _row > 0 ? 1 : 0;  定义的这个单元格列的合并，我们项目只合并行，不合并列；

_row：代表合并行的行数，_row 的值要么是 1，或者更大的自然正整数，要么是 0。
1代表：独占一行
更大的自然数：代表合并了若干行
0：代表“消失”的哪那一个单元格，后面的单元格向前推一格

     */
    rowspan (spanArr, position, spanName) {
      this.listData.forEach((item, index) => {
        if (index === 0) {
          spanArr.push(1);
          position = 0;
        } else {
          if (
            this.listData[index][spanName] ===
            this.listData[index - 1][spanName]
          ) {
            spanArr[position] += 1;
            spanArr.push(0);
          } else {
            spanArr.push(1);
            position = index;
          }
        }
      });
    },
    // 合并列
    colspan (spanArr, position, spanName, spanName1) {
      this.listData.forEach((item, index) => {
        if (index === 0) {
          spanArr.push(1);
          position = 0;
        } else {
          if (
            this.listData[index][spanName] ===
            this.listData[index][spanName1]
          ) {
            spanArr[index] = 2;
          } else {
            spanArr.push(1);
            position = index;
          }
        }
      });
    },
    // 表格合并行
    objectSpanMethodNew ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.testArr1[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 1) {
        const _row = this.testArr2[rowIndex];
        const _col = this.testArrCols[rowIndex] === 2 ? 2 : _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 2) {
        const _row = this.testArr3[rowIndex];
        const _col = this.testArrCols[rowIndex] === 2 ? 0 : _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    // 合并数组单元格
    createNewArr (data) {
      return data.reduce((result, item) => {
        // 首先将 oneTitle 字段作为新数组result取出
        if (result.indexOf(item.oneTitle) < 0) {
          result.push(item.oneTitle);
        }

        return result;
      }, []).reduce((result, name) => {
        // 将oneTitle相同的数据作为新数组取出，并在其内部添加新字段**rowSpan**
        const children = data.filter(item => item.oneTitle === name);
        result = result.concat(
          children.map((item, index) => ({
            ...item,
            rowSpan: index === 0 ? children.length : 0 // 将第一行数据添加rowSpan字段
          }))
        );
        return result;
      }, []);
    },
    hiddenHeaderRow ({ rowIndex }) {
      if (rowIndex === 1) { // 隐藏第二行
        return 'hiddenClass';
      }
    },
    arraySpanMethod2 ({ rowIndex, columnIndex }) {
      if (columnIndex === 0 && rowIndex <= 5) {
        if (rowIndex % 5 === 0) {
          return [5, 1];// 返回的是需要合并的行和列的数量，不是下标，是固定的
        } else {
          return [0, 0];
        }
      } else if (columnIndex === 1) {
        if (rowIndex % 2 === 0 && rowIndex <= 1) {
          return [2, 1];
        } else if (rowIndex % 2 === 0 && rowIndex >= 1 && rowIndex <= 4) {
          return [3, 1];
        } else {
          return [1, 0];
        }
      }
      /* if (rowIndex <= 1) {
        if (columnIndex % 3 === 1) {
          return [1, 2];// 返回的是需要合并的行和列的数量，不是下标，是固定的
        } else if (columnIndex % 3 === 2) {
          return [0, 0];
        }
      } */
    },
    // 表头处理合并
    headerMerge ({ row, column, rowIndex, columnIndex }) {
      // 合并表头两列为一列
      if (rowIndex === 0 && columnIndex === 1) {
        return { display: 'none' };
      }
      if (rowIndex === 0 && columnIndex === 0) {
        this.$nextTick(() => {
          if (document.getElementsByClassName(column.id).length !== 0) {
            document
              .getElementsByClassName(column.id)[0]
              .setAttribute('colspan', 2);
            return false;
          }
        });
        return column;
      }
    },
    // 表体合并
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex !== 3 && rowIndex !== 4 && columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return [3, 1];
        } else {
          return [0, 0];
        }
      }
      if (rowIndex === 3 || rowIndex === 4) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    objectGasSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 4 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    addAndEdit (type) {
      this.dialogFormVisible = true;
      this.titleName = type === 'add' ? '添加账号' : '编辑账号';
    },
    // 状态筛选
    selectStatus (type) {
      this.status = type;
    },
    // 时间筛选
    selectTime (data) {
      this.startTime = data[0];
      this.endTime = data[1];
    },
    // 点击筛选按钮
    search () {
      console.log(this.key);
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  display: flex;
  margin-bottom: 10px;
  position: relative;
}

.select {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.addBtn {
  text-align: right;
  position: absolute;
  top: -45px;
  right: 20px;
}

.el-dialog__wrapper .el-dialog {
  width: 420px !important;
}

.el-input {
  width: 217px;
}
/deep/.el-table {
  border:0;margin:0;border-collapse:collapse;
  .is-left {
    text-align: left;
  }
}
/deep/.hiddenClass{
  display: none!important;;
}

.slider-x-wrap2{
    width: 500px;
    overflow: hidden;
    margin: 20px 0;
    .slider-x {
        width: fit-content;
        display: flex;
        &-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            background-color:rgba(15,36,57,.9);
            margin: 0 10px;
            padding: 10px;
            color: #fff;
        }
    }
}
</style>

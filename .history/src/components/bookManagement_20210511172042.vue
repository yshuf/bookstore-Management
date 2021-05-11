<template>
  <div>
    <div class="countNum">
      <div class="count_item" v-for="(item,index) in options" :key="index">
        <div>{{item.label}}</div>
        <div>
          <span class="num">{{item.value}}</span>
          <span class="unit">本</span>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="page-title">书籍管理</div>
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

        <div class="select">
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
          <el-input placeholder="请输入书籍名称/书籍编号/作者" v-model="key" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
          </el-input>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="100"></el-table-column>
        <el-table-column prop="code" label="编号" width="150"></el-table-column>
        <el-table-column prop="name" label="书籍名称" width="150"></el-table-column>
        <el-table-column prop="auth" label="作者" width="200"></el-table-column>
        <el-table-column prop="press" label="出版社" width="200"></el-table-column>
        <el-table-column prop="price" label="书籍价格（元）" width="100"></el-table-column>
        <el-table-column prop="num" label="现存数量" width="100"></el-table-column>
        <el-table-column prop="type" label="类别" width="200"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column prop="date" label="入库时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
           <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="100"
        ></el-pagination>
      </div>
    </div>
  </div>
  <!-- </div>
  </div>-->
</template>

<script>
export default {
  name: 'BookManagement',
  data () {
    return {
      visible: false,
      value: '',
      time: '',
      key: '',
      currentPage: 6,
      options: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '上架'
        },
        {
          value: '2',
          label: '下架'
        }
      ],
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          code: '123456',
          name: '恶意',
          press: '清华大学出版社',
          price: '39',
          auth: 'zhengce',
          num: '50',
          type: '18870772596',
          status: '上架'
        },
        {
          id: 2,
          date: '2016-05-04',
          code: '123456',
          name: '岛上书店',
          press: '清华大学出版社',
          price: '25',
          auth: 'cy7480',
          num: '50',
          type: '18870772596',
          status: '下架'
        },
        {
          id: 3,
          date: '2016-05-01',
          code: '123456',
          name: '追风筝的人',
          press: '电子工业出版社',
          price: '28',
          auth: 'zytest7410',
          num: '50',
          type: '18870772596',
          status: '下架'
        },
        {
          id: 4,
          date: '2016-05-03',
          code: '123456',
          name: '白夜行',
          press: '电子工业出版社',
          price: '28',
          auth: 'dsad',
          num: '50',
          type: '18870772596',
          status: '上架'
        }
      ]
    }
  },
  methods: {
    // 状态筛选
    selectStatus (type) {
      this.status = type
    },
    // 时间筛选
    selectTime (data) {
      this.startTime = data[0]
      this.endTime = data[1]
    },
    // 点击筛选按钮
    search () {
      console.log(this.key)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    //  点击页数
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    }
  }

}
</script>

<style lang="less" scoped>
.countNum {
  display: flex;
  width: 97%;
  margin: 0 auto 20px;
  background: #fff;
  height: 100px;
  padding: 20px;
  .count_item {
    padding: 25px 0;
    width: 33%;
    text-align: center;
    color: #666;
    font-size: 16px;
    .num {
      font-size: 30px;
      font-style: italic;
      color: rgb(0, 183, 147);
    }
    .unit {
      display: inline-block;
      margin-left: 10px;
    }
  }
  .count_item:not(:last-child){
      border-right: 1px solid rgb(227, 227, 227);
    }
}
.block {
  text-align: right;
  //   margin: 20px 0;
}
</style>

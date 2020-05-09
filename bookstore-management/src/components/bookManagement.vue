<template>
  <div>
    <div class="countNum">
      <div class="count_item">
        <div>全部</div>
        <div>250本</div>
      </div>
      <div class="count_item">上架</div>
      <div class="count_item">下架</div>
    </div>
    <div class="page-content">
      <p class="page-title">书籍管理</p>
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
          <el-input placeholder="请输入书籍名称/书籍编号/作者" v-model="key" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
          </el-input>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="200"></el-table-column>
        <el-table-column prop="name" label="姓名" width="200"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="200"></el-table-column>
        <el-table-column prop="status" label="状态" width="200"></el-table-column>
        <el-table-column prop="date" label="创建时间" width="200"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-popconfirm
              confirmButtonText="好的"
              cancelButtonText="不用了"
              icon="el-icon-info"
              iconColor="red"
              title="这是一段内容确定删除吗？"
              onConfirm="handleClick(scope.row)"
            >
              <el-button type="text" size="small">删除</el-button>
            </el-popconfirm>
            <el-button type="text" size="small" @click="addAndEdit('edit')">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookManagement',
  data () {
    return {
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
        },
      ],
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          userName: 'zhengce',
          phone: '18870772596',
          status: '停用'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          userName: 'cy7480',
          phone: '18870772596',
          status: '停用'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          userName: 'zytest7410',
          phone: '18870772596',
          status: '停用'
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          userName: 'dsad',
          phone: '18870772596',
          status: '停用'
        }
      ],
    }
  }
}
</script>


<style lang="less" scoped>
.countNum {
  display: flex;
  width: 100%;
  margin: 0 auto 20px;
  background: #fff;
  height: 100px;
  .count_item {
    width: 33%;
    text-align: center;
    height: 100%;
    vertical-align: middle;
  }
}
</style>
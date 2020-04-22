<template>
  <div class="page-content">
    <p class="page-title">用户账号</p>
    <div class="search">
      <div class="selectInput">
        <el-input
          placeholder="请输入姓名/手机"
          v-model="key"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="select">
        <p class="title">状态 :</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="select addBtn">
        <el-button type="primary" @click="addAndEdit('add')"
          >添加账号</el-button
        >
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="180"
      ></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="status" label="状态" width="180"></el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-popconfirm
            confirmButtonText="好的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="这是一段内容确定删除吗？"
            onConfirm="handleClick(scope.row)"
            ><el-button type="text" size="small">删除</el-button></el-popconfirm
          >
          <el-button type="text" size="small" @click="addAndEdit('edit')"
            >编辑</el-button
          >
        </template>
      </el-table-column>
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
export default {
  name: 'UserAccount',
  data() {
    return {
      value: '',
      key: '',
      dialogFormVisible: false,
      titleName: '',
      formLabelWidth: '120px',
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          phone: '18870772596',
          status: '停用'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          phone: '18870772596',
          status: '停用'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          phone: '18870772596',
          status: '停用'
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          phone: '18870772596',
          status: '停用'
        }
      ],
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
      }
    }
  },
  methods: {
    addAndEdit(type) {
      this.dialogFormVisible = true
      this.titleName = type === 'add' ? '添加账号' : '编辑账号'
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  display: flex;
  margin-bottom: 10px;
}

.selectInput,
.select {
  display: flex;
  align-items: center;
}

.select {
  margin-left: 20px;
}

.addBtn {
  text-align: right;
}

.title {
  font-size: 16px;
  margin-right: 8px;
}

.el-dialog__wrapper .el-dialog {
  width: 420px !important;
}

.el-input {
  width: 217px;
}
</style>

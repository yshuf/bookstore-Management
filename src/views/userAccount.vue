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
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="200"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="200"
      ></el-table-column>
      <el-table-column prop="status" label="状态" width="200"></el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
        width="200"
      ></el-table-column>
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
  data () {
    return {
      value: '',
      key: '',
      time: '',
      status: '', // 状态
      startTime: '', // 创建时间 开始时间
      endTime: '', // 结束时间
      dialogFormVisible: false,
      titleName: '',
      formLabelWidth: '120px',
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
    };
  },
  methods: {
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
</style>

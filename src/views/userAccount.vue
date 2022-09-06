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
    <div>步骤条</div>
    <common-step :stepList="stepList"></common-step>
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
import tableJsonData from './tableData.json';// 引入本地数据
import CommonStep from '@/components/common/commonStep';
export default {
  name: 'UserAccount',
  components: { CommonStep },
  data () {
    return {
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
      value: '',
      key: '',
      time: '',
      status: '', // 状态
      startTime: '', // 创建时间 开始时间
      endTime: '', // 结束时间
      dialogFormVisible: false,
      titleName: '',
      formLabelWidth: '120px',
      tableData: [{
        id: '居民用水',
        name: '第一阶梯（每户每月用水量26立方米及以下）',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '第二阶梯（每户每月用水量27-34立方米，含34立方米）',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '第三阶梯（每户每月用水量34立方米以上）',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '非居民用水',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '特种用水',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }],
      tableData1: [{
        id: '类别：居民用气',
        name: ''
      }, {
        id: '第一档0-320（含）立方米/年',
        name: '3.45元/立方米'

      }, {
        id: '第二档320-400（含）立方米/年',
        name: '4.14元/立方米）'

      }, {
        id: '第三档400（含）立方米/年以上的用气部分',
        name: '5.18元/立方米'

      }, {
        id: '类别：非居民用气',
        name: ''
      }, {
        id: '统一最高限价',
        name: '最高限价标准4.36元/立方米，经营者可以根据市场和经营情况下调标准'
      }],
      tableData2: [
        { value: '23', firstName: '电度电价', secondName: '基本电价', thirdName: '变压器容量' },
        { value: '32', firstName: '电度电价', secondName: '基本电价', thirdName: '最大需量' },
        { value: '63.81', firstName: '电度电价', secondName: '电度电价', thirdName: '1-10千伏' },
        { value: '63.49', firstName: '电度电价', secondName: '电度电价', thirdName: '20千伏' },
        { value: '61.31', firstName: '电度电价', secondName: '电度电价', thirdName: '35-110千伏' },
        { value: '58.81', firstName: '电度电价', secondName: '电度电价', thirdName: '220千伏及以上' },
        { value: '70.02', firstName: '一般工商业用电', secondName: '不满一千伏', thirdName: '220千伏及以上' },
        { value: '67.52', firstName: '一般工商业用电', secondName: '1-10千伏', thirdName: '220千伏及以上' },
        { value: '67.11', firstName: '一般工商业用电', secondName: '20千伏', thirdName: '220千伏及以上' },
        { value: '65.02', firstName: '一般工商业用电', secondName: '35千伏及以上', thirdName: '220千伏及以上' },
        { value: '60.32', firstName: '一般工商业用电', secondName: '地铁', thirdName: '220千伏及以上' }
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
      },
      list: [{
        type: 1,
        oneTitle: '基本信息',
        contentList: [{
          id: 1,
          type: 1,
          oneTitle: '基本信息',
          twoTitle: '登记信息',
          twoName: 'registerInformation',
          sourceBigData: 0,
          sourceThirdParty: 1,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 1,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 2,
          type: 1,
          oneTitle: '基本信息',
          twoTitle: '股东信息',
          twoName: 'shareHolderInf',
          sourceBigData: null,
          sourceThirdParty: 1,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 2,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 3,
          type: 1,
          oneTitle: '基本信息',
          twoTitle: '变更信息',
          twoName: 'alterInfo',
          sourceBigData: 1,
          sourceThirdParty: 1,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 3,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 4,
          type: 1,
          oneTitle: '基本信息',
          twoTitle: '关联信息',
          twoName: 'relationInfo',
          sourceBigData: null,
          sourceThirdParty: 1,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 4,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 5,
          type: 1,
          oneTitle: '基本信息',
          twoTitle: '行业表现信息',
          twoName: 'industryInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: 1,
          sourceDepartmentLink: null,
          orderNum: 5,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }]
      }, {
        type: 2,
        oneTitle: '经营信息',
        contentList: [{
          id: 6,
          type: 2,
          oneTitle: '经营信息',
          twoTitle: '纳税信息',
          twoName: 'taxpayerInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 1,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 7,
          type: 2,
          oneTitle: '经营信息',
          twoTitle: '公积金缴存信息',
          twoName: 'accumulationFundInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 2,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 8,
          type: 2,
          oneTitle: '经营信息',
          twoTitle: '外贸信息',
          twoName: 'reportForeignTrade',
          sourceBigData: null,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: 1,
          orderNum: 3,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 9,
          type: 2,
          oneTitle: '经营信息',
          twoTitle: '用电信息',
          twoName: 'useElectricInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 4,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 10,
          type: 2,
          oneTitle: '经营信息',
          twoTitle: '用水信息',
          twoName: 'useWaterInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 5,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 11,
          type: 2,
          oneTitle: '经营信息',
          twoTitle: '用气信息',
          twoName: 'useGasInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 6,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 12,
          type: 2,
          oneTitle: '经营信息',
          twoTitle: '行政许可',
          twoName: 'licenceInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 7,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }]
      }, {
        type: 3,
        oneTitle: '经营风险',
        contentList: [{
          id: 13,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '企业不动产抵押信息',
          twoName: 'realEstateMortgageInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 1,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 14,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '动产抵押登记信息',
          twoName: 'morDetailInfo',
          sourceBigData: null,
          sourceThirdParty: 1,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 2,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 15,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '股权出质信息',
          twoName: 'sharesImpInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 3,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 16,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '欠缴电费信息',
          twoName: 'arrearsElectricInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 4,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 17,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '欠缴水费信息',
          twoName: 'arrearsWaterInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 5,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 18,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '社保欠缴信息',
          twoName: 'socialSecurityInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 6,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 19,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '失信信用信息',
          twoName: 'creditInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 7,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 20,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '消防安全不良行为信息',
          twoName: 'fireSafetyInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 8,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 21,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '环保处罚信息',
          twoName: 'environmentPunish',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 9,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 22,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '欠税信息',
          twoName: 'dealDebtRateItem',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 10,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 23,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '税收违法',
          twoName: 'taxIllegalInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 11,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 33,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '拖欠工资黑名单信息',
          twoName: 'defaultSalaryInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 12,
          createTime: '2020-10-14',
          checked: 1,
          json: null
        }, {
          id: 34,
          type: 3,
          oneTitle: '经营风险',
          twoTitle: '企业不良行为',
          twoName: 'badBehaviorInfo',
          sourceBigData: null,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: 1,
          orderNum: 13,
          createTime: '2021-02-01',
          checked: 1,
          json: null
        }]
      }, {
        type: 4,
        oneTitle: '司法风险',
        contentList: [{
          id: 24,
          type: 4,
          oneTitle: '司法风险',
          twoTitle: '开庭信息',
          twoName: 'courtNoticeInfo',
          sourceBigData: null,
          sourceThirdParty: 1,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 1,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 25,
          type: 4,
          oneTitle: '司法风险',
          twoTitle: '审判案件信息（已公开）',
          twoName: 'trialCaseInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 2,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 26,
          type: 4,
          oneTitle: '司法风险',
          twoTitle: '裁判文书信息（已公开）',
          twoName: 'judgementInfo',
          sourceBigData: null,
          sourceThirdParty: 0,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 3,
          createTime: '2020-09-01',
          checked: 0,
          json: null
        }, {
          id: 27,
          type: 4,
          oneTitle: '司法风险',
          twoTitle: '执行案件信息',
          twoName: 'executedCaseInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 4,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 28,
          type: 4,
          oneTitle: '司法风险',
          twoTitle: '法院失信被执行信息',
          twoName: 'dishonestyExecuteInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 5,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 29,
          type: 4,
          oneTitle: '司法风险',
          twoTitle: '当事人基本情况信息',
          twoName: 'partyBaseInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 6,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 30,
          type: 4,
          oneTitle: '司法风险',
          twoTitle: '涉案民事刑事判决记录信息',
          twoName: 'civilCaseJudgeInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 7,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }, {
          id: 31,
          type: 4,
          oneTitle: '司法风险',
          twoTitle: '失信执行人信息',
          twoName: 'dishonestyPersonExecutorInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 8,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }]
      }, {
        type: 5,
        oneTitle: '资产信息',
        contentList: [{
          id: 32,
          type: 5,
          oneTitle: '资产信息',
          twoTitle: '不动产信息',
          twoName: 'realEstateInfo',
          sourceBigData: 1,
          sourceThirdParty: null,
          sourcePlatformOperate: null,
          sourceDepartmentLink: null,
          orderNum: 1,
          createTime: '2020-09-01',
          checked: 1,
          json: null
        }]
      }],
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
      this.listData = [
        {
          id: '201808300001',
          productType: '纺织品',
          productTypeSecond: '基本电价',
          amount: '变压器容量',
          productName: '上衣',
          price: '80',
          updateTime: '2018-08-30'
        },
        {
          id: '201808300002',
          productType: '纺织品',
          productTypeSecond: '基本电价',
          amount: '最大需量',
          productName: '裤子',
          price: '76',
          updateTime: '2018-08-31'
        },
        {
          id: '201808300001',
          productType: '纺织品',
          productTypeSecond: '电度电价',
          amount: '1-10千伏',
          productName: '上衣',
          price: '80',
          updateTime: '2018-08-30'
        },
        {
          id: '201808300002',
          productType: '纺织品',
          productTypeSecond: '电度电价',
          amount: '20千伏',
          productName: '裤子',
          price: '76',
          updateTime: '2018-08-31'
        },
        {
          id: '201808300001',
          productType: '纺织品',
          productTypeSecond: '电度电价',
          amount: '35-110千伏',
          productName: '上衣',
          price: '80',
          updateTime: '2018-08-30'
        },
        {
          id: '201808300002',
          productType: '纺织品',
          productTypeSecond: '电度电价',
          amount: '220千伏及以上',
          productName: '裤子',
          price: '76',
          updateTime: '2018-08-31'
        },
        {
          id: '201808300001',
          productType: '一般工商业用电',
          productTypeSecond: '不满一千伏',
          amount: '不满一千伏',
          productName: '上衣',
          price: '80',
          updateTime: '2018-08-30'
        },
        {
          id: '201808300002',
          productType: '一般工商业用电',
          productTypeSecond: '1-10千伏',
          amount: '1-10千伏',
          productName: '裤子',
          price: '76',
          updateTime: '2018-08-31'
        },
        {
          id: '201808300003',
          productType: '一般工商业用电',
          productTypeSecond: '20千伏',
          amount: '20千伏',
          productName: '挎包',
          price: '150',
          updateTime: '2018-08-31'
        },

        {
          id: '201808300004',
          productType: '一般工商业用电',
          productTypeSecond: '35千伏及以上',
          amount: '35千伏及以上',
          productName: '鞋子',
          price: '76',
          updateTime: '2018-08-29'
        },
        {
          id: '201808300005',
          productType: '一般工商业用电',
          productTypeSecond: '地铁',
          amount: '地铁',
          productName: '旗袍',
          price: '106',
          updateTime: '2018-08-31'
        },
        {
          id: '201808300006',
          productType: '居民用电电价',
          productTypeSecond: '阶梯电价',
          amount: '第一档',
          productName: '短裙',
          price: '36',
          updateTime: '2018-08-30'
        },
        {
          id: '201808300007',
          productType: '居民用电电价',
          productTypeSecond: '阶梯电价',
          amount: '第二档',
          productName: '短袖',
          price: '36',
          updateTime: '2018-08-30'
        },
        {
          id: '201808300008',
          productType: '居民用电电价',
          productTypeSecond: '阶梯电价',
          amount: '第三档',
          productName: '短袖',
          price: '36',
          updateTime: '2018-08-30'
        },
        {
          id: '201808300009',
          productType: '居民用电电价',
          productTypeSecond: '谷峰电价',
          amount: '峰',
          productName: '钱包',
          price: '60',
          updateTime: '2018-08-30'
        },
        {
          id: '201808300011',
          productType: '居民用电电价',
          productTypeSecond: '谷峰电价',
          amount: '平',
          productName: '手套',
          price: '60',
          updateTime: '2018-08-30'
        },
        {
          id: '201808300012',
          productType: '居民用电电价',
          productTypeSecond: '谷峰电价',
          amount: '谷',
          productName: '袜子',
          price: '36',
          updateTime: '2018-08-30'
        },
        {
          id: '201808300013',
          productType: '居民用电电价',
          productTypeSecond: '合表电价',
          amount: '合表电价',
          productName: '雪碧',
          price: '5',
          updateTime: '2018-08-31'
        },
        {
          id: '201808300013',
          productType: '农业用电电价',
          productTypeSecond: '稻田排灌、脱粒电度电价',
          amount: '稻田排灌、脱粒电度电价',
          productName: '风衣',
          price: '50',
          updateTime: '2018-08-31'
        },
        {
          id: '201808300013',
          productType: '农业用电电价',
          productTypeSecond: '农业生产电度电价',
          amount: '农业生产电度电价',
          productName: '风衣',
          price: '50',
          updateTime: '2018-08-31'
        }
      ];

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
        console.log(_row);
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
</style>

<template>
  <div class="circle-box">
    <div class="circle-echarts" ref="circleEcharts"></div>
  </div>
</template>

<script>
import { allPieOptions } from '../../chart';
const echarts = require('echarts'); ;

export default {
  name: 'circle',
  data () {
    return {
      dataList: [
        {
          id: 3725,
          type: '原材料价格波动情况',
          target: '上涨10%以上',
          year: '2020',
          quarter: '01',
          yearQuarter: '2020-01',
          data: 87.00,
          createTime: '2021-12-14 11:58:49',
          changeTime: '2021-12-14 11:58:49',
          yearQuarters: '2020第一季度'
        },
        {
          id: 3729,
          type: '原材料价格波动情况',
          target: '上涨0-10%',
          year: '2020',
          quarter: '01',
          yearQuarter: '2020-01',
          data: 89.00,
          createTime: '2021-12-14 11:58:49',
          changeTime: '2021-12-14 11:58:49',
          yearQuarters: '2020第一季度'
        },
        {
          id: 3733,
          type: '原材料价格波动情况',
          target: '持平',
          year: '2020',
          quarter: '01',
          yearQuarter: '2020-01',
          data: 91.00,
          createTime: '2021-12-14 11:58:49',
          changeTime: '2021-12-14 11:58:49',
          yearQuarters: '2020第一季度'
        },
        {
          id: 3737,
          type: '原材料价格波动情况',
          target: '下跌0-10%',
          year: '2020',
          quarter: '01',
          yearQuarter: '2020-01',
          data: 93.00,
          createTime: '2021-12-14 11:58:49',
          changeTime: '2021-12-14 11:58:49',
          yearQuarters: '2020第一季度'
        },
        {
          id: 3741,
          type: '原材料价格波动情况',
          target: '下跌10%以上',
          year: '2020',
          quarter: '01',
          yearQuarter: '2020-01',
          data: 95.00,
          createTime: '2021-12-14 11:58:49',
          changeTime: '2021-12-14 11:58:49',
          yearQuarters: '2020第一季度'
        }
      ]
    };
  },
  mounted () {
    this.circleChart = echarts.init(this.$refs.circleEcharts);
    this.circleChart.setOption(allPieOptions(this.dataShape(this.dataList)));
  },
  methods: {
    dataShape (res) {
      const data = res.map(vlaue => {
        return { value: vlaue.data ? vlaue.data : 0, name: vlaue.target };
      });
      return data;
    }
  }
};
</script>

  <style scoped lang="less">
    .circle-box {
      width: 100%;
      height: calc(100% - 20px);
      .circle-echarts {
        width: 100%;
        height: 100%;
      }
    }
  </style>

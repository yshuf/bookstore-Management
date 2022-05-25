<template>
  <div class="rose-box">
    <div class="rose-echarts" ref="roseEcharts"></div>
  </div>
</template>

<script>
import { rosePieOption } from '../../chart';
const echarts = require('echarts'); ;

export default {
  name: 'Rose',
  data () {
    return {
      dataList: [
        {
          id: 1,
          name: '缙云县',
          value: 35
        },
        {
          id: 2,
          name: '松阳县',
          value: 30
        },
        {
          id: 3,
          name: '庆元县',
          value: 28
        },
        {
          id: 4,
          name: '龙泉市',
          value: 25
        },
        {
          id: 5,
          name: '莲都区',
          value: 20
        },
        {
          id: 6,
          name: '青田县',
          value: 18
        },
        {
          id: 7,
          name: '遂昌县',
          value: 16
        },
        {
          id: 8,
          name: '云和县',
          value: 15
        },
        {
          id: 9,
          name: '景宁县',
          value: 12
        }
      ]
    };
  },
  mounted () {
    this.roseChart = echarts.init(this.$refs.roseEcharts);
    this.initChart(this.dataList);
  },
  methods: {
    // 初始化图表
    initChart (data) {
      console.log(data);
      const colors = [
        '#24DBD7',
        '#34BBF1',
        '#5BD0FF',
        '#6699FF',
        '#A57FFF',
        '#FFE36E',
        '#FFC76E',
        '#FF863B',
        '#FF5858'
      ];
      const originDataLen = data.length;
      const spanAngle = 180; // 需要显示的角度
      const repeatedMultiple = 360 / spanAngle;
      // 这里根据要显示的角度 计算了需要插入的数据量
      const addDataLen = parseInt((repeatedMultiple - 1) * originDataLen);
      const seriseData = data.map((v, index) => {
        return {
          value: v.value,
          name: v.name,
          itemStyle: {
            normal: {
              color: colors[index]
            }
          }
        };
      });
      for (let index = 0; index < addDataLen; index++) {
        seriseData.push({
          name: null,
          // 这里给数据置零，即在视觉上不显示
          value: 0,
          // 这里保证了异常情况下(数据都为0时)作为占位的数据在视觉上仍为不可见状态。
          itemStyle: {
            color: 'rgba(0,0,0,0)'
          },
          tooltip: {
            show: false,
            formatter: null
          }
        });
      }
      const options = rosePieOption(seriseData);
      this.roseChart.setOption(options);
      this.roseChart.setOption({
        grid: {
          left: '10%'
        }
      });
    }
  }
};
</script>

  <style scoped lang="less">
    .rose-box {
      width: 100%;
      height: calc(100% - 20px);
      .rose-echarts {
        width: 100%;
        height: 100%;
      }
    }
  </style>

<template>
  <div id="overview_container">
    <div class="title">统计概览</div>
    <!-- <div :id="id" style="width:100%" /> -->
    <div class="dataCharts">
      <div class="chart" id="lineCharts" style="height:350px;"></div>
      <div id="bookRank" style="height:350px;"></div>
      <div style="height:350px;" id="loginChart">
        <!-- <div>过去一周登录走势图</div> -->
      </div>
      <div style="height:350px;" id="dealAmount">
        <!-- <div>过去一周成交总额情况</div> -->
      </div>
      <div id="roseCharts" class="rose-box"></div>
      <div style="height:350px;" id="rank_box_chart">
        <vueSeamlessScroll
          :data="listData"
          :class-option="defaultOption"
          class="seamless-warp"
        >
          <ul class="item">
            <li v-for="(item, index) in listData" :key="index">
              <span>{{ item.bookName }}：</span><span>{{ item.num }}</span>
            </li>
          </ul>
        </vueSeamlessScroll>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll';
import { rosePieOption } from '../plugins/index';
export default {
  name: 'Overview',
  data() {
    return {
      id: '',
      myChart: null,
      bookRankChart: null,
      loginChart: null,
      trendEchart: null,
      rankEchart: null,
      roseCharts: null,
      listData: [
        { number: 1, unit: '家', bookName: '秘密', num: '50' },
        { number: 2, unit: '家', bookName: '白夜行', num: '50' },
        { number: 3, unit: '家', bookName: '追风筝的人', num: '50' },
        { number: 4, unit: '家', bookName: '白夜行', num: '50' },
        { number: 5, unit: '家', bookName: '白夜行', num: '50' },
        { number: 5, unit: '家', bookName: '白夜行', num: '50' },
        { number: 5, unit: '家', bookName: '白夜行', num: '50' },
        { number: 5, unit: '家', bookName: '白夜行', num: '50' },
        { number: 5, unit: '家', bookName: '白夜行', num: '50' },
        { number: 5, unit: '家', bookName: '白夜行', num: '50' },
        { number: 5, unit: '家', bookName: '白夜行', num: '50' }
      ],
      dealTotalAmount: [
        { number: 1, unit: '家', name: '白夜行', num: '50' },
        { number: 2, unit: '家', name: '白夜行', num: '50' },
        { number: 3, unit: '家', name: '白夜行', num: '50' },
        { number: 4, unit: '家', name: '白夜行', num: '50' },
        { number: 5, unit: '家', name: '白夜行', num: '50' }
      ],
      userAmount: [],
      time: [],
      dealAmount: [],
      loginTrend: [
        {
          sql: 3,
          sxl: 3,
          amount: 120.0,
          date: '05.11'
        },
        {
          sql: 3,
          sxl: 3,
          amount: 600.0,
          date: '05.12'
        },
        {
          sql: 1,
          sxl: 2,
          amount: 130.0,
          date: '05.13'
        },
        {
          sql: 2,
          sxl: 2,
          amount: 200.0,
          date: '05.14'
        },
        {
          sql: 1,
          sxl: 0,
          amount: 0,
          date: '05.15'
        },
        {
          sql: 0,
          sxl: 0,
          amount: 0,
          date: '05.16'
        },
        {
          sql: 0,
          sxl: 0,
          amount: 0,
          date: '05.17'
        }
      ],
      roseData: [
        {
          name: '绍兴市',
          value: 94
        },
        {
          name: '新昌县',
          value: 93.9
        },
        {
          name: '越城区',
          value: 86.3
        },
        {
          name: '柯桥区',
          value: 77.7
        },
        {
          name: '嵊州市',
          value: 77.4
        },
        {
          name: '上虞区',
          value: 72.6
        },
        {
          name: '诸暨市',
          value: 70.5
        }
      ]
    };
  },
  components: { vueSeamlessScroll },
  computed: {
    // 公告滚动自定义
    defaultOption() {
      return {
        step: 0.8, // 数值越大速度滚动越快
        limitMoveNum: this.listData.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 0, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  },
  created() {
    this.id = Math.random()
      .toString(36)
      .substr(2);
  },
  mounted() {
    this.$nextTick(function() {
      this.drawLine();
      this.initChart();
    });
    window.addEventListener('resize', () => {
      console.log('缩放');
      this.myChart.resize();
      this.bookRankChart.resize();
      this.loginChart.resize();
      this.trendEchart.resize();
    });
    this.dealData();
  },
  methods: {
    drawLine() {
      this.myChart = this.$echarts.init(document.getElementById('lineCharts'));
      this.bookRankChart = this.$echarts.init(
        document.getElementById('bookRank')
      );
      this.loginChart = this.$echarts.init(
        document.getElementById('loginChart')
      );
      this.trendEchart = this.$echarts.init(
        document.getElementById('dealAmount')
      );
      // this.rankEchart = this.$echarts.init(document.getElementById('rank_box_chart'))
      const max = Math.max.apply(Math, this.userAmount.concat(this.dealAmount));
      this.myChart.setOption({
        color: ['#3398DB'],
        title: {
          text: '最近一周销售书籍排名情况'
        },
        tooltip: {
          trigger: 'axis',
          //   formatter: '{a} <br/>{b}: {c}本',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['白夜行', '八十天环游世界', '追风筝的人', '羊脂球', '飘'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '销售量',
            type: 'bar',
            barWidth: '35%',
            data: [200, 10, 52, 334, 390],
            itemStyle: {
              normal: {
                color: function(params) {
                  const colorList = [
                    '#FBC103',
                    'rgba(0, 183, 147, 0.6)',
                    '#FBC103',
                    'rgba(0, 183, 147, 0.6)',
                    '#FBC103'
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      });
      this.bookRankChart.setOption({
        title: {
          text: '过去一周查询搜索书籍排名'
        },
        color: [
          '#00b793',
          'rgba(0, 183, 147, 0.8)',
          'rgba(0, 183, 147, 0.6)',
          'rgba(0, 183, 147, 0.4)',
          'rgba(0, 183, 147, 0.2)'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}次 ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          top: 50,
          data: ['追风筝的人', '白夜行', '岛上书店', '浮生物语', '挪威的森林']
        },
        series: [
          {
            name: '搜索排名',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '追风筝的人' },
              { value: 310, name: '白夜行' },
              { value: 234, name: '岛上书店' },
              { value: 135, name: '浮生物语' },
              { value: 1548, name: '挪威的森林' }
            ]
          }
        ]
      });
      this.loginChart.setOption({
        title: {
          text: '最近一周平太业务情况'
        },
        color: ['#fbc200', '#00b793'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['登录量', '成交量'],
          itemWidth: 14,
          bottom: 0,
          textStyle: {
            color: '#666',
            fontSize: 14
          }
        },
        xAxis: {
          type: 'category',
          data: this.time,
          axisLabel: {
            color: '#666',
            fontSize: 10,
            interval: 0
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#666',
            fontSize: 14
          },
          minInterval: max ? max / 2 : 0.5,
          splitLine: {
            lineStyle: {
              color: ['#e3e3e3']
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '登录量',
            type: 'bar',
            barGap: 0,
            data: this.userAmount,
            barWidth: 10
          },
          {
            name: '成交量',
            type: 'bar',
            data: this.dealAmount,
            barWidth: 10
          }
        ]
      });
      this.trendEchart.setOption({
        title: {
          text: '过去一周登录走势图'
        },
        color: ['#00b793'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br />{c}人'
        },
        grid: {
          left: 90
        },

        xAxis: {
          type: 'category',
          data: ['4月22日', '4月23日', '4月24日', '4月25日', '4月26日'],
          axisLabel: {
            color: '#666',
            fontSize: 10,
            interval: 0
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#666',
            fontSize: 14,
            formatter: '{value} 人'
          },
          splitLine: {
            lineStyle: {
              color: ['#e3e3e3']
            }
          },
          // minInterval: max?max/2:0.5,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            height: 4,
            bottom: 10,
            borderColor: 'transparent',
            handleIcon:
              'M512 512m-208 0a6.5 6.5 0 1 0 416 0 6.5 6.5 0 1 0-416 0Z M512 192C335.264 192 192 335.264 192 512c0 176.736 143.264 320 320 320s320-143.264 320-320C832 335.264 688.736 192 512 192zM512 800c-159.072 0-288-128.928-288-288 0-159.072 128.928-288 288-288s288 128.928 288 288C800 671.072 671.072 800 512 800z',
            backgroundColor: '#E3EBE9', // 底层背景颜色
            fillerColor: '#89D4C5', // 选中范围填充颜色
            handleSize: 10, // 控制手柄的尺寸
            handleStyle: {
              // 手柄样式配置
              color: '#fff', // 图形的颜色
              borderColor: '#89D4C5', // 图形的描边颜色
              shadowBlur: 4,
              shadowOffsetX: 1,
              shadowOffsetY: 1,
              shadowColor: '#e5e5e5'
            }
          }
        ],
        series: [
          {
            // name:'申请量',
            type: 'line',
            barGap: 0,
            data: [20, 53, 66, 43, 20],
            barWidth: 10,
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(0, 183, 147, 0.3)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#fff' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          }
        ]
      });
    },

    initChart() {
      this.roseCharts = this.$echarts.init(
        document.getElementById('roseCharts')
      );
      const colors = [
        '#21ce9b',
        '#34bbf1',
        '#5bd0ff',
        '#ffe36e',
        '#ffc76e',
        '#ff863b',
        '#ff5858'
      ];
      const originDataLen = this.roseData.length;
      const spanAngle = 180; // 需要显示的角度
      const repeatedMultiple = 360 / spanAngle;
      // 这里根据要显示的角度 计算了需要插入的数据量
      const addDataLen = parseInt((repeatedMultiple - 1) * originDataLen);
      const seriseData = this.roseData.map((v, index) => {
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
      console.log(seriseData, rosePieOption);
      const options = rosePieOption(seriseData);
      this.roseCharts.setOption(options);
    },

    dealData() {
      this.loginTrend.map(item => {
        this.userAmount.push(item.sql);
        this.time.push(item.date);
        this.dealAmount.push(item.sxl);
      });
    }
  }
};
</script>

<style lang="less" scoped>
#overview_container {
  width: 100%;
  height: 100%;
  .title {
    margin-bottom: 20px;
    padding: 20px;
    font-size: 18px;
    background: #fff;
    font-size: 16px;
    font-weight: 600;
  }
  .dataCharts {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
      background: #fff;
      padding: 20px;
      width: 30%;
      margin-bottom: 20px;
    }
    .seamless-warp {
      width: 100%;
      height: 8.16rem;
      margin: 0 auto;
      overflow: hidden;
    }
    /* .rose-box {
        width: 100%;
        height: 100%;
    } */
  }
}
</style>

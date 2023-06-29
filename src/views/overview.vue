<template>
  <div id="overview_container">
    <div class="title" ref="title" v-show="handleHideOther('title')" @click="downloadReport()">统计概览</div>
    <div class="dataCharts">
      <div class="module_item" ref="topLeft" @click="handleShowAll('topLeft')" v-show="handleHideOther('topLeft')">
        <div
        ref="myChart"
        class="lineCharts"
      ></div>
      </div>
      <div v-if="isShowClose" class="closeStyle">
      <i class="el-icon-close pointer" @click.stop="handleHide"></i>
    </div>
      <div class="module_item" ref="topCenter" @click="handleShowAll('topCenter')" v-show="handleHideOther('topCenter')">
        <div   ref="bookRankChart" class="bookRankChart"></div>
      </div>
      <div class="module_item" ref="topRight" @click="handleShowAll('topRight')" v-show="handleHideOther('topRight')">
        <div   ref="loginChart" class="loginChart"></div>
      </div>
      <div class="module_item" ref="bottomLeft" @click="handleShowAll('bottomLeft')" v-show="handleHideOther('bottomLeft')">
        <div    ref="trendEchart" class="trendEchart">
      </div>
      </div>
      <div class="module_item"  ref="bottomCenter" @click="handleShowAll('bottomCenter')" v-show="handleHideOther('bottomCenter')">
        <div  ref="roseCharts" class="roseCharts"></div>
      </div>
      <div class="module_item" ref="bottomRight" @click="handleShowAll('bottomRight')" v-show="handleHideOther('bottomRight')">
        <div>上下滚动无缝轮播</div>
        <vueSeamlessScroll
          :data="listData"
          :class-option="defaultOption"
          class="seamless-warp"
        >
          <div class="item">
            <p
              class="seamless-warp-item"
              v-for="(item, index) in listData"
              :key="index"
            >
              <span>{{ item.bookName }}：</span><span>{{ item.num }}</span>
            </p>
          </div>
        </vueSeamlessScroll>
      </div>

      <div class="module_item"  ref="listedEntSpread" @click="handleShowAll('listedEntSpread')" v-show="handleHideOther('listedEntSpread')">
        <div  ref="spreadChart" class="spreadChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import vueSeamlessScroll from 'vue-seamless-scroll';
import { rosePieOption } from '../plugins/index';
import { mixins } from './common/dialogMinxin.js';
import html2canvas from '@static/pdf/html2canvas.js';
import jsPDF from '@static/pdf/jspdf.debug.js';
export default {
  name: 'Overview',
  mixins: [mixins],
  data () {
    return {
      id: '',
      myChart: null,
      bookRankChart: null,
      loginChart: null,
      trendEchart: null,
      roseCharts: null,
      listedEntChart: null,
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
          name: '追风筝的人',
          value: 94
        },
        {
          name: '白夜行',
          value: 93.9
        },
        {
          name: '岛上书店',
          value: 86.3
        },
        {
          name: '浮生物语',
          value: 77.7
        },
        {
          name: '挪威的森林',
          value: 77.4
        },
        {
          name: '飘',
          value: 72.6
        },
        {
          name: '活着',
          value: 70.5
        }
      ]
    };
  },
  components: { vueSeamlessScroll },
  computed: {
    // 公告滚动自定义
    defaultOption () {
      return {
        step: 0.8, // 数值越大速度滚动越快
        limitMoveNum: this.listData.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  },
  created () {
    this.id = Math.random()
      .toString(36)
      .substr(2);
  },
  mounted () {
    this.$nextTick(function () {
      this.drawLine();
      // this.initChart();
      // this.intListedEntSpreadChart();
    });

    this.dealData();
  },
  methods: {
    intListedEntSpreadChart () {
      this.listedEntChart = echarts.init(this.$refs.spreadChart);
      const option = {
        // 你的代码
        color: ['#FFC824', '#E2657A', '#67F1CC', '#4CB9F7', '#D6EAF2', '#9253DF'],
        title: {
          text: 550,
          subtext: '数量',
          // sitemGap: 20,
          x: 'center',
          y: '25%',
          textStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#000'
          },
          subtextStyle: {
            fontSize: 16,
            fontWeight: 'normal',
            align: 'center',
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          width: '70%',
          orient: 'horizontal',
          bottom: '5%',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            color: '#000',
            fontSize: 14
          }
        },
        series: [
          {
            name: '上市企业分布',
            type: 'pie',
            selectedMode: 'single',
            center: ['50%', '35%'],
            radius: ['30%', '40%'],
            label: {
              padding: [80, 0, -80, -20],
              formatter: '{b}\n\n{c}',
              color: '#000',
              fontSize: 12,
              position: 'outside',
              padding: [0, -40, 0, -30]
            },
            labelLine: {
              length: 10,
              length2: 70,
              show: true,
              color: '#00ffff',
              fontSize: 15
            },
            data: [{ name: 'aaa', value: '30' }, { name: 'bbb', value: '3' }, { name: 'ccc', value: '10' }, { name: 'ddd', value: '20' }]
          },
          {
            color: ['#163d59'],
            type: 'gauge',
            center: ['50%', '35%'],
            startAngle: 150,
            endAngle: -209.999,
            splitNumber: 12,
            radius: '20%',
            pointer: {
              show: false
            },
            progress: {
              show: false,
              roundCap: true,
              width: 1
            },
            axisLine: {
              show: false,
              lineStyle: {
                width: 10,
                color: [
                  [0, '#163d59'],
                  [0.5, '#163d59'],
                  [1, '#163d59']
                ]
              }
            },
            axisTick: {
              distance: -25,
              length: 12,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            splitLine: {
              show: false,
              distance: -35,
              length: 10,
              lineStyle: {
                width: 2,
                color: '#099fe4'
              }
            },
            axisLabel: {
              show: false
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: []
          },
          {
            // 外层阴影圈
            name: '阴影圈',
            type: 'pie',
            radius: ['40%', '50%'],
            center: ['50%', '35%'],
            emphasis: {
              scale: false
            },
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                labelLine: {
                  show: false
                },
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  {
                    offset: 1,
                    color: 'rgba(46, 114, 156, 0.0374)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(149, 214, 255, 0.17)'
                  },
                  {
                    offset: 0,
                    color: 'rgba(46, 114, 156, 0.0374)'
                  }
                ]),
                shadowBlur: 60
              }
            },
            labelLine: {
              show: false
            },
            data: [100]
          }
        ]
      };

      this.listedEntChart.setOption(option);
      this.resizeChart('listedEntChart', 'spreadChart');
    },
    resizeChart (obj, refs) {
      // 使用window.addEventListener监听只会在窗口大小改变的时候重新绘制图表，可通过ResizeObserver来监听图表容器的大小变化实现图表自适应
      const ro = new ResizeObserver(e => {
        this[obj].resize();
      });
      ro.observe(this.$refs[refs]);
    },
    downloadReport () {
      this.isImport = true;
      this.$message.info('正在导出中...');
      console.log('开始导出');
      const DomName = document.getElementById('overview_container');
      var shareContent = DomName; // 需要截图的包裹的（原生的）DOM 对象
      console.log(shareContent, '打印看有没有获取到dom');
      // 打印看有没有获取到dom
      var width = shareContent.offsetWidth; // 获取dom 宽度
      var height = shareContent.offsetHeight; // 获取dom 高度
      var canvas = document.createElement('canvas'); // 创建一个canvas节点
      var scale = 1.5; // 定义任意放大倍数 支持小数
      canvas.width = width * scale; // 定义canvas 宽度 * 缩放，在此我是把canvas放大了2倍
      canvas.height = height * scale; // 定义canvas高度 *缩放
      canvas.getContext('2d').scale(scale, scale); // 获取context,设置scale
      // window.pageYoffset = 0; // 滚动置顶
      // document.documentElement.scrollTop = 0;
      // document.body.scrollTop = 0;
      const context = canvas.getContext('2d');
      context.translate(
        `-${shareContent.offsetLeft + 150}`,
        `-${shareContent.offsetTop + 50}`
      );
      const opts = {
        scale, // 添加的scale 参数
        canvas, // 自定义 canvas
        logging: false, // 日志开关，便于查看html2canvas的内部执行流程
        width: width, // dom 原始宽度
        height: height,
        useCORS: true // 【重要】开启跨域配置
      };
      // eslint-disable-next-line no-undef
      html2canvas(DomName, opts)
        .then(function (canvas) {
          var context = canvas.getContext('2d');
          // 【重要】关闭抗锯齿
          context.mozImageSmoothingEnabled = false;
          context.webkitImageSmoothingEnabled = false;
          context.msImageSmoothingEnabled = false;
          context.imageSmoothingEnabled = false;
          var imgData = canvas.toDataURL('image/', 1.0); // 转化成base64格式,可上网了解此格式
          var img = new Image();
          img.src = imgData;
          img.onload = function () {
            img.width = img.width / 1.5; // 因为在上面放大了2倍，生成image之后要/2
            img.height = img.height / 1.5;
            img.style.transform = 'scale(0.5)';
            if (this.width > this.height) {
              // 此可以根据打印的大小进行自动调节
              // eslint-disable-next-line
              var doc = new jsPDF('l', 'mm', [
                this.width * 0.555,
                this.height * 0.555
              ]);
            } else {
              // eslint-disable-next-line
              var doc = new jsPDF('p', 'mm', [
                this.width * 0.555,
                this.height * 0.555
              ]);
            }
            doc.addImage(
              imgData,
              'jpeg',
              10,
              0,
              this.width * 0.505,
              this.height * 0.545
            );
            doc.save('test.pdf');
          };
        })
        .finally(() => {
          this.isImport = false;
          this.$message.success('导出成功');
        })
        .catch(() => {
          this.$message.error('导出失败');
        });
    },
    drawLine () {
      this.myChart = echarts.init(this.$refs.myChart);
      this.bookRankChart = echarts.init(this.$refs.bookRankChart);
      this.loginChart = echarts.init(this.$refs.loginChart);
      this.trendEchart = echarts.init(this.$refs.trendEchart);
      this.roseCharts = echarts.init(this.$refs.roseCharts);
      this.intListedEntSpreadChart();
      this.chartResize();
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
                color: function (params) {
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
          text: '最近一周平台业务情况'
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
      const options = rosePieOption(seriseData);
      this.roseCharts.setOption(options);
    },

    initChart () {
      this.roseCharts = echarts.init(this.$refs.roseCharts);
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
      const options = rosePieOption(seriseData);
      this.roseCharts.setOption(options);
    },

    dealData () {
      this.loginTrend.map(item => {
        this.userAmount.push(item.sql);
        this.time.push(item.date);
        this.dealAmount.push(item.sxl);
      });
    },
    /**
     * @desc 图表自适应
     */
    chartResize () {
      const chartList = [
        'myChart',
        'bookRankChart',
        'loginChart',
        'trendEchart',
        'roseCharts',
        'spreadChart'
      ];
      chartList.forEach(item => {
        // 使用window.addEventListener监听只会在窗口大小改变的时候重新绘制图表，可通过ResizeObserver来监听图表容器的大小变化实现图表自适应
        const ro = new ResizeObserver(e => {
          this[item] && this[item].resize();
        });
        ro.observe(this.$refs[item]);
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url('./common/dialogMinxin.less');
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
    height: calc(100% - 105px);
    .module_item {
      background: #fff;
      padding: 20px;
      width: 32.5%;
      height:50%;
      margin-bottom: 20px;
      box-sizing: border-box;
      .lineCharts,.bookRankChart,.loginChart,.trendEchart,.roseCharts,.spreadChart {
        width: 100%;
        height: 100%;
      }
    }
    .seamless-warp {
      width: 100%;
      height: 100%;
      overflow: hidden;
      &-item {
        width: 100%;
        height: 32px;
        margin: 0;
      }
    }
  }
}
</style>

<template>
  <div class="overview_container">
    <div class="title">统计概览页面</div>
    <!-- <div :id="id" style="width:100%" /> -->
    <div class="dataCharts">
      <div class="chart" id="lineCharts" style="height:300px;" />
      <div id="bookRank" style="height:300px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  data() {
    return {
      id: '',
      myChart: null
    }
  },
  created() {
    this.id = Math.random()
      .toString(36)
      .substr(2)
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById('lineCharts'))
      let bookRankChart = this.$echarts.init(
        document.getElementById('bookRank')
      )
      myChart.setOption({
        color: ['#3398DB'],
        title: {
          text: '最近一周销售情况'
        },
        tooltip: {
          trigger: 'axis',
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      })
      bookRankChart.setOption({
        color: [
          '#00b793',
          'rgba(0, 183, 147, 0.8)',
          'rgba(0, 183, 147, 0.6)',
          'rgba(0, 183, 147, 0.4)',
          'rgba(0, 183, 147, 0.2)'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
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
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  padding: 20px;
  font-size: 18px;
  background: #fff;
}
.dataCharts {
  width: 100%;
  display: flex;
  justify-content: space-around;
  div {
    background: #fff;
    padding: 20px;
    width: 45%;
  }
}</style
>>

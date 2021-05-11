<template>
  <div id="overview_container">
    <div class="title">统计概览</div>
    <!-- <div :id="id" style="width:100%" /> -->
    <div class="dataCharts">
      <div class="chart" id="lineCharts" style="height:350px;" />
      <div id="bookRank" style="height:350px;"></div>
      <div style="height:350px;" id="loginChart">
        <!-- <div>过去一周登录走势图</div> -->
      </div>
      <div style="height:350px;" id="dealAmount">
        <div>过去一周成交总额情况</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  data () {
    return {
      id: '',
      myChart: null,
      dealTotalAmount: [
        { number: 1, unit: '家', name: '白夜行', num: '50', },
        { number: 2, unit: '家', name: '白夜行', num: '50', },
        { number: 3, unit: '家', name: '白夜行', num: '50', },
        { number: 4, unit: '家', name: '白夜行', num: '50', },
        { number: 5, unit: '家', name: '白夜行', num: '50', },
      ],
      userAmount:[],
      time:[],
      dealAmount:[],
      loginTrend : [ {
           "sql" : 3,
           "sxl" : 3,
           "amount" : 120.00,
           "date" : "05.11"
         }, {
           "sql" : 3,
           "sxl" : 3,
           "amount" : 600.00,
           "date" : "05.12"
         }, {
           "sql" : 1,
           "sxl" : 2,
           "amount" : 130.00,
           "date" : "05.13"
         }, {
           "sql" : 2,
           "sxl" : 2,
           "amount" : 200.00,
           "date" : "05.14"
         }, {
           "sql" : 1,
           "sxl" : 0,
           "amount" : 0,
           "date" : "05.15"
         }, {
           "sql" : 0,
           "sxl" : 0,
           "amount" : 0,
           "date" : "05.16"
         }, {
           "sql" : 0,
           "sxl" : 0,
           "amount" : 0,
           "date" : "05.17"
         } ]
    }
  },
  created () {
    this.id = Math.random()
      .toString(36)
      .substr(2)
  },
  mounted () {
    this.$nextTick(function () {
      this.drawLine()
    })
    this.dealData()

  },
  methods: {
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('lineCharts'))
      let bookRankChart = this.$echarts.init(document.getElementById('bookRank'))
      let loginChart=this.$echarts.init(document.getElementById('loginChart'))
      let dealAmount = this.$echarts.init(document.getElementById('dealAmount'))
      let max=Math.max.apply(Math, this.userAmount.concat(this.dealAmount));
      myChart.setOption({
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
            itemStyle:{
                        normal:{
                            color:function (params) {
                                let colorList=['#FBC103','rgba(0, 183, 147, 0.6)','#FBC103','rgba(0, 183, 147, 0.6)','#FBC103']
                                return colorList[params.dataIndex]

                            }
                        }
                    }
          }
        ]
      })
      bookRankChart.setOption({
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
      })
      loginChart.setOption({
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
         xAxis :{
             type : 'category',
             data : this.time,
             axisLabel: {
                 color: '#666',
                 fontSize: 10,
                 interval:0,
             },
             axisTick: {
                 show: false
             }
         },
         yAxis :{
             type : 'value',
             axisLabel: {
                 color: '#666',
                 fontSize: 14
             },
             minInterval: max?max/2:0.5,
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
         series : [
             {
                 name:'登录量',
                 type:'bar',
                 barGap: 0,
                 data: this.userAmount,
                 barWidth: 10
             },
             {
                 name:'成交量',
                 type:'bar',
                 data: this.dealAmount,
                 barWidth: 10
             }
         ]
      })
      dealAmount.setOption({
        title: {
          text: '过去一周登录走势图'
        },
        color: ['#00b793'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br />{c}人'
        },
        grid: {
          left: 90,
        },

        xAxis: {
          type: 'category',
          data: ['4月22日', '4月23日', '4月24日', '4月25日', '4月26日'],
          axisLabel: {
            color: '#666',
            fontSize: 10,
            interval: 0,
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
                  colorStops: [{
                    offset: 0, color: 'rgba(0, 183, 147, 0.3)' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#fff' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          }
        ]
      })
    },

    dealData(){
        this.loginTrend.map((item,index)=>{
            this.userAmount.push(item.sql)
            this.time.push(item.date)
            this.dealAmount.push(item.sxl)
        })
    }
  }
}
</script>

<style lang="less" scoped>
#overview_container {
  width: 100%;
  .title {
    margin-bottom: 10px;
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
      width: 47%;
      margin-bottom: 20px;
    }
  }

}

</style>
